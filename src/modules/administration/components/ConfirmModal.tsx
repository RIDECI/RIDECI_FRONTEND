// src/modules/administration/components/ConfirmModal.tsx
import React from "react";
import type { PendingAction, Profile } from "../types";

export const ConfirmModal: React.FC<{
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
}> = ({ open, title, description, pendingAction, selectedRoles, availableProfiles, onRoleToggle, loading, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        {pendingAction === "suspend_profile" && (
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-slate-700 mb-2">Selecciona perfiles a suspender:</legend>
            <div className="space-y-2">
              {availableProfiles.map((profile) => (
                <label
                  key={profile.role}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedRoles.includes(profile.role) ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(profile.role)}
                    onChange={() => onRoleToggle(profile.role)}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{profile.role}</div>
                    <div className="text-xs text-slate-500">Rating: {profile.rating.toFixed(1)}</div>
                  </div>
                </label>
              ))}
            </div>
            {selectedRoles.length === 0 && (
              <p className="mt-2 text-xs text-red-600">Debes seleccionar al menos un perfil</p>
            )}
          </fieldset>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || (pendingAction === "suspend_profile" && selectedRoles.length === 0)}
            className={`px-4 py-2 rounded-lg font-medium ${pendingAction === "suspend_account" || pendingAction === "reject" ? "bg-red-600 text-white hover:bg-red-700" : pendingAction === "suspend_profile" ? "bg-orange-600 text-white hover:bg-orange-700" : pendingAction === "activate_account" || pendingAction === "approve" ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};
