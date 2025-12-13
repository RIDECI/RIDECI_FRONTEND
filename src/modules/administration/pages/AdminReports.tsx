import React, { useCallback, useEffect, useState } from "react";
import pdfIcon from "../assets/pdf.png";
import excelIcon from "../assets/excel.png";
import logo from "../assets/RIDECI.png";

type Report = {
  id: string;
  title: string;
  reporter: string;
  conductor: string;
  severity: "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";
  status: "ABIERTO" | "EN INVESTIGACIÓN" | "RESUELTO" | "CRÍTICO";
  date: string;
  time: string;
  route: string;
  amount?: string;
  details?: string;
};

type StatusFilter = "Todos" | "ABIERTO" | "EN INVESTIGACIÓN" | "RESUELTO" | "CRÍTICO";
type SeverityFilter = "Todas" | "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";
type ErrorKind = "file" | "report" | "user";
type PendingAction = null | "suspend_account" | "suspend_profile" | "archive";

const mockReports: Report[] = [
  {
    id: "REP001",
    title: "Comportamiento Agresivo",
    reporter: "Juan García",
    conductor: "Carlos Mendoza",
    severity: "CRÍTICA",
    status: "ABIERTO",
    date: "14/11/2024",
    time: "18:45",
    route: "Centro — Chapinero",
    details: "El conductor insultó y manejó de forma agresiva durante el trayecto.",
  },
  {
    id: "REP002",
    title: "Ruta Sospechosa",
    reporter: "María López",
    conductor: "Laura Martínez",
    severity: "ALTA",
    status: "EN INVESTIGACIÓN",
    date: "13/11/2024",
    time: "22:15",
    route: "Usaquén — Zona Franca",
    details: "El conductor tomó una ruta diferente sin previo aviso.",
  },
  {
    id: "REP003",
    title: "Pago Incorrecto",
    reporter: "Pedro Rodríguez",
    conductor: "Juan Sánchez",
    severity: "MEDIA",
    status: "RESUELTO",
    date: "12/11/2024",
    time: "14:30",
    route: "Chapín — Centro",
    amount: "$5,200",
    details: "Discrepancia en el monto cobrado versus el acordado.",
  },
  {
    id: "REP004",
    title: "Vehículo Sucio",
    reporter: "Ana García",
    conductor: "Carlos Ruiz",
    severity: "BAJA",
    status: "RESUELTO",
    date: "11/11/2024",
    time: "09:20",
    route: "Centro — Teusaquillo",
    details: "El vehículo presentaba condiciones de limpieza inadecuadas.",
  },
];

// Error Modal
const ErrorModal: React.FC<{
  open: boolean;
  kind?: ErrorKind;
  title?: string;
  message?: string;
  onRetry: () => void;
  onClose: () => void;
}> = ({ open, kind, title, message, onRetry, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border-2 border-red-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border border-red-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{title ?? "Error"}</h3>
          <p className="text-sm text-slate-600 text-center">{message ?? "Ha ocurrido un error."}</p>
          <div className="mt-3 w-full flex justify-center gap-3">
            <button onClick={onRetry} className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50">
              Reintentar
            </button>
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirm Modal
const ConfirmModal: React.FC<{
  open: boolean;
  title?: string;
  description?: string;
  pendingAction: PendingAction;
  selectedRole: string;
  onRoleChange: (r: string) => void;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ open, title, description, pendingAction, selectedRole, onRoleChange, loading, onCancel, onConfirm }) => {
  if (!open) return null;

  // Considerar destructivas sólo suspend_account (y otras que lo sean).
  const isDestructive = pendingAction === "suspend_account";

  // Archive is treated as "guardar" -> use indigo button (no rojo).
  const isArchive = pendingAction === "archive";

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        {pendingAction === "suspend_profile" && (
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-slate-700">Tipo de perfil</legend>
            <div className="mt-2 flex gap-2">
              {["Acompañante", "Conductor", "Pasajero"].map((r) => (
                <label
                  key={r}
                  className={`flex-1 border rounded-lg p-2 cursor-pointer text-center ${selectedRole === r ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                >
                  <input type="radio" name="profile" value={r} className="sr-only" checked={selectedRole === r} onChange={() => onRoleChange(r)} />
                  <div className="text-sm font-medium">{r}</div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium ${
              isDestructive
                ? "bg-red-600 text-white hover:bg-red-700"
                : isArchive
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : pendingAction === "suspend_profile"
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Action chooser
const ActionChooser: React.FC<{
  open: boolean;
  report?: Report | null;
  onClose: () => void;
  onChoose: (action: Exclude<PendingAction, "archive">) => void;
}> = ({ open, report, onClose, onChoose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-65 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-4">
        <h4 className="text-lg font-semibold mb-2">Acciones para {report?.id}</h4>
        <p className="text-sm text-slate-600 mb-4">Selecciona la acción que quieres realizar.</p>
        <div className="flex gap-3">
          <button onClick={() => onChoose("suspend_account")} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Suspender cuenta
          </button>
          <button onClick={() => onChoose("suspend_profile")} className="flex-1 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
            Suspender perfil
          </button>
        </div>

        <div className="mt-3 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded-lg text-slate-600 hover:bg-slate-50">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

// Final confirmation
const FinalConfirm: React.FC<{
  open: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ open, title, message, loading, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            {loading ? "Procesando..." : "Confirmar suspensión"}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminReports: React.FC = () => {
  const [reports] = useState<Report[]>(() => mockReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("Todas");

  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  // Responsive items logic
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

  // Filter logic
  const filteredReports = reports.filter((r) => {
    const q = search.trim().toLowerCase();
    if (q && !(r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.reporter.toLowerCase().includes(q) || r.conductor.toLowerCase().includes(q))) {
      return false;
    }
    if (statusFilter !== "Todos" && r.status !== statusFilter) return false;
    if (severityFilter !== "Todas" && r.severity !== severityFilter) return false;
    return true;
  });

  // --- LÓGICA DEL CARRUSEL MODIFICADA ---
  const chunks: Report[][] = [];
  for (let i = 0; i < filteredReports.length; i += itemsPerPage) {
    chunks.push(filteredReports.slice(i, i + itemsPerPage));
  }

  const [reportPage, setReportPage] = useState(0);

  useEffect(() => setReportPage(0), [filteredReports.length, itemsPerPage]);

  const reportPrev = useCallback(() => setReportPage((p) => Math.max(0, p - 1)), []);
  const reportNext = useCallback(() => setReportPage((p) => Math.min(chunks.length - 1, p + 1)), [chunks.length]);

  // Modal states
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRole, setSelectedRole] = useState<string>("Conductor");
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ open: boolean; kind?: ErrorKind; title?: string; message?: string }>({
    open: false,
  });

  const [actionChooserOpen, setActionChooserOpen] = useState(false);
  const [finalConfirmOpen, setFinalConfirmOpen] = useState(false);

  const statusCounts = {
    ABIERTO: reports.filter((r) => r.status === "ABIERTO").length,
    "EN INVESTIGACIÓN": reports.filter((r) => r.status === "EN INVESTIGACIÓN").length,
    RESUELTO: reports.filter((r) => r.status === "RESUELTO").length,
    CRÍTICO: reports.filter((r) => r.status === "CRÍTICO").length,
  };

  const openReport = (r: Report) => {
    setSelectedReport(r);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
    setPendingAction(null);
    setConfirmOpen(false);
  };

  const onActuarClick = (r: Report) => {
    setSelectedReport(r);
    setActionChooserOpen(true);
  };

  const onChooseAction = (action: Exclude<PendingAction, "archive">) => {
    setActionChooserOpen(false);
    setPendingAction(action);
    setConfirmOpen(true);
  };

  const performAction = async () => {
    if (!selectedReport || !pendingAction) return;
    setActionLoading(true);
    await new Promise((res) => setTimeout(res, 700));
    console.log(`Acción ${pendingAction} ejecutada.`);
    setActionLoading(false);
    setFinalConfirmOpen(false);
    setConfirmOpen(false);
    setPendingAction(null);
    setSelectedRole("Conductor");
    closeReportModal();
  };

  const closeError = () => setErrorState({ open: false });

  const handleExportPDF = async () => {
    setExportingPDF(true);
    await new Promise((res) => setTimeout(res, 1500));
    setExportingPDF(false);
  };

  const handleExportExcel = async () => {
    setExportingExcel(true);
    await new Promise((res) => setTimeout(res, 1500));
    setExportingExcel(false);
  };

  const handleConfirmFromModal = () => {
    if (pendingAction === "suspend_profile") {
      setConfirmOpen(false);
      setFinalConfirmOpen(true);
    } else {
      performAction();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (errorState.open) closeError();
        else if (finalConfirmOpen) setFinalConfirmOpen(false);
        else if (confirmOpen) setConfirmOpen(false);
        else if (isReportModalOpen) closeReportModal();
        else if (actionChooserOpen) setActionChooserOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, errorState.open, isReportModalOpen, actionChooserOpen, finalConfirmOpen]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRÍTICA": return "bg-red-100 text-red-700";
      case "ALTA": return "bg-orange-100 text-orange-700";
      case "MEDIA": return "bg-purple-100 text-purple-700";
      case "BAJA": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ABIERTO": return "bg-red-50 text-red-700 border border-red-200";
      case "EN INVESTIGACIÓN": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "RESUELTO": return "bg-green-50 text-green-700 border border-green-200";
      case "CRÍTICO": return "bg-purple-50 text-purple-700 border border-purple-200";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
         <img src={logo} alt="RIDECI" className="h-10 object-contain" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Reportes de Seguridad</h1>
            <div className="text-sm text-slate-500">Supervisa incidentes y gestiona acciones</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-lg font-bold text-blue-600">2547</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Status Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Object.entries(statusCounts).map(([key, val]) => (
                <article key={key} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="text-3xl font-bold text-slate-800 mb-1">{val}</div>
                    <div className="text-sm text-slate-600 uppercase tracking-wide">{key}</div>
                    <div className="text-xs text-slate-400 mt-2">Última actualización</div>
                </article>
            ))}
        </section>

        {/* Search & Filters */}
        <section className="mb-6">
          <div className="flex gap-3 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar reporte..."
              className="flex-1 rounded-lg p-3 border border-gray-200 bg-white shadow-sm"
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} className="rounded-lg p-3 border border-gray-200 bg-white">
              <option>Todos</option>
              <option>ABIERTO</option>
              <option>EN INVESTIGACIÓN</option>
              <option>RESUELTO</option>
              <option>CRÍTICO</option>
            </select>
            <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)} className="rounded-lg p-3 border border-gray-200 bg-white">
              <option>Todas</option>
              <option>CRÍTICA</option>
              <option>ALTA</option>
              <option>MEDIA</option>
              <option>BAJA</option>
            </select>
            <div className="text-sm text-slate-500">{filteredReports.length} resultados</div>
          </div>
        </section>

        {/* === Reports Carousel (CORREGIDO) === */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
          
          <div className="flex items-center gap-4">
            
            <button
              onClick={reportPrev}
              disabled={reportPage === 0}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${
                reportPage === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex-1 overflow-hidden">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${reportPage * 100}%)` }}>
                    {chunks.length > 0 ? (
                        chunks.map((chunk, i) => (
                            <div key={i} className="min-w-full flex gap-4 px-1">
                                {chunk.map((r) => (
                                    <div key={r.id} className="flex-1 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="text-sm font-bold text-blue-600">#{r.id}</div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(r.severity)}`}>{r.severity}</span>
                                        </div>

                                        <h3 className="font-bold text-slate-800 mb-3">{r.title}</h3>

                                        <div className="space-y-1 text-xs mb-3">
                                            <div className="text-slate-500">Reportado por: <span className="text-slate-700 font-medium">{r.reporter}</span></div>
                                            <div className="text-slate-500">Conductor: <span className="text-slate-700 font-medium">{r.conductor}</span></div>
                                            <div className="text-slate-500">Fecha: <span className="text-slate-700 font-medium">{r.date} - {r.time}</span></div>
                                            <div className="text-slate-500">Ruta: <span className="text-slate-700 font-medium">{r.route}</span></div>
                                            {r.amount && <div className="text-slate-500">Monto: <span className="text-slate-700 font-medium">{r.amount}</span></div>}
                                        </div>

                                        <div className="mb-3">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(r.status)}`}>{r.status}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button onClick={() => openReport(r)} className="flex-1 py-2 px-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
                                            Ver
                                            </button>
                                            <button onClick={() => onActuarClick(r)} className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                                            Actuar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {chunk.length < itemsPerPage && Array.from({ length: itemsPerPage - chunk.length }).map((_, idx) => (
                                    <div key={`empty-${idx}`} className="flex-1 opacity-0 pointer-events-none" />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="min-w-full text-center py-10 text-slate-500">No hay reportes.</div>
                    )}
                </div>
            </div>

            <button
              onClick={reportNext}
              disabled={reportPage >= chunks.length - 1}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${
                reportPage >= chunks.length - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </section>

        {/* Bottom Section */}
        <section className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Reportes de Seguridad</h2>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={handleExportPDF}
                disabled={exportingPDF}
                className={`flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all relative overflow-hidden ${exportingPDF ? "cursor-wait" : ""}`}
              >
                {exportingPDF && <div className="absolute inset-0 bg-red-50 animate-pulse" />}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img src={pdfIcon} alt="PDF" className={`w-full h-full object-contain ${exportingPDF ? "animate-bounce" : ""}`} />
                </div>
                <span className="relative font-medium text-slate-700">{exportingPDF ? "Exportando..." : "PDF"}</span>
              </button>

              <button
                onClick={handleExportExcel}
                disabled={exportingExcel}
                className={`flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all relative overflow-hidden ${exportingExcel ? "cursor-wait" : ""}`}
              >
                {exportingExcel && <div className="absolute inset-0 bg-green-50 animate-pulse" />}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img src={excelIcon} alt="Excel" className={`w-full h-full object-contain ${exportingExcel ? "animate-bounce" : ""}`} />
                </div>
                <span className="relative font-medium text-slate-700">{exportingExcel ? "Exportando..." : "Excel"}</span>
              </button>
            </div>

            <button className="flex items-center gap-4 px-8 py-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors">
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

      {/* Report Detail Modal */}
      {isReportModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeReportModal} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{selectedReport.title}</h2>
                <div className="text-sm text-slate-500 mt-1">#{selectedReport.id}</div>
              </div>
              <button onClick={closeReportModal} className="text-slate-500 hover:text-slate-700 text-xl">
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Reportado por</div>
                  <div className="font-semibold text-slate-800">{selectedReport.reporter}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Conductor</div>
                  <div className="font-semibold text-slate-800">{selectedReport.conductor}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Fecha</div>
                  <div className="font-semibold text-slate-800">{selectedReport.date}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Hora</div>
                  <div className="font-semibold text-slate-800">{selectedReport.time}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Ruta</div>
                  <div className="font-semibold text-slate-800">{selectedReport.route}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Severidad</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(selectedReport.severity)}`}>
                    {selectedReport.severity}
                  </span>
                </div>
              </div>

              {selectedReport.amount && (
                <div>
                  <div className="text-sm text-slate-500 mb-1">Monto</div>
                  <div className="font-semibold text-slate-800">{selectedReport.amount}</div>
                </div>
              )}

              <div>
                <div className="text-sm text-slate-500 mb-1">Detalles</div>
                <div className="text-sm text-slate-700">{selectedReport.details ?? "No hay información adicional."}</div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              {/* BOTÓN ARCHIVAR MEJORADO: icono de caja + color índigo (archivar = guardar/mover) */}
              <button
                onClick={() => {
                  setPendingAction("archive");
                  setConfirmOpen(true);
                }}
                aria-label="Archivar reporte"
                title="Archivar reporte"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-sm"
              >
                {/* Icono tipo "archivo/caja" */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7M10 3h4l1 4H9l1-4z" />
                </svg>
                <span>Archivar reporte</span>
              </button>

              <button onClick={closeReportModal} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inject Modals */}
      <ErrorModal
        open={errorState.open}
        kind={errorState.kind}
        title={errorState.title}
        message={errorState.message}
        onRetry={() => { setErrorState({ open: false }); setConfirmOpen(true); }}
        onClose={closeError}
      />

      <ActionChooser open={actionChooserOpen} report={selectedReport} onClose={() => setActionChooserOpen(false)} onChoose={onChooseAction} />

      <ConfirmModal
        open={confirmOpen}
        title={
          pendingAction === "suspend_account"
            ? "Suspender cuenta"
            : pendingAction === "suspend_profile"
            ? "Suspender perfil"
            : pendingAction === "archive"
            ? "Archivar reporte"
            : "Confirmar acción"
        }
        description={
          pendingAction === "archive"
            ? "Archivar este reporte lo moverá a la sección de archivos."
            : "Esta acción afectará el estado del usuario."
        }
        pendingAction={pendingAction}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        loading={actionLoading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmFromModal}
      />

      <FinalConfirm
        open={finalConfirmOpen}
        title="Confirmación adicional"
        message={`Vas a suspender el perfil de ${selectedRole}. ¿Estás seguro?`}
        loading={actionLoading}
        onCancel={() => setFinalConfirmOpen(false)}
        onConfirm={performAction}
      />
    </div>
  );
};

export default AdminReports;