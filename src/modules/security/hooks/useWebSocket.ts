import { useEffect, useRef, useState } from "react";
import socketIOClient, { io, type Socket } from "socket.io-client";
import type { MessageResponse } from "../types/MessageResponse";

interface UseWebSocketProps {
  userId: string;
  onMessageReceived: (message: MessageResponse) => void;
  onConnected?: () => void;
  onError?: (error: any) => void;
}

interface SendMessageRequest {
  conversationId: string;
  senderId: string;
  receiverId?: string;
  content: string;
}

export function useWebSocket({
  userId,
  onMessageReceived,
  onConnected,
  onError,
}: UseWebSocketProps) {
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = socketIOClient("https://web-production-d849d5.up.railway.app/socket.io", {
      query: { userId },
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      onConnected?.();
    });

    socket.on("message", (msg: MessageResponse) => {
      onMessageReceived(msg);
    });

    socket.on("connect_error", (err: any) => {
      onError?.(err);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = (conversationId: string, content: string, receiverId?: string) => {
    if (socketRef.current?.connected) {
      const message: SendMessageRequest = { conversationId, senderId: userId, receiverId, content };
      socketRef.current.emit("send-message", message);
      return true;
    }
    return false;
  };

  return { isConnected, sendMessage };
}
