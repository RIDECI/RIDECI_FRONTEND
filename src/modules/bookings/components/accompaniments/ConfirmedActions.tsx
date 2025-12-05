import { MessageCircle } from 'lucide-react';

interface ConfirmedActionsProps {
  onChat: () => void;
  onCancel: () => void;
}

export function ConfirmedActions({ onChat, onCancel }: ConfirmedActionsProps) {
  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={onChat}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Ir al chat con el acompañante</span>
      </button>
      <button
        onClick={onCancel}
        className="flex-1 py-3 bg-white text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
      >
        Cancelar acompañamiento
      </button>
    </div>
  );
}