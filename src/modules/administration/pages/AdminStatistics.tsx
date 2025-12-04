import React from "react";
import { useAdminMetrics } from "../hooks/useAdminMetrics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
} from "recharts";

/* ---------- KPI ---------- */
const Kpi: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <article className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
    {/* barra de acento */}
    <span className="w-1.5 h-12 rounded-lg bg-sky-600 shadow-sm" />
    <div className="flex-1">
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</div>
      <div className="text-2xl md:text-3xl font-extrabold text-sky-700 mt-1">{value}</div>
      <div className="text-[11px] text-slate-400 mt-1">Última actualización</div>
    </div>
  </article>
);

/* ---------- Datos demo ---------- */
const areaData = [
  { month: "Enero", "2023": 40, "2024": 60, "2025": 80 },
  { month: "Febrero", "2023": 50, "2024": 70, "2025": 90 },
  { month: "Marzo", "2023": 60, "2024": 80, "2025": 100 },
  { month: "Abril", "2023": 75, "2024": 95, "2025": 115 },
  { month: "Mayo", "2023": 85, "2024": 105, "2025": 130 },
];

const barLineData = [
  { name: "Noviembre", Conductores: 20, Pasajeros: 18, Activos: 22 },
  { name: "Diciembre", Conductores: 28, Pasajeros: 25, Activos: 35 },
  { name: "Enero", Conductores: 38, Pasajeros: 35, Activos: 50 },
  { name: "Elemento 4", Conductores: 35, Pasajeros: 32, Activos: 48 },
];

const lineChartData = [
  { month: "enero", Conductores: 10, Pasajeros: 15, Activos: 12 },
  { month: "febrero", Conductores: 15, Pasajeros: 18, Activos: 20 },
  { month: "Marzo", Conductores: 25, Pasajeros: 20, Activos: 28 },
  { month: "Abril", Conductores: 22, Pasajeros: 28, Activos: 35 },
  { month: "Mayo", Conductores: 35, Pasajeros: 32, Activos: 45 },
];

export default function AdminStatistics() {
  const { metrics } = useAdminMetrics();

  const trips = metrics?.tripsCompleted?.toString() ?? "1283";
  const users = metrics?.usersActive?.toString() ?? "2547";
  const co2 = metrics?.co2?.toString() ?? "3.2T";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <img src="/RidECI.jpg" alt="RidECI" className="h-10 object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Estadísticas y Sostenibilidad</h1>
            <div className="text-sm text-slate-500">Indicadores y métricas ambientales</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-lg font-bold text-blue-600">{users}</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* KPIs top */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Kpi value={trips} label="Viajes mes" />
          <Kpi value={users} label="Usuarios activos" />
          <Kpi value={co2} label="CO₂ reducido" />
        </section>

        {/* Gráficas principales */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tendencias (izq) - Doble gráfica */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-800">Tendencias de Viajes y Usuarios</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Usuarios - Barras */}
              <div>
                <div className="text-xs font-medium text-slate-600 mb-2">Usuarios</div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barLineData}
                      margin={{ top: 8, right: 4, left: -20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="gConductores" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="gPasajeros" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#67e8f9" stopOpacity={1} />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.7} />
                        </linearGradient>
                        <linearGradient id="gActivos" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#a5f3fc" stopOpacity={1} />
                          <stop offset="100%" stopColor="#67e8f9" stopOpacity={0.7} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid stroke="#E6EEF9" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 9 }}
                        angle={0}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 10 }}
                        width={30}
                      />
                      <Tooltip
                        wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(16,24,40,0.08)" }}
                      />
                      <Bar dataKey="Conductores" stackId="a" fill="url(#gConductores)" radius={[0, 0, 0, 0]} barSize={24} />
                      <Bar dataKey="Pasajeros" stackId="a" fill="url(#gPasajeros)" radius={[0, 0, 0, 0]} barSize={24} />
                      <Bar dataKey="Activos" stackId="a" fill="url(#gActivos)" radius={[4, 4, 0, 0]} barSize={24} />
                      <Legend 
                        verticalAlign="bottom" 
                        align="center" 
                        iconType="circle" 
                        wrapperStyle={{ paddingTop: 4, fontSize: 9 }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Líneas */}
              <div>
                <div className="text-xs font-medium text-slate-600 mb-2">&nbsp;</div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={lineChartData}
                      margin={{ top: 8, right: 4, left: -20, bottom: 20 }}
                    >
                      <CartesianGrid stroke="#E6EEF9" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 9 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 10 }}
                        width={30}
                      />
                      <Tooltip
                        wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(16,24,40,0.08)" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Conductores" 
                        stroke="#22d3ee" 
                        strokeWidth={2.5}
                        dot={{ fill: "#22d3ee", r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Pasajeros" 
                        stroke="#ec4899" 
                        strokeWidth={2.5}
                        dot={{ fill: "#ec4899", r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Activos" 
                        stroke="#06b6d4" 
                        strokeWidth={2.5}
                        dot={{ fill: "#06b6d4", r: 4 }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        align="center" 
                        iconType="circle" 
                        wrapperStyle={{ paddingTop: 4, fontSize: 9 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* CO2 (der) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-800">CO₂ Reducido</h3>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 8, right: 8, left: 0, bottom: 30 }}>
                  <defs>
                    <linearGradient id="c2025" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#1e40af" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="c2024" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="c2023" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#E6EEF9" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} width={36} />
                  <Tooltip wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(16,24,40,0.08)" }} />
                  <Area type="monotone" dataKey="2023" stroke="#22d3ee" strokeWidth={2} fill="url(#c2023)" />
                  <Area type="monotone" dataKey="2024" stroke="#38bdf8" strokeWidth={2} fill="url(#c2024)" />
                  <Area type="monotone" dataKey="2025" stroke="#1e40af" strokeWidth={2.5} fill="url(#c2025)" />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: 8, fontSize: 11 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Bottom cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Impacto */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Impacto Ambiental y Sostenibilidad</h4>
            <div className="text-xs text-slate-500 mb-4">Métricas de impacto (ejemplo mensual)</div>

            <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div>
                <dt className="text-xs text-slate-500">CO₂ Reducido (Mes)</dt>
                <dd className="font-semibold text-slate-800">45.2T</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Equivalente a</dt>
                <dd className="font-semibold text-slate-800">2,847 árboles</dd>
              </div>

              <div>
                <dt className="text-xs text-slate-500">Km Compartidos</dt>
                <dd className="font-semibold text-slate-800">34,867 km</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Pasajeros Compartidos</dt>
                <dd className="font-semibold text-slate-800">5,234 personas</dd>
              </div>

              <div className="col-span-2">
                <dt className="text-xs text-slate-500">Emisiones Evitadas</dt>
                <dd className="font-semibold text-slate-800">89.4T CO₂</dd>
              </div>
            </dl>
          </div>

          {/* Distribución */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Distribución Viajes</h4>
            <div className="text-xs text-slate-500 mb-4">Resumen por tipo</div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Viajes Individuales</span>
                  <span className="font-medium">7,456 (59%)</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: "59%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Viajes Compartidos</span>
                  <span className="font-medium">5,091 (41%)</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300" style={{ width: "41%" }} />
                </div>
              </div>

              <div className="text-xs text-slate-500">
                <strong>Reducción Promedio:</strong> 3.8 kg CO₂/viaje
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}