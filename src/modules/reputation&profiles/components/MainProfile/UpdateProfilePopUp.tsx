"use client";

import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function UpdateProfilePopUp({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          ¿Estás seguro de actualizar el perfil?
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            className="bg-gray-300 text-black"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            className="bg-blue-600 text-white"
            onClick={onConfirm}
          >
            Sí, actualizar
          </Button>
        </div>
      </div>
    </div>
  );
}