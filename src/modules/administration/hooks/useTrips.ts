// src/modules/administration/hooks/useTrips.ts
/**
 * Hook mejorado para gestionar viajes
 */

import { useCallback, useEffect, useState, useMemo } from "react";
import { adminService } from "../utils/adminService";
import type { TripListItemPayload, DashboardResponsePayload } from "../utils/adminService";
import { mockUsers } from "../utils/mockData";

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

/**
 * Mapa de IDs de conductores a nombres
 * Se genera desde mockUsers para tener nombres reales
 */
function getDriverNamesMap(): Record<string, string> {
  const users = mockUsers();
  const map: Record<string, string> = {};
  
  users.forEach(user => {
    // Solo incluir usuarios que tengan perfil de conductor
    const hasConductor = user.profiles.some(p => p.role === "Conductor");
    if (hasConductor) {
      map[user.id] = user.name;
      
      // También mapear por número si el ID es numérico
      const numericId = parseInt(user.id.replace('U', ''));
      if (!isNaN(numericId)) {
        map[String(numericId)] = user.name;
      }
    }
  });
  
  return map;
}

/**
 * Convierte un TripListItemPayload del backend a TripView para la UI
 */
export function apiToView(t: TripListItemPayload, driverNamesMap: Record<string, string>): TripView {
  // Mapeo de estados
  const statusMap: Record<string, string> = {
    IN_PROGRESS: "En progreso",
    COMPLETED: "Finalizado",
    CREATED: "Programado",
    CANCELLED: "Finalizado",
  };
  
  const rawStatus = (t.status ?? "").toString().toUpperCase();
  const status = statusMap[rawStatus] ?? t.status ?? "Programado";
  
  // Obtener nombre del conductor desde el mapa
  const driverId = String(t.driverId ?? '');
  let driverName = t.driverName;
  
  // Si no hay nombre en el backend, buscar en el mapa
  if (!driverName || driverName === `Conductor ${driverId}`) {
    driverName = driverNamesMap[driverId] || t.driverName || `Conductor ${driverId}`;
  }
  
  // Construir ruta limpiando coordenadas
  let origin = t.origin || '';
  let destination = t.destination || '';
  
  // Limpiar coordenadas de la ruta (ej: "4.624335,-74.063644 - Av. Jimenez" → "Av. Jimenez")
  if (origin.includes(' - ')) {
    origin = origin.split(' - ')[1].trim();
  }
  if (destination.includes(' - ')) {
    destination = destination.split(' - ')[1].trim();
  }
  
  const route = [origin, destination].filter(Boolean).join(" → ");
  
  // Hora de salida
  const departure = t.startTime ?? null;
  
  return {
    id: String(t.tripId ?? Math.random().toString(36).slice(2, 9)),
    driverName,
    role: "Conductor",
    route: route || undefined,
    status,
    realtime: rawStatus === "IN_PROGRESS",
    departure: departure ?? undefined,
    severity: rawStatus === "COMPLETED" ? "warning" : "normal",
    raw: t,
  };
}

export function useTrips() {
  const [trips, setTrips] = useState<TripView[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardResponsePayload | null>(null);

  // Generar mapa de nombres de conductores
  const driverNamesMap = useMemo(() => getDriverNamesMap(), []);

  const fetchTrips = useCallback(async (params?: { 
    search?: string; 
    status?: string; 
    type?: string; 
    page?: number; 
    size?: number 
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.listTrips(params ?? {});
      const arr = res ?? [];
      setTrips(arr.map(t => apiToView(t, driverNamesMap)));
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }, [driverNamesMap]);

  const fetchActive = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getActiveTrips();
      setTrips((res ?? []).map(t => apiToView(t, driverNamesMap)));
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }, [driverNamesMap]);

  const fetchMetrics = useCallback(async () => {
    try {
      const m = await adminService.getTripMetrics();
      setMetrics(m ?? null);
    } catch (e: any) {
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
    // Carga inicial: trips activos y métricas
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