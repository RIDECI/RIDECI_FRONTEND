import React, { useState } from "react";
import { Search, MessageSquare, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { IndividualChat } from "../pages/Conversations";

interface ChatSidebarProps {
  chats: IndividualChat[];
  selectedChat: IndividualChat | null;
  onSelectChat: (chat: IndividualChat) => void;
  getLastMessage: (conversationId: string, participantId: number) => string;
  chatsByTravel: Record<string, IndividualChat[]>;
  currentUserId: number;
  getUnreadCount: (conversationId: string, participantId: number) => number;
}

export function ChatSidebar({
  chats,
  selectedChat,
  onSelectChat,
  getLastMessage,
  chatsByTravel,
  currentUserId,
  getUnreadCount
}: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChatsByTravel = Object.entries(chatsByTravel).reduce((acc, [travelId, travelChats]) => {
    const filtered = travelChats.filter(chat => 
      chat.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLastMessage(chat.conversationId, chat.participantId).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filtered.length > 0) {
      acc[travelId] = filtered;
    }
    
    return acc;
  }, {} as Record<string, IndividualChat[]>);

  return (
    <div className="w-[400px] bg-white flex flex-col border-r-2 border-gray-200">
      {/* Encabezado */}
      <div className="p-6 border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Chats</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar chats" 
            className="pl-10 bg-gray-50 border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Lista de chats */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
            <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
            <p>No hay chats disponibles</p>
            <p className="text-sm mt-1">Los chats aparecerán aquí cuando tengas conversaciones activas</p>
          </div>
        ) : Object.keys(filteredChatsByTravel).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
            <Search className="h-12 w-12 text-gray-300 mb-3" />
            <p>No se encontraron chats</p>
            <p className="text-sm mt-1">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="p-3">
            {Object.entries(filteredChatsByTravel).map(([travelId, travelChats]) => (
              <div key={travelId} className="mb-4">
                {/* Encabezado del viaje */}
                <div className="px-3 py-2 mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      Viaje #{travelId.substring(travelId.length - 4)}
                    </h3>
                  </div>
                </div>
                
                {/* Lista de chats del viaje */}
                {travelChats.map(chat => {
                  const lastMessage = getLastMessage(chat.conversationId, chat.participantId);
                  const isSelected = selectedChat?.id === chat.id;
                  const unreadCount = getUnreadCount(chat.conversationId, chat.participantId);
                  
                  return (
                    <div
                      key={chat.id}
                      className={`relative mb-1 mx-1 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                        isSelected
                          ? "border-blue-300 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      } ${!chat.isActive ? "opacity-70" : ""}`}
                      onClick={() => onSelectChat(chat)}
                    >
                      {/* Badge de mensajes no leídos */}
                      {unreadCount > 0 && !isSelected && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3">
                        {/* Indicador de estado */}
                        <div className="flex-shrink-0 pt-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${chat.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-6"> {/* Añadido pr-6 para espacio del badge */}
                          {/* Fila superior: Nombre y rol */}
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800 truncate">
                                {chat.participantName}
                              </span>
                              
                              {/* Badge de rol */}
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                chat.participantName === "Conductor" 
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}>
                                {chat.participantName === "Conductor" ? 'Conductor' : 'Pasajero'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Último mensaje */}
                          <div className="flex items-start gap-1 mb-1">
                            <div className="flex-shrink-0 pt-0.5">
                              {lastMessage !== "No hay mensajes" ? (
                                <MessageSquare className="h-3 w-3 text-gray-400" />
                              ) : (
                                <User className="h-3 w-3 text-gray-400" />
                              )}
                            </div>
                            <p className={`text-sm truncate flex-1 ${unreadCount > 0 ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                              {lastMessage}
                            </p>
                          </div>
                          
                          {/* Información adicional */}
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <span>ID: {chat.participantId}</span>
                              <span className="text-gray-300">•</span>
                              <span>{chat.role === 'driver' ? 'Conductor' : 'Pasajero'}</span>
                            </span>
                            
                            {/* Mostrar hora del último mensaje si existe */}
                            {lastMessage !== "No hay mensajes" && (
                              <span className="text-xs text-gray-400">
                                {new Date().toLocaleTimeString("es-ES", { 
                                  hour: "2-digit", 
                                  minute: "2-digit",
                                  hour12: false 
                                }).replace(':', '')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Pie de página con info del usuario */}
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">
              Usuario ID: {currentUserId}
            </span>
          </div>
          <span className="text-gray-500">
            {chats.length} {chats.length === 1 ? 'chat' : 'chats'}
          </span>
        </div>
      </div>
    </div>
  );
}