import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: {
    content: string;
    senderId: string;
    timestamp?: string | Date;
    status?: 'sent' | 'delivered' | 'read';
  };
  currentUserId: number;
  formatTime: (timestamp?: string | Date) => string;
}

export function MessageBubble({ message, currentUserId, formatTime }: MessageBubbleProps) {
  const isCurrentUser = message.senderId === currentUserId.toString();
  
  const renderStatusIcon = () => {
    if (!isCurrentUser || !message.status) return null;
    
    switch (message.status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[70%] ${isCurrentUser ? "order-2" : "order-1"}`}>
        <div className={`px-4 py-3 rounded-2xl border ${
          isCurrentUser 
            ? "border-blue-300 text-blue-800 rounded-br-none bg-blue-50" 
            : "border-gray-300 text-gray-800 rounded-bl-none bg-gray-50"
        }`}>
          <p className="text-sm">{message.content}</p>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs ${isCurrentUser ? "text-blue-600" : "text-gray-500"}`}>
              {formatTime(message.timestamp)}
            </span>
            <div className="flex items-center gap-1">
              {renderStatusIcon()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}