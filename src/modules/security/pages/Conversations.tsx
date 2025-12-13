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
  
  const getCurrentUserId = (): number => {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(userId, 10) : 0;
  };
  
  const [currentUserId, setCurrentUserId] = useState<number>(getCurrentUserId());
  
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const STORAGE_KEY = `chat_messages_${currentUserId}`;
  const UNREAD_STORAGE_KEY = `unread_counts_${currentUserId}`;

  const saveMessagesToStorage = (allMessages: MessageResponse[]) => {
    try {
      const storageData = {
        userId: currentUserId,
        timestamp: new Date().toISOString(),
        messages: allMessages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
        }))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    } catch (error) {
      console.error('Error al guardar mensajes en localStorage:', error);
    }
  };

  const saveUnreadCountsToStorage = (counts: Record<string, number>) => {
    try {
      localStorage.setItem(UNREAD_STORAGE_KEY, JSON.stringify(counts));
    } catch (error) {
      console.error('Error al guardar conteos no leídos:', error);
    }
  };

  const loadMessagesFromStorage = (): MessageResponse[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const data = JSON.parse(stored);
      
      if (data.userId === currentUserId && Array.isArray(data.messages)) {
        return data.messages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
          status: msg.status || 'sent' 
        }));
      }
    } catch (error) {
      console.error('Error al cargar mensajes desde localStorage:', error);
    }
    return [];
  };

  const loadUnreadCountsFromStorage = (): Record<string, number> => {
    try {
      const stored = localStorage.getItem(UNREAD_STORAGE_KEY);
      if (!stored) return {};
      
      const data = JSON.parse(stored);
      return data || {};
    } catch (error) {
      console.error('Error al cargar conteos no leídos:', error);
      return {};
    }
  };

  const { sendMessage: sendWsMessage, isConnected } = useWebSocket({
    userId: currentUserId.toString(),
    onMessageReceived: (message) => {
      const msg: MessageResponse = {
        ...message,
        timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
        status: 'delivered' 
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
          const updatedMessages = [...prev, msg];
          
          if (msg.senderId !== currentUserId.toString()) {
            const chatKey = `${msg.conversationId}-${msg.senderId}`;
            setUnreadCounts(prevCounts => {
              const newCount = (prevCounts[chatKey] || 0) + 1;
              const updatedCounts = { ...prevCounts, [chatKey]: newCount };
              saveUnreadCountsToStorage(updatedCounts);
              return updatedCounts;
            });
          }
          
          saveMessagesToStorage(updatedMessages);
          return updatedMessages;
        }
        return prev;
      });
    },
    onConnected: () => console.log("WebSocket conectado ✅ para userId:", currentUserId),
    onError: (err) => console.error("Error WebSocket:", err),
  });

  const getCurrentProfile = (): string => {
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (selectedProfile === 'conductor') return 'Conductor';
    if (selectedProfile === 'pasajero') return 'Pasajero';
    if (selectedProfile === 'acompanante') return 'Acompañante';
    return 'Usuario';
  };

  const toggleUser = () => {
    const realUserId = getCurrentUserId();
    setCurrentUserId(prev => {
      if (prev === realUserId) {
        return realUserId === 55 ? 2001 : 55;
      }
      return realUserId;
    });
    setSelectedChat(null);
  };

  useEffect(() => {
    const realUserId = getCurrentUserId();
    setCurrentUserId(realUserId);
    
    loadConversations();
    
    const savedMessages = loadMessagesFromStorage();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
    
    const savedUnreadCounts = loadUnreadCountsFromStorage();
    setUnreadCounts(savedUnreadCounts);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const chatKey = `${selectedChat.conversationId}-${selectedChat.participantId}`;
      if (unreadCounts[chatKey] > 0) {
        sendWsMessage(
          selectedChat.conversationId,
          selectedChat.participantId.toString()
        );
        
        setUnreadCounts(prev => {
          const updated = { ...prev, [chatKey]: 0 };
          saveUnreadCountsToStorage(updated);
          return updated;
        });
        
        setMessages(prev => 
          prev.map(msg => {
            if (msg.conversationId === selectedChat.conversationId && 
                msg.senderId === selectedChat.participantId.toString() &&
                msg.senderId !== currentUserId.toString()) {
              return { ...msg, status: 'read' as const };
            }
            return msg;
          })
        );
      }
    }
  }, [selectedChat]);

  const generateIndividualChats = (convs: ConversationResponse[]): IndividualChat[] => {
    const chats: IndividualChat[] = [];
    
    const currentProfile = getCurrentProfile();
    
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
          if (currentProfile === 'Conductor') {
            participantName = `Pasajero #${participantId}`;
          } else if (currentProfile === 'Pasajero') {
            participantName = `Conductor #${participantId}`;
          } else if (currentProfile === 'Acompañante') {
            participantName = `Conductor #${participantId}`;
          } else {
            participantName = `Usuario #${participantId}`;
          }
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

  const handleCloseChat = (): void => {
    setSelectedChat(null);
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
      const newMsg: MessageResponse = { 
        conversationId, 
        senderId, 
        receiverId, 
        content: newMessage, 
        timestamp: new Date(),
        messageId: `temp-${Date.now()}`,
        status: 'sent' 
      };
      
      const updatedMessages = [...messages, newMsg];
      setMessages(updatedMessages);
      saveMessagesToStorage(updatedMessages);
      
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
    
    const lastMsg = convMsgs[convMsgs.length - 1];
    if (!lastMsg) return "No hay mensajes";
  
    return lastMsg.content.length > 40 
      ? `${lastMsg.content.substring(0, 40)}...` 
      : lastMsg.content;
  };

  const getUnreadCount = (conversationId: string, participantId: number): number => {
    const chatKey = `${conversationId}-${participantId}`;
    return unreadCounts[chatKey] || 0;
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
          className="text-sm border-gray-300 shadow-sm"
        >
          {getCurrentProfile()} (ID: {currentUserId})
        </Button>
      </div>

      <div className="border-r-2 border-gray-200">
        <ChatSidebar
          chats={individualChats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          getLastMessage={getLastMessage}
          getUnreadCount={getUnreadCount} 
          chatsByTravel={chatsByTravel}
          currentUserId={currentUserId}
        />
      </div>

      <div className="flex-1 flex flex-col border-l-2 border-gray-200">
        {selectedChat ? (
          <>
            <ChatHeader chat={selectedChat} onCloseChat={handleCloseChat} />
            
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
        
        {error && (
          <div className="p-2 mx-4 my-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}