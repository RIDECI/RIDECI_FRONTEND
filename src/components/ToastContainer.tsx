import React from "react";
import { useToast, type Toast as ToastType } from "./ToastContext";
import { X, CheckCircle, AlertCircle, Info, Car, MessageCircle } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type: ToastType['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error': return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'trip': return <Car className="w-6 h-6 text-blue-500" />;
      case 'message': return <MessageCircle className="w-6 h-6 text-purple-500" />;
      default: return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  const getBorderColor = (type: ToastType['type']) => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'error': return 'border-l-red-500';
      case 'trip': return 'border-l-blue-500';
      case 'message': return 'border-l-purple-500';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto
            flex items-start gap-3 
            bg-white p-4 rounded-lg shadow-lg 
            border border-gray-100 border-l-4 ${getBorderColor(toast.type)}
            transform transition-all duration-300 ease-in-out
            animate-in slide-in-from-right
          `}
        >
          <div className="flex-shrink-0 mt-1">
            {getIcon(toast.type)}
          </div>

          <div className="flex-1 mr-2">
            {toast.title && (
              <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                {toast.title}
              </h4>
            )}
            <p className="text-gray-600 text-sm leading-relaxed">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 0.98;
          }
        }
      `}</style>
    </div>
  );
}
