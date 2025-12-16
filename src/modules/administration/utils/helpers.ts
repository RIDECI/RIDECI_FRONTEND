// src/modules/administration/utils/helpers.ts

import type { UserCard } from '../types';

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "CRÍTICA": return "bg-red-100 text-red-700";
    case "ALTA": return "bg-orange-100 text-orange-700";
    case "MEDIA": return "bg-purple-100 text-purple-700";
    case "BAJA": return "bg-blue-100 text-blue-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ABIERTO": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "EN INVESTIGACIÓN": return "bg-purple-50 text-purple-700 border border-purple-200";
    case "RESUELTO": return "bg-green-50 text-green-700 border border-green-200";
    case "CRÍTICO": return "bg-red-50 text-red-700 border border-red-200";
    default: return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

export const getUserStatusColor = (status?: string) => {
  switch (status) {
    case "Pendiente": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "Verificado": return "bg-green-50 text-green-700 border border-green-200";
    case "Suspendido": return "bg-purple-50 text-purple-700 border border-purple-200";
    case "Bloqueado": return "bg-red-50 text-red-700 border border-red-200";
    default: return "bg-gray-50 text-slate-700";
  }
};

// Utilidad para buscar usuario por nombre (case-insensitive, partial match)
export function findUserByName(users: UserCard[], name?: string): UserCard | null {
  if (!name) return null;
  const n = name.toLowerCase();
  const found = users.find(u => 
    u.name.toLowerCase().includes(n) || n.includes(u.name.toLowerCase())
  );
  return found ?? null;
}