import React, { useCallback, useEffect, useState } from "react";
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

/**
 * AdminUsers.tsx - Sistema de Gestión de Perfiles
 * Gestiona perfiles de usuario (Conductor, Pasajero, Acompañante)
 * Cada usuario puede tener múltiples perfiles con ratings independientes
 */

type IdentificationType = "CC" | "TI" | "CE" | "PP";

type Profile = {
  role: "Acompañante" | "Conductor" | "Pasajero";
  rating: number;
  plate?: string | null;
  vehicle?: string | null;
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

type ErrorKind = "file" | "report" | "user";
type PendingAction = null | "suspend_account" | "suspend_profile" | "activate_account" | "approve" | "reject";

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
      id: "U002",
      name: "Raquel Iveth Selma Ayala",
      email: "raquel.selma-a@mail.escuelaing.edu.co",
      profilePictureUrl: avatar2,
      phone: "+57 310 1234567",
      identificationNumber: "1000093654",
      identificationType: "CC",
      birthDate: "1999-08-22",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.5, plate: "XYZ-789", vehicle: "Hyundai Accent 2023" },
        { role: "Pasajero", rating: 4.8, plate: null, vehicle: null },
      ],
    },
    {
      id: "U003",
      name: "Néstor David Lopez Castellañeda",
      email: "nestor.lopez-c@mail.escuelaing.edu.co",
      profilePictureUrl: avatar3,
      phone: "+57 300 9876543",
      identificationNumber: "1000100422",
      identificationType: "CC",
      birthDate: "1997-11-03",
      status: "Bloqueado",
      profiles: [
        { role: "Conductor", rating: 1.8, plate: "LMN-456", vehicle: "Renault Logan 2021" },
        { role: "Pasajero", rating: 4.2, plate: null, vehicle: null },
      ],
    },
    {
      id: "U004",
      name: "Deisy Lorena Guzmán Cabrales",
      email: "deisy.guzman-c@mail.escuelaing.edu.co",
      profilePictureUrl: avatar4,
      phone: "+57 315 5555555",
      identificationNumber: "1000093799",
      identificationType: "CE",
      birthDate: "1995-03-10",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 3.2, plate: null, vehicle: null },
      ],
    },
    {
      id: "U005",
      name: "Tulio Riaño Sanchez",
      email: "tulio.riano-s@mail.escuelaing.edu.co",
      profilePictureUrl: avatar5,
      phone: "+57 321 4444444",
      identificationNumber: "1000099099",
      identificationType: "CC",
      birthDate: "2000-01-18",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 5.0, plate: null, vehicle: null },
        { role: "Conductor", rating: 4.6, plate: "GHI-333", vehicle: "Mazda 3 2023" },
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
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "JKL-444", vehicle: "Chevrolet Spark 2020" },
      ],
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
    {
      id: "U008",
      name: "Juan Pablo Caballero Castellanos",
      email: "juan.ccastellanos@mail.escuelaing.edu.co",
      profilePictureUrl: avatar8,
      phone: "+57 314 9999999",
      identificationNumber: "1000100516",
      identificationType: "CC",
      birthDate: "1998-09-20",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.2, plate: "PQR-666", vehicle: "Nissan March 2022" },
        { role: "Pasajero", rating: 4.7, plate: null, vehicle: null },
      ],
    },
    {
      id: "U009",
      name: "Andrés Martin Cantor Urrego",
      email: "andres.cantor-u@escuelaing.edu.co",
      profilePictureUrl: avatar9,
      phone: "+57 316 1111111",
      identificationNumber: "1000004955",
      identificationType: "CC",
      birthDate: "1996-06-08",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.9, plate: "STU-777", vehicle: "Honda City 2023" },
      ],
    },
    {
      id: "U010",
      name: "Juan Carlos Leal Cruz",
      email: "juan.lcruz@mail.escuelaing.edu.co",
      profilePictureUrl: avatar10,
      phone: "+57 317 2222222",
      identificationNumber: "1000100326",
      identificationType: "CC",
      birthDate: "1997-04-14",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.4, plate: "VWX-888", vehicle: "Ford Fiesta 2021" },
        { role: "Pasajero", rating: 4.6, plate: null, vehicle: null },
        { role: "Acompañante", rating: 4.3, plate: "VWX-888", vehicle: "Ford Fiesta 2021" },
      ],
    },
    {
      id: "U011",
      name: "Valeria Bermudez Aguilar",
      email: "valeria.bermudez-a@mail.escuelaing.edu.co",
      profilePictureUrl: avatar11,
      phone: "+57 319 3333333",
      identificationNumber: "1000100774",
      identificationType: "CC",
      birthDate: "2000-11-28",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 4.8, plate: null, vehicle: null },
        { role: "Conductor", rating: 4.5, plate: "YZA-999", vehicle: "Volkswagen Gol 2022" },
      ],
    },
    {
      id: "U012",
      name: "Juan Sebastian Puentes Julio",
      email: "juan.puentes@mail.escuelaing.edu.co",
      profilePictureUrl: avatar12,
      phone: "+57 320 4444444",
      identificationNumber: "1000100444",
      identificationType: "CC",
      birthDate: "1999-07-19",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.7, plate: "BCD-101", vehicle: "Suzuki Swift 2021" },
      ],
    },
  ];

  return users.map(u => ({ ...u, activeProfile: u.profiles[0] }));
};

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 20 }) => {
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
  kind?: ErrorKind; 
  title?: string; 
  message?: string; 
  onRetry: () => void; 
  onClose: () => void 
}> = ({ open, kind, title, message, onRetry, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{title ?? "Error"}</h3>
          <p className="text-sm text-slate-600 text-center leading-relaxed">{message ?? "Ha ocurrido un error."}</p>
          <div className="mt-4 w-full flex justify-center gap-3">
            <button 
              onClick={onRetry} 
              className="px-6 py-2.5 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Reintentar
            </button>
            <button 
              onClick={onClose} 
              className="px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition-all shadow-sm hover:shadow-md"
            >
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
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{description}</p>

        {pendingAction === "suspend_profile" && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-slate-700 mb-3">Selecciona perfiles a suspender:</legend>
            <div className="space-y-2">
              {availableProfiles.map((profile) => (
                <label
                  key={profile.role}
                  className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedRoles.includes(profile.role)
                      ? "border-orange-500 bg-orange-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(profile.role)}
                    onChange={() => onRoleToggle(profile.role)}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{profile.role}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Rating: {profile.rating.toFixed(1)} ⭐</div>
                  </div>
                </label>
              ))}
            </div>
            {selectedRoles.length === 0 && (
              <p className="mt-3 text-xs text-red-600 font-medium">⚠️ Debes seleccionar al menos un perfil</p>
            )}
          </fieldset>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border-2 border-gray-300 bg-white text-slate-700 hover:bg-gray-50 font-semibold transition-all shadow-sm hover:shadow-md"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || (pendingAction === "suspend_profile" && selectedRoles.length === 0)}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md ${
              pendingAction === "suspend_account" || pendingAction === "reject"
                ? "bg-red-600 text-white hover:bg-red-700"
                : pendingAction === "suspend_profile"
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : pendingAction === "activate_account" || pendingAction === "approve"
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

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserCard[]>(() => mockUsers());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("Todos");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");

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

  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    const ap = u.activeProfile;
    if (q && !(
      u.name.toLowerCase().includes(q) || 
      (u.email ?? "").toLowerCase().includes(q) || 
      (ap?.plate ?? "").toLowerCase().includes(q) ||
      (u.identificationNumber ?? "").toLowerCase().includes(q) ||
      (u.phone ?? "").toLowerCase().includes(q)
    )) {
      return false;
    }
    if (roleFilter !== "Todos" && !u.profiles.some(p => p.role === roleFilter)) return false;
    if (statusFilter !== "Todos" && u.status !== statusFilter) return false;
    return true;
  });

  const [userStartIndex, setUserStartIndex] = useState(0);
  
  useEffect(() => setUserStartIndex(0), [filteredUsers.length, itemsPerPage]);

  const userPrev = useCallback(() => {
    setUserStartIndex(prev => Math.max(0, prev - itemsPerPage));
  }, [itemsPerPage]);

  const userNext = useCallback(() => {
    setUserStartIndex(prev => Math.min(filteredUsers.length - itemsPerPage, prev + itemsPerPage));
  }, [filteredUsers.length, itemsPerPage]);

  const visibleUsers = filteredUsers.slice(userStartIndex, userStartIndex + itemsPerPage);
  const canGoPrev = userStartIndex > 0;
  const canGoNext = userStartIndex + itemsPerPage < filteredUsers.length;

  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [selectedProfileRole, setSelectedProfileRole] = useState<string>("Conductor");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRolesToSuspend, setSelectedRolesToSuspend] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ open: boolean; kind?: ErrorKind; title?: string; message?: string }>({ 
    open: false 
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

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

  const closeError = () => setErrorState({ open: false });
  const retryFromError = () => { setErrorState({ open: false }); setConfirmOpen(true); };

  const performAction = async () => {
    if (!selectedUser || !pendingAction) return;
    setActionLoading(true);

    await new Promise((res) => setTimeout(res, 700));

    const userName = selectedUser.name;

    if (pendingAction === "activate_account") {
      setUsers(prev => prev.map(u => 
        u.id === selectedUser.id ? { ...u, status: "Verificado" } : u
      ));
      console.log(`Cuenta activada para usuario ${selectedUser.id}`);
      setSuccessMessage(`Has activado la cuenta de ${userName}`);
    } else if (pendingAction === "suspend_profile") {
      console.log(`Perfiles suspendidos: ${selectedRolesToSuspend.join(", ")} para usuario ${selectedUser.id}`);
      setSuccessMessage(`Has suspendido ${selectedRolesToSuspend.length > 1 ? 'los perfiles' : 'el perfil'} de ${userName}`);
    } else if (pendingAction === "suspend_account") {
      console.log(`Cuenta suspendida para usuario ${selectedUser.id}`);
      setSuccessMessage(`Has suspendido la cuenta de ${userName}`);
    } else if (pendingAction === "approve") {
      console.log(`Conductor ${selectedUser.id} aprobado`);
      setSuccessMessage(`Has aprobado a ${userName} como conductor`);
    } else if (pendingAction === "reject") {
      console.log(`Conductor ${selectedUser.id} rechazado`);
      setSuccessMessage(`Has rechazado la solicitud de ${userName}`);
    } else {
      console.log(`Acción ${pendingAction} ejecutada para usuario ${selectedUser.id}`);
    }
    
    setActionLoading(false);
    setConfirmOpen(false);
    setPendingAction(null);
    closeUserModal();
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleProfileChange = (role: string) => {
    setSelectedProfileRole(role);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (errorState.open) closeError();
        else if (confirmOpen) setConfirmOpen(false);
        else if (isUserModalOpen) closeUserModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, errorState.open, isUserModalOpen]);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Gestión de usuarios</h1>
          <div className="text-sm text-slate-500">Gestiona perfiles, valida conductores y supervisa la comunidad</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            A
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        <section className="mb-6">
          <div className="flex gap-3 items-center flex-wrap bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuario, email, placa o ID..."
              className="flex-1 min-w-[250px] rounded-lg px-4 py-2.5 border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)} 
              className="rounded-lg px-4 py-2.5 border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option>Todos</option>
              <option>Acompañante</option>
              <option>Conductor</option>
              <option>Pasajero</option>
            </select>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="rounded-lg px-4 py-2.5 border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Verificado</option>
              <option>Suspendido</option>
              <option>Bloqueado</option>
            </select>
            <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-semibold text-blue-700">{filteredUsers.length} resultados</span>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="flex items-center gap-4">
            <button
              onClick={userPrev}
              disabled={!canGoPrev}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${
                !canGoPrev ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex-1 grid gap-4 transition-all duration-500 ease-in-out" style={{ gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)` }}>
              {visibleUsers.length > 0 ? (
                visibleUsers.map((u) => (
                  <div 
                    key={u.id} 
                    className="rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative h-[200px] flex flex-col"
                    style={{ backgroundColor: '#CAE8FF' }}
                  >
                    <button 
                      onClick={() => openUser(u)} 
                      className="absolute top-4 right-4 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm z-10"
                    >
                      Ver
                    </button>

                    <div className="flex items-start gap-4 mb-auto">
                      <div className="flex-shrink-0">
                        <img 
                          src={u.profilePictureUrl || avatar1} 
                          alt={u.name} 
                          className="w-20 h-20 rounded-full object-cover border-2 border-blue-50"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-16">
                        <h4 className="font-bold text-gray-900 truncate text-base leading-tight">{u.name}</h4>
                        <div className="text-sm text-slate-500 font-medium mt-1">{u.activeProfile?.role}</div>
                        <div className="text-xs text-slate-400 truncate mt-1">{u.email}</div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">{u.activeProfile?.vehicle || u.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          u.status === "Pendiente"
                            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            : u.status === "Verificado"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : u.status === "Suspendido"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : u.status === "Bloqueado"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-gray-50 text-slate-700"
                        }`}
                      >
                        {u.status}
                      </span>
                      
                      {(u.status === "Suspendido" || u.status === "Bloqueado") && (
                        <button 
                          onClick={() => {
                            setSelectedUser(u);
                            startConfirm("activate_account");
                          }}
                          className="px-3 py-1 border border-green-300 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium whitespace-nowrap"
                        >
                          Activar
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-slate-500">No se encontraron usuarios.</div>
              )}
            </div>

            <button
              onClick={userNext}
              disabled={!canGoNext}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${
                !canGoNext ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        {/* Separador visual */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm font-semibold text-blue-700">Listado completo de usuarios</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Listado Completo */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUsers.slice(0, 9).map((u) => (
              <div 
                key={u.id} 
                className="rounded-xl p-5 border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 h-[180px] flex flex-col" 
                style={{ backgroundColor: '#CAE8FF' }}
              >
                <div className="flex items-start gap-4 mb-auto">
                  <img 
                    src={u.profilePictureUrl || avatar1} 
                    alt={u.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate text-base leading-tight">{u.name}</h4>
                    <p className="text-xs text-slate-500 truncate mt-1">{u.activeProfile?.role}</p>
                    <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {u.activeProfile?.vehicle || u.phone || "-"}
                    </p>
                  </div>
                  <button 
                    onClick={() => openUser(u)} 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0 shadow-sm"
                  >
                    Ver
                  </button>
                </div>
                
                {u.activeProfile?.role === "Conductor" && u.status === "Pendiente" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        startConfirm("approve");
                      }}
                      className="flex-1 py-2 text-sm rounded-lg border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        startConfirm("reject");
                      }}
                      className="flex-1 py-2 text-sm rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {successMessage && (
        <div className="fixed top-6 right-6 z-80 animate-in slide-in-from-top">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl px-6 py-4 shadow-xl flex items-center gap-3 backdrop-blur-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-green-900 font-semibold">{successMessage}</p>
          </div>
        </div>
      )}

      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeUserModal} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative">
                  <img 
                    src={selectedUser.profilePictureUrl || avatar1} 
                    alt={selectedUser.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {(() => {
                  const currentProfile = selectedUser.profiles.find(p => p.role === selectedProfileRole);
                  const rating = currentProfile?.rating ?? 0;
                  return (
                    <div className="flex flex-col items-center gap-2 mt-4">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-2 rounded-lg border border-blue-200">
                        <StarRating rating={rating} size={18} />
                      </div>
                      {rating < 2 && (
                        <div className="mt-1 px-3 py-1.5 bg-red-50 border border-red-300 rounded-lg shadow-sm">
                          <p className="text-xs text-red-700 font-semibold">⚠️ Reputación baja</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <div className="text-sm text-slate-500 mt-1.5 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {selectedUser.email}
                    </div>
                    <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {selectedUser.phone}
                    </div>
                  </div>
                  <button 
                    onClick={closeUserModal} 
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3 text-sm bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="grid grid-cols-[140px_1fr] gap-3 items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-slate-700">Perfil activo:</span>
                    <select
                      value={selectedProfileRole}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-slate-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      {selectedUser.profiles.map(profile => (
                        <option key={profile.role} value={profile.role}>
                          {profile.role} (★ {profile.rating.toFixed(1)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-3 items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-slate-700">Estado:</span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit ${
                        selectedUser.status === "Pendiente"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-300"
                          : selectedUser.status === "Verificado"
                          ? "bg-green-50 text-green-700 border border-green-300"
                          : selectedUser.status === "Suspendido"
                          ? "bg-purple-50 text-purple-700 border border-purple-300"
                          : selectedUser.status === "Bloqueado"
                          ? "bg-red-50 text-red-700 border border-red-300"
                          : "bg-gray-50 text-slate-700"
                      }`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>

                  {selectedUser.identificationType && (
                    <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                      <span className="font-semibold text-slate-700">Tipo ID:</span>
                      <span className="text-slate-600">{selectedUser.identificationType}</span>
                    </div>
                  )}

                  {selectedUser.identificationNumber && (
                    <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                      <span className="font-semibold text-slate-700">Número ID:</span>
                      <span className="text-slate-600 font-mono">{selectedUser.identificationNumber}</span>
                    </div>
                  )}

                  {selectedUser.birthDate && (
                    <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                      <span className="font-semibold text-slate-700">Fecha de nac.:</span>
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
                        <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                          <span className="font-semibold text-slate-700">Placa:</span>
                          <span className={`font-mono ${currentProfile?.plate ? "text-slate-600" : "text-slate-400"}`}>
                            {currentProfile?.plate || "—"}
                          </span>
                        </div>
                        <div className="grid grid-cols-[140px_1fr] gap-3 py-2">
                          <span className="font-semibold text-slate-700">Vehículo:</span>
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
                  className="w-full py-3 rounded-lg border-2 border-green-400 bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-all shadow-sm hover:shadow-md"
                >
                  Activar cuenta
                </button>
              ) : (
                <button
                  onClick={() => startConfirm("suspend_account")}
                  className="w-full py-3 rounded-lg border-2 border-red-400 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-all shadow-sm hover:shadow-md"
                >
                  Suspender cuenta
                </button>
              )}

              <button
                onClick={() => startConfirm("suspend_profile")}
                className="w-full py-3 rounded-lg border-2 border-orange-400 bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100 transition-all shadow-sm hover:shadow-md"
              >
                Suspender perfil(es)
              </button>
            </div>
          </div>
        </div>
      )}

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
            : "Confirmar acción"
        }
        description={
          pendingAction === "approve"
            ? `Vas a aprobar a ${selectedUser?.name} como conductor.`
            : pendingAction === "reject"
            ? `Vas a rechazar la solicitud de ${selectedUser?.name}.`
            : pendingAction === "suspend_profile"
            ? `Selecciona los perfiles que deseas suspender para ${selectedUser?.name}.`
            : `Confirma esta acción para ${selectedUser?.name}.`
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
        kind={errorState.kind}
        title={errorState.title}
        message={errorState.message}
        onRetry={retryFromError}
        onClose={closeError}
      />
    </div>
  );
};

export default AdminUsers;