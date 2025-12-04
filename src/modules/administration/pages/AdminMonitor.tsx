import React, { useMemo, useState } from "react";
import car1 from "../assets/car-1.png";
import car2 from "../assets/car-2.png";
import car3 from "../assets/car-3.png";
import car4 from "../assets/car-4.png";

import { useAdminMetrics } from "../hooks/useAdminMetrics";

type Trip = {
  id: string;
  driverName: string;
  role?: string;
  route?: string;
  status: "En progreso" | "Finalizado" | "Programado";
  realtime?: boolean;
  departure?: string; // ISO date or human text
  severity?: "normal" | "warning" | "critical";
};

const CAR_IMAGES = [car1, car2, car3];

export default function AdminMonitor() {
  const { metrics } = useAdminMetrics();

  // demo trips (replace with API)
  const [trips] = useState<Trip[]>(() => [
    {
      id: "T-1001",
      driverName: "Nestor Lopez Castañeda",
      role: "Conductor",
      route: "Universidad ECI",
      status: "En progreso",
      realtime: true,
      departure: "2025-12-03T04:00:00",
      severity: "normal",
    },
    {
      id: "T-1002",
      driverName: "Tulio Alejandro Riaño Perez",
      role: "Conductor",
      route: "Villapinzón",
      status: "En progreso",
      realtime: true,
      departure: "2025-12-03T04:10:00",
      severity: "normal",
    },
    {
      id: "T-1003",
      driverName: "Marcela Ortiz",
      role: "Acompañante",
      route: "Parque Central",
      status: "Finalizado",
      realtime: false,
      departure: "2025-12-02T18:30:00",
      severity: "warning",
    },
  ]);

  const [tab, setTab] = useState<"realtime" | "finished">("realtime");

  const filtered = useMemo(() => {
    if (tab === "realtime") return trips.filter((t) => t.realtime || t.status === "En progreso");
    return trips.filter((t) => t.status === "Finalizado");
  }, [trips, tab]);

  const formatTime = (iso?: string) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  };

  const statusPill = (s: Trip["status"]) => {
    if (s === "En progreso") return "bg-emerald-100 text-emerald-800";
    if (s === "Finalizado") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/RidECI.jpg" alt="RidECI" className="h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Gestión de Viajes</h1>
              <div className="text-sm text-slate-500">Filtra, monitorea y administra viajes en tiempo real</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-lg font-bold text-blue-600">{metrics.usersActive}</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* KPI cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <article className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="text-sm text-slate-600">Viajes hoy</div>
            <div className="text-2xl md:text-3xl font-bold text-sky-700">{metrics?.tripsCompleted ?? "—"}</div>
            <div className="text-xs text-slate-400 mt-1">Actualizado</div>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="text-sm text-slate-600">En progreso</div>
            <div className="text-2xl md:text-3xl font-bold text-sky-700">{metrics?.openReports ?? "—"}</div>
            <div className="text-xs text-slate-400 mt-1">Monitor en vivo</div>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="text-sm text-slate-600">CO₂ reducido</div>
            <div className="text-2xl md:text-3xl font-bold text-sky-700">{metrics?.co2 ?? "—"}</div>
            <div className="text-xs text-slate-400 mt-1">Est. ahorro</div>
          </article>
        </section>

        {/* Tabs */}
        <nav className="flex items-center gap-6 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setTab("realtime")}
            className={`text-sm font-semibold px-3 py-2 ${tab === "realtime" ? "text-slate-900 border-b-4 border-sky-500 -mb-1" : "text-slate-500 hover:text-slate-700"}`}
          >
            Tiempo real
          </button>

          <button
            onClick={() => setTab("finished")}
            className={`text-sm font-semibold px-3 py-2 ${tab === "finished" ? "text-red-700 border-b-4 border-red-500 -mb-1" : "text-slate-500 hover:text-slate-700"}`}
          >
            Finalizado
          </button>
        </nav>

        {/* Trip list */}
        <section>
          {filtered.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center text-slate-500">No hay viajes para mostrar.</div>
          ) : (
            <div className="space-y-6">
              {filtered.map((t, i) => {
                const carSrc = t.status === "Finalizado" ? car4 : CAR_IMAGES[i % CAR_IMAGES.length];
                return (
                  <article key={t.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex items-center gap-6">
                    {/* left: label + car */}
                    <div className="flex flex-col items-center gap-3 w-28 md:w-36">
                      <div className="flex items-center gap-2">
                        {t.realtime ? (
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600" />
                            </span>
                            <span className="text-green-600 font-semibold text-sm">En directo</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                            </span>
                            <span className="text-red-600 font-semibold text-sm">Terminado</span>
                          </div>
                        )}
                      </div>

                      <div className="w-20 h-14 md:w-28 md:h-16 flex items-center justify-center">
                        <img src={carSrc} alt={`vehículo ${t.id}`} className="max-h-full object-contain" />
                      </div>
                    </div>

                    {/* center: main content */}
                    <div className="flex-1">
                      <div className="text-sm text-slate-500">{t.role ?? "Conductor"}</div>
                      <div className="text-lg md:text-2xl font-semibold text-slate-900 mt-1">{t.driverName}</div>
                      <div className="text-xs text-slate-500 mt-1">→ {t.route}</div>
                    </div>

                    {/* right: status + time */}
                    <div className="flex-shrink-0 text-right">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${statusPill(t.status)}`}>{t.status}</span>
                      <div className="text-xs text-slate-500 mt-3">Hora de salida: {formatTime(t.departure)}</div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}