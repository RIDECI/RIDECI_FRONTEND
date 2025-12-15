// src/modules/administration/components/UserDetailsModal.tsx

import React from 'react';
import type { UserCard } from '../types';
import { avatar1 } from '../utils/mockData';
import { StarRating } from './StarRating';
import { getUserStatusColor } from '../utils/helpers';

interface UserDetailsModalProps {
  open: boolean;
  user: UserCard | null;
  selectedProfileRole: string;
  onProfileChange: (role: string) => void;
  onClose: () => void;
  onSuspendAccount: () => void;
  onSuspendProfile: () => void;
  onActivateAccount: () => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  open,
  user,
  selectedProfileRole,
  onProfileChange,
  onClose,
  onSuspendAccount,
  onSuspendProfile,
  onActivateAccount
}) => {
  if (!open || !user) return null;

  const currentProfile = user.profiles.find(p => p.role === selectedProfileRole);
  const rating = currentProfile?.rating ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="flex items-start gap-6">
          {/* Avatar y Rating */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative">
              <img 
                src={user.profilePictureUrl || avatar1} 
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
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
          </div>

          {/* Información del usuario */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <div className="text-sm text-slate-500 mt-1.5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {user.email}
                </div>
                <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {user.phone}
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 transition-colors ml-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Detalles en tabla */}
            <div className="space-y-3 text-sm bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="grid grid-cols-[140px_1fr] gap-3 items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-slate-700">Perfil activo:</span>
                <select
                  value={selectedProfileRole}
                  onChange={(e) => onProfileChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-slate-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  {user.profiles.map(profile => (
                    <option key={profile.role} value={profile.role}>
                      {profile.role} (★ {profile.rating.toFixed(1)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-3 items-center py-2 border-b border-gray-200">
                <span className="font-semibold text-slate-700">Estado:</span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit ${getUserStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>

              {user.identificationType && (
                <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                  <span className="font-semibold text-slate-700">Tipo ID:</span>
                  <span className="text-slate-600">{user.identificationType}</span>
                </div>
              )}

              {user.identificationNumber && (
                <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                  <span className="font-semibold text-slate-700">Número ID:</span>
                  <span className="text-slate-600 font-mono">{user.identificationNumber}</span>
                </div>
              )}

              {user.birthDate && (
                <div className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b border-gray-200">
                  <span className="font-semibold text-slate-700">Fecha de nac.:</span>
                  <span className="text-slate-600">
                    {new Date(user.birthDate).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

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
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(user.status === "Suspendido" || user.status === "Bloqueado") ? (
            <button
              onClick={onActivateAccount}
              className="w-full py-3 rounded-lg border-2 border-green-400 bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-all shadow-sm hover:shadow-md"
            >
              Activar cuenta
            </button>
          ) : (
            <button
              onClick={onSuspendAccount}
              className="w-full py-3 rounded-lg border-2 border-red-400 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-all shadow-sm hover:shadow-md"
            >
              Suspender cuenta
            </button>
          )}

          <button
            onClick={onSuspendProfile}
            className="w-full py-3 rounded-lg border-2 border-orange-400 bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100 transition-all shadow-sm hover:shadow-md"
          >
            Suspender perfil(es)
          </button>
        </div>
      </div>
    </div>
  );
};