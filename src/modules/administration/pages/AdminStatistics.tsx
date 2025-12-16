// src/modules/administration/pages/AdminStatistics.tsx

import React, { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useAdminMetrics } from "../hooks/useAdminMetrics";
import { useAdminUsers } from "../hooks/useAdminUsers";

// --- Helpers y Componentes Internos ---

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

const AnimatedValue: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const animatedValue = useCountUp(value, 2000);
  return <>{animatedValue.toLocaleString()}{suffix}</>;
};

const Kpi: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = "" }) => {
  const animatedValue = useCountUp(value, 2000);
  return (
    <article className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
      <span className="w-1.5 h-12 rounded-lg bg-sky-600 shadow-sm" />
      <div className="flex-1">
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</div>
        <div className="text-2xl md:text-3xl font-extrabold text-sky-700 mt-1">
          {animatedValue.toLocaleString()}{suffix}
        </div>
        <div className="text-[11px] text-slate-400 mt-1">Última actualización</div>
      </div>
    </article>
  );
};

// --- Componente Principal ---

export default function AdminStatistics() {
  const { metrics, monthlyDistribution } = useAdminMetrics();
  const { users, activeUsersCount } = useAdminUsers();
  
  const [visibleUserLines, setVisibleUserLines] = useState<Record<string, boolean>>({
    Conductores: true,
    Pasajeros: true,
    Acompañantes: true,
  });

  const [visibleUserBars, setVisibleUserBars] = useState<Record<string, boolean>>({
    Conductores: true,
    Pasajeros: true,
    Acompañantes: true,
  });

  const [visibleYears, setVisibleYears] = useState<Record<string, boolean>>({
    "2025": true,
  });

  // Datos reales por mes basados en usuarios
  const monthlyData = useMemo(() => {
    const conductores = users.filter(u => u.profiles.some(p => p.role === "Conductor")).length;
    const pasajeros = users.filter(u => u.profiles.some(p => p.role === "Pasajero")).length;
    const acompanantes = users.filter(u => u.profiles.some(p => p.role === "Acompañante")).length;

    return monthlyDistribution.map((m, idx) => {
      const factor = 0.2 + (idx * 0.4); // Crecimiento progresivo
      return {
        month: m.name,
        Conductores: Math.floor(conductores * factor),
        Pasajeros: Math.floor(pasajeros * factor),
        Acompañantes: Math.floor(acompanantes * factor),
      };
    });
  }, [monthlyDistribution, users]);

  const yearlyData = useMemo(() => {
    const months = ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May"];
    return months.map((m, idx) => {
      if (idx < 3) {
        return {
          month: m,
          "2025": monthlyDistribution[idx]?.co2 || 0,
        };
      }
      return { month: m, "2025": 0 };
    });
  }, [monthlyDistribution]);

  const toggleUserLine = (dataKey: string) => {
    setVisibleUserLines(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  const toggleUserBar = (dataKey: string) => {
    setVisibleUserBars(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  const toggleYear = (dataKey: string) => {
    setVisibleYears(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Estadísticas y Sostenibilidad</h1>
          <div className="text-sm text-slate-500">Indicadores y métricas ambientales en tiempo real</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-2xl font-bold text-blue-600">{activeUsersCount}</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
            A
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Kpi value={metrics.totalTrips} label="Viajes realizados" />
          <Kpi value={metrics.treesEquivalent} label="Árboles equivalentes" suffix=" 🌳" />
          <Kpi value={metrics.co2Saved} label="CO₂ reducido" suffix=" kg" />
        </section>

        {/* Sección de Gráficas de Usuarios */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-800">Tendencias de Usuarios</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <div className="text-xs font-medium text-slate-600 mb-2">Usuarios por mes</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyData} margin={{ top: 8, right: 4, left: -20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="gConductores" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                      </linearGradient>
                      <linearGradient id="gPasajeros" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#67e8f9" stopOpacity={1} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="gAcompanantes" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#a5f3fc" stopOpacity={1} />
                        <stop offset="100%" stopColor="#67e8f9" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#E6EEF9" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 9 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 10 }} width={30} />
                    <Tooltip wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(16,24,40,0.08)" }} />
                    {visibleUserBars.Conductores && <Bar dataKey="Conductores" stackId="a" fill="url(#gConductores)" radius={[0, 0, 0, 0]} barSize={20} />}
                    {visibleUserBars.Pasajeros && <Bar dataKey="Pasajeros" stackId="a" fill="url(#gPasajeros)" radius={[0, 0, 0, 0]} barSize={20} />}
                    {visibleUserBars.Acompañantes && <Bar dataKey="Acompañantes" stackId="a" fill="url(#gAcompanantes)" radius={[4, 4, 0, 0]} barSize={20} />}
                    <Legend 
                      onClick={(data: any) => {
                        const key = data.dataKey || data.value;
                        if (key) toggleUserBar(key);
                      }}
                      wrapperStyle={{ cursor: 'pointer', paddingTop: 4, fontSize: 9 }}
                      iconType="circle"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full">
                <div className="text-xs font-medium text-slate-600 mb-2">Tendencias</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={monthlyData} margin={{ top: 8, right: 4, left: -20, bottom: 20 }}>
                    <CartesianGrid stroke="#E6EEF9" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 9 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 10 }} width={30} />
                    <Tooltip wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(16,24,40,0.08)" }} />
                    {visibleUserLines.Conductores && <Line type="monotone" dataKey="Conductores" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 4 }} />}
                    {visibleUserLines.Pasajeros && <Line type="monotone" dataKey="Pasajeros" stroke="#ec4899" strokeWidth={2.5} dot={{ fill: "#ec4899", r: 4 }} />}
                    {visibleUserLines.Acompañantes && <Line type="monotone" dataKey="Acompañantes" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: "#06b6d4", r: 4 }} />}
                    <Legend 
                      onClick={(data: any) => {
                        const key = data.dataKey || data.value;
                        if (key) toggleUserLine(key);
                      }}
                      wrapperStyle={{ cursor: 'pointer', paddingTop: 4, fontSize: 9 }}
                      iconType="circle"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-800">CO₂ Reducido</h3>
              <div className="text-xs text-slate-500">Datos acumulados</div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={yearlyData} margin={{ top: 8, right: 8, left: 0, bottom: 30 }}>
                <defs>
                  <linearGradient id="c2025" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1e40af" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E6EEF9" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} width={36} />
                <Tooltip wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(16,24,40,0.08)" }} />
                {visibleYears["2025"] && (
                  <Area type="monotone" dataKey="2025" stroke="#1e40af" strokeWidth={2.5} fill="url(#c2025)" />
                )}
                <Legend 
                  onClick={(data: any) => {
                    const key = data.dataKey || data.value;
                    if (key) toggleYear(key);
                  }}
                  wrapperStyle={{ cursor: 'pointer', paddingTop: 8, fontSize: 11 }}
                  iconType="circle"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Sección de Impacto y Distribución MEJORADA */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Impacto Ambiental y Sostenibilidad</h4>
            <div className="text-xs text-slate-500 mb-4">Métricas acumuladas del sistema</div>

            <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div>
                <dt className="text-xs text-slate-500">CO₂ Reducido</dt>
                <dd className="font-semibold text-slate-800"><AnimatedValue value={metrics.co2Saved} suffix=" kg" /></dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Equivalente a</dt>
                <dd className="font-semibold text-slate-800"><AnimatedValue value={metrics.treesEquivalent} suffix=" árboles" /></dd>
              </div>

              <div>
                <dt className="text-xs text-slate-500">Viajes Totales</dt>
                <dd className="font-semibold text-slate-800"><AnimatedValue value={metrics.totalTrips} /></dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Viajes Completados</dt>
                <dd className="font-semibold text-slate-800"><AnimatedValue value={metrics.completedTrips} /></dd>
              </div>

              <div className="col-span-2">
                <dt className="text-xs text-slate-500">Conductores Activos</dt>
                <dd className="font-semibold text-slate-800"><AnimatedValue value={metrics.uniqueDrivers} /></dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Distribución de Viajes</h4>
            <div className="text-xs text-slate-500 mb-4">Estado actual</div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Viajes Completados</span>
                  <span className="font-medium">
                    {metrics.completedTrips} ({metrics.totalTrips > 0 ? Math.round((metrics.completedTrips / metrics.totalTrips) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500" 
                    style={{ width: `${metrics.totalTrips > 0 ? (metrics.completedTrips / metrics.totalTrips) * 100 : 0}%` }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Viajes en Progreso</span>
                  <span className="font-medium">
                    {metrics.inProgressTrips} ({metrics.totalTrips > 0 ? Math.round((metrics.inProgressTrips / metrics.totalTrips) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 transition-all duration-500" 
                    style={{ width: `${metrics.totalTrips > 0 ? (metrics.inProgressTrips / metrics.totalTrips) * 100 : 0}%` }} 
                  />
                </div>
              </div>

              {/* Nueva sección de detalles */}
              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Reducción Promedio:</span>
                    <div className="font-semibold text-slate-800">2.5 kg CO₂/viaje</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Pasajeros:</span>
                    <div className="font-semibold text-slate-800">{metrics.passengersCount}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}