"use client";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteProfileHook } from "../../hooks/DeleteProfile/deleteProfileHook";

export default function DeleteProfilePopUp({ open, onClose, onProfileDeleted, profileId }) {
  if (!open) return null;

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    // In a real implementation, we would need to authenticate the user before deletion
    // For now, we'll call the delete hook with the passed profile ID
    const result = await deleteProfileHook(profileId || "1"); // Use provided ID or default to "1"

    if (result.success) {
      if (onProfileDeleted) {
        onProfileDeleted();
      }
      onClose();
    } else {
      setError(result.error || "Error al eliminar el perfil");
    }

    setLoading(false);
  };

  const handleConfirm = () => {
    if (!password) {
      setError("Por favor ingresa tu contraseña");
      return;
    }

    handleDelete();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[500px]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Eliminar Perfil
        </h2>

        {/* Mensaje de advertencia */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex gap-3">
          <IoWarningOutline className="text-red-600 w-10 h-10 flex-shrink-0" />

          <p className="text-gray-700 text-sm leading-relaxed">
            Esta acción es irreversible y eliminará permanentemente todos tus datos,
            incluyendo historial de viajes, valoraciones, rutas guardadas e
            información personal.
            <br />
            <span className="font-medium">
              Para continuar, por favor introduce tu contraseña.
            </span>
          </p>
        </div>

        {/* Input contraseña */}
        <div className="mt-6">
          <label className="block text-gray-700 mb-1 font-medium">Contraseña:</label>
          <Input
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-blue-500 text-white px-6"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            className="bg-red-500 text-white px-6"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar Perfil"}
          </Button>
        </div>
      </div>
    </div>
  );
}
