import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { IndividualChat } from "../pages/Conversations";

interface ChatSidebarProps {
  chats: IndividualChat[];
  selectedChat: IndividualChat | null;
  onSelectChat: (chat: IndividualChat) => void;
  getLastMessage: (conversationId: string, participantId: number) => string;
  chatsByTravel: Record<string, IndividualChat[]>;
  currentUserId: number;
}

export function ChatSidebar({
  chats,
  selectedChat,
  onSelectChat,
  getLastMessage,
  chatsByTravel,
  currentUserId
}: ChatSidebarProps) {
  return (
    <div className="w-[400px] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Chats</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar chats" 
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No hay chats disponibles</div>
        ) : (
          <div className="p-2">
            {Object.entries(chatsByTravel).map(([travelId, travelChats]) => (
              <div key={travelId} className="mb-2">
                <div className="px-3 py-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Viaje #{travelId.substring(travelId.length - 4)}
                  </h3>
                </div>
                {travelChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`p-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                      selectedChat?.id === chat.id 
                        ? "bg-blue-50 border border-blue-200" 
                        : "hover:bg-gray-50"
                    } ${!chat.isActive ? "opacity-60" : ""}`}
                    onClick={() => onSelectChat(chat)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${chat.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-gray-800 truncate">
                            {chat.participantName}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            chat.participantName === "Conductor" 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {chat.participantName === "Conductor" ? 'Conductor' : 'Pasajero'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {getLastMessage(chat.conversationId, chat.participantId)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          ID: {chat.participantId} • {chat.role === 'driver' ? 'Yo: Conductor' : 'Yo: Pasajero'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}