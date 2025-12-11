// src/modules/administration/hooks/useUsers.ts
import { useEffect, useState, useCallback } from "react";
import { adminService } from "../utils/adminService";
import type { UserCard } from "../types";

export function useUsers(initialPage = 0, initialSize = 20) {
  const [users, setUsers] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const fetchUsers = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await adminService.listUsers({
        search: search || undefined,
        status,
        role,
        page,
        size,
      });
      // Si tu backend devuelve DTO distinto, mapea aquí al tipo UserCard
      const mapped: UserCard[] = Array.isArray(raw)
        ? raw.map((r: any) => ({
            id: String(r.id ?? r.userId ?? r._id),
            name: r.name,
            email: r.email,
            profilePictureUrl: r.profilePictureUrl ?? r.profile?.profilePictureUrl,
            phone: r.phone ?? r.phoneNumber,
            identificationNumber: r.identificationNumber,
            identificationType: r.identificationType,
            birthDate: r.birthDate,
            status: r.status ?? r.state,
            profiles: r.profiles ?? (r.profile ? [r.profile] : []),
            activeProfile: (r.activeProfile ?? r.profiles?.[0] ?? (r.profile ? r.profile : null)),
          }))
        : [];
      if (!signal?.aborted) setUsers(mapped);
    } catch (err: any) {
      if (!signal?.aborted) setError(err.message ?? "Error fetching users");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [search, status, role, page, size]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchUsers(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchUsers]);

  return {
    users,
    setUsers,
    loading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    role,
    setRole,
    page,
    setPage,
    size,
    setSize,
    refresh: () => {
      const ctrl = new AbortController();
      fetchUsers(ctrl.signal);
    }
  };
}
