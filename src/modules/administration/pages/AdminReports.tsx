// src/modules/administration/pages/AdminReports.tsx
/**
 * Página de reportes con exportación
 * CORREGIDO: Sin props innecesarias en ReportCard
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";
import type { UserCard, PendingAction, StatusFilter, SeverityFilter } from '../types';
import { StatusCardsSection } from '../components/StatusCardsSection';
import { ReportsFilterSection } from '../components/ReportsFilterSection';
import { ReportCard } from '../components/ReportCard';
import { ReportDetailsModal } from '../components/ReportDetailsModal';
import { ActOnReportModal } from '../components/ActOnReportModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ErrorModal } from '../components/ErrorModal';
import { EmergencyButton } from '../components/EmergencyButton';
import { ExportButton } from '../components/ExportButton';
import { useReports } from '../hooks/useReports';
import { useAdminUsers } from '../hooks/useAdminUsers';
import type { EnrichedReport } from '../services/reportEnrichmentService';

const AdminReports: React.FC = () => {
  const { reports, loading, error, statistics, exportReports, markAsOpened } = useReports();
  const { users, successMessage, performUserAction, activeUsersCount } = useAdminUsers();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("Todas");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const q = search.trim().toLowerCase();
      if (q && !(
        r.id.toLowerCase().includes(q) || 
        r.title.toLowerCase().includes(q) || 
        r.type.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.reporterName?.toLowerCase().includes(q) ||
        r.offenderName?.toLowerCase().includes(q)
      )) {
        return false;
      }
      
      const statusMap: Record<StatusFilter, string[]> = {
        "Todos": [],
        "ABIERTO": ["OPEN", "PENDING"],
        "EN INVESTIGACIÓN": ["PENDING"],
        "RESUELTO": ["APPROVED", "CLOSED"],
        "CRÍTICO": ["OPEN"],
      };
      
      if (statusFilter !== "Todos") {
        const allowedStatuses = statusMap[statusFilter];
        if (!allowedStatuses.includes(r.status)) return false;
      }
      
      const severityMap: Record<SeverityFilter, string[]> = {
        "Todas": [],
        "CRÍTICA": ["HIGH"],
        "ALTA": ["HIGH"],
        "MEDIA": ["MEDIUM"],
        "BAJA": ["LOW"],
      };
      
      if (severityFilter !== "Todas") {
        const allowedSeverities = severityMap[severityFilter];
        if (!r.severity || !allowedSeverities.includes(r.severity)) return false;
      }
      
      return true;
    });
  }, [reports, search, statusFilter, severityFilter]);

  useEffect(() => {
    setSelectedIds({});
    setCurrentPage(0);
  }, [filteredReports.length]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const statusCounts = useMemo(() => {
    return {
      ABIERTO: reports.filter((r) => r.status === "OPEN" || r.status === "PENDING").length,
      "EN INVESTIGACIÓN": reports.filter((r) => r.status === "PENDING").length,
      RESUELTO: reports.filter((r) => r.status === "APPROVED" || r.status === "CLOSED").length,
      CRÍTICO: reports.filter((r) => r.severity === "HIGH").length,
    };
  }, [reports]);

  const selectedList = useMemo(() => 
    filteredReports.filter((r) => selectedIds[r.id]), 
    [filteredReports, selectedIds]
  );
  
  const selectAllFiltered = () => { 
    setSelectedIds((s) => { 
      const next = { ...s }; 
      filteredReports.forEach((r) => (next[r.id] = true)); 
      return next; 
    }); 
  };
  
  const clearSelection = () => setSelectedIds({});

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [selectedReport, setSelectedReport] = useState<EnrichedReport | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [actModalOpen, setActModalOpen] = useState(false);
  const [reportToAct, setReportToAct] = useState<EnrichedReport | null>(null);
  
  const openReport = (r: EnrichedReport) => { 
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

  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRolesToSuspend, setSelectedRolesToSuspend] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ open: boolean; title?: string; message?: string }>({ open: false });

  const reporterUser = useMemo(() => {
    if (!reportToAct) return null;
    return users.find(u => u.id === String(reportToAct.createdBy)) || null;
  }, [reportToAct, users]);
  
  const offenderUser = useMemo(() => {
    if (!reportToAct?.relatedId) return null;
    return users.find(u => u.id === reportToAct.relatedId) || null;
  }, [reportToAct, users]);

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

  const toggleRoleToSuspend = (role: string) => 
    setSelectedRolesToSuspend(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );

  const closeError = () => setErrorState({ open: false });
  const retryFromError = () => { setErrorState({ open: false }); setConfirmOpen(true); };

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
      if (actModalOpen) setActModalOpen(false);
    } else {
      setErrorState({ 
        open: true, 
        title: "Error", 
        message: result.message 
      });
    }
  };

  const handleExport = async (format: 'pdf' | 'csv' | 'xlsx') => {
    const selectedReportIds = Object.keys(selectedIds).filter(id => selectedIds[id]);
    await exportReports(format, selectedReportIds);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmOpen) setConfirmOpen(false);
        else if (actModalOpen) setActModalOpen(false);
        else if (isReportModalOpen) setIsReportModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, actModalOpen, isReportModalOpen]);

  return (
    <div className="min-h-screen bg-white relative">
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Reportes de Seguridad</h1>
          <div className="text-sm text-slate-500">Gestión integral de incidentes y reportes del sistema</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-2xl font-bold text-blue-600">{activeUsersCount}</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold shadow-md">A</div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <StatusCardsSection statusCounts={statusCounts} />

        <ReportsFilterSection
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          severityFilter={severityFilter}
          onSeverityFilterChange={setSeverityFilter}
          resultsCount={filteredReports.length}
        />

        <section className="mb-6">
          {loading && reports.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600 font-medium">Cargando reportes...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-red-900 font-semibold mb-2">Error al cargar reportes</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : paginatedReports.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedReports.map(report => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    selected={!!selectedIds[report.id]}
                    onToggleSelect={() => toggleSelect(report.id)}
                    onView={() => openReport(report)}
                    onActOn={() => openActModal(report)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Anterior
                  </button>
                  <span className="px-4 py-2 text-sm text-slate-600">
                    Página {currentPage + 1} de {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-slate-900 font-semibold mb-1">No hay reportes</p>
                  <p className="text-slate-600 text-sm">No se encontraron reportes con los filtros aplicados</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mt-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Acciones con reportes</h2>

          <div className="mb-4 flex items-center gap-3">
            <button onClick={selectAllFiltered} className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer">
              Seleccionar todos ({filteredReports.length})
            </button>
            <button onClick={clearSelection} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
              Limpiar
            </button>
            <div className="ml-auto text-sm text-slate-600">
              Seleccionados: <span className="font-semibold text-slate-800">{selectedList.length}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <ExportButton
                format="pdf"
                onExport={() => handleExport('pdf')}
                selectedCount={selectedList.length}
                disabled={selectedList.length === 0}
              />
              
              <ExportButton
                format="xlsx"
                onExport={() => handleExport('xlsx')}
                selectedCount={selectedList.length}
                disabled={selectedList.length === 0}
              />
              
              <ExportButton
                format="csv"
                onExport={() => handleExport('csv')}
                selectedCount={selectedList.length}
                disabled={selectedList.length === 0}
              />
            </div>

            <EmergencyButton 
              onEmergencyCall={() => console.log('Emergency call initiated')}
            />
          </div>
        </section>
      </main>

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

      <ConfirmModal
        open={confirmOpen}
        title={
          pendingAction === "suspend_account" ? "Confirmar suspensión de cuenta" :
          pendingAction === "suspend_profile" ? "Suspender perfil(es)" :
          pendingAction === "activate_account" ? "Activar cuenta" :
          pendingAction === "activate_profile" ? "Activar perfil(es)" :
          pendingAction === "approve" ? "Aprobar conductor" :
          pendingAction === "reject" ? "Rechazar conductor" :
          pendingAction === "archive" ? "Archivar reporte" :
          "Confirmar acción"
        }
        description={
          pendingAction === "approve" ? `¿Estás seguro de que deseas aprobar a ${selectedUser?.name} como conductor?` :
          pendingAction === "reject" ? `¿Estás seguro de que deseas rechazar a ${selectedUser?.name}?` :
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
    </div>
  );
};

export default AdminReports;