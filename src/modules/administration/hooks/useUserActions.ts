// src/modules/administration/hooks/useUserActions.ts
import { useState } from "react";
import { adminService } from "../utils/adminService";
import type { PendingAction } from "../types";

export function useUserActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function activateUser(userId: string | number, adminId: number, profileType?: string) {
    setLoading(true);
    setError(null);
    try {
      await adminService.activateUser(userId, adminId, profileType);
    } catch (e: any) {
      setError(e.message ?? String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function suspendUser(userId: string | number, payload: {
    adminId: number;
    reason?: string;
    startAt?: string | null;
    endAt?: string | null;
    accountOnly?: boolean;
    profileType?: string | null;
  }) {
    setLoading(true);
    setError(null);
    try {
      await adminService.suspendUser(userId, payload);
    } catch (e: any) {
      setError(e.message ?? String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function approveDriver(driverId: string | number, adminId: number) {
    setLoading(true);
    setError(null);
    try {
      await adminService.approveDriver(driverId, adminId);
    } catch (e: any) {
      setError(e.message ?? String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function rejectDriver(driverId: string | number, adminId: number, reason: string) {
    setLoading(true);
    setError(null);
    try {
      await adminService.rejectDriver(driverId, adminId, reason);
    } catch (e: any) {
      setError(e.message ?? String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    activateUser,
    suspendUser,
    approveDriver,
    rejectDriver,
  };
}
