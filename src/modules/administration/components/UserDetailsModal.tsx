// src/modules/administration/components/UserDetailsModal.tsx
/**
 * Modal mejorado de detalles de usuario
 * MEJORAS:
 * - Botones de suspender más visibles y profesionales
 * - Más información del usuario visible
 * - Mejor UX y organización
 */

import React from 'react';
import type { UserCard } from '../types';
import { X, Shield, AlertTriangle, CheckCircle, Ban } from 'lucide-react';
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
  onActivateProfile: () => void;
}

export function UserDetailsModal({
  open,
  user,
  selectedProfileRole,
  onProfileChange,
  onClose,
  onSuspendAccount,
  onSuspendProfile,
  onActivateAccount,
  onActivateProfile,
}: UserDetailsModalProps) {
  if (!open || !user) return null;

  const activeProfile = user.profiles.find(p => p.role === selectedProfileRole) || user.profiles[0];
  const isSuspendedOrBlocked = user.status === "Suspendido" || user.status === "Bloqueado";
  const hasMultipleProfiles = user.profiles.length > 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.profilePictureUrl || ''}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getUserStatusColor(user.status)}`}>
                  {user.status}
                </span>
                <span className="text-sm text-blue-100">ID: {user.id}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información personal */}
          <section className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Información Personal
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Email</p>
                <p className="text-gray-900 font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Teléfono</p>
                <p className="text-gray-900 font-semibold">{user.phone || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Tipo de ID</p>
                <p className="text-gray-900 font-semibold">{user.identificationType || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Número de ID</p>
                <p className="text-gray-900 font-semibold">{user.identificationNumber || 'No especificado'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 font-medium">Fecha de nacimiento</p>
                <p className="text-gray-900 font-semibold">
                  {user.birthDate ? new Date(user.birthDate).toLocaleDateString('es-CO') : 'No especificado'}
                </p>
              </div>
            </div>
          </section>

          {/* Selector de perfiles */}
          {user.profiles.length > 1 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seleccionar Perfil</h3>
              <div className="flex gap-2 flex-wrap">
                {user.profiles.map((profile) => (
                  <button
                    key={profile.role}
                    onClick={() => onProfileChange(profile.role)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedProfileRole === profile.role
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {profile.role}
                    {profile.status === "Suspendido" && (
                      <Ban className="inline w-4 h-4 ml-1 text-red-500" />
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Detalles del perfil seleccionado */}
          <section className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Perfil: {activeProfile.role}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 font-medium">Rating</p>
                <p className="text-gray-900 font-bold text-lg">
                  ⭐ {activeProfile.rating?.toFixed(1) || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Estado del perfil</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  activeProfile.status === "Activo" 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {activeProfile.status}
                </span>
              </div>
              {(activeProfile.role === "Conductor" || activeProfile.role === "Acompañante") && (
                <>
                  <div>
                    <p className="text-gray-600 font-medium">Placa</p>
                    <p className="text-gray-900 font-semibold">{activeProfile.plate || 'No especificada'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Vehículo</p>
                    <p className="text-gray-900 font-semibold">{activeProfile.vehicle || 'No especificado'}</p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Acciones */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Acciones</h3>
            
            {isSuspendedOrBlocked ? (
              // Usuario suspendido/bloqueado - Mostrar opciones de activación
              <div className="space-y-3">
                <button
                  onClick={onActivateAccount}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Activar Cuenta Completa
                </button>
                
                {hasMultipleProfiles && (
                  <button
                    onClick={onActivateProfile}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Activar Perfiles Específicos
                  </button>
                )}
              </div>
            ) : (
              // Usuario activo - Mostrar opciones de suspensión
              <div className="space-y-3">
                <button
                  onClick={onSuspendAccount}
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Ban className="w-5 h-5" />
                  Suspender Cuenta Completa
                </button>
                
                {hasMultipleProfiles && (
                  <button
                    onClick={onSuspendProfile}
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Suspender Perfiles Específicos
                  </button>
                )}
              </div>
            )}

            {/* Advertencia si es el único perfil */}
            {!hasMultipleProfiles && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Este usuario solo tiene un perfil. Suspender el perfil equivale a suspender la cuenta.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}