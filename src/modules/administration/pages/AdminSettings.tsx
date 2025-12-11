// src/modules/administration/pages/AdminSettings.tsx
import React, { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import logo from "../assets/RIDECI.png";
import { usePolicies } from "../hooks/usePolicies";
import type { PublicationPolicy } from "../hooks/usePolicies";

/**
 * Small util: convierte time (input type="time" => "HH:mm") y period (AM/PM)
 * Si el input ya está en 24h se respeta. Mantuvimos select AM/PM por UX pero
 * muchos navegadores devuelven 24h en el input type="time".
 */
function to24h(time24: string, period: string) {
  if (!time24) return time24;
  const parts = time24.split(":");
  if (parts.length < 2) return time24;
  let hh = Number(parts[0]);
  const mm = Number(parts[1]);
  if (period === "AM" && hh === 12) hh = 0;
  if (period === "PM" && hh < 12) hh = hh + 12;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export default function AdminSettings() {
  const { policies, createPolicy, updatePolicy } = usePolicies();

  // Mantengo tu UI state exactamente igual
  const [startTime, setStartTime] = useState<string>("06:00");
  const [startPeriod, setStartPeriod] = useState<string>("AM");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [endPeriod, setEndPeriod] = useState<string>("PM");

  const [alertasSeguridad, setAlertasSeguridad] = useState<boolean>(true);
  const [nuevosUsuarios, setNuevosUsuarios] = useState<boolean>(true);
  const [reportesSeguridad, setReportesSeguridad] = useState<boolean>(true);

  // metadata para policy
  const [enabled, setEnabled] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("Horarios de operación del sistema");
  const [policyId, setPolicyId] = useState<string | null>(null);

  const POLICY_NAME = "operation_hours";

  // Al montar / cuando policies cambian, cargar la policy operation_hours si existe
  useEffect(() => {
    const p = policies?.find((x) => (x.name ?? "").toString() === POLICY_NAME) as PublicationPolicy | undefined;
    if (p) {
      const st = (p.startTime ?? "06:00").slice(0, 5);
      const et = (p.endTime ?? "22:00").slice(0, 5);
      setStartTime(st);
      setEndTime(et);
      setEnabled(p.enabled ?? true);
      setDescription(p.description ?? description);
      setPolicyId((p.id ?? p._id ?? null) as string | null);
      // inferir AM/PM solo para mostrar en el select
      setStartPeriod(Number(st.split(":")[0]) >= 12 ? "PM" : "AM");
      setEndPeriod(Number(et.split(":")[0]) >= 12 ? "PM" : "AM");
    }
  }, [policies]);

  const handleSave = async () => {
    try {
      const st24 = to24h(startTime, startPeriod);
      const et24 = to24h(endTime, endPeriod);

      const payload: PublicationPolicy = {
        name: POLICY_NAME,
        startTime: st24,
        endTime: et24,
        enabled,
        description,
        allowedDays: ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"],
        allowedRoles: ["Conductor","Pasajero","Acompañante"]
      };

      if (policyId) {
        await updatePolicy(policyId, payload);
        // mantener el mismo diseño: solo notificación básica
        alert("Configuración actualizada correctamente.");
      } else {
        const created = await createPolicy(payload);
        const newId = (created?.id ?? created?._id ?? null) as string | null;
        setPolicyId(newId);
        alert("Configuración creada correctamente.");
      }
    } catch (e: any) {
      console.error(e);
      alert("Error al guardar configuración: " + (e?.message ?? String(e)));
    }
  };

  const handleCancel = () => {
    console.log("Cancelando cambios...");
    // no modifico UI: podrías recargar policy desde servidor si quieres
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
         <img src={logo} alt="RIDECI" className="h-10 object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Configuración del Sistema</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Bienvenida Usuario</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Horarios de Operación */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Horarios de Operación</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hora de Inicio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                HORA DE INICIO DE OPERACIONES
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={startPeriod}
                  onChange={(e) => setStartPeriod(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* Hora de Fin */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                HORA DE FIN DE OPERACIONES
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={endPeriod}
                  onChange={(e) => setEndPeriod(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Configuración de Notificaciones */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Configuración de Notificaciones</h2>

          <div className="space-y-5">
            {/* Alertas de Seguridad */}
            <div className="pb-5 border-b border-gray-200 flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <button
                  onClick={() => setAlertasSeguridad(!alertasSeguridad)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    alertasSeguridad
                      ? "border-blue-600 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {alertasSeguridad && (
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  )}
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-1">Alertas de Seguridad</h3>
                <p className="text-sm text-slate-500">
                  Notificar sobre desviaciones de ruta y comportamientos sospechosos
                </p>
              </div>
            </div>

            {/* Nuevos Usuarios */}
            <div className="pb-5 border-b border-gray-200 flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <button
                  onClick={() => setNuevosUsuarios(!nuevosUsuarios)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    nuevosUsuarios
                      ? "border-blue-600 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {nuevosUsuarios && (
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  )}
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-1">Nuevos Usuarios</h3>
                <p className="text-sm text-slate-500">
                  Notificar cuando se registren nuevos usuarios que requieren verificación
                </p>
              </div>
            </div>

            {/* Reportes de Seguridad */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <button
                  onClick={() => setReportesSeguridad(!reportesSeguridad)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    reportesSeguridad
                      ? "border-blue-600 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {reportesSeguridad && (
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  )}
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-1">Reportes de Seguridad</h3>
                <p className="text-sm text-slate-500">
                  Notificar sobre nuevos reportes de seguridad creados
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Botones de Acción */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <Save size={18} />
            Guardar Cambios
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-50 text-slate-700 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            <X size={18} />
            Cancelar
          </button>
        </div>
      </main>
    </div>
  );
}
