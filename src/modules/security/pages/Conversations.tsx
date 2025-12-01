import React, { useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithButton } from "../components/SearchBarProps";
import { conversationApi } from "../utils/ApiCommunications"; 
import type { MessageResponse } from '../types/MessageResponse';
import type { ConversationResponse } from '../types/ConversationResponse';
import { MessageCircle } from "lucide-react";
import { useWebSocket } from "../hooks/useWebSocket";

interface IndividualChat {
  id: string;
  conversationId: string;
  participantId: number;
  participantName: string;
  travelId: number;
  type: string;
  role: 'driver' | 'passenger';
  isActive: boolean;
}

export function Conversations(): React.JSX.Element {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [individualChats, setIndividualChats] = useState<IndividualChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IndividualChat | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [currentUserId, setCurrentUserId] = useState<number>(27);

  const { isConnected } = useWebSocket({
    userId: currentUserId.toString(),
    onMessageReceived: (message) => setMessages(prev => [...prev, message]),
    onConnected: () => console.log("WebSocket conectado ✅ para userId:", currentUserId),
    onError: (err) => console.error("Error WebSocket:", err),
  });

  const toggleUser = () => {
    setCurrentUserId(prev => (prev === 64 ? 27 : 64));
    setSelectedChat(null);
    setMessages([]);
  };

  useEffect(() => {
    loadConversations();
  }, [currentUserId]);

  const generateIndividualChats = (conversations: ConversationResponse[]): IndividualChat[] => {
    const chats: IndividualChat[] = [];
    conversations.forEach(conversation => {
      if (!conversation.active) return;
      if (conversation.type === "TRIP") {
        const uniqueParticipants = [...new Set(conversation.participants)];
        uniqueParticipants.forEach(participantId => {
          const isDriver = conversation.driverId === participantId;
          chats.push({
            id: `${conversation.id}-${participantId}`,
            conversationId: conversation.id,
            participantId,
            participantName: isDriver ? `Conductor (${participantId})` : `Pasajero (${participantId})`,
            travelId: conversation.travelId,
            type: conversation.type,
            role: isDriver ? 'driver' : 'passenger',
            isActive: conversation.active
          });
        });
      }
    });
    return chats;
  };

  const loadConversations = async (): Promise<void> => {
    try {
      setError("");
      setLoading(true);
      const data = await conversationApi.getConversations(); 
      setConversations(data);
      setIndividualChats(generateIndividualChats(data));
    } catch {
      setError("Error al cargar las conversaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chat: IndividualChat): void => {
    if (!chat.isActive) {
      setError("Este chat no está activo");
      return;
    }
    setSelectedChat(chat);
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!newMessage.trim() || !selectedChat || !selectedChat.isActive) return;

    if (!selectedChat) return;
    const senderId = currentUserId.toString();
    const receiverId = selectedChat.participantId.toString();

    const resp = await conversationApi.sendMessage(selectedChat.conversationId, senderId, receiverId, newMessage);

    if (resp) {
      setMessages(prev => [...prev, resp]);
      setNewMessage("");
    } else {
      setError("Error enviando mensaje por API");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => setNewMessage(e.target.value);

  const formatTime = (timestamp?: string | Date): string => {
    if (!timestamp) return "n/a";
    return new Date(timestamp).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const getMessagesForSelectedChat = (): MessageResponse[] => {
    if (!selectedChat) return [];
    return messages.filter(msg => msg.conversationId === selectedChat.conversationId);
  };

  const getLastMessage = (conversationId: string): string => {
    const convMsgs = messages.filter(msg => msg.conversationId === conversationId);
    return convMsgs[convMsgs.length - 1]?.content || "No hay mensajes";
  };

  const chatsByTravel = individualChats.reduce((acc, chat) => {
    if (!acc[chat.travelId]) acc[chat.travelId] = [];
    acc[chat.travelId].push(chat);
    return acc;
  }, {} as Record<number, IndividualChat[]>);

  if (loading) return <div className="p-8 text-center">Cargando conversaciones...</div>;

  return (
    <div className="flex h-screen bg-white p-6 gap-6">
      <div className="absolute top-4 right-4">
        <Button onClick={toggleUser}>Cambiar usuario (actual: {currentUserId})</Button>
      </div>

      <div className="w-2/5 bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Chats</h1>
          <div className="mb-4"><InputWithButton /></div>
        </div>
        {error && <div className="p-4 bg-red-50 border-l-4 border-red-400"><p className="text-red-700 text-sm">{error}</p></div>}
        <div className="flex-1 overflow-y-auto">
          {individualChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No hay chats disponibles</div>
          ) : (
            Object.entries(chatsByTravel).map(([travelId, chats]) => (
              <div key={travelId} className="border-b border-gray-200">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">Viaje #{travelId}</h3>
                  <p className="text-sm text-gray-500">{chats.length} {chats.length === 1 ? 'chat' : 'chats'} con participantes</p>
                </div>
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    className={`p-5 border-b border-gray-100 cursor-pointer transition-colors ${selectedChat?.id === chat.id ? "bg-blue-50" : "hover:bg-gray-50"} ${!chat.isActive ? "opacity-60" : ""}`}
                    onClick={() => handleSelectChat(chat)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-lg">{chat.participantName}</span>
                        {!chat.isActive && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Inactivo</span>}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">{chat.role === 'driver' ? 'Conductor' : 'Pasajero'}</span>
                        {chat.isActive && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-1">Activo</span>}
                      </div>
                    </div>
                    <p className="text-gray-600 truncate">{getLastMessage(chat.conversationId)}</p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        {selectedChat && (
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold" onClick={() => setSelectedChat(null)}>Cerrar chat</Button>
          </div>
        )}
      </div>

      <div className="flex-1 bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{selectedChat.participantName}</h2>
                  <p className="text-sm text-gray-600 mt-1">Viaje #{selectedChat.travelId} • {selectedChat.role === 'driver' ? 'Conductor' : 'Pasajero'}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedChat.isActive ? <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Chat activo</span> : <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Chat inactivo</span>}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {getMessagesForSelectedChat().length === 0 ? (
                <div className="text-center text-gray-500 mt-8">{selectedChat.isActive ? "No hay mensajes" : "Chat inactivo"}</div>
              ) : (
                getMessagesForSelectedChat().map((message, index) => (
                  <div key={message.messageId || `msg-${index}`} className={`mb-4 ${message.senderId === currentUserId.toString() ? "text-right" : "text-left"}`}>
                    <div className={`inline-block px-4 py-3 rounded-lg max-w-md ${message.senderId === currentUserId.toString() ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-200"}`}>
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 block mt-1">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder={selectedChat.isActive ? `Escribe un mensaje a ${selectedChat.participantName}...` : "Chat inactivo"}
                  className="flex-1"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={!selectedChat.isActive}
                />
                <Button type="button" onClick={handleSendMessage} disabled={!newMessage.trim() || !selectedChat.isActive}>Enviar</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="text-center max-w-2xl mx-auto p-8">
              <div className="flex justify-center mb-8">
                <div className="border-2 border-blue-500 rounded-full p-6">
                  <MessageCircle className="h-16 w-16 text-blue-500" />
                </div>
              </div>
              <h2 className="text-5xl font-bold text-blue-500 mb-6">Tus mensajes</h2>
              <p className="text-blue-500 text-xl leading-relaxed font-medium">Selecciona un chat para empezar a comunicarte.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
