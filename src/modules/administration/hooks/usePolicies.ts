// src/modules/administration/hooks/usePolicies.ts
import { useCallback, useEffect, useState } from "react";
import { adminService } from "../utils/adminService";

/**
 * PublicationPolicy shape (adaptar si tu backend tiene campos distintos)
 */
export interface PublicationPolicy {
  id?: string;
  name: string;
  startTime?: string; // "HH:mm" or "HH:mm:ss"
  endTime?: string;
  enabled?: boolean;
  description?: string;
  allowedDays?: string[];
  allowedRoles?: string[];
  // cualquier otro campo
  [key: string]: any;
}

export function usePolicies() {
  const [policies, setPolicies] = useState<PublicationPolicy[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.listPolicies();
      // Asumimos que adminService devuelve array o null
      setPolicies((res ?? []) as PublicationPolicy[]);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const createPolicy = useCallback(async (policy: PublicationPolicy) => {
    setLoading(true);
    try {
      const created = await adminService.createPolicy(policy);
      await fetchPolicies();
      return created as PublicationPolicy;
    } finally {
      setLoading(false);
    }
  }, [fetchPolicies]);

  const updatePolicy = useCallback(async (id: string, policy: Partial<PublicationPolicy>) => {
    setLoading(true);
    try {
      const updated = await adminService.updatePolicy(id, policy);
      await fetchPolicies();
      return updated as PublicationPolicy;
    } finally {
      setLoading(false);
    }
  }, [fetchPolicies]);

  const deletePolicy = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await adminService.deletePolicy(id);
      await fetchPolicies();
    } finally {
      setLoading(false);
    }
  }, [fetchPolicies]);

  const checkAllowed = useCallback(async (params: { at?: string; time?: string; userId?: number; role?: string }) => {
    return adminService.isAllowed(params);
  }, []);

  return {
    policies,
    loading,
    error,
    fetchPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
    checkAllowed,
  };
}
