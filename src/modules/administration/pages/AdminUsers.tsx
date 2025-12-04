import React, { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";

/**
 * AdminUsers.tsx - Versión actualizada
 * - Aprobar/Rechazar solo para conductores pendientes
 * - Suspender/Activar para todos los usuarios
 * - Rating de estrellas en el modal
 * - Sin botón de advertir ni suspender externo
 */

type UserCard = {
  id: string;
  name: string;
  email?: string;
  role?: "Acompañante" | "Conductor" | "Administrador" | "Estudiante" | "Profesor" | string;
  plate?: string;
  avatar?: string | null;
  status?: "Pendiente" | "Verificado" | "Suspendido" | string;
  vehicle?: string | null;
  rating?: number; // Rating de 0-5
  phone?: string;
};

type ErrorKind = "file" | "report" | "user";
type PendingAction = null | "suspend_account" | "suspend_profile" | "activate_account" | "approve" | "reject" | "archive";

const mockUsers = (): UserCard[] => [
  { id: "U001", name: "Carlos Ruiz", email: "carlos.ruiz@mail.escuelaing.edu.co", role: "Conductor", plate: "ABC-123", avatar: avatar1, status: "Pendiente", vehicle: "Toyota Prius 2022", rating: 0, phone: "+57 320 7654321" },
  { id: "U002", name: "María Gómez", email: "maria.gomez@mail.escuelaing.edu.co", role: "Acompañante", plate: "XYZ-789", avatar: avatar2, status: "Verificado", vehicle: "Hyundai Accent 2023", rating: 4.5, phone: "+57 310 1234567" },
  { id: "U003", name: "Juan Sánchez", email: "juan.sanchez@mail.escuelaing.edu.co", role: "Conductor", plate: "LMN-456", avatar: avatar3, status: "Suspendido", vehicle: "Renault Logan 2021", rating: 4.8, phone: "+57 300 9876543" },
  { id: "U004", name: "Natalia Perez", email: "natalia.p@mail.escuelaing.edu.co", role: "Profesor", plate: "DEF-222", avatar: avatar1, status: "Verificado", vehicle: null, rating: 3.2, phone: "+57 315 5555555" },
  { id: "U005", name: "Andrés Velas", email: "andres.v@mail.escuelaing.edu.co", role: "Administrador", plate: "GHI-333", avatar: avatar2, status: "Verificado", vehicle: null, rating: 5.0, phone: "+57 321 4444444" },
  { id: "U006", name: "Paola Rojas", email: "paola.r@mail.escuelaing.edu.co", role: "Conductor", plate: "JKL-444", avatar: avatar3, status: "Pendiente", vehicle: "Chevrolet Spark 2020", rating: 0, phone: "+57 318 7777777" },
];

// Rating Stars Component
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

// Error Modal
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
              {["Acompañante", "Conductor", "Administrador"].map((r) => (
                <label
                  key={r}
                  className={`flex-1 border rounded-lg p-2 cursor-pointer text-center ${
                    selectedRole === r ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="profile"
                    value={r}
                    className="sr-only"
                    checked={selectedRole === r}
                    onChange={() => onRoleChange(r)}
                  />
                  <div className="text-sm font-medium">{r}</div>
                </label>
              ))}
            </div>
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
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium ${
              pendingAction === "suspend_account" || pendingAction === "reject"
                ? "bg-red-600 text-white hover:bg-red-700"
                : pendingAction === "suspend_profile"
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : pendingAction === "activate_account" || pendingAction === "approve"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  const [users] = useState<UserCard[]>(() => mockUsers());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("Todos");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");

  // Responsive items per page
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

  // Pagination
  const [userPage, setUserPage] = useState(0);
  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (q && !(u.name.toLowerCase().includes(q) || (u.email ?? "").toLowerCase().includes(q) || (u.plate ?? "").toLowerCase().includes(q))) {
      return false;
    }
    if (roleFilter !== "Todos" && u.role !== roleFilter) return false;
    if (statusFilter !== "Todos" && u.status !== statusFilter) return false;
    return true;
  });

  const userPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  useEffect(() => setUserPage((p) => Math.min(p, Math.max(0, userPages - 1))), [itemsPerPage, userPages]);
  
  const userStart = userPage * itemsPerPage;
  const visibleUsers = filteredUsers.slice(userStart, userStart + itemsPerPage);

  const userPrev = useCallback(() => setUserPage((p) => Math.max(0, p - 1)), []);
  const userNext = useCallback(() => setUserPage((p) => Math.min(userPages - 1, p + 1)), [userPages]);

  // Modal states
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRole, setSelectedRole] = useState<string>("Conductor");
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ open: boolean; kind?: ErrorKind; title?: string; message?: string }>({ 
    open: false 
  });

  const attemptsRef = useRef<Record<string, number>>({});

  const openUser = (u: UserCard) => {
    setSelectedUser(u);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
    setPendingAction(null);
    setConfirmOpen(false);
  };

  const startConfirm = (action: PendingAction) => {
    setPendingAction(action);
    setConfirmOpen(true);
  };

  const showError = (kind: ErrorKind, title?: string, message?: string) => 
    setErrorState({ open: true, kind, title, message });

  const performAction = async () => {
    if (!selectedUser || !pendingAction) return;
    setActionLoading(true);

    await new Promise((res) => setTimeout(res, 700));

    console.log(`Acción ${pendingAction} ejecutada para usuario ${selectedUser.id}`);
    
    setActionLoading(false);
    setConfirmOpen(false);
    setPendingAction(null);
    closeUserModal();
  };

  const retryFromError = () => {
    setErrorState({ open: false });
    setConfirmOpen(true);
  };

  const closeError = () => setErrorState({ open: false });

  // ESC handling
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/RidECI.jpg" alt="RidECI" className="h-10 object-contain" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Gestión de usuarios</h1>
            <div className="text-sm text-slate-500">Filtra, valida y administra cuentas</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-lg font-bold text-blue-600">{filteredUsers.filter(u => u.status === "Verificado").length}</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Search & Filters */}
        <section className="mb-6">
          <div className="flex gap-3 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuario, email o placa..."
              className="flex-1 rounded-lg p-3 border border-gray-200 bg-white shadow-sm"
            />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-lg p-3 border border-gray-200 bg-white">
              <option>Todos</option>
              <option>Estudiante</option>
              <option>Profesor</option>
              <option>Acompañante</option>
              <option>Conductor</option>
              <option>Administrador</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg p-3 border border-gray-200 bg-white">
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Verificado</option>
              <option>Suspendido</option>
            </select>
            <div className="text-sm text-slate-500">{filteredUsers.length} resultados</div>
          </div>
        </section>

        {/* Users Carousel */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
          <div className="relative overflow-hidden px-14">
            <button
              onClick={userPrev}
              disabled={userPage === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${
                userPage === 0 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div 
              className="flex gap-6 transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${userPage * (100 / itemsPerPage + (itemsPerPage > 1 ? 2.5 : 0))}%)`,
              }}
            >
              {filteredUsers.map((u) => (
                <div 
                  key={u.id} 
                  className="flex-shrink-0 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  style={{ width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img 
                        src={u.avatar || avatar1} 
                        alt={u.name} 
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{u.name}</h3>
                          <p className="text-xs text-slate-500 truncate">{u.email}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-xs text-slate-500 mb-0.5">Placa</div>
                          <div className="font-semibold text-sm whitespace-nowrap">{u.plate ?? "-"}</div>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-slate-600">
                          <span className="font-medium">{u.role}</span>
                        </div>
                        {u.vehicle && (
                          <div className="text-xs text-slate-500 truncate">{u.vehicle}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        u.status === "Pendiente"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : u.status === "Verificado"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {u.status}
                    </span>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      <button 
                        onClick={() => openUser(u)} 
                        className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Ver
                      </button>
                      {u.status === "Suspendido" && (
                        <button 
                          onClick={() => {
                            setSelectedUser(u);
                            startConfirm("activate_account");
                          }}
                          className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                          Activar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={userNext}
              disabled={userPage >= userPages - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all ${
                userPage >= userPages - 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        {/* Listado Completo */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Listado completo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.slice(0, 6).map((u) => (
              <div key={u.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img 
                    src={u.avatar || avatar1} 
                    alt={u.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{u.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{u.role}</p>
                    <p className="text-xs text-slate-500 truncate">{u.email}</p>
                    {u.vehicle && (
                      <p className="text-xs text-slate-400 truncate mt-1">{u.vehicle}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => openUser(u)} 
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors text-sm font-medium flex-shrink-0"
                  >
                    Ver
                  </button>
                </div>
                
                {/* Botones Aprobar/Rechazar solo para conductores pendientes */}
                {u.role === "Conductor" && u.status === "Pendiente" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        startConfirm("approve");
                      }}
                      className="flex-1 py-2 rounded-lg border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        startConfirm("reject");
                      }}
                      className="flex-1 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
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

      {/* User Detail Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeUserModal} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-start gap-6">
              {/* Avatar y Rating */}
              <div className="flex flex-col items-center">
                <img 
                  src={selectedUser.avatar || avatar1} 
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-3"
                />
                <StarRating rating={selectedUser.rating ?? 0} size={18} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                    <div className="text-sm text-slate-500 mt-1">{selectedUser.email}</div>
                    <div className="text-sm text-slate-500">{selectedUser.phone}</div>
                  </div>
                  <button onClick={closeUserModal} className="text-slate-500 hover:text-slate-700 text-xl">
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-slate-700">Rol:</span>
                    <span className="text-slate-600">{selectedUser.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-slate-700">Estado:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        selectedUser.status === "Pendiente"
                          ? "bg-yellow-50 text-yellow-700"
                          : selectedUser.status === "Verificado"
                          ? "bg-green-50 text-green-700"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                  {selectedUser.plate && (
                    <div className="flex gap-2">
                      <span className="font-medium text-slate-700">Placa:</span>
                      <span className="text-slate-600">{selectedUser.plate}</span>
                    </div>
                  )}
                  {selectedUser.vehicle && (
                    <div className="flex gap-2">
                      <span className="font-medium text-slate-700">Vehículo:</span>
                      <span className="text-slate-600">{selectedUser.vehicle}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedUser.status === "Suspendido" ? (
                <button
                  onClick={() => startConfirm("activate_account")}
                  className="w-full py-2 rounded-lg border border-green-400 bg-green-50 text-green-700 font-medium hover:bg-green-100"
                >
                  Activar cuenta
                </button>
              ) : (
                <button
                  onClick={() => startConfirm("suspend_account")}
                  className="w-full py-2 rounded-lg border border-red-400 bg-red-50 text-red-700 font-medium hover:bg-red-100"
                >
                  Suspender cuenta
                </button>
              )}

              <button
                onClick={() => startConfirm("suspend_profile")}
                className="w-full py-2 rounded-lg border border-orange-400 bg-orange-50 text-orange-700 font-medium hover:bg-orange-100"
              >
                Suspender perfil
              </button>

              <button
                onClick={() => startConfirm("archive")}
                className="w-full py-2 rounded-lg border border-blue-400 bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 sm:col-span-2"
              >
                Archivar
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
            ? "Suspender perfil"
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
            : `Confirma esta acción para ${selectedUser?.name}.`
        }
        pendingAction={pendingAction}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        loading={actionLoading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={performAction}
      />

      {/* Error Modal */}
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