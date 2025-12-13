// src/modules/administration/components/ErrorModal.tsx

import React from 'react';
import type { ErrorKind } from '../types';

interface ErrorModalProps {
  open: boolean;
  kind?: ErrorKind;
  title?: string;
  message?: string;
  onRetry: () => void;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ 
  open, 
  kind, 
  title, 
  message, 
  onRetry, 
  onClose 
}) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{title ?? "Error"}</h3>
          <p className="text-sm text-slate-600 text-center leading-relaxed">{message ?? "Ha ocurrido un error."}</p>
          <div className="mt-4 w-full flex justify-center gap-3">
            <button 
              onClick={onRetry} 
              className="px-6 py-2.5 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Reintentar
            </button>
            <button 
              onClick={onClose} 
              className="px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};