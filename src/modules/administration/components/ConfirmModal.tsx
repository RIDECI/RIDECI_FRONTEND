// src/modules/administration/components/ConfirmModal.tsx

import React from 'react';
import type { PendingAction, Profile } from '../types';

interface ConfirmModalProps {
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
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  description,
  pendingAction,
  selectedRoles,
  availableProfiles,
  onRoleToggle,
  loading,
  onCancel,
  onConfirm
}) => {
  if (!open) return null;
  
  const needsRoleSelection = pendingAction === "suspend_profile" || pendingAction === "activate_profile";
  
  // Filtrar perfiles según la acción
  // - Para activar: solo mostrar perfiles suspendidos
  // - Para suspender: solo mostrar perfiles activos
  const selectableProfiles = pendingAction === "activate_profile" 
    ? availableProfiles.filter(p => p.status === "Suspendido")
    : pendingAction === "suspend_profile"
    ? availableProfiles.filter(p => p.status === "Activo")
    : availableProfiles;
  
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{description}</p>

        {needsRoleSelection && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-slate-700 mb-3">
              {pendingAction === "suspend_profile" 
                ? "Selecciona perfiles activos a suspender:" 
                : "Selecciona perfiles suspendidos a activar:"}
            </legend>
            
            {/* ⭐ NUEVO: Mostrar mensaje si no hay perfiles para seleccionar */}
            {selectableProfiles.length === 0 ? (
              <div className="text-sm text-slate-500 text-center py-4 bg-gray-50 rounded-lg">
                {pendingAction === "activate_profile" 
                  ? "No hay perfiles suspendidos para activar"
                  : "No hay perfiles activos para suspender"}
              </div>
            ) : (
              <div className="space-y-2">
                {selectableProfiles.map((profile) => (
                  <label
                    key={profile.role}
                    className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedRoles.includes(profile.role)
                        ? pendingAction === "suspend_profile"
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(profile.role)}
                      onChange={() => onRoleToggle(profile.role)}
                      className={`w-5 h-5 rounded focus:ring-2 cursor-pointer ${
                        pendingAction === "suspend_profile"
                          ? "text-orange-600 focus:ring-orange-500"
                          : "text-blue-600 focus:ring-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">
                        {profile.role}
                        {/* ⭐ NUEVO: Mostrar indicador de estado suspendido */}
                        {profile.status === "Suspendido" && (
                          <span className="ml-2 text-xs text-orange-600">(Suspendido)</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">Rating: {profile.rating.toFixed(1)} ⭐</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            
            {selectableProfiles.length > 0 && selectedRoles.length === 0 && (
              <p className="mt-3 text-xs text-red-600 font-medium">
                ⚠️ Debes seleccionar al menos un perfil
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border-2 border-gray-300 bg-white text-slate-700 hover:bg-gray-50 font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || (needsRoleSelection && selectedRoles.length === 0)}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer ${
              pendingAction === "suspend_account" || pendingAction === "reject"
                ? "bg-red-600 text-white hover:bg-red-700"
                : pendingAction === "suspend_profile"
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : pendingAction === "activate_account" || pendingAction === "approve" || pendingAction === "activate_profile"
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