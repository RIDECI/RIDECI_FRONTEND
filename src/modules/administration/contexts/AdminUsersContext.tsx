// src/modules/administration/contexts/AdminUsersContext.tsx
/**
 * Contexto global para gestionar usuarios del administrador
 * Comparte estado entre AdminHome, AdminUsers y otras páginas
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { UserCard, PendingAction } from '../types';
import { mockUsers } from '../utils/mockData';

interface AdminUsersContextValue {
  users: UserCard[];
  successMessage: string;
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
   * Ejecutar acción sobre un usuario
   */
  const performUserAction = useCallback(async (
    userId: string,
    action: PendingAction,
    selectedRoles?: string[]
  ): Promise<{ success: boolean; message: string }> => {
    if (!action || action === "archive") {
      return { success: false, message: "Acción no válida" };
    }

    // Simular delay de operación
    await new Promise(resolve => setTimeout(resolve, 700));

    const user = users.find(u => u.id === userId);
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }

    const userName = user.name;
    let message = "Acción realizada";

    // Determinar acción y actualizar usuarios
    switch (action) {
      case "approve":
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: "Verificado" } : u
        ));
        message = `Has aprobado a ${userName} como conductor`;
        break;

      case "reject": {
        // Si el usuario solo tiene el perfil de conductor, eliminarlo completamente
        if (user.profiles.length === 1 && user.profiles[0].role === "Conductor") {
          setUsers(prev => prev.filter(u => u.id !== userId));
          message = `Has rechazado a ${userName} y su cuenta ha sido eliminada`;
        } else {
          // Si tiene otros perfiles, solo remover el perfil de conductor
          setUsers(prev => prev.map(u => {
            if (u.id !== userId) return u;
            const newProfiles = u.profiles.filter(p => p.role !== "Conductor");
            return {
              ...u,
              status: "Verificado",
              profiles: newProfiles,
              activeProfile: newProfiles[0]
            };
          }));
          message = `Has rechazado a ${userName} como conductor. Se mantienen sus otros perfiles`;
        }
        break;
      }

      case "activate_account":
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: "Verificado" } : u
        ));
        message = `Has activado la cuenta de ${userName}`;
        break;

      case "suspend_account":
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: "Suspendido" } : u
        ));
        message = `Has suspendido la cuenta de ${userName}`;
        break;

      case "suspend_profile": {
        if (!selectedRoles || selectedRoles.length === 0) {
          return { success: false, message: "Debes seleccionar al menos un perfil" };
        }
        
        // Si se suspenden todos los perfiles, suspender la cuenta completa
        if (selectedRoles.length === user.profiles.length) {
          setUsers(prev => prev.map(u => 
            u.id === userId ? { ...u, status: "Suspendido" } : u
          ));
          message = `Has suspendido todos los perfiles de ${userName}. La cuenta ha sido suspendida`;
        } else {
          // Remover los perfiles seleccionados
          setUsers(prev => prev.map(u => {
            if (u.id !== userId) return u;
            const newProfiles = u.profiles.filter(p => !selectedRoles.includes(p.role));
            return {
              ...u,
              profiles: newProfiles,
              activeProfile: newProfiles[0]
            };
          }));
          const profilesText = selectedRoles.length > 1 ? 'los perfiles' : 'el perfil';
          message = `Has suspendido ${profilesText} de ${userName}`;
        }
        break;
      }

      default:
        return { success: false, message: "Acción no reconocida" };
    }

    // Establecer mensaje de éxito
    setSuccessMessage(message);
    
    // Auto-limpiar mensaje después de 3 segundos
    setTimeout(() => setSuccessMessage(""), 3000);

    return { success: true, message };
  }, [users]);

  /**
   * Obtener conductores pendientes de aprobación
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
   * Limpiar mensaje de éxito manualmente
   */
  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage("");
  }, []);

  const value = useMemo(() => ({
    users,
    successMessage,
    performUserAction,
    getPendingDrivers,
    getFilteredUsers,
    clearSuccessMessage,
  }), [users, successMessage, performUserAction, getPendingDrivers, getFilteredUsers, clearSuccessMessage]);

  return (
    <AdminUsersContext.Provider value={value}>
      {children}
    </AdminUsersContext.Provider>
  );
}

/**
 * Hook para usar el contexto de usuarios
 */
export function useAdminUsers() {
  const context = useContext(AdminUsersContext);
  if (!context) {
    throw new Error('useAdminUsers debe ser usado dentro de AdminUsersProvider');
  }
  return context;
}