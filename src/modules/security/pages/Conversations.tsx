import React, { useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithButton } from "../components/SearchBarProps";
import { conversationApi } from "../utils/ApiCommunications"; 
import type { MessageResponse } from '../types/MessageResponse';
import type { ConversationResponse } from '../types/ConversationResponse';
import { MessageCircle } from "lucide-react";

export function Conversations(): React.JSX.Element {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationResponse | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async (): Promise<void> => {
    try {
      setError("");
      setLoading(true);
      const data = await conversationApi.getConversations(); 
      setConversations(data);
    } catch (error) {
      console.error("Error loading conversations:", error);
      setError("Error al cargar las conversaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation: ConversationResponse): Promise<void> => {
    setSelectedConversation(conversation);
    try {
      setError("");
      const messagesData = await conversationApi.getMessages(conversation.id);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error loading messages:", error);
      setError("Error al cargar los mensajes");
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setError("");
      const sentMessage = await conversationApi.sendMessage(
        selectedConversation.id,
        "current-user",
        newMessage
      );

      if (sentMessage) {
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage("");
        
        const updatedMessages = await conversationApi.getMessages(selectedConversation.id);
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error al enviar el mensaje");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewMessage(e.target.value);
  };

  const formatTime = (timestamp?: Date): string => {
    if (!timestamp) return "n/a a.m.";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const getLastMessage = (conversationId: string): string => {
    const conversationMessages = messages.filter(msg => msg.conversationId === conversationId);
    const lastMessage = conversationMessages[conversationMessages.length - 1];
    return lastMessage?.content || "No hay mensajes";
  };

  const getConversationName = (conversation: ConversationResponse): string => {
    if (conversation.type === "TRIP") {
      return `Viaje #${conversation.travelId}`;
    }
    if (conversation.participants && conversation.participants.length === 2) {
      return `Chat: User${conversation.participants[0]} ↔ User${conversation.participants[1]}`;
    }
    return `Conversación ${conversation.id.substring(0, 6)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-lg text-gray-600">Cargando conversaciones...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white p-6 gap-6">
      {/* RECTÁNGULO 1: Chats y lista de conversaciones */}
      <div className="w-2/5 bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Chats</h1>
          <div className="mb-4">
            <InputWithButton />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No hay conversaciones disponibles
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? "bg-blue-50" : ""
                }`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-800 text-lg">
                    {getConversationName(conversation)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {conversation.active ? "ACTIVO" : "INACTIVO"}
                  </span>
                </div>
                <p className="text-gray-600 truncate">
                  {getLastMessage(conversation.id)}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Participantes: {conversation.participants.join(', ')}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedConversation && (
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold"
              onClick={() => {
                setSelectedConversation(null);
                setMessages([]);
              }}
            >
              Cerrar chat
            </Button>
          </div>
        )}
      </div>

      {/* RECTÁNGULO 2: Área de mensajes */}
      <div className="flex-1 bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header del chat */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {getConversationName(selectedConversation)}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Participantes: {selectedConversation.participants.join(', ')}
              </p>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  No hay mensajes en esta conversación
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={message.messageId || `msg-${index}`}
                    className={`mb-4 ${
                      message.senderId === "current-user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-3 rounded-lg max-w-md ${
                        message.senderId === "current-user"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 block mt-1">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Enviar
                </Button>
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
              
              <h2 className="text-5xl font-bold text-blue-500 mb-6">
                Tus mensajes
              </h2>
              
              <p className="text-blue-500 text-xl leading-relaxed font-medium">
                Selecciona alguno de los chats disponibles para comenzar a comunicarte.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}