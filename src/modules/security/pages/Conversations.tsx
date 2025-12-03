import { useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { conversationApi } from "../utils/ApiCommunications"; 
import type { MessageResponse } from '../types/MessageResponse';
import type { ConversationResponse } from '../types/ConversationResponse';
import { useWebSocket } from "../hooks/useWebSocket";
import type { JSX } from "react/jsx-runtime";
import { ChatSidebar } from "../components/ChatSidebar";
import { ChatHeader } from "../components/ChatHeader";
import { MessageBubble } from "../components/MessageBubble";
import { ChatInput } from "../components/ChatInput";
import { EmptyChatState } from "../components/EmptyChatState";

export interface IndividualChat {
  id: string;
  conversationId: string;
  participantId: number;
  participantName: string;
  travelId: string;
  type: string;
  role: 'driver' | 'passenger';
  isActive: boolean;
}

export function Conversations(): JSX.Element {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [individualChats, setIndividualChats] = useState<IndividualChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IndividualChat | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<number>(55);

  const { sendMessage: sendWsMessage, isConnected } = useWebSocket({
    userId: currentUserId.toString(),
    onMessageReceived: (message) => {
      const msg: MessageResponse = {
        ...message,
        timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
      };
      
      setMessages(prev => {
        const exists = prev.some(m => 
          m.messageId === msg.messageId || 
          (m.conversationId === msg.conversationId && 
           m.senderId === msg.senderId && 
           m.content === msg.content && 
           m.timestamp && msg.timestamp && 
           Math.abs(new Date(m.timestamp).getTime() - new Date(msg.timestamp).getTime()) < 1000)
        );
        
        if (!exists) {
          return [...prev, msg];
        }
        return prev;
      });
    },
    onConnected: () => console.log("WebSocket conectado ✅ para userId:", currentUserId),
    onError: (err) => console.error("Error WebSocket:", err),
  });

  const toggleUser = () => {
    setCurrentUserId(prev => (prev === 2002 ? 2001 : 2002));
    setSelectedChat(null);
    setMessages([]);
  };

  useEffect(() => {
    loadConversations();
  }, [currentUserId]);

  const generateIndividualChats = (convs: ConversationResponse[]): IndividualChat[] => {
    const chats: IndividualChat[] = [];
    
    convs.forEach(conv => {
      if (!conv.active) return;
      
      const otherParticipants = conv.participants.filter(p => p !== currentUserId);
      
      otherParticipants.forEach(participantId => {
        const isDriverForThisConv = conv.driverId === participantId;
        const amIDriver = conv.driverId === currentUserId;
        
        let participantName = "";
        if (isDriverForThisConv) {
          participantName = "Conductor";
        } else {
          participantName = `Pasajero #${participantId}`;
        }
        
        chats.push({
          id: `${conv.id}-${participantId}`,
          conversationId: conv.id,
          participantId: participantId,
          participantName: participantName,
          travelId: conv.travelId,
          type: conv.type,
          role: amIDriver ? 'driver' : 'passenger',
          isActive: conv.active
        });
      });
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
    setError("");
  };

  const handleSendMessage = (): void => {
    if (!newMessage.trim() || !selectedChat || !selectedChat.isActive) return;

    const senderId = currentUserId.toString();
    const receiverId = selectedChat.participantId.toString();
    const conversationId = selectedChat.conversationId;

    const sent = sendWsMessage(
      conversationId,
      newMessage,
      receiverId
    );

    if (sent) {
      setMessages(prev => [
        ...prev,
        { 
          conversationId, 
          senderId, 
          receiverId, 
          content: newMessage, 
          timestamp: new Date(),
          messageId: `temp-${Date.now()}`
        }
      ]);
      setNewMessage("");
    } else {
      setError("No se pudo enviar el mensaje, WebSocket desconectado");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => setNewMessage(e.target.value);

  const formatTime = (timestamp?: string | Date): string => {
    if (!timestamp) return "Ahora";
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const getMessagesForSelectedChat = (): MessageResponse[] => {
    if (!selectedChat) return [];
    
    return messages.filter(msg => 
      msg.conversationId === selectedChat.conversationId &&
      (
        (msg.senderId === currentUserId.toString() && msg.receiverId === selectedChat.participantId.toString()) ||
        (msg.senderId === selectedChat.participantId.toString() && msg.receiverId === currentUserId.toString())
      )
    );
  };

  const getLastMessage = (conversationId: string, participantId: number): string => {
    const convMsgs = messages.filter(msg => 
      msg.conversationId === conversationId &&
      (
        (msg.senderId === currentUserId.toString() && msg.receiverId === participantId.toString()) ||
        (msg.senderId === participantId.toString() && msg.receiverId === currentUserId.toString())
      )
    );
    
    return convMsgs[convMsgs.length - 1]?.content || "No hay mensajes";
  };

  const chatsByTravel = individualChats.reduce((acc, chat) => {
    if (!acc[chat.travelId]) acc[chat.travelId] = [];
    acc[chat.travelId].push(chat);
    return acc;
  }, {} as Record<string, IndividualChat[]>);

  if (loading) return <div className="p-8 text-center">Cargando conversaciones...</div>;

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          onClick={toggleUser} 
          variant="outline" 
          size="sm"
          className="text-sm"
        >
          Cambiar usuario (actual: {currentUserId})
        </Button>
      </div>

      <ChatSidebar
        chats={individualChats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        getLastMessage={getLastMessage}
        chatsByTravel={chatsByTravel}
        currentUserId={currentUserId}
      />

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader chat={selectedChat} />
            
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {getMessagesForSelectedChat().length === 0 ? (
                <div className="text-center text-gray-500 mt-8 py-8">
                  {selectedChat.isActive ? "No hay mensajes aún" : "Chat inactivo"}
                </div>
              ) : (
                <div className="space-y-1">
                  {getMessagesForSelectedChat().map((message, index) => (
                    <MessageBubble
                      key={message.messageId || `msg-${index}`}
                      message={message}
                      currentUserId={currentUserId}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              )}
            </div>

            <ChatInput
              newMessage={newMessage}
              selectedChat={selectedChat}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}