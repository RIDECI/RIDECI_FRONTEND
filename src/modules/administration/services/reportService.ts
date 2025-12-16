// src/modules/administration/services/reportService.ts
/**
 * Servicio para gestionar reportes de seguridad
 * Conecta con el backend de administración de RideECI
 */

export interface SecurityReport {
  id: string;
  title: string;
  type: string;
  createdBy: number;
  description: string;
  occurredAt: string;
  relatedId?: string;
  severity?: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'OPEN' | 'CLOSED';
}

export interface ReportFilters {
  type?: string;
  from?: string;
  to?: string;
  status?: string;
  severity?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'csv' | 'xlsx';
  type?: string;
}

const DEFAULT_BASE = "https://ateneaadministrationbackend-production-cb10.up.railway.app";
const BASE_URL = (import.meta.env?.VITE_API_URL as string | undefined) ?? DEFAULT_BASE;
const REPORTS_BASE = `${BASE_URL}/admin/reports`;

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token") ?? "";
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 204) return null as unknown as T;
  
  const text = await res.text();
  
  if (res.ok) {
    try {
      return text ? JSON.parse(text) : (null as unknown as T);
    } catch {
      return text as unknown as T;
    }
  }
  
  // Error handling
  let message = `HTTP ${res.status}`;
  try {
    const parsed = JSON.parse(text);
    if (parsed.message) message = parsed.message;
    else if (typeof parsed === 'string') message = parsed;
  } catch {
    if (text) message = text;
  }
  
  throw new Error(message);
}

export const reportService = {
  /**
   * Crear un nuevo reporte de seguridad
   */
  async createReport(report: Partial<SecurityReport>): Promise<SecurityReport> {
    const res = await fetch(REPORTS_BASE, {
      method: 'POST',
      credentials: 'include',
      headers: getAuthHeaders(),
      body: JSON.stringify(report),
    });
    return handleResponse<SecurityReport>(res);
  },

  /**
   * Listar reportes con filtros opcionales
   */
  async listReports(filters: ReportFilters = {}): Promise<SecurityReport[]> {
    const url = new URL(REPORTS_BASE);
    
    if (filters.type) url.searchParams.set('type', filters.type);
    if (filters.from) url.searchParams.set('from', filters.from);
    if (filters.to) url.searchParams.set('to', filters.to);
    if (filters.status) url.searchParams.set('status', filters.status);
    if (filters.severity) url.searchParams.set('severity', filters.severity);

    const res = await fetch(url.toString(), {
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    
    return handleResponse<SecurityReport[]>(res);
  },

  /**
   * Obtener un reporte por ID
   */
  async getReportById(id: string): Promise<SecurityReport> {
    const res = await fetch(`${REPORTS_BASE}/${id}`, {
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    return handleResponse<SecurityReport>(res);
  },

  /**
   * Actualizar estado de un reporte
   */
  async updateReportStatus(id: string, status: string): Promise<SecurityReport> {
    const res = await fetch(`${REPORTS_BASE}/${id}/status`, {
      method: 'PATCH',
      credentials: 'include',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse<SecurityReport>(res);
  },

  /**
   * Exportar reportes
   */
  async exportReports(options: ExportOptions): Promise<Blob> {
    const url = new URL(`${REPORTS_BASE}/export`);
    
    url.searchParams.set('format', options.format);
    if (options.type) url.searchParams.set('type', options.type);

    const res = await fetch(url.toString(), {
      credentials: 'include',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Export failed: ${res.status}`);
    }

    return res.blob();
  },

  /**
   * Eliminar un reporte (archivar)
   */
  async deleteReport(id: string): Promise<void> {
    const res = await fetch(`${REPORTS_BASE}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    return handleResponse<void>(res);
  },
};