import type { IndividualChat } from "../pages/Conversations";
import { CheckCircle } from "lucide-react";

interface ChatHeaderProps {
  chat: IndividualChat;
  onCloseChat?: () => void;
}

export function ChatHeader({ chat, onCloseChat }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b-2 border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800">{chat.participantName}</h2>
              {chat.isActive && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Conectado</span>
                </div>
              )}
            </div>
            <p className="text-sm text-blue-600 font-medium">
              Viaje #{chat.travelId} • {chat.role === 'driver' ? 'Conductor' : 'Pasajero'}
            </p>
          </div>
        </div>
        
        {/* Botón Cerrar Chat */}
        <button
          onClick={onCloseChat}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Cerrar chat
        </button>
      </div>
    </div>
  );
}