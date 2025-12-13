"use client";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DeleteProfilePopUp({ open, onClose }) {
  if (!open) return null;

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
            className="w-full"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-blue-500 text-white px-6"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button className="bg-red-500 text-white px-6">
            Eliminar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}