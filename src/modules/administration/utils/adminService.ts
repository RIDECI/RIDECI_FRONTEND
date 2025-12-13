// src/modules/administration/utils/adminService.ts
// Tipado y utilidades para llamadas al backend (admin).
// Exporta `adminService` y `PublicationPolicyPayload`.

export type PublicationPolicyPayload = {
  id?: string;
  name: string;
  startTime?: string; // "HH:mm" or "HH:mm:ss"
  endTime?: string;
  enabled?: boolean;
  description?: string;
  allowedDays?: string[];
  allowedRoles?: string[];
  [key: string]: any;
};


export type TripListItemPayload = {
  tripId?: number | string;
  driverId?: number | string;
  driverName?: string;
  passengerIds?: number[] | string[];
  passengerNames?: string[];
  status?: string; // ejemplo: "IN_PROGRESS", "COMPLETED"
  startTime?: string; // ISO
  endTime?: string;   // ISO
  estimatedCost?: number;
  co2Saved?: number;
  origin?: string;
  destination?: string;
  travelType?: string;
  // otros campos posibles...
  [key: string]: any;
};

export type DashboardResponsePayload = {
  tripsToday?: number;
  tripsInProgress?: number;
  income?: number;
  co2Reduced?: number;
  openSecurityReports?: number;
  changeSinceLastPeriod?: string;
  lastUpdate?: string;
  usersActive?: number;
  [key: string]: any;
};

const DEFAULT_LOCAL = "http://localhost:8080";
const RAW_BASE = (import.meta.env?.VITE_API_URL as string | undefined) ?? DEFAULT_LOCAL;
const BASE = String(RAW_BASE).replace(/\/+$/, "");

function parseJsonSafe<T = any>(text: string): T | string {
  try {
    return text ? JSON.parse(text) : ("" as unknown as T);
  } catch {
    return text as unknown as T;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 204) return null as unknown as T;
  const text = await res.text();
  if (res.ok) {
    return parseJsonSafe<T>(text) as T;
  }
  const parsed = parseJsonSafe<any>(text);
  const message =
    (parsed && typeof parsed === "object" && parsed.message) ? parsed.message
      : (typeof parsed === "string" && parsed.length > 0 ? parsed
        : `HTTP ${res.status}`);
  throw new Error(message);
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token") ?? "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export const adminService = {
  baseUrl: BASE,

  // --- Users ---
  async listUsers(params: {
    search?: string;
    status?: string;
    role?: string;
    page?: number;
    size?: number;
  }): Promise<any[]> {
    const url = new URL(`${BASE}/admin/users`);
    if (params.search) url.searchParams.set("search", params.search);
    if (params.status) url.searchParams.set("status", params.status);
    if (params.role) url.searchParams.set("role", params.role);
    if (params.page != null) url.searchParams.set("page", String(params.page));
    if (params.size != null) url.searchParams.set("size", String(params.size));

    const res = await fetch(url.toString(), {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<any[]>(res);
  },

  async getUserById(id: string | number): Promise<any> {
    const res = await fetch(`${BASE}/admin/users/${id}`, {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<any>(res);
  },

  async activateUser(id: string | number, adminId: number, profileType?: string): Promise<any> {
    const url = new URL(`${BASE}/admin/users/${id}/activate`);
    url.searchParams.set("adminId", String(adminId));
    if (profileType) url.searchParams.set("profileType", profileType);
    const res = await fetch(url.toString(), {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<any>(res);
  },

  async suspendUser(id: string | number, body: {
    adminId: number;
    reason?: string;
    startAt?: string | null;
    endAt?: string | null;
    accountOnly?: boolean;
    profileType?: string | null;
  }): Promise<any> {
    const res = await fetch(`${BASE}/admin/users/${id}/suspend`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse<any>(res);
  },

  async blockUser(id: string | number, adminId: number, reason?: string): Promise<any> {
    const res = await fetch(`${BASE}/admin/users/${id}/block?adminId=${adminId}`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: reason ? JSON.stringify(reason) : undefined,
    });
    return handleResponse<any>(res);
  },

  // --- Drivers ---
  async approveDriver(driverId: string | number, adminId: number): Promise<any> {
    const res = await fetch(`${BASE}/admin/drivers/${driverId}/approve?adminId=${adminId}`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<any>(res);
  },

  async rejectDriver(driverId: string | number, adminId: number, reason: string): Promise<any> {
    const res = await fetch(`${BASE}/admin/drivers/${driverId}/reject`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ adminId, reason }),
    });
    return handleResponse<any>(res);
  },

  async listProfiles(userId: string | number): Promise<any | null> {
    const res = await fetch(`${BASE}/admin/profiles/${userId}`, {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    if (res.status === 404) return null;
    return handleResponse<any>(res);
  },

  // --- Publication policies ---
  async listPolicies(): Promise<PublicationPolicyPayload[] | null> {
    const res = await fetch(`${BASE}/admin/policies`, {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<PublicationPolicyPayload[] | null>(res);
  },

  async getPolicy(id: string): Promise<PublicationPolicyPayload> {
    const res = await fetch(`${BASE}/admin/policies/${id}`, {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<PublicationPolicyPayload>(res);
  },

  async createPolicy(policy: PublicationPolicyPayload): Promise<PublicationPolicyPayload> {
    const res = await fetch(`${BASE}/admin/policies`, {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify(policy),
    });
    return handleResponse<PublicationPolicyPayload>(res);
  },

  async updatePolicy(id: string, policy: Partial<PublicationPolicyPayload>): Promise<PublicationPolicyPayload> {
    const res = await fetch(`${BASE}/admin/policies/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify(policy),
    });
    return handleResponse<PublicationPolicyPayload>(res);
  },

  async deletePolicy(id: string): Promise<void> {
    const res = await fetch(`${BASE}/admin/policies/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<void>(res);
  },

  async isAllowed(params: { at?: string; time?: string; userId?: number; role?: string }): Promise<any> {
    const url = new URL(`${BASE}/admin/policies/allowed`);
    if (params.at) url.searchParams.set("at", params.at);
    if (params.time) url.searchParams.set("time", params.time);
    if (params.userId != null) url.searchParams.set("userId", String(params.userId));
    if (params.role) url.searchParams.set("role", params.role);

    const res = await fetch(url.toString(), {
      credentials: "include",
      headers: getAuthHeaders(),
    });
    return handleResponse<any>(res);
  },

  async listTrips(params: { search?: string; status?: string; type?: string; page?: number; size?: number } = {}) {
  const url = new URL(`${BASE}/admin/trips`);
  if (params.search) url.searchParams.set("search", params.search);
  if (params.status) url.searchParams.set("status", params.status);
  if (params.type) url.searchParams.set("type", params.type);
  if (params.page != null) url.searchParams.set("page", String(params.page));
  if (params.size != null) url.searchParams.set("size", String(params.size));

  const res = await fetch(url.toString(), {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return handleResponse<TripListItemPayload[]>(res);
},

async getActiveTrips() {
  const res = await fetch(`${BASE}/admin/trips/active`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return handleResponse<TripListItemPayload[]>(res);
},

async getTripDetail(id: string | number) {
  const res = await fetch(`${BASE}/admin/trips/${id}`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return handleResponse<TripListItemPayload>(res);
},

async getTripMetrics() {
  const res = await fetch(`${BASE}/admin/trips/metrics`, {
    credentials: "include",
    headers: getAuthHeaders(),
  });
  return handleResponse<DashboardResponsePayload>(res);
},

};

export type AdminService = typeof adminService;
