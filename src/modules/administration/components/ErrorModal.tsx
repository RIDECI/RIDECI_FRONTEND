// src/modules/administration/components/ErrorModal.tsx
import React from "react";

export const ErrorModal: React.FC<{
  open: boolean;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onClose: () => void;
}> = ({ open, title = "Error", message = "Ha ocurrido un error.", onRetry, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border-2 border-red-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border border-red-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-600 text-center">{message}</p>
          <div className="mt-3 w-full flex justify-center gap-3">
            {onRetry && (
              <button onClick={onRetry} className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50">
                Reintentar
              </button>
            )}
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
