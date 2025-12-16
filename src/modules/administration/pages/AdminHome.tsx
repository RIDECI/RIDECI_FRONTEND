// src/modules/administration/pages/AdminHome.tsx
/**
 * Panel principal del administrador
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";
import type { UserCard, PendingAction } from '../types';
import { avatar1 } from '../utils/mockData';
import { ErrorModal } from '../components/ErrorModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ReportDetailsModal } from '../components/ReportDetailsModal';
import { ActOnReportModal } from '../components/ActOnReportModal';
import { UserDetailsModal } from '../components/UserDetailsModal';
import { ReportsList } from '../components/ReportsList';
import { EmergencyButton } from '../components/EmergencyButton';
import { useAdminMetrics } from '../hooks/useAdminMetrics';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { useReports } from '../hooks/useReports';
import type { EnrichedReport } from '../services/reportEnrichmentService';

export default function AdminHome() {
  const { metrics } = useAdminMetrics();
  const { users, successMessage, performUserAction, getPendingDrivers, activeUsersCount } = useAdminUsers();
  const { reports, statistics, markAsOpened } = useReports();
  
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setItemsPerPage(w >= 1200 ? 3 : w >= 900 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pendingDrivers = useMemo(() => getPendingDrivers(), [getPendingDrivers]);

  const [userPage, setUserPage] = useState(0);
  useEffect(() => setUserPage(0), [pendingDrivers.length, itemsPerPage]);
  
  const totalUserPages = Math.ceil(pendingDrivers.length / itemsPerPage);
  const userPrev = useCallback(() => setUserPage(p => Math.max(0, p - 1)), []);
  const userNext = useCallback(() => setUserPage(p => Math.min(totalUserPages - 1, p + 1)), [totalUserPages]);

  const visibleUsers = pendingDrivers.slice(
    userPage * itemsPerPage, 
    (userPage + 1) * itemsPerPage
  );

  const canUserGoPrev = userPage > 0;
  const canUserGoNext = userPage < totalUserPages - 1;

  const [selectedReport, setSelectedReport] = useState<EnrichedReport | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [actModalOpen, setActModalOpen] = useState(false);
  const [reportToAct, setReportToAct] = useState<EnrichedReport | null>(null);
  
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [selectedProfileRole, setSelectedProfileRole] = useState<string>("Conductor");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRolesToSuspend, setSelectedRolesToSuspend] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState({ open: false, title: "", message: "" });

  // ✅ SIMPLIFICADO: Usar los datos ya enriquecidos del reporte
  const reporterUser = useMemo(() => {
    if (!reportToAct) return null;
    // Los reportes ahora vienen con reporterUserData enriquecido
    return reportToAct.reporterUserData || null;
  }, [reportToAct]);

  const offenderUser = useMemo(() => {
    if (!reportToAct) return null;
    // Los reportes ahora vienen con offenderUserData enriquecido
    return reportToAct.offenderUserData || null;
  }, [reportToAct]);

  const openReportDetails = (r: EnrichedReport) => {
    setSelectedReport(r);
    setIsReportModalOpen(true);
    markAsOpened(r.id);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
  };

  const openActModal = (r: EnrichedReport) => {
    setReportToAct(r);
    setActModalOpen(true);
    markAsOpened(r.id);
  };

  const openUserDetails = (u: UserCard) => {
    setSelectedUser(u);
    setSelectedProfileRole(u.activeProfile?.role || u.profiles[0]?.role || "Conductor");
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleProfileChange = (role: string) => {
    setSelectedProfileRole(role);
  };

  const startConfirmFor = (user: UserCard | null, action: PendingAction) => {
    if (!user && action !== "archive") {
      setErrorState({ open: true, title: "Usuario no encontrado", message: "No se encontró la información del usuario seleccionado." });
      return;
    }
    setSelectedUser(user);
    setPendingAction(action);
    if (action === "suspend_profile" || action === "activate_profile") setSelectedRolesToSuspend([]);
    setConfirmOpen(true);
  };

  const toggleRoleToSuspend = (role: string) => {
    setSelectedRolesToSuspend(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const closeError = () => setErrorState({ open: false, title: "", message: "" });
  const retryFromError = () => {
    setErrorState({ open: false, title: "", message: "" });
    setConfirmOpen(true);
  };

  const performAction = async () => {
    if (!pendingAction) return;
    
    setActionLoading(true);

    if (pendingAction === "archive") {
      await new Promise(r => setTimeout(r, 700));
      setActionLoading(false);
      setConfirmOpen(false);
      setPendingAction(null);
      setActModalOpen(false);
      setIsReportModalOpen(false);
      return;
    }

    if (!selectedUser) {
      setErrorState({ open: true, title: "Error", message: "No hay usuario seleccionado." });
      setActionLoading(false);
      return;
    }

    const result = await performUserAction(
      selectedUser.id,
      pendingAction,
      selectedRolesToSuspend
    );

    setActionLoading(false);
    
    if (result.success) {
      setConfirmOpen(false);
      setPendingAction(null);
      setSelectedRolesToSuspend([]);
      setSelectedUser(null);
      closeUserModal();
      if (actModalOpen) setActModalOpen(false);
    } else {
      setErrorState({ 
        open: true, 
        title: "Error", 
        message: result.message 
      });
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmOpen) setConfirmOpen(false);
        else if (actModalOpen) setActModalOpen(false);
        else if (isReportModalOpen) setIsReportModalOpen(false);
        else if (isUserModalOpen) setIsUserModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, actModalOpen, isReportModalOpen, isUserModalOpen]);

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Panel de administrador</h1>
          <div className="text-sm text-slate-500">Supervisa usuarios, reportes y métricas del sistema</div>
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

      <main className="p-6 w-full">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <article className="rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-slate-700">Viajes completados</div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{metrics.displayCompletedTrips}</div>
            <div className="text-xs text-slate-500">Actualización automática del sistema</div>
          </article>

          <article className="rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-slate-700">Reportes activos</div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-yellow-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{statistics.total}</div>
            <div className="text-xs text-slate-500">
              {statistics.active} pendientes • {statistics.critical} críticos
            </div>
          </article>

          <article className="rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-slate-700">CO₂ reducido</div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{metrics.co2Saved} kg</div>
            <div className="text-xs text-slate-500">Impacto ambiental por viajes compartidos</div>
          </article>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800">Reportes de Seguridad</h2>
            <EmergencyButton 
              onEmergencyCall={() => console.log('Emergency call initiated')}
            />
          </div>

          <ReportsList
            onViewReport={openReportDetails}
            onActOnReport={openActModal}
            itemsPerPage={itemsPerPage}
            onReportOpened={markAsOpened}
          />
        </section>

        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-blue-700">Conductores por validar ({pendingDrivers.length})</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <section>
          {pendingDrivers.length === 0 ? (
            <div className="text-center py-10 text-slate-500 bg-gray-50 rounded-xl border border-gray-200">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">No hay conductores pendientes de validación</p>
              <p className="text-sm mt-1">Todos los conductores han sido procesados</p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={userPrev} 
                disabled={!canUserGoPrev} 
                className={`flex-shrink-0 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer ${!canUserGoPrev ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                  <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex-1 grid gap-4 transition-all duration-500" style={{ gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)` }}>
                {visibleUsers.map(u => (
                  <div key={u.id} className="relative rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all h-[170px] flex flex-col" style={{ backgroundColor: '#CAE8FF' }}>
                    <button
                      onClick={() => openUserDetails(u)}
                      className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm z-10 cursor-pointer"
                    >
                      Ver
                    </button>

                    <div className="flex items-start gap-3 mb-auto">
                      <img src={u.profilePictureUrl || avatar1} alt={u.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-50 shadow-sm flex-shrink-0" />
                      <div className="flex-1 min-w-0 pr-12">
                        <h4 className="font-bold text-gray-900 truncate text-sm">{u.name}</h4>
                        <div className="text-xs text-slate-500 font-medium mt-1">{u.activeProfile?.role}</div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">{u.email}</div>
                        <div className="text-xs text-slate-400 truncate">{u.activeProfile?.vehicle || u.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => { setSelectedUser(u); startConfirmFor(u, "approve"); }} 
                        className="flex-1 py-1.5 text-xs font-semibold rounded-lg border-2 border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors shadow-sm cursor-pointer"
                      >
                        Aprobar
                      </button>
                      <button 
                        onClick={() => { setSelectedUser(u); startConfirmFor(u, "reject"); }} 
                        className="flex-1 py-1.5 text-xs font-semibold rounded-lg border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors shadow-sm cursor-pointer"
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={userNext} 
                disabled={!canUserGoNext} 
                className={`flex-shrink-0 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer ${!canUserGoNext ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </section>
      </main>

      {successMessage && (
        <div className="fixed top-6 right-6 z-[80]">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl px-6 py-4 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-green-900 font-semibold">{successMessage}</p>
          </div>
        </div>
      )}

      <ReportDetailsModal
        open={isReportModalOpen}
        report={selectedReport}
        onClose={closeReportModal}
        onArchive={() => {
          setSelectedReport(selectedReport);
          setPendingAction("archive");
          setConfirmOpen(true);
        }}
      />

      <ActOnReportModal
        open={actModalOpen}
        report={reportToAct}
        reporterUser={reporterUser}
        offenderUser={offenderUser}
        onClose={() => setActModalOpen(false)}
        onSuspendAccount={(user) => startConfirmFor(user, "suspend_account")}
        onSuspendProfile={(user) => startConfirmFor(user, "suspend_profile")}
        onActivateAccount={(user) => startConfirmFor(user, "activate_account")}
      />

      <UserDetailsModal
        open={isUserModalOpen}
        user={selectedUser}
        selectedProfileRole={selectedProfileRole}
        onProfileChange={handleProfileChange}
        onClose={closeUserModal}
        onSuspendAccount={() => startConfirmFor(selectedUser, "suspend_account")}
        onSuspendProfile={() => startConfirmFor(selectedUser, "suspend_profile")}
        onActivateAccount={() => startConfirmFor(selectedUser, "activate_account")}
        onActivateProfile={() => startConfirmFor(selectedUser, "activate_profile")}
      />

      <ConfirmModal
        open={confirmOpen}
        title={
          pendingAction === "suspend_account" ? "Confirmar suspensión de cuenta"
            : pendingAction === "suspend_profile" ? "Suspender perfil(es)"
            : pendingAction === "activate_account" ? "Activar cuenta"
            : pendingAction === "activate_profile" ? "Activar perfil(es)"
            : pendingAction === "approve" ? "Aprobar conductor"
            : pendingAction === "reject" ? "Rechazar conductor"
            : pendingAction === "archive" ? "Archivar reporte"
            : "Confirmar acción"
        }
        description={
          pendingAction === "approve" ? `¿Estás seguro de que deseas aprobar a ${selectedUser?.name} como conductor? Esta acción cambiará su estado a Verificado y podrá comenzar a ofrecer viajes.` :
          pendingAction === "reject" ? `¿Estás seguro de que deseas rechazar a ${selectedUser?.name}? ${selectedUser?.profiles.length === 1 ? 'Su cuenta será eliminada completamente.' : 'Se removerá su perfil de conductor pero mantendrá sus otros perfiles.'}` :
          pendingAction === "suspend_profile" ? `Selecciona los perfiles que deseas suspender para ${selectedUser?.name}.` :
          pendingAction === "activate_profile" ? `Selecciona los perfiles que deseas activar para ${selectedUser?.name}.` :
          pendingAction === "archive" ? `Vas a archivar el reporte.` :
          `Confirma esta acción.`
        }
        pendingAction={pendingAction}
        selectedRoles={selectedRolesToSuspend}
        availableProfiles={selectedUser?.profiles || []}
        onRoleToggle={toggleRoleToSuspend}
        loading={actionLoading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={performAction}
      />

      <ErrorModal
        open={errorState.open}
        title={errorState.title}
        message={errorState.message}
        onRetry={retryFromError}
        onClose={closeError}
      />
    </div>
  );
}