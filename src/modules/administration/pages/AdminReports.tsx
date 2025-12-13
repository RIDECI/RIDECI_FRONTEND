// src/modules/administration/pages/AdminReports.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";
import type { Report, UserCard, PendingAction, StatusFilter, SeverityFilter } from '../types';
import { mockReports } from '../utils/mockData';
import { findUserByName } from '../utils/helpers';
import { StatusCardsSection } from '../components/StatusCardsSection';
import { ReportsFilterSection } from '../components/ReportsFilterSection';
import { ReportsCarousel } from '../components/ReportsCarousel';
import { ReportDetailsModal } from '../components/ReportDetailsModal';
import { ActOnReportModal } from '../components/ActOnReportModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { ErrorModal } from '../components/ErrorModal';
import { useAdminUsers } from '../hooks/useAdminUsers';
import pdfIcon from "../assets/pdf.png";
import excelIcon from "../assets/excel.png";

const AdminReports: React.FC = () => {
  // Hook centralizado - comparte estado con AdminHome y AdminUsers
  const { users, successMessage, performUserAction } = useAdminUsers();
  
  // State management
  const [reports, setReports] = useState<Report[]>(() => mockReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("Todas");
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  // Viewport calculation
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setItemsPerPage(w >= 1200 ? 3 : w >= 900 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const q = search.trim().toLowerCase();
      if (q && !(
        r.id.toLowerCase().includes(q) || 
        r.title.toLowerCase().includes(q) || 
        r.reporter.toLowerCase().includes(q) || 
        r.conductor.toLowerCase().includes(q)
      )) {
        return false;
      }
      if (statusFilter !== "Todos" && r.status !== statusFilter) return false;
      if (severityFilter !== "Todas" && r.severity !== severityFilter) return false;
      return true;
    });
  }, [reports, search, statusFilter, severityFilter]);

  // Carousel chunking
  const chunks: Report[][] = [];
  for (let i = 0; i < filteredReports.length; i += itemsPerPage) {
    chunks.push(filteredReports.slice(i, i + itemsPerPage));
  }
  
  const [reportPage, setReportPage] = useState(0);
  useEffect(() => setReportPage(0), [filteredReports.length, itemsPerPage]);
  
  const reportPrev = useCallback(() => setReportPage((p) => Math.max(0, p - 1)), []);
  const reportNext = useCallback(() => setReportPage((p) => Math.min(chunks.length - 1, p + 1)), [chunks.length]);

  // Selection
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  useEffect(() => setSelectedIds({}), [filteredReports.length]);
  
  const toggleSelect = (id: string) => setSelectedIds((s) => ({ ...s, [id]: !s[id] }));
  const selectedList = useMemo(() => filteredReports.filter((r) => selectedIds[r.id]), [filteredReports, selectedIds]);
  
  const selectVisible = () => {
    const visible = filteredReports.slice(reportPage * itemsPerPage, reportPage * itemsPerPage + itemsPerPage);
    setSelectedIds((s) => { 
      const next = { ...s }; 
      visible.forEach((r) => (next[r.id] = true)); 
      return next; 
    });
  };
  
  const selectAllFiltered = () => { 
    setSelectedIds((s) => { 
      const next = { ...s }; 
      filteredReports.forEach((r) => (next[r.id] = true)); 
      return next; 
    }); 
  };
  
  const clearSelection = () => setSelectedIds({});

  // Export simulation
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);
  
  const handleExportPDF = async () => { 
    setExportingPDF(true); 
    setTimeout(() => setExportingPDF(false), 1400); 
  };
  
  const handleExportExcel = async () => { 
    setExportingExcel(true); 
    setTimeout(() => setExportingExcel(false), 1400); 
  };

  // Counts
  const statusCounts = {
    ABIERTO: filteredReports.filter((r) => r.status === "ABIERTO").length,
    "EN INVESTIGACIÓN": filteredReports.filter((r) => r.status === "EN INVESTIGACIÓN").length,
    RESUELTO: filteredReports.filter((r) => r.status === "RESUELTO").length,
    CRÍTICO: filteredReports.filter((r) => r.status === "CRÍTICO").length,
  };

  // Modals
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [actModalOpen, setActModalOpen] = useState(false);
  const [reportToAct, setReportToAct] = useState<Report | null>(null);
  
  const openReport = (r: Report) => { 
    setSelectedReport(r); 
    setIsReportModalOpen(true); 
  };
  
  const closeReportModal = () => { 
    setIsReportModalOpen(false); 
    setSelectedReport(null); 
  };
  
  const openActModal = (r: Report) => { 
    setReportToAct(r); 
    setActModalOpen(true); 
  };

  // User actions
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRolesToSuspend, setSelectedRolesToSuspend] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ open: boolean; title?: string; message?: string }>({ open: false });

  // Find users for act modal
  const reporterUser = useMemo(() => findUserByName(users, reportToAct?.reporter), [reportToAct, users]);
  const offenderUser = useMemo(() => findUserByName(users, reportToAct?.conductor), [reportToAct, users]);

  // Confirm actions
  const startConfirmFor = (user: UserCard | null, action: PendingAction) => {
    if (!user && action !== "archive") {
      setErrorState({ open: true, title: "Usuario no encontrado", message: "No se encontró la información del usuario seleccionado." });
      return;
    }
    setSelectedUser(user);
    setPendingAction(action);
    if (action === "suspend_profile") setSelectedRolesToSuspend([]);
    setConfirmOpen(true);
  };

  const toggleRoleToSuspend = (role: string) => 
    setSelectedRolesToSuspend(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );

  const closeError = () => setErrorState({ open: false });
  const retryFromError = () => { setErrorState({ open: false }); setConfirmOpen(true); };

  // Perform action
  const performAction = async () => {
    if (!pendingAction) return;
    setActionLoading(true);

    // Archive report
    if (pendingAction === "archive" && (reportToAct || selectedReport)) {
      await new Promise(r => setTimeout(r, 700));
      const reportId = reportToAct?.id || selectedReport?.id;
      if (reportId) {
        setReports(prev => prev.filter(r => r.id !== reportId));
      }
      setActionLoading(false);
      setConfirmOpen(false);
      setPendingAction(null);
      setActModalOpen(false);
      setIsReportModalOpen(false);
      return;
    }

    // Para acciones de usuarios, usar el hook centralizado
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

  // Keyboard handlers
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
          <div className="text-sm text-slate-500">Lista y gestión de incidentes reportados — revisa y actúa.</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
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

        <ReportsCarousel
          chunks={chunks}
          currentPage={reportPage}
          itemsPerPage={itemsPerPage}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onPrevious={reportPrev}
          onNext={reportNext}
          onViewReport={openReport}
          onActOnReport={openActModal}
        />

        {/* Bottom section (exports + emergency) */}
        <section className="mt-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Reportes de Seguridad</h2>

          <div className="mb-4 flex items-center gap-3">
            <button onClick={selectVisible} className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors">
              Seleccionar vista
            </button>
            <button onClick={selectAllFiltered} className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors">
              Seleccionar todo
            </button>
            <button onClick={clearSelection} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
              Limpiar
            </button>
            <div className="ml-auto text-sm text-slate-600">
              Seleccionados: <span className="font-semibold text-slate-800">{selectedList.length}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <button 
                onClick={handleExportPDF} 
                disabled={selectedList.length === 0 || exportingPDF} 
                className={`flex items-center gap-3 transition-all duration-300 rounded-xl border border-gray-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${exportingPDF ? "min-w-[220px] px-6 py-3" : "px-4 py-3"}`}
              >
                {exportingPDF && <div className="absolute inset-0 bg-yellow-50 animate-pulse opacity-60 rounded-xl" />}
                <div className="relative flex items-center gap-3 z-10">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <img src={pdfIcon} alt="PDF" className={`w-full h-full object-contain ${exportingPDF ? "animate-bounce" : ""}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="relative font-medium text-slate-700 z-10">{exportingPDF ? "Exportando..." : `PDF (${selectedList.length})`}</span>
                    {exportingPDF && <span className="text-xs text-slate-500 z-10">Preparando archivo PDF</span>}
                  </div>
                </div>
              </button>

              <button 
                onClick={handleExportExcel} 
                disabled={selectedList.length === 0 || exportingExcel} 
                className={`flex items-center gap-3 transition-all duration-300 rounded-xl border border-gray-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${exportingExcel ? "min-w-[220px] px-6 py-3" : "px-4 py-3"}`}
              >
                {exportingExcel && <div className="absolute inset-0 bg-green-50 animate-pulse opacity-60 rounded-xl" />}
                <div className="relative flex items-center gap-3 z-10">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <img src={excelIcon} alt="Excel" className={`w-full h-full object-contain ${exportingExcel ? "animate-bounce" : ""}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="relative font-medium text-slate-700 z-10">{exportingExcel ? "Exportando..." : `Excel (${selectedList.length})`}</span>
                    {exportingExcel && <span className="text-xs text-slate-500 z-10">Preparando archivo Excel</span>}
                  </div>
                </div>
              </button>
            </div>

            <button className="flex items-center gap-4 px-8 py-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors shadow-sm hover:shadow-md">
              <div className="w-14 h-14 bg-red-200 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold text-red-600">Emergencia</span>
            </button>
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
          pendingAction === "approve" ? "Aprobar conductor" :
          pendingAction === "reject" ? "Rechazar conductor" :
          pendingAction === "archive" ? "Archivar reporte" :
          "Confirmar acción"
        }
        description={
          pendingAction === "approve" ? `¿Estás seguro de que deseas aprobar a ${selectedUser?.name} como conductor?` :
          pendingAction === "reject" ? `¿Estás seguro de que deseas rechazar a ${selectedUser?.name}? ${selectedUser?.profiles.length === 1 ? 'Su cuenta será eliminada.' : 'Se removerá su perfil de conductor.'}` :
          pendingAction === "suspend_profile" ? `Selecciona los perfiles que deseas suspender para ${selectedUser?.name}.` :
          pendingAction === "archive" ? `Vas a archivar el reporte ${reportToAct?.id || selectedReport?.id}.` :
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
        <div className="fixed top-6 right-6 z-80">
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