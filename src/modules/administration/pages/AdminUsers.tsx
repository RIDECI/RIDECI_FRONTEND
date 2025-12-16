// src/modules/administration/pages/AdminUsers.tsx
/**
 * Página de gestión de usuarios MEJORADA
 */

import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import type { UserCard, PendingAction } from '../types';
import { avatar1 } from '../utils/mockData';
import { getUserStatusColor } from '../utils/helpers';
import { ErrorModal } from '../components/ErrorModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { UserDetailsModal } from '../components/UserDetailsModal';
import { useAdminUsers } from '../hooks/useAdminUsers';

const AdminUsers: React.FC = () => {
  const { users, successMessage, performUserAction, getFilteredUsers, activeUsersCount } = useAdminUsers();
  
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("Todos");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");

  // Carrusel superior
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

  // Usar la función de filtrado del hook
  const filteredUsers = getFilteredUsers(search, roleFilter, statusFilter);

  // ========================================
  // CARRUSEL SUPERIOR (paginación)
  // ========================================
  const [userPage, setUserPage] = useState(0);
  
  useEffect(() => setUserPage(0), [filteredUsers.length, itemsPerPage]);

  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const userPrev = useCallback(() => {
    setUserPage(prev => Math.max(0, prev - 1));
  }, []);

  const userNext = useCallback(() => {
    setUserPage(prev => Math.min(totalUserPages - 1, prev + 1));
  }, [totalUserPages]);

  const visibleUsers = filteredUsers.slice(
    userPage * itemsPerPage,
    (userPage + 1) * itemsPerPage
  );

  const canGoPrev = userPage > 0;
  const canGoNext = userPage < totalUserPages - 1;

  // ========================================
  // LISTADO COMPLETO (paginación)
  // ========================================
  const [fullListPage, setFullListPage] = useState(0);
  const fullListItemsPerPage = 12; // Mostrar 12 usuarios por página en el listado completo

  useEffect(() => setFullListPage(0), [filteredUsers.length]);

  const totalFullListPages = Math.ceil(filteredUsers.length / fullListItemsPerPage);

  const fullListPrev = useCallback(() => {
    setFullListPage(prev => Math.max(0, prev - 1));
  }, []);

  const fullListNext = useCallback(() => {
    setFullListPage(prev => Math.min(totalFullListPages - 1, prev + 1));
  }, [totalFullListPages]);

  const visibleFullListUsers = filteredUsers.slice(
    fullListPage * fullListItemsPerPage,
    (fullListPage + 1) * fullListItemsPerPage
  );

  const canFullListGoPrev = fullListPage > 0;
  const canFullListGoNext = fullListPage < totalFullListPages - 1;

  // ========================================
  // MODALES Y ACCIONES
  // ========================================
  const [selectedUser, setSelectedUser] = useState<UserCard | null>(null);
  const [selectedProfileRole, setSelectedProfileRole] = useState<string>("Conductor");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [selectedRolesToSuspend, setSelectedRolesToSuspend] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorState, setErrorState] = useState({ open: false, title: "", message: "" });

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
    if ((action === "suspend_profile" || action === "activate_profile") && selectedUser) {
      setSelectedRolesToSuspend([]);
    }
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

  // Usar el hook centralizado para ejecutar acciones
  const performAction = async () => {
    if (!selectedUser || !pendingAction) return;
    
    setActionLoading(true);

    const result = await performUserAction(
      selectedUser.id,
      pendingAction,
      selectedRolesToSuspend
    );

    setActionLoading(false);
    
    if (result.success) {
      setConfirmOpen(false);
      setPendingAction(null);
      closeUserModal();
    } else {
      setErrorState({ 
        open: true, 
        title: "Error", 
        message: result.message 
      });
    }
  };

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
      <header className="relative z-10 flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Gestión de usuarios</h1>
          <div className="text-sm text-slate-500">Gestiona perfiles, valida conductores y supervisa la comunidad</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">Usuarios activos</div>
            <div className="text-2xl font-bold text-blue-600">{activeUsersCount}</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            A
          </div>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Filtros */}
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

        {/* Carrusel Superior */}
        <section className="relative mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={userPrev}
              disabled={!canGoPrev}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer ${
                !canGoPrev ? "opacity-40 cursor-not-allowed" : ""
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
                    className="rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative h-[220px] flex flex-col"
                    style={{ backgroundColor: '#CAE8FF' }}
                  >
                    <button 
                      onClick={() => openUser(u)} 
                      className="absolute top-4 right-4 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm z-10 cursor-pointer"
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

                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getUserStatusColor(u.status)}`}>
                        {u.status}
                      </span>
                    </div>

                    {/* Botones según el estado */}
                    {u.status === "Pendiente" && u.activeProfile?.role === "Conductor" && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedUser(u);
                            startConfirm("approve");
                          }}
                          className="flex-1 py-2 text-sm rounded-lg border-2 border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-semibold shadow-sm cursor-pointer"
                        >
                          Aprobar
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedUser(u);
                            startConfirm("reject");
                          }}
                          className="flex-1 py-2 text-sm rounded-lg border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-semibold shadow-sm cursor-pointer"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}

                    {(u.status === "Suspendido" || u.status === "Bloqueado") && (
                      <button 
                        onClick={() => {
                          setSelectedUser(u);
                          startConfirm("activate_account");
                        }}
                        className="w-full py-2.5 border-2 border-green-400 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold shadow-sm cursor-pointer"
                      >
                        Activar cuenta
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-slate-500">No se encontraron usuarios.</div>
              )}
            </div>

            <button
              onClick={userNext}
              disabled={!canGoNext}
              className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer ${
                !canGoNext ? "opacity-40 cursor-not-allowed" : ""
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
            <span className="text-sm font-semibold text-blue-700">
              Listado completo • Página {fullListPage + 1} de {totalFullListPages || 1}
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Listado Completo con Paginación */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleFullListUsers.map((u) => (
              <div 
                key={u.id} 
                className="rounded-xl p-5 border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 h-[220px] flex flex-col" 
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
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUserStatusColor(u.status)}`}>
                        {u.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => openUser(u)} 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0 shadow-sm cursor-pointer"
                  >
                    Ver
                  </button>
                </div>
                
                {/* Botones según el estado */}
                {u.status === "Pendiente" && u.activeProfile?.role === "Conductor" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        startConfirm("approve");
                      }}
                      className="flex-1 py-2 text-sm rounded-lg border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium cursor-pointer"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        startConfirm("reject");
                      }}
                      className="flex-1 py-2 text-sm rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium cursor-pointer"
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                {(u.status === "Suspendido" || u.status === "Bloqueado") && (
                  <button 
                    onClick={() => {
                      setSelectedUser(u);
                      startConfirm("activate_account");
                    }}
                    className="mt-4 w-full py-2 border-2 border-green-300 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold cursor-pointer"
                  >
                    Activar cuenta
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Paginación del Listado Completo */}
          {totalFullListPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={fullListPrev}
                disabled={!canFullListGoPrev}
                className={`px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium cursor-pointer ${
                  !canFullListGoPrev ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Anterior
              </button>
              <span className="px-4 py-2 text-sm text-slate-600">
                Página {fullListPage + 1} de {totalFullListPages}
              </span>
              <button
                onClick={fullListNext}
                disabled={!canFullListGoNext}
                className={`px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium cursor-pointer ${
                  !canFullListGoNext ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
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

      <UserDetailsModal
        open={isUserModalOpen}
        user={selectedUser}
        selectedProfileRole={selectedProfileRole}
        onProfileChange={handleProfileChange}
        onClose={closeUserModal}
        onSuspendAccount={() => startConfirm("suspend_account")}
        onSuspendProfile={() => startConfirm("suspend_profile")}
        onActivateAccount={() => startConfirm("activate_account")}
        onActivateProfile={() => startConfirm("activate_profile")}
      />

      <ConfirmModal
        open={confirmOpen}
        title={
          pendingAction === "suspend_account"
            ? "Confirmar suspensión de cuenta"
            : pendingAction === "suspend_profile"
            ? "Suspender perfil(es)"
            : pendingAction === "activate_account"
            ? "Activar cuenta"
            : pendingAction === "activate_profile"
            ? "Activar perfil(es)"
            : pendingAction === "approve"
            ? "Aprobar conductor"
            : pendingAction === "reject"
            ? "Rechazar conductor"
            : "Confirmar acción"
        }
        description={
          pendingAction === "approve"
            ? `¿Estás seguro de que deseas aprobar a ${selectedUser?.name} como conductor? Esta acción cambiará su estado a Verificado y podrá comenzar a ofrecer viajes.`
            : pendingAction === "reject"
            ? `¿Estás seguro de que deseas rechazar la solicitud de ${selectedUser?.name}? Esta acción bloqueará su cuenta y no podrá acceder como conductor.`
            : pendingAction === "suspend_profile"
            ? `Selecciona los perfiles que deseas suspender para ${selectedUser?.name}.`
            : pendingAction === "activate_account"
            ? `¿Estás seguro de que deseas activar la cuenta de ${selectedUser?.name}? Esta acción cambiará su estado a Verificado.`
            : pendingAction === "activate_profile"
            ? `Selecciona los perfiles que deseas activar para ${selectedUser?.name}.`
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
        title={errorState.title}
        message={errorState.message}
        onRetry={retryFromError}
        onClose={closeError}
      />
    </div>
  );
};

export default AdminUsers;