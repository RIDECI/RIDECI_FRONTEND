import { type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  newMessage: string;
  selectedChat: {
    participantName: string;
    isActive: boolean;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

export function ChatInput({
  newMessage,
  selectedChat,
  onInputChange,
  onKeyDown,
  onSendMessage
}: ChatInputProps) {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={selectedChat.isActive ? `Escribe un mensaje...` : "Chat inactivo"}
          className="flex-1 rounded-full border-gray-300"
          value={newMessage}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          disabled={!selectedChat.isActive}
        />
        <Button 
          type="button" 
          onClick={onSendMessage} 
          disabled={!newMessage.trim() || !selectedChat.isActive}
          className="rounded-full bg-blue-500 hover:bg-blue-600"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}