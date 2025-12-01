import { useEffect, useRef, useState } from "react";
import type { MessageResponse } from "../types/MessageResponse";

interface UseWebSocketProps {
  userId: string;
  onMessageReceived: (message: MessageResponse) => void;
  onConnected?: () => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
}

export function useWebSocket({
  userId,
  onMessageReceived,
  onConnected,
  onError,
  reconnectInterval = 3000,
}: UseWebSocketProps) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWebSocket = () => {
    if (!userId) return;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const port = 8080;
    const wsUrl = `${protocol}://${host}:${port}/ws/chat?userId=${userId}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      onConnected?.();
    };

    socket.onmessage = (event) => {
      try {
        const data: MessageResponse = JSON.parse(event.data);
        onMessageReceived(data);
      } catch (err) {
        console.error("Error parseando mensaje WS:", err);
      }
    };

    socket.onerror = (event) => {
      onError?.(event);
    };

    socket.onclose = () => {
      setIsConnected(false);
      socketRef.current = null;
      setTimeout(connectWebSocket, reconnectInterval);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => socketRef.current?.close();
  }, [userId]);

  const sendMessage = (conversationId: string, content: string, receiverId?: string): boolean => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return false;

    const message: MessageResponse = {
      conversationId,
      senderId: userId,
      receiverId: receiverId || "",
      content,
      timestamp: new Date(),
    };

    socket.send(JSON.stringify(message));
    return true;
  };

  return { isConnected, sendMessage };
}
