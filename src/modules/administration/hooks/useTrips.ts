// src/modules/administration/hooks/useTrips.ts
import { useCallback, useEffect, useState } from "react";
import { adminService } from "../utils/adminService";
import type { TripListItemPayload, DashboardResponsePayload } from "../utils/adminService";

export type TripView = {
  id: string;
  driverName: string;
  role?: string;
  route?: string;
  status: "En progreso" | "Finalizado" | "Programado" | string;
  realtime?: boolean;
  departure?: string; // ISO
  severity?: "normal" | "warning" | "critical" | string;
  raw?: TripListItemPayload;
};

export function apiToView(t: TripListItemPayload): TripView {
  // Mapea campos del backend al formato visual. Ajusta según tu DTO real.
  const statusMap: Record<string, string> = {
    IN_PROGRESS: "En progreso",
    COMPLETED: "Finalizado",
    CREATED: "Programado",
    CANCELLED: "Finalizado",
  };
  const rawStatus = (t.status ?? "").toString();
  const status = statusMap[rawStatus.toUpperCase()] ?? rawStatus ?? "Programado";
  const departure = t.startTime ?? t.departureDateTime ?? null;
  const route = [t.origin, t.destination].filter(Boolean).join(" → ");
  return {
    id: String(t.tripId ?? t.tripId ?? Math.random().toString(36).slice(2, 9)),
    driverName: t.driverName ?? `Conductor ${t.driverId ?? "?"}`,
    role: "Conductor",
    route: route || undefined,
    status,
    realtime: rawStatus.toUpperCase() === "IN_PROGRESS",
    departure: departure ?? undefined,
    severity: rawStatus.toUpperCase() === "COMPLETED" ? "warning" : "normal",
    raw: t,
  };
}

export function useTrips() {
  const [trips, setTrips] = useState<TripView[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardResponsePayload | null>(null);

  const fetchTrips = useCallback(async (params?: { search?: string; status?: string; type?: string; page?: number; size?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.listTrips(params ?? {});
      const arr = res ?? [];
      setTrips(arr.map(apiToView));
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActive = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getActiveTrips();
      setTrips((res ?? []).map(apiToView));
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMetrics = useCallback(async () => {
    try {
      const m = await adminService.getTripMetrics();
      setMetrics(m ?? null);
    } catch (e: any) {
      // no bloqueante
      console.error("fetchMetrics error", e);
    }
  }, []);

  const getDetail = useCallback(async (id: string | number) => {
    try {
      return await adminService.getTripDetail(id);
    } catch (e: any) {
      throw e;
    }
  }, []);

  useEffect(() => {
    // carga inicial: trips activos y métricas
    (async () => {
      await fetchActive();
      await fetchMetrics();
    })();
  }, [fetchActive, fetchMetrics]);

  return {
    trips,
    loading,
    error,
    metrics,
    fetchTrips,
    fetchActive,
    fetchMetrics,
    getDetail,
  };
}
