// src/modules/administration/contexts/AdminUsersContext.tsx
/**
 * Contexto global para gestionar usuarios del administrador
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { UserCard, PendingAction } from '../types';
import { mockUsers } from '../utils/mockData';

interface AdminUsersContextValue {
  users: UserCard[];
  successMessage: string;
  activeUsersCount: number;
  performUserAction: (
    userId: string,
    action: PendingAction,
    selectedRoles?: string[]
  ) => Promise<{ success: boolean; message: string }>;
  getPendingDrivers: () => UserCard[];
  getFilteredUsers: (searchTerm: string, roleFilter: string, statusFilter: string) => UserCard[];
  clearSuccessMessage: () => void;
}

const AdminUsersContext = createContext<AdminUsersContextValue | null>(null);

export function AdminUsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserCard[]>(() => mockUsers());
  const [successMessage, setSuccessMessage] = useState<string>("");

  /**
   * CORREGIDO: Calcula usuarios activos según nueva lógica
   * Un usuario está activo si:
   * - Status es "Verificado" Y
   * - Tiene al menos UN perfil con status "Activo"
   */
  const activeUsersCount = useMemo(() => {
    return users.filter(u => 
      u.status === "Verificado" && 
      u.profiles.some(p => p.status === "Activo")
    ).length;
  }, [users]);

  /**
   * MEJORADO: Ejecutar acción sobre un usuario
   */
  const performUserAction = useCallback(async (
    userId: string,
    action: PendingAction,
    selectedRoles?: string[]
  ): Promise<{ success: boolean; message: string }> => {
    if (!action || action === "archive") {
      return { success: false, message: "Acción no válida" };
    }

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 700));

    const user = users.find(u => u.id === userId);
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }

    const userName = user.name;
    let message = "Acción realizada";

    switch (action) {
      case "approve": {
        // APROBAR CONDUCTOR
        // Solo cuenta como +1 activo si el usuario NO tenía otros perfiles activos antes
        const hadOtherActiveProfiles = user.profiles.some(p => 
          p.role !== "Conductor" && p.status === "Activo"
        );

        setUsers(prev => prev.map(u => 
          u.id === userId ? { 
            ...u, 
            status: "Verificado",
            profiles: u.profiles.map(p => ({ ...p, status: "Activo" as const }))
          } : u
        ));

        if (hadOtherActiveProfiles) {
          message = `Has aprobado a ${userName} como conductor. Ya tenía otros perfiles activos.`;
        } else {
          message = `Has aprobado a ${userName} como conductor. Usuario ahora está activo.`;
        }
        break;
      }

      case "reject": {
        // RECHAZAR CONDUCTOR
        // El usuario desaparece si solo tiene perfil de conductor
        if (user.profiles.length === 1 && user.profiles[0].role === "Conductor") {
          setUsers(prev => prev.filter(u => u.id !== userId));
          message = `Has rechazado a ${userName}. Su cuenta ha sido eliminada.`;
        } else {
          // Si tiene otros perfiles, remover solo el de conductor
          setUsers(prev => prev.map(u => {
            if (u.id !== userId) return u;
            const newProfiles = u.profiles.filter(p => p.role !== "Conductor");
            const firstActive = newProfiles.find(p => p.status === "Activo") || newProfiles[0];
            return {
              ...u,
              status: "Verificado",
              profiles: newProfiles,
              activeProfile: firstActive
            };
          }));
          message = `Has rechazado a ${userName} como conductor. Mantiene sus otros perfiles.`;
        }
        break;
      }

      case "activate_account": {
        // ACTIVAR CUENTA: Activa TODOS los perfiles
        setUsers(prev => prev.map(u => 
          u.id === userId ? { 
            ...u, 
            status: "Verificado",
            profiles: u.profiles.map(p => ({ ...p, status: "Activo" as const }))
          } : u
        ));
        message = `Has activado la cuenta de ${userName}`;
        break;
      }

      case "activate_profile": {
        // ACTIVAR PERFIL(ES) ESPECÍFICO(S)
        if (!selectedRoles || selectedRoles.length === 0) {
          return { success: false, message: "Debes seleccionar al menos un perfil para activar" };
        }
        
        setUsers(prev => prev.map(u => {
          if (u.id !== userId) return u;
          
          const updatedProfiles = u.profiles.map(p => 
            selectedRoles.includes(p.role) ? { ...p, status: "Activo" as const } : p
          );
          
          // Si hay al menos un perfil activo, el usuario está verificado
          const hasActiveProfiles = updatedProfiles.some(p => p.status === "Activo");
          const firstActive = updatedProfiles.find(p => p.status === "Activo");
          
          return {
            ...u,
            status: hasActiveProfiles ? "Verificado" : u.status,
            profiles: updatedProfiles,
            activeProfile: firstActive || u.activeProfile
          };
        }));
        
        const profilesText = selectedRoles.length > 1 ? 'los perfiles' : 'el perfil';
        message = `Has activado ${profilesText} de ${userName}`;
        break;
      }

      case "suspend_account": {
        // SUSPENDER CUENTA: Suspende TODOS los perfiles
        setUsers(prev => prev.map(u => 
          u.id === userId ? { 
            ...u, 
            status: "Suspendido",
            profiles: u.profiles.map(p => ({ ...p, status: "Suspendido" as const }))
          } : u
        ));
        message = `Has suspendido la cuenta de ${userName}. Usuario ya no está activo.`;
        break;
      }

      case "suspend_profile": {
        // SUSPENDER PERFIL(ES) ESPECÍFICO(S)
        if (!selectedRoles || selectedRoles.length === 0) {
          return { success: false, message: "Debes seleccionar al menos un perfil" };
        }
        
        setUsers(prev => prev.map(u => {
          if (u.id !== userId) return u;
          
          const updatedProfiles = u.profiles.map(p => 
            selectedRoles.includes(p.role) ? { ...p, status: "Suspendido" as const } : p
          );
          
          // Si todos los perfiles están suspendidos, suspender la cuenta
          const allSuspended = updatedProfiles.every(p => p.status === "Suspendido");
          const hasActiveProfiles = updatedProfiles.some(p => p.status === "Activo");
          const firstActive = updatedProfiles.find(p => p.status === "Activo");
          
          return {
            ...u,
            status: allSuspended ? "Suspendido" : (hasActiveProfiles ? "Verificado" : "Suspendido"),
            profiles: updatedProfiles,
            activeProfile: firstActive || updatedProfiles[0]
          };
        }));
        
        const profilesText = selectedRoles.length > 1 ? 'los perfiles' : 'el perfil';
        const allProfilesSuspended = selectedRoles.length === user.profiles.length;
        
        if (allProfilesSuspended) {
          message = `Has suspendido todos los perfiles de ${userName}. Usuario ya no está activo.`;
        } else {
          message = `Has suspendido ${profilesText} de ${userName}. Mantiene otros perfiles activos.`;
        }
        break;
      }

      default:
        return { success: false, message: "Acción no reconocida" };
    }

    // Mensaje de éxito
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);

    return { success: true, message };
  }, [users]);

  /**
   * Obtener conductores pendientes
   */
  const getPendingDrivers = useCallback(() => {
    return users.filter(u => 
      u.status === "Pendiente" && 
      u.activeProfile?.role === "Conductor"
    );
  }, [users]);

  /**
   * Obtener usuarios filtrados
   */
  const getFilteredUsers = useCallback((
    searchTerm: string,
    roleFilter: string,
    statusFilter: string
  ) => {
    return users.filter(u => {
      const q = searchTerm.trim().toLowerCase();
      const ap = u.activeProfile;
      
      // Filtro de búsqueda
      if (q && !(
        u.name.toLowerCase().includes(q) || 
        (u.email ?? "").toLowerCase().includes(q) || 
        (ap?.plate ?? "").toLowerCase().includes(q) ||
        (u.identificationNumber ?? "").toLowerCase().includes(q) ||
        (u.phone ?? "").toLowerCase().includes(q)
      )) {
        return false;
      }
      
      // Filtro de rol
      if (roleFilter !== "Todos" && !u.profiles.some(p => p.role === roleFilter)) {
        return false;
      }
      
      // Filtro de estado
      if (statusFilter !== "Todos" && u.status !== statusFilter) {
        return false;
      }
      
      return true;
    });
  }, [users]);

  /**
   * Limpiar mensaje de éxito
   */
  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage("");
  }, []);

  const value = useMemo(() => ({
    users,
    successMessage,
    activeUsersCount,
    performUserAction,
    getPendingDrivers,
    getFilteredUsers,
    clearSuccessMessage,
  }), [users, successMessage, activeUsersCount, performUserAction, getPendingDrivers, getFilteredUsers, clearSuccessMessage]);

  return (
    <AdminUsersContext.Provider value={value}>
      {children}
    </AdminUsersContext.Provider>
  );
}

/**
 * Hook para usar el contexto
 */
export function useAdminUsers() {
  const context = useContext(AdminUsersContext);
  if (!context) {
    throw new Error('useAdminUsers debe ser usado dentro de AdminUsersProvider');
  }
  return context;
}