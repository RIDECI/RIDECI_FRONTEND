import React, { useCallback, useEffect, useRef, useState } from "react";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";

import { useAdminMetrics } from "../hooks/useAdminMetrics";

type Report = {
  id: string;
  title: string;
  reporter: string;
  severity?: "high" | "medium" | "low" | string;
  createdAt?: string;
  details?: string;
};

type UserCard = {
  id: string;
  name: string;
  plate?: string;
  avatar?: string | null;
  status?: string;
  email?: string;
  phone?: string;
  vehicle?: string | null;
  role?: string;
};

type ErrorKind = "file" | "report" | "user" | "approve" | "reject";

export default function AdminHome() {
  const { metrics = { usersActive: 0, tripsCompleted: 0, openReports: 0, co2: 0 } } =
    useAdminMetrics() as any;

  const [reports] = useState<Report[]>(() => [
    { id: "REP001", title: "Comportamiento Agresivo", reporter: "Juan García", severity: "high", details: "El conductor insultó y manejó agresivo." },
    { id: "REP002", title: "Conducción temeraria", reporter: "Ana López", severity: "high", details: "Exceso de velocidad y maniobras peligrosas." },
    { id: "REP003", title: "Incumplimiento de ruta", reporter: "Pedro Ruiz", severity: "medium", details: "No siguió el itinerario acordado." },
    { id: "REP004", title: "Peatón lesionado", reporter: "Laura M.", severity: "high", details: "Colisión leve con peatón." },
    { id: "REP005", title: "Vehículo sospechoso", reporter: "Andrés P.", severity: "low", details: "Actuación sospechosa en el vehículo." },
    { id: "REP006", title: "Accidente leve", reporter: "Mariana R.", severity: "medium", details: "Choque leve con daños menores." },
    { id: "REP007", title: "Conductor sin licencia", reporter: "David Q.", severity: "high", details: "Conductor no presentó licencia." },
    { id: "REP008", title: "Ruta cancelada", reporter: "Sofía L.", severity: "low", details: "El conductor canceló la ruta sin avisar." },
  ]);

  const [users] = useState<UserCard[]>(() => [
    { id: "U001", name: "Carlos Ruiz", plate: "ABC-123", avatar: avatar1, status: "Pendiente", email: "carlos.ruiz@mail.escuelaing.edu.co", phone: "+57 320 7654321", vehicle: "Toyota Prius 2022", role: "Conductor" },
    { id: "U002", name: "María Gómez", plate: "XYZ-789", avatar: avatar2, status: "Pendiente", email: "maria.gomez@mail.escuelaing.edu.co", phone: "+57 310 1234567", vehicle: "Hyundai Accent 2023", role: "Conductor" },
    { id: "U003", name: "Juan Sánchez", plate: "LMN-456", avatar: avatar3, status: "Pendiente", email: "juan.sanchez@mail.escuelaing.edu.co", phone: "+57 300 9876543", vehicle: "Renault Logan 2021", role: "Conductor" },
    { id: "U004", name: "Natalia P.", plate: "DEF-222", avatar: null, status: "Pendiente", email: "natalia.p@mail.escuelaing.edu.co", phone: "+57 315 5555555", vehicle: "Chevrolet Spark 2020", role: "Conductor" },
    { id: "U005", name: "Andrés V.", plate: "GHI-333", avatar: null, status: "Pendiente", email: "andres.v@mail.escuelaing.edu.co", phone: "+57 321 4444444", vehicle: "Mazda 3 2019", role: "Conductor" },
    { id: "U006", name: "Paola R.", plate: "JKL-444", avatar: null, status: "Pendiente", email: "paola.r@mail.escuelaing.edu.co", phone: "+57 318 7777777", vehicle: "Nissan Versa 2021", role: "Conductor" },
  ]);

  // responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1200) setItemsPerPage(3);
      else if (w >= 900) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Reports carousel logic
  const [repPage, setRepPage] = useState(0);
  const repPages = Math.max(1, Math.ceil(reports.length / itemsPerPage));
  useEffect(() => setRepPage((p) => Math.min(p, Math.max(0, repPages - 1))), [itemsPerPage, repPages]);
  
  const repPrev = useCallback(() => setRepPage((p) => Math.max(0, p - 1)), []);
  const repNext = useCallback(() => setRepPage((p) => Math.min(repPages - 1, p + 1)), [repPages]);

  // Users carousel logic
  const [userPage, setUserPage] = useState(0);
  const userPages = Math.max(1, Math.ceil(users.length / itemsPerPage));
  useEffect(() => setUserPage((p) => Math.min(p, Math.max(0, userPages - 1))), [itemsPerPage, userPages]);
  
  const userPrev = useCallback(() => setUserPage((p) => Math.max(0, p - 1)), []);
  const userNext = useCallback(() => setUserPage((p) => Math.min(userPages - 1, p + 1)), [userPages]);

  // Modal & confirmation state
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // User detail modal
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // confirmation flow
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | "suspend_account" | "suspend_profile" | "archive" | "approve" | "reject">(null);
  
  const [selectedRole, setSelectedRole] = useState<"Acompañante" | "Conductor" | "Pasajero">("Conductor");
  const [actionLoading, setActionLoading] = useState(false);

  // error handling
  const [errorState, setErrorState] = useState<{
    open: boolean;
    kind?: ErrorKind;
    title?: string;
    message?: string;
  }>({ open: false });

  // attempt counter so retry can succeed for demo
  const attemptsRef = useRef<Record<string, number>>({});

  const openReport = (r: Report) => {
    setSelectedReport(r);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPendingAction(null);
    setConfirmOpen(false);
    setSelectedReport(null);
  };

  const openUser = (u: UserCard) => {
    setSelectedUser(u);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const startConfirm = (action: typeof pendingAction) => {
    setPendingAction(action);
    setConfirmOpen(true);
  };

  const showError = (kind: ErrorKind, title?: string, message?: string) => {
    setErrorState({ open: true, kind, title, message });
  };

  const performAction = async () => {
    if (!pendingAction) return;
    setActionLoading(true);

    const key = pendingAction;
    attemptsRef.current[key] = (attemptsRef.current[key] || 0) + 1;
    const attempt = attemptsRef.current[key];

    await new Promise((res) => setTimeout(res, 700));

    if (pendingAction === "archive") {
      if (attempt === 1) {
        showError("file", "No se ha generado el archivo", "No se ha generado el archivo. Intenta nuevamente.");
      } else {
        console.log(`Reporte ${selectedReport?.id} archivado (reintento).`);
        closeModal();
      }
    } else if (pendingAction === "suspend_account") {
      if (attempt === 1) {
        showError("report", "No existe el reporte", "No existe el reporte. Verifica y reintenta.");
      } else {
        console.log(`Cuenta suspendida: ${selectedReport?.id}`);
        closeModal();
        if(isUserModalOpen) closeUserModal();
      }
    } else if (pendingAction === "suspend_profile") {
      if (attempt === 1) {
        showError("user", "No se ha podido suspender el usuario", "No se ha podido suspender el usuario. Reintentar.");
      } else {
        console.log(`Perfil suspendido (${selectedRole}): ${selectedReport?.id}`);
        closeModal();
        if(isUserModalOpen) closeUserModal();
      }
    } else if (pendingAction === "approve") {
      if (attempt === 1) {
        showError("approve", "No se ha podido aprobar el usuario", "No se ha podido aprobar el usuario. Reintentar.");
      } else {
        console.log(`Conductor ${selectedUser?.id} aprobado`);
        closeUserModal();
      }
    } else if (pendingAction === "reject") {
      if (attempt === 1) {
        showError("reject", "No se ha podido rechazar el usuario", "No se ha podido rechazar el usuario. Reintentar.");
      } else {
        console.log(`Conductor ${selectedUser?.id} rechazado`);
        closeUserModal();
      }
    }

    setActionLoading(false);
    setConfirmOpen(false);
    setPendingAction(null);
  };

  const retryFromError = () => {
    setErrorState({ open: false });
    setConfirmOpen(true);
  };

  const closeError = () => {
    setErrorState({ open: false });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (errorState.open) closeError();
        else if (confirmOpen) setConfirmOpen(false);
        else if (isUserModalOpen) closeUserModal();
        else closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, errorState.open, isUserModalOpen]);

  const severityLabel = useCallback((s?: string) => (s ? s.toUpperCase() : "N/A"), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/RidECI.jpg" alt="RidECI" className="h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Panel de administrador</h1>
              <div className="text-sm text-slate-500">Supervisa usuarios, reportes y métricas institucionales</div>
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <article className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-600">Viajes completados</div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-sky-700">{metrics.tripsCompleted}</div>
            <div className="mt-2 text-xs text-slate-500">Última actualización automática</div>
          </article>

          <article className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-600">Reportes abiertos</div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-sky-700">{metrics.openReports}</div>
            <div className="mt-2 text-xs text-slate-500">Prioriza los incidentes críticos</div>
          </article>

          <article className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-600">CO₂ reducido</div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 1118 0" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-sky-700">{metrics.co2}</div>
            <div className="mt-2 text-xs text-slate-500">Ahorro estimado por viajes compartidos</div>
          </article>
        </section>

        {/* Reportes (carousel) - ARREGLADO FLEXBOX */}
        <section className="mb-8 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Nuevos reportes</h2>
            <div className="text-sm text-slate-500">{reports.length} encontrados</div>
          </div>

          <div className="flex items-center gap-4">
            {/* Flecha Izquierda */}
            <button 
              onClick={repPrev} 
              disabled={repPage === 0} 
              aria-label="Anterior reporte" 
              title="Anterior" 
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${repPage === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Track Contenedor */}
            <div className="flex-1 overflow-hidden">
                <div 
                className="flex gap-6 transition-transform duration-700 ease-out px-1"
                style={{ 
                    transform: `translateX(-${repPage * (100 / itemsPerPage + (itemsPerPage > 1 ? 2.5 : 0))}%)`,
                }}
                >
                {reports.map((r) => (
                    <article 
                    key={r.id} 
                    className="flex-shrink-0 bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                    style={{ width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` }}
                    >
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-semibold text-blue-600">#{r.id}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.severity === "high" ? "bg-red-100 text-red-600" : r.severity === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                        {severityLabel(r.severity)}
                        </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-1">{r.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">Reportado por: {r.reporter}</p>
                    <div className="flex gap-3">
                        <button onClick={() => openReport(r)} className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition">Ver</button>
                    </div>
                    </article>
                ))}
                </div>
            </div>

            {/* Flecha Derecha */}
            <button 
              onClick={repNext} 
              disabled={repPage >= repPages - 1} 
              aria-label="Siguiente reporte" 
              title="Siguiente" 
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${repPage >= repPages - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        <div className="my-6 border-t border-dashed border-slate-200" />

        {/* Users - ARREGLADO FLEXBOX */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Usuarios nuevos por validar</h3>
            <div className="text-sm text-slate-500">{users.length} usuarios</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
            <div className="flex items-center gap-4">
                {/* Flecha Izquierda */}
                <button 
                    onClick={userPrev} 
                    disabled={userPage === 0} 
                    className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${userPage === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                    <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Track Contenedor */}
                <div className="flex-1 overflow-hidden">
                    <div 
                        className="flex gap-6 transition-transform duration-700 ease-out px-1"
                        style={{ 
                        transform: `translateX(-${userPage * (100 / itemsPerPage + (itemsPerPage > 1 ? 2.5 : 0))}%)`,
                        }}
                    >
                        {users.map((u) => (
                        <div 
                            key={u.id} 
                            className="flex-shrink-0 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative"
                            style={{ width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` }}
                        >
                            
                            {/* Botón Ver - Top Right */}
                            <button 
                                onClick={() => openUser(u)} 
                                className="absolute top-5 right-5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                            >
                                Ver
                            </button>

                            <div className="flex items-start gap-4 mb-4 mt-1">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {u.avatar ? (
                                    <img src={u.avatar} alt={u.name} className="w-20 h-20 rounded-full object-cover border-2 border-blue-50" />
                                    ) : (
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-500 border-2 border-blue-50">
                                        {u.name.charAt(0)}
                                    </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 pr-16">
                                    <h4 className="font-bold text-gray-900 truncate text-lg">{u.name}</h4>
                                    <div className="text-sm text-slate-500 font-medium">{u.role}</div>
                                    <div className="text-xs text-slate-400 truncate mt-0.5">{u.email}</div>
                                    <div className="text-xs text-slate-400 truncate">{u.vehicle}</div>
                                </div>
                            </div>

                            {/* Botones Grandes Bottom */}
                            <div className="flex gap-3 mt-4">
                            <button 
                                onClick={() => {
                                setSelectedUser(u);
                                startConfirm("approve");
                                }}
                                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                            >
                                Aprobar
                            </button>
                            <button 
                                onClick={() => {
                                setSelectedUser(u);
                                startConfirm("reject");
                                }}
                                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                            >
                                Rechazar
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Flecha Derecha */}
                <button 
                    onClick={userNext} 
                    disabled={userPage >= userPages - 1} 
                    className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${userPage >= userPages - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                    <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
          </div>
        </section>
      </main>

      {/* Report details modal */}
      {isModalOpen && selectedReport && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedReport.title}</h2>
                <div className="text-sm text-slate-500">#{selectedReport.id} — Reportado por: {selectedReport.reporter}</div>
              </div>
              <button onClick={closeModal} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <p>{selectedReport.details ?? "No hay detalles adicionales."}</p>
              <p className="mt-3 text-xs text-slate-500">Fecha: {selectedReport.createdAt ?? "No disponible"}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => { setSelectedUser({ id: "dummy", name: selectedReport.reporter } as UserCard); startConfirm("suspend_account"); }} className="w-full py-2 rounded-lg border border-red-400 bg-red-50 text-red-700 font-medium hover:bg-red-100">Suspender cuenta</button>
              <button onClick={() => { setSelectedUser({ id: "dummy", name: selectedReport.reporter } as UserCard); startConfirm("suspend_profile"); }} className="w-full py-2 rounded-lg border border-orange-400 bg-orange-50 text-orange-700 font-medium hover:bg-orange-100">Suspender perfil</button>
              <button onClick={() => startConfirm("archive")} className="w-full py-2 rounded-lg border border-green-300 bg-green-50 text-green-700 font-medium hover:bg-green-100 sm:col-span-2">Archivar</button>
            </div>
          </div>
        </div>
      )}

      {/* User detail modal */}
      {isUserModalOpen && selectedUser && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeUserModal} />
          <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6">
            
            {/* Close Button Top Right */}
            <button onClick={closeUserModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="flex items-start gap-5 mb-6">
                <div className="flex-shrink-0">
                    {selectedUser.avatar ? (
                        <img src={selectedUser.avatar} alt={selectedUser.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-50" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400">
                            {selectedUser.name.charAt(0)}
                        </div>
                    )}
                </div>
                
                <div className="flex-1 mt-1">
                    <h2 className="text-2xl font-bold text-slate-800 leading-tight">{selectedUser.name}</h2>
                    <div className="text-sm text-slate-500 mt-1">{selectedUser.email}</div>
                    <div className="text-sm text-slate-500">{selectedUser.phone}</div>
                    
                    <div className="mt-4 grid grid-cols-1 gap-y-1 text-sm">
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-700 w-20">Rol:</span>
                            <span className="text-slate-600">{selectedUser.role}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-700 w-20">Estado:</span>
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">{selectedUser.status}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-700 w-20">Placa:</span>
                            <span className="text-slate-600">{selectedUser.plate || "N/A"}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-700 w-20">Vehículo:</span>
                            <span className="text-slate-600">{selectedUser.vehicle || "N/A"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
                <button 
                    onClick={() => startConfirm("suspend_account")}
                    className="py-2.5 rounded-lg border border-red-300 text-red-700 bg-red-50 font-semibold hover:bg-red-100 transition-colors"
                >
                    Suspender cuenta
                </button>
                <button 
                    onClick={() => startConfirm("suspend_profile")}
                    className="py-2.5 rounded-lg border border-orange-300 text-orange-700 bg-orange-50 font-semibold hover:bg-orange-100 transition-colors"
                >
                    Suspender perfil
                </button>
            </div>
            <button 
                onClick={() => startConfirm("archive")}
                className="w-full py-2.5 rounded-lg border border-blue-300 text-blue-700 bg-blue-50 font-semibold hover:bg-blue-100 transition-colors"
            >
                Archivar
            </button>

          </div>
        </div>
      )}

      {/* Confirmation modal (reusable) */}
      {confirmOpen && (selectedReport || selectedUser) && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />

          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold">
              {pendingAction === "suspend_account" 
                ? "Confirmar suspensión de cuenta" 
                : pendingAction === "suspend_profile" 
                ? "Suspender perfil" 
                : pendingAction === "approve"
                ? "Aprobar conductor"
                : pendingAction === "reject"
                ? "Rechazar conductor"
                : "Archivar reporte"}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {pendingAction === "suspend_account" 
                ? `Vas a suspender la cuenta de ${selectedUser?.name || selectedReport?.id}.` 
                : pendingAction === "suspend_profile" 
                ? `Selecciona qué perfil suspender para ${selectedUser?.name || selectedReport?.id}.` 
                : pendingAction === "approve"
                ? `Vas a aprobar a ${selectedUser?.name} como conductor.`
                : pendingAction === "reject"
                ? `Vas a rechazar la solicitud de ${selectedUser?.name}.`
                : `Archivarás el reporte ${selectedReport?.id}.`}
            </p>

            {pendingAction === "suspend_profile" && (
              <fieldset className="mt-4">
                <legend className="text-sm font-medium text-slate-700">Tipo de perfil</legend>
                <div className="mt-2 flex gap-2">
                  {(["Acompañante", "Conductor", "Pasajero"] as const).map((r) => (
                    <label key={r} className={`flex-1 border rounded-lg p-2 cursor-pointer text-center ${selectedRole === r ? "border-blue-500 bg-blue-50 text-blue-700 font-bold" : "border-gray-200 text-slate-600"}`}>
                      <input type="radio" name="profile" value={r} className="sr-only" checked={selectedRole === r} onChange={() => setSelectedRole(r)} />
                      <div className="text-sm font-medium">{r}</div>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-700 hover:bg-gray-50">Cancelar</button>

              <button
                onClick={performAction}
                disabled={actionLoading}
                className={`px-4 py-2 rounded-lg font-medium text-white shadow-sm ${
                  pendingAction?.includes("suspend") || pendingAction === "reject"
                    ? "bg-red-600 hover:bg-red-700" 
                    : "bg-green-600 hover:bg-green-700"
                } ${actionLoading ? "opacity-70 cursor-wait" : ""}`}
              >
                {actionLoading ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error modal */}
      {errorState.open && (
        <div role="alertdialog" aria-modal="true" className="fixed inset-0 z-70 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setErrorState({ open: false })} />

          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border-2 border-red-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-red-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{errorState.title}</h3>
              <p className="text-sm text-slate-600 text-center">{errorState.message}</p>

              <div className="mt-3 w-full flex justify-center gap-3">
                <button onClick={retryFromError} className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50">Reintentar</button>
                <button onClick={() => setErrorState({ open: false })} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}