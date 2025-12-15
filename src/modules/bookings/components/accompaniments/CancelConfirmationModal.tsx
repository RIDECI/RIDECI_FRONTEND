import { AlertTriangle, X } from 'lucide-react';

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CancelConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: CancelConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full mx-4 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Confirmar cancelación
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Por favor confirma la cancelación de tu reserva
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-white text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}