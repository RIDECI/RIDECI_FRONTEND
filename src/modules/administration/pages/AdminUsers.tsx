import React, { useCallback, useEffect, useRef, useState } from "react";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";

import { useAdminMetrics } from "../hooks/useAdminMetrics";

/**
 * AdminUsers.tsx
 * Página de gestión de usuarios reutilizando patterns de AdminHome.
 * - Búsqueda + filtros por rol y estado
 * - Carousel simple para usuarios (reutiliza la lógica de itemsPerPage)
 * - Modal de ver usuario con acciones (Activar, Suspender cuenta, Suspender perfil)
 * - Confirm modal y Error modal (3 variantes) con retry
 *
 * Tailwind está asumido en proyecto.
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
};

type ErrorKind = "file" | "report" | "user";

type PendingAction = null | "suspend_account" | "suspend_profile" | "activate_account" | "warn" | "archive";

const mockUsers = (): UserCard[] => [
  { id: "U001", name: "Carlos Ruiz", email: "carlos.ruiz@mail.escuelaing.edu.co", role: "Estudiante", plate: "ABC-123", avatar: avatar1, status: "Pendiente", vehicle: "Toyota Prius 2022" },
  { id: "U002", name: "María Gómez", email: "maria.gomez@mail.escuelaing.edu.co", role: "Acompañante", plate: "XYZ-789", avatar: avatar2, status: "Verificado", vehicle: "Hyundai Accent 2023" },
  { id: "U003", name: "Juan Sánchez", email: "juan.sanchez@mail.escuelaing.edu.co", role: "Conductor", plate: "LMN-456", avatar: avatar3, status: "Suspendido", vehicle: "Renault Logan 2021" },
  { id: "U004", name: "Natalia Perez", email: "natalia.p@mail.escuelaing.edu.co", role: "Profesor", plate: "DEF-222", avatar: null, status: "Pendiente", vehicle: null },
  { id: "U005", name: "Andrés Velas", email: "andres.v@mail.escuelaing.edu.co", role: "Administrador", plate: "GHI-333", avatar: null, status: "Verificado", vehicle: null },
  { id: "U006", name: "Paola Rojas", email: "paola.r@mail.escuelaing.edu.co", role: "Estudiante", plate: "JKL-444", avatar: null, status: "Pendiente", vehicle: null },
];

// Reusable Error modal
const ErrorModal: React.FC<{ open: boolean; kind?: ErrorKind; title?: string; message?: string; onRetry: () => void; onClose: () => void }> = ({ open, kind, title, message, onRetry, onClose }) => {
  if (!open) return null;
  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="error-title" className="fixed inset-0 z-70 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border-2 border-red-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border border-red-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
            </svg>
          </div>

          <h3 id="error-title" className="text-lg font-semibold text-slate-800">{title ?? "Error"}</h3>
          <p className="text-sm text-slate-600 text-center">{message ?? "Ha ocurrido un error."}</p>

          <div className="mt-3 w-full flex justify-center gap-3">
            <button onClick={onRetry} className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50">Reintentar</button>
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Cerrar</button>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-400 text-center">{kind === "file" ? "Error: generación de archivo" : kind === "report" ? "Error: reporte no encontrado" : "Error: acción de usuario"}</div>
      </div>
    </div>
  );
};

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
    <div role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title" className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 id="confirm-modal-title" className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        {pendingAction === "suspend_profile" && (
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-slate-700">Tipo de perfil</legend>
            <div className="mt-2 flex gap-2">
              {( ["Acompañante", "Conductor", "Administrador"] as const ).map((r) => (
                <label key={r} className={`flex-1 border rounded-lg p-2 cursor-pointer text-center ${selectedRole === r ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                  <input type="radio" name="profile" value={r} className="sr-only" checked={selectedRole === r} onChange={() => onRoleChange(r)} />
                  <div className="text-sm font-medium">{r}</div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-700 hover:bg-gray-50">Cancelar</button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium ${pendingAction === "suspend_account" ? "bg-red-600 text-white hover:bg-red-700" : pendingAction === "suspend_profile" ? "bg-orange-600 text-white hover:bg-orange-700" : pendingAction === "activate_account" ? "bg-green-600 text-white hover:bg-green-700" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}>
            {loading ? "Procesando..." : pendingAction === "suspend_account" ? "Confirmar suspensión" : pendingAction === "suspend_profile" ? `Suspender (${selectedRole})` : pendingAction === "activate_account" ? "Activar cuenta" : pendingAction === "warn" ? "Enviar advertencia" : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  const { metrics } = useAdminMetrics();

  const [users] = useState<UserCard[]>(() => mockUsers());

  // search & filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("Todos");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");

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

  // pagination / carousel
  const [userPage, setUserPage] = useState(0);
  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (q) {
      if (!(u.name.toLowerCase().includes(q) || (u.email ?? "").toLowerCase().includes(q) || (u.plate ?? "").toLowerCase().includes(q))) return false;
    }
    if (roleFilter !== "Todos" && roleFilter !== "") {
      if (u.role !== roleFilter) return false;
    }
    if (statusFilter !== "Todos" && statusFilter !== "") {
      if (u.status !== statusFilter) return false;
    }
    return true;
  });

  const userPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  useEffect(() => setUserPage((p) => Math.min(p, Math.max(0, userPages - 1))), [itemsPerPage, userPages]);
  const userStart = userPage * itemsPerPage;
  const visibleUsers = filteredUsers.slice(userStart, userStart + itemsPerPage);

  const userPrev = useCallback(() => setUserPage((p) => Math.max(0, p - 1)), []);
  const userNext = useCallback(() => setUserPage((p) => Math.min(userPages - 1, p + 1)), [userPages]);

  // modal / actions states
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRole, setSelectedRole] = useState<string>("Conductor");
  const [actionLoading, setActionLoading] = useState(false);

  // error handling
  const [errorState, setErrorState] = useState<{ open: boolean; kind?: ErrorKind; title?: string; message?: string }>({ open: false });
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

  const showError = (kind: ErrorKind, title?: string, message?: string) => setErrorState({ open: true, kind, title, message });

  const performAction = async () => {
    if (!selectedUser || !pendingAction) return;
    setActionLoading(true);

    const key = pendingAction;
    attemptsRef.current[key] = (attemptsRef.current[key] || 0) + 1;
    const attempt = attemptsRef.current[key];

    await new Promise((res) => setTimeout(res, 700));

    if (pendingAction === "archive") {
      if (attempt === 1) {
        showError("file", "No se ha generado el archivo", "No se ha generado el archivo. Intenta nuevamente.");
      } else {
        console.log(`Reporte archivado (demo): user ${selectedUser.id}`);
        closeUserModal();
      }
    } else if (pendingAction === "suspend_account") {
      if (attempt === 1) {
        showError("report", "No existe el reporte", "No existe el reporte. Verifica y reintenta.");
      } else {
        console.log(`Cuenta suspendida (demo): user ${selectedUser.id}`);
        closeUserModal();
      }
    } else if (pendingAction === "suspend_profile") {
      if (attempt === 1) {
        showError("user", "No se ha podido suspender el usuario", "No se ha podido suspender el usuario. Reintentar.");
      } else {
        console.log(`Perfil suspendido (${selectedRole}) (demo): user ${selectedUser.id}`);
        closeUserModal();
      }
    } else if (pendingAction === "activate_account") {
      // activation tends to succeed quickly
      console.log(`Cuenta activada (demo): user ${selectedUser.id}`);
      closeUserModal();
    } else if (pendingAction === "warn") {
      console.log(`Advertencia enviada (demo): user ${selectedUser.id}`);
      closeUserModal();
    }

    setActionLoading(false);
    setConfirmOpen(false);
    setPendingAction(null);
  };

  const retryFromError = () => {
    setErrorState({ open: false });
    // Re-open confirm modal for user to confirm again
    setConfirmOpen(true);
  };
  const closeError = () => setErrorState({ open: false });

  // ESC handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (errorState.open) closeError();
        else if (confirmOpen) setConfirmOpen(false);
        else closeUserModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, errorState.open]);

  const severityLabel = useCallback((s?: string) => (s ? s.toUpperCase() : "N/A"), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="absolute inset-0 opacity-6 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between p-6 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/RidECI.jpg" alt="RidECI" className="h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Gestión de usuarios</h1>
              <div className="text-sm text-slate-500">Filtra, valida y administra cuentas</div>
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
        {/* Controls */}
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

        {/* Users carousel / grid */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
          <div className="relative">
            <button onClick={userPrev} disabled={userPage === 0} aria-label="Anterior usuario" title="Anterior usuario" className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/95 shadow flex items-center justify-center hover:bg-gray-100 transition ${userPage === 0 ? "opacity-40 cursor-not-allowed" : ""}`}>
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-6 overflow-hidden px-16">
              {visibleUsers.map((u) => (
                <div key={u.id} className="min-w-0 flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col items-start">
                  <div className="flex items-center gap-4 w-full">
                    {u.avatar ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-0 shadow-md">
                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 mb-0 flex items-center justify-center text-lg font-semibold text-slate-700">{u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                    )}

                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                      <div className="text-xs text-slate-500">{u.role} • {u.vehicle ?? "-"}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500">Placa</div>
                      <div className="font-medium">{u.plate ?? "-"}</div>
                    </div>
                  </div>

                  <div className="mt-4 w-full flex items-center justify-between">
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${u.status === "Pendiente" ? "bg-yellow-50 text-yellow-700" : u.status === "Verificado" ? "bg-green-50 text-green-700" : "bg-purple-50 text-purple-700"}`}>{u.status}</span>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => openUser(u)} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">Ver</button>
                      {u.status === "Suspendido" ? (
                        <button onClick={() => { setSelectedUser(u); setPendingAction("activate_account"); setConfirmOpen(true); }} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-100">Activar</button>
                      ) : (
                        <button onClick={() => { setSelectedUser(u); setPendingAction("suspend_account"); setConfirmOpen(true); }} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-100">Suspender</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={userNext} disabled={userPage >= userPages - 1} aria-label="Siguiente usuario" title="Siguiente usuario" className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/95 shadow flex items-center justify-center hover:bg-gray-100 transition ${userPage >= userPages - 1 ? "opacity-40 cursor-not-allowed" : ""}`}>
              <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Listado completo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredUsers.slice(0, 6).map((u) => (
              <div key={u.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  {u.avatar ? <img src={u.avatar} alt={u.name} className="w-14 h-14 rounded-full object-cover" /> : <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">{u.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>}
                  <div className="flex-1">
                    <div className="font-semibold">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.role} • {u.email}</div>
                  </div>
                  <div>
                    <button onClick={() => openUser(u)} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">Ver</button>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-green-300 bg-green-50 text-green-700">Aprobar</button>
                  <button className="flex-1 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700">Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* User modal */}
      {isUserModalOpen && selectedUser && (
        <div role="dialog" aria-modal="true" aria-labelledby="user-modal-title" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeUserModal} aria-hidden />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="user-modal-title" className="text-xl font-semibold">{selectedUser.name}</h2>
                <div className="text-sm text-slate-500">{selectedUser.role} • {selectedUser.email}</div>
              </div>
              <button onClick={closeUserModal} aria-label="Cerrar" className="text-slate-500 hover:text-slate-700">✕</button>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p>Placa: {selectedUser.plate ?? "-"}</p>
              <p className="mt-2">Vehículo: {selectedUser.vehicle ?? "No aplica"}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => { setPendingAction("suspend_account"); setConfirmOpen(true); }} className="w-full py-2 rounded-lg border border-red-400 bg-red-50 text-red-700 font-medium hover:bg-red-100">Suspender cuenta</button>

              <button onClick={() => { setPendingAction("suspend_profile"); setConfirmOpen(true); }} className="w-full py-2 rounded-lg border border-orange-400 bg-orange-50 text-orange-700 font-medium hover:bg-orange-100">Suspender perfil</button>

              <button onClick={() => { setPendingAction("warn"); setConfirmOpen(true); }} className="w-full py-2 rounded-lg border border-yellow-400 bg-yellow-50 text-yellow-700 font-medium hover:bg-yellow-100">Advertir</button>

              <button onClick={() => { setPendingAction("archive"); setConfirmOpen(true); }} className="w-full py-2 rounded-lg border border-green-300 bg-green-50 text-green-700 font-medium hover:bg-green-100">Archivar</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      <ConfirmModal
        open={confirmOpen}
        title={pendingAction === "suspend_account" ? "Confirmar suspensión de cuenta" : pendingAction === "suspend_profile" ? "Suspender perfil" : pendingAction === "activate_account" ? "Activar cuenta" : pendingAction === "warn" ? "Enviar advertencia" : "Confirmar acción"}
        description={pendingAction === "suspend_account" ? `Vas a suspender la cuenta asociada a ${selectedUser?.name ?? "este usuario"}.` : pendingAction === "suspend_profile" ? `Selecciona qué perfil suspender para ${selectedUser?.name ?? "este usuario"}.` : pendingAction === "activate_account" ? `Vas a activar la cuenta de ${selectedUser?.name ?? "este usuario"}.` : pendingAction === "warn" ? `Enviar una advertencia a ${selectedUser?.name ?? "este usuario"}.` : "Confirma la acción."}
        pendingAction={pendingAction}
        selectedRole={selectedRole}
        onRoleChange={(r) => setSelectedRole(r)}
        loading={actionLoading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={performAction}
      />

      {/* Error modal */}
      <ErrorModal open={errorState.open} kind={errorState.kind} title={errorState.title} message={errorState.message} onRetry={retryFromError} onClose={closeError} />
    </div>
  );
};

export default AdminUsers;
