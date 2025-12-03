import type { IndividualChat } from "../pages/Conversations";
import { CheckCircle } from "lucide-react";

interface ChatHeaderProps {
  chat: IndividualChat;
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
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
            <p className="text-sm text-gray-500">
              Viaje #{chat.travelId} • {chat.role === 'driver' ? 'Conductor' : 'Pasajero'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}