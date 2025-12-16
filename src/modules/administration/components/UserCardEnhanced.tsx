// src/modules/administration/components/UserCardEnhanced.tsx
/**
 * Tarjeta de usuario mejorada con indicadores de perfiles suspendidos
 * Muestra badges y botones específicos según el estado de los perfiles
 */

import React from 'react';
import type { UserCard } from '../types';
import { avatar1 } from '../utils/mockData';
import { getUserStatusColor } from '../utils/helpers';

interface UserCardEnhancedProps {
  user: UserCard;
  onView: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onActivateAccount?: () => void;
  onActivateProfiles?: () => void;
}

export const UserCardEnhanced: React.FC<UserCardEnhancedProps> = ({
  user,
  onView,
  onApprove,
  onReject,
  onActivateAccount,
  onActivateProfiles,
}) => {
  // Verificar estados de perfiles
  const hasSuspendedProfiles = user.profiles.some(p => p.status === "Suspendido");
  const suspendedProfilesCount = user.profiles.filter(p => p.status === "Suspendido").length;
  const isAccountSuspendedOrBlocked = user.status === "Suspendido" || user.status === "Bloqueado";
  const isPending = user.status === "Pendiente" && user.activeProfile?.role === "Conductor";

  return (
    <div 
      className="relative rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[220px] flex flex-col"
      style={{ backgroundColor: '#CAE8FF' }}
    >
      {/* Botón Ver */}
      <button 
        onClick={onView}
        className="absolute top-4 right-4 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm z-10 cursor-pointer"
      >
        Ver
      </button>

      {/* Badge de Perfiles Suspendidos */}
      {hasSuspendedProfiles && !isAccountSuspendedOrBlocked && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 border border-orange-300 rounded-lg">
            <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-orange-700">
              {suspendedProfilesCount} perfil{suspendedProfilesCount > 1 ? 'es' : ''} suspendido{suspendedProfilesCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="flex items-start gap-4 mb-auto">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <img 
            src={user.profilePictureUrl || avatar1} 
            alt={user.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-50 shadow-sm"
          />
          {/* Indicador de perfiles suspendidos en avatar */}
          {hasSuspendedProfiles && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          )}
        </div>

        {/* Información */}
        <div className="flex-1 min-w-0 pr-16">
          <h4 className="font-bold text-gray-900 truncate text-sm leading-tight">{user.name}</h4>
          <div className="text-xs text-slate-500 font-medium mt-1">{user.activeProfile?.role}</div>
          <div className="text-xs text-slate-400 truncate mt-0.5">{user.email}</div>
          <div className="text-xs text-slate-400 truncate">{user.activeProfile?.vehicle || user.phone}</div>
        </div>
      </div>

      {/* Estado */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getUserStatusColor(user.status)}`}>
          {user.status}
        </span>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-2">
        {isPending && onApprove && onReject && (
          <>
            <button 
              onClick={onApprove}
              className="flex-1 py-2 text-sm rounded-lg border-2 border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-semibold shadow-sm cursor-pointer"
            >
              Aprobar
            </button>
            <button 
              onClick={onReject}
              className="flex-1 py-2 text-sm rounded-lg border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-semibold shadow-sm cursor-pointer"
            >
              Rechazar
            </button>
          </>
        )}

        {isAccountSuspendedOrBlocked && onActivateAccount && (
          <button 
            onClick={onActivateAccount}
            className="w-full py-2.5 border-2 border-green-400 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold cursor-pointer"
          >
            Activar cuenta
          </button>
        )}

        {/* ⭐ NUEVO: Botón verde para activar perfiles suspendidos */}
        {!isAccountSuspendedOrBlocked && hasSuspendedProfiles && onActivateProfiles && (
          <button 
            onClick={onActivateProfiles}
            className="w-full py-2.5 border-2 border-green-400 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activar perfil{suspendedProfilesCount > 1 ? 'es' : ''}
          </button>
        )}
      </div>
    </div>
  );
};