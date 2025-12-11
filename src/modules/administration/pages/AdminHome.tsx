import React, { useCallback, useEffect, useRef, useState } from "react";
import { Star, CheckCircle } from "lucide-react";

// Avatars con imágenes reales de Unsplash
const avatar1 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop";
const avatar2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop";
const avatar3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop";
const avatar4 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop";
const avatar5 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
const avatar6 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop";
const avatar7 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop";
const avatar8 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop";
const avatar9 = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop";
const avatar10 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop";
const avatar11 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop";
const avatar12 = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop";

type IdentificationType = "CC" | "TI" | "CE" | "PP";

type Profile = {
  role: "Acompañante" | "Conductor" | "Pasajero";
  rating: number;
  plate?: string | null;
  vehicle?: string | null;
};

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
  email?: string;
  profilePictureUrl?: string | null;
  phone?: string;
  identificationNumber?: string;
  identificationType?: IdentificationType;
  birthDate?: string;
  status?: "Pendiente" | "Verificado" | "Suspendido" | "Bloqueado" | string;
  profiles: Profile[];
  activeProfile?: Profile;
};

type ErrorKind = "file" | "report" | "user" | "approve" | "reject";
type PendingAction = null | "suspend_account" | "suspend_profile" | "archive" | "approve" | "reject" | "activate_account";

const mockMetrics = { usersActive: 12, tripsCompleted: 8342, openReports: 12, co2: 3247 };

const mockUsers = (): UserCard[] => {
  const users: UserCard[] = [
    {
      id: "U001",
      name: "David Palacios",
      email: "david.palacios-p@mail.escuelaing.edu.co",
      profilePictureUrl: avatar1,
      phone: "+57 320 7654321",
      identificationNumber: "1000100282",
      identificationType: "CC",
      birthDate: "1998-05-15",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "ABC-123", vehicle: "Toyota Prius 2022" },
        { role: "Pasajero", rating: 4.8, plate: null, vehicle: null },
      ],
    },
    {
      id: "U006",
      name: "Daniel Patiño Mejia",
      email: "daniel.patino-m@mail.escuelaing.edu.co",
      profilePictureUrl: avatar6,
      phone: "+57 318 7777777",
      identificationNumber: "1000099097",
      identificationType: "TI",
      birthDate: "2002-07-25",
      status: "Pendiente",
      profiles: [{ role: "Conductor", rating: 5.0, plate: "JKL-444", vehicle: "Chevrolet Spark 2020" }],
    },
    {
      id: "U007",
      name: "Robinson Steven Nuñez Portela",
      email: "robinson.nunez-p@mail.escuelaing.edu.co",
      profilePictureUrl: avatar7,
      phone: "+57 312 8888888",
      identificationNumber: "1000100575",
      identificationType: "CC",
      birthDate: "1999-03-12",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "MNO-555", vehicle: "Kia Picanto 2021" },
        { role: "Acompañante", rating: 4.9, plate: "MNO-555", vehicle: "Kia Picanto 2021" },
      ],
    },
  ];
  return users.map(u => ({ ...u, activeProfile: u.profiles[0] }));
};

const mockReports = (): Report[] => [
  { id: "REP001", title: "Comportamiento Agresivo", reporter: "Juan García", severity: "high", details: "El conductor insultó y manejó agresivo." },
  { id: "REP002", title: "Conducción temeraria", reporter: "Ana López", severity: "high", details: "Exceso de velocidad y maniobras peligrosas." },
  { id: "REP003", title: "Incumplimiento de ruta", reporter: "Pedro Ruiz", severity: "medium", details: "No siguió el itinerario acordado." },
  { id: "REP004", title: "Peatón lesionado", reporter: "Laura M.", severity: "high", details: "Colisión leve con peatón." },
  { id: "REP005", title: "Vehículo sospechoso", reporter: "Andrés P.", severity: "low", details: "Actuación sospechosa en el vehículo." },
  { id: "REP006", title: "Accidente leve", reporter: "Mariana R.", severity: "medium", details: "Choque leve con daños menores." },
  { id: "REP007", title: "Conductor sin licencia", reporter: "David Q.", severity: "high", details: "Conductor no presentó licencia." },
  { id: "REP008", title: "Ruta cancelada", reporter: "Sofía L.", severity: "low", details: "El conductor canceló la ruta sin avisar." },
];

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 18 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-400 text-yellow-400 opacity-50"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
};

const ErrorModal: React.FC<{ 
  open: boolean; 
  title?: string; 
  message?: string; 
  onRetry: () => void; 
  onClose: () => void 
}> = ({ open, title, message, onRetry, onClose }) => {
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

const ConfirmModal: React.FC<{
  open: boolean;
  title?: string;
  description?: string;
  pendingAction: PendingAction;
  selectedRoles: string[];
  availableProfiles: Profile[];
  onRoleToggle: (r: string) => void;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ open, title, description, pendingAction, selectedRoles, availableProfiles, onRoleToggle, loading, onCancel, onConfirm }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        {pendingAction === "suspend_profile" && (
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-slate-700 mb-2">Selecciona perfiles a suspender:</legend>
            <div className="space-y-2">
              {availableProfiles.map((profile) => (
                <label
                  key={profile.role}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedRoles.includes(profile.role)
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(profile.role)}
                    onChange={() => onRoleToggle(profile.role)}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{profile.role}</div>
                    <div className="text-xs text-slate-500">Rating: {profile.rating.toFixed(1)}</div>
                  </div>
                </label>
              ))}
            </div>
            {selectedRoles.length === 0 && (
              <p className="mt-2 text-xs text-red-600">Debes seleccionar al menos un perfil</p>
            )}
          </fieldset>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || (pendingAction === "suspend_profile" && selectedRoles.length === 0)}
            className={`px-4 py-2 rounded-lg font-medium ${
              pendingAction === "suspend_account" || pendingAction === "reject"
                ? "bg-red-600 text-white hover:bg-red-700"
                : pendingAction === "suspend_profile"
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : pendingAction === "activate_account" || pendingAction === "approve" || pendingAction === "archive"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminHome() {
  const metrics = mockMetrics;
  const [reports] = useState<Report[]>(mockReports);
  const [users, setUsers] = useState<UserCard[]>(mockUsers);

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

  const [repStartIndex, setRepStartIndex] = useState(0);
  useEffect(() => setRepStartIndex(0), [itemsPerPage]);
  
  const repPrev = useCallback(() => {
    setRepStartIndex(prev => Math.max(0, prev - itemsPerPage));
  }, [itemsPerPage]);

  const repNext = useCallback(() => {
    setRepStartIndex(prev => Math.min(reports.length - itemsPerPage, prev + itemsPerPage));
  }, [reports.length, itemsPerPage]);

  const visibleReports = reports.slice(repStartIndex, repStartIndex + itemsPerPage);
  const canRepGoPrev = repStartIndex > 0;
  const canRepGoNext = repStartIndex + itemsPerPage < reports.length;

  const [userStartIndex, setUserStartIndex] = useState(0);
  useEffect(() => setUserStartIndex(0), [itemsPerPage]);
  
  const userPrev = useCallback(() => {
    setUserStartIndex(prev => Math.max(0, prev - itemsPerPage));
  }, [itemsPerPage]);

  const userNext = useCallback(() => {
    setUserStartIndex(prev => Math.min(users.length - itemsPerPage, prev + itemsPerPage));
  }, [users.length, itemsPerPage]);

  const visibleUsers = users.slice(userStartIndex, userStartIndex + itemsPerPage);
  const canUserGoPrev = userStartIndex > 0;
  const canUserGoNext = userStartIndex + itemsPerPage < users.length;

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [selectedProfileRole, setSelectedProfileRole] = useState<string>("Conductor");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRolesToSuspend, setSelectedRolesToSuspend] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ open: boolean; kind?: ErrorKind; title?: string; message?: string }>({ open: false });
  const [successMessage, setSuccessMessage] = useState<string>("");

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
    setSelectedProfileRole(u.activeProfile?.role || u.profiles[0]?.role || "Conductor");
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
    setPendingAction(null);
    setConfirmOpen(false);
    setSelectedRolesToSuspend([]);
  };

  const startConfirm = (action: PendingAction) => {
    setPendingAction(action);
    if (action === "suspend_profile" && selectedUser) {
      setSelectedRolesToSuspend([]);
    }
    setConfirmOpen(true);
  };

  const toggleRoleToSuspend = (role: string) => {
    setSelectedRolesToSuspend(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
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
        setSuccessMessage(`Has archivado el reporte ${selectedReport?.id}`);
        closeModal();
      }
    } else if (pendingAction === "suspend_account") {
      if (attempt === 1) {
        showError("report", "No existe el reporte", "No existe el reporte. Verifica y reintenta.");
      } else {
        const userName = selectedUser?.name || "el usuario";
        console.log(`Cuenta suspendida: ${selectedUser?.id}`);
        setSuccessMessage(`Has suspendido la cuenta de ${userName}`);
        closeModal();
        if(isUserModalOpen) closeUserModal();
      }
    } else if (pendingAction === "suspend_profile") {
      if (attempt === 1) {
        showError("user", "No se ha podido suspender el usuario", "No se ha podido suspender el usuario. Reintentar.");
      } else {
        const userName = selectedUser?.name || "el usuario";
        console.log(`Perfiles suspendidos: ${selectedRolesToSuspend.join(", ")} para usuario ${selectedUser?.id}`);
        setSuccessMessage(`Has suspendido ${selectedRolesToSuspend.length > 1 ? 'los perfiles' : 'el perfil'} de ${userName}`);
        closeModal();
        if(isUserModalOpen) closeUserModal();
      }
    } else if (pendingAction === "approve") {
      if (attempt === 1) {
        showError("approve", "No se ha podido aprobar el usuario", "No se ha podido aprobar el usuario. Reintentar.");
      } else {
        const userName = selectedUser?.name || "el conductor";
        console.log(`Conductor ${selectedUser?.id} aprobado`);
        setUsers(prev => prev.map(u => 
          u.id === selectedUser?.id ? { ...u, status: "Verificado" } : u
        ));
        setSuccessMessage(`Has aprobado a ${userName} como conductor`);
        closeUserModal();
      }
    } else if (pendingAction === "reject") {
      if (attempt === 1) {
        showError("reject", "No se ha podido rechazar el usuario", "No se ha podido rechazar el usuario. Reintentar.");
      } else {
        const userName = selectedUser?.name || "el conductor";
        console.log(`Conductor ${selectedUser?.id} rechazado`);
        setSuccessMessage(`Has rechazado la solicitud de ${userName}`);
        closeUserModal();
      }
    } else if (pendingAction === "activate_account") {
      const userName = selectedUser?.name || "el usuario";
      setUsers(prev => prev.map(u => 
        u.id === selectedUser?.id ? { ...u, status: "Verificado" } : u
      ));
      console.log(`Cuenta activada para usuario ${selectedUser?.id}`);
      setSuccessMessage(`Has activado la cuenta de ${userName}`);
      closeUserModal();
    }

    setActionLoading(false);
    setConfirmOpen(false);
    setPendingAction(null);
  };

  // Auto-hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleProfileChange = (role: string) => {
    setSelectedProfileRole(role);
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
        else if (isModalOpen) closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, errorState.open, isUserModalOpen, isModalOpen]);

  const severityLabel = useCallback((s?: string) => (s ? s.toUpperCase() : "N/A"), []);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Panel de administrador</h1>
          <div className="text-sm text-slate-500">Supervisa usuarios, reportes y métricas institucionales</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-2xl font-bold text-blue-600">{metrics.usersActive}</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            A
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* KPI cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <article className="rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow" style={{ backgroundColor: '#E8F4FF' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-700">Viajes completados</div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{metrics.tripsCompleted}</div>
            <div className="mt-2 text-xs text-slate-600">Última actualización automática</div>
          </article>

          <article className="rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow" style={{ backgroundColor: '#E8F4FF' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-700">Reportes abiertos</div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{metrics.openReports}</div>
            <div className="mt-2 text-xs text-slate-600">Prioriza los incidentes críticos</div>
          </article>

          <article className="rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow" style={{ backgroundColor: '#E8F4FF' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-700">CO₂ reducido</div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 1118 0" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{metrics.co2}</div>
            <div className="mt-2 text-xs text-slate-600">Ahorro estimado por viajes compartidos</div>
          </article>
        </section>

        {/* Reportes */}
        <section className="mb-8 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Nuevos reportes</h2>
            <div className="text-sm text-slate-500">{reports.length} encontrados</div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={repPrev} 
              disabled={!canRepGoPrev}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${!canRepGoPrev ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex-1 grid gap-4 transition-all duration-500 ease-in-out" style={{ gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)` }}>
              {visibleReports.map((r) => (
                <article 
                  key={r.id} 
                  className="rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-200"
                  style={{ backgroundColor: '#D1E7FA' }}
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
                    <button onClick={() => openReport(r)} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm">Ver</button>
                  </div>
                </article>
              ))}
            </div>

            <button 
              onClick={repNext} 
              disabled={!canRepGoNext}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${!canRepGoNext ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        <div className="my-6 border-t border-dashed border-slate-200" />

        {/* Users */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Conductores nuevos por validar</h3>
            <div className="text-sm text-slate-500">{users.length} conductores</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
            <div className="flex items-center gap-4">
              <button 
                onClick={userPrev} 
                disabled={!canUserGoPrev}
                className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${!canUserGoPrev ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                  <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex-1 grid gap-4 transition-all duration-500 ease-in-out" style={{ gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)` }}>
                {visibleUsers.map((u) => (
                  <div 
                    key={u.id} 
                    className="flex-shrink-0 rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative"
                    style={{ backgroundColor: '#CAE8FF' }}
                  >
                    <button 
                      onClick={() => openUser(u)} 
                      className="absolute top-5 right-5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Ver
                    </button>

                    <div className="flex items-start gap-4 mb-4 mt-1">
                      <div className="flex-shrink-0">
                        <img src={u.profilePictureUrl || avatar1} alt={u.name} className="w-20 h-20 rounded-full object-cover border-2 border-blue-50" />
                      </div>

                      <div className="flex-1 min-w-0 pr-16">
                        <h4 className="font-bold text-gray-900 truncate text-lg">{u.name}</h4>
                        <div className="text-sm text-slate-500 font-medium">{u.activeProfile?.role}</div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">{u.email}</div>
                        <div className="text-xs text-slate-400 truncate">{u.activeProfile?.vehicle}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button 
                        onClick={() => {
                          setSelectedUser(u);
                          startConfirm("approve");
                        }}
                        className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                      >
                        Aprobar
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedUser(u);
                          startConfirm("reject");
                        }}
                        className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
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
                className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${!canUserGoNext ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-6 right-6 z-80 animate-in slide-in-from-top">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl px-6 py-4 shadow-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Report details modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
              <button onClick={() => { setSelectedUser({ id: "dummy", name: selectedReport.reporter, profiles: [] } as UserCard); startConfirm("suspend_account"); }} className="w-full py-2.5 rounded-lg border border-red-400 bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors">Suspender cuenta</button>
              <button onClick={() => { setSelectedUser({ id: "dummy", name: selectedReport.reporter, profiles: [{role: "Conductor", rating: 0}] } as UserCard); startConfirm("suspend_profile"); }} className="w-full py-2.5 rounded-lg border border-orange-400 bg-orange-50 text-orange-700 font-medium hover:bg-orange-100 transition-colors">Suspender perfil</button>
              <button onClick={() => startConfirm("archive")} className="w-full py-2.5 rounded-lg border border-green-300 bg-green-50 text-green-700 font-medium hover:bg-green-100 sm:col-span-2 transition-colors">Archivar</button>
            </div>
          </div>
        </div>
      )}

      {/* User detail modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeUserModal} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <img 
                  src={selectedUser.profilePictureUrl || avatar1} 
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-3"
                />
                {(() => {
                  const currentProfile = selectedUser.profiles.find(p => p.role === selectedProfileRole);
                  const rating = currentProfile?.rating ?? 0;
                  return (
                    <div className="flex flex-col items-center gap-1">
                      <StarRating rating={rating} size={18} />
                      {rating < 2 && (
                        <div className="mt-2 px-2 py-1 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-xs text-red-700 font-medium">⚠️ Reputación baja</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                    <div className="text-sm text-slate-500 mt-1">{selectedUser.email}</div>
                    <div className="text-sm text-slate-500">{selectedUser.phone}</div>
                  </div>
                  <button onClick={closeUserModal} className="text-slate-500 hover:text-slate-700 text-xl flex-shrink-0">
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  {selectedUser.profiles.length > 0 && (
                    <div className="grid grid-cols-[130px_1fr] gap-3 items-center">
                      <span className="font-medium text-slate-700">Perfil activo:</span>
                      <select
                        value={selectedProfileRole}
                        onChange={(e) => handleProfileChange(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-slate-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none"
                      >
                        {selectedUser.profiles.map(profile => (
                          <option key={profile.role} value={profile.role}>
                            {profile.role} (★ {profile.rating.toFixed(1)})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-[130px_1fr] gap-3 items-center">
                    <span className="font-medium text-slate-700">Estado:</span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs w-fit ${
                        selectedUser.status === "Pendiente"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : selectedUser.status === "Verificado"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : selectedUser.status === "Suspendido"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : selectedUser.status === "Bloqueado"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-gray-50 text-slate-700"
                      }`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>

                  {selectedUser.identificationType && (
                    <div className="grid grid-cols-[130px_1fr] gap-3">
                      <span className="font-medium text-slate-700">Tipo ID:</span>
                      <span className="text-slate-600">{selectedUser.identificationType}</span>
                    </div>
                  )}

                  {selectedUser.identificationNumber && (
                    <div className="grid grid-cols-[130px_1fr] gap-3">
                      <span className="font-medium text-slate-700">Número ID:</span>
                      <span className="text-slate-600">{selectedUser.identificationNumber}</span>
                    </div>
                  )}

                  {selectedUser.birthDate && (
                    <div className="grid grid-cols-[130px_1fr] gap-3">
                      <span className="font-medium text-slate-700">Fecha de nac.:</span>
                      <span className="text-slate-600">
                        {new Date(selectedUser.birthDate).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  {(() => {
                    const currentProfile = selectedUser.profiles.find(p => p.role === selectedProfileRole);
                    return (
                      <>
                        <div className="grid grid-cols-[130px_1fr] gap-3">
                          <span className="font-medium text-slate-700">Placa:</span>
                          <span className={currentProfile?.plate ? "text-slate-600" : "text-slate-400"}>
                            {currentProfile?.plate || "—"}
                          </span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] gap-3">
                          <span className="font-medium text-slate-700">Vehículo:</span>
                          <span className={currentProfile?.vehicle ? "text-slate-600" : "text-slate-400"}>
                            {currentProfile?.vehicle || "—"}
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(selectedUser.status === "Suspendido" || selectedUser.status === "Bloqueado") ? (
                <button
                  onClick={() => startConfirm("activate_account")}
                  className="w-full py-2.5 rounded-lg border border-green-400 bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors"
                >
                  Activar cuenta
                </button>
              ) : (
                <button
                  onClick={() => startConfirm("suspend_account")}
                  className="w-full py-2.5 rounded-lg border border-red-400 bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors"
                >
                  Suspender cuenta
                </button>
              )}

              <button
                onClick={() => startConfirm("suspend_profile")}
                className="w-full py-2.5 rounded-lg border border-orange-400 bg-orange-50 text-orange-700 font-medium hover:bg-orange-100 transition-colors"
              >
                Suspender perfil(es)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={
          pendingAction === "suspend_account"
            ? "Confirmar suspensión de cuenta"
            : pendingAction === "suspend_profile"
            ? "Suspender perfil(es)"
            : pendingAction === "activate_account"
            ? "Activar cuenta"
            : pendingAction === "approve"
            ? "Aprobar conductor"
            : pendingAction === "reject"
            ? "Rechazar conductor"
            : "Archivar reporte"
        }
        description={
          pendingAction === "approve"
            ? `Vas a aprobar a ${selectedUser?.name} como conductor.`
            : pendingAction === "reject"
            ? `Vas a rechazar la solicitud de ${selectedUser?.name}.`
            : pendingAction === "suspend_profile"
            ? `Selecciona los perfiles que deseas suspender para ${selectedUser?.name}.`
            : pendingAction === "archive"
            ? `Archivarás el reporte ${selectedReport?.id}.`
            : `Confirma esta acción para ${selectedUser?.name || selectedReport?.id}.`
        }
        pendingAction={pendingAction}
        selectedRoles={selectedRolesToSuspend}
        availableProfiles={selectedUser?.profiles || []}
        onRoleToggle={toggleRoleToSuspend}
        loading={actionLoading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={performAction}
      />

      {/* Error Modal */}
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