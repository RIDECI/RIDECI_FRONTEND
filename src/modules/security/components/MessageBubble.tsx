interface MessageBubbleProps {
  message: {
    content: string;
    senderId: string;
    timestamp?: string | Date;
  };
  currentUserId: number;
  formatTime: (timestamp?: string | Date) => string;
}

export function MessageBubble({ message, currentUserId, formatTime }: MessageBubbleProps) {
  const isCurrentUser = message.senderId === currentUserId.toString();
  
  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[70%] ${isCurrentUser ? "order-2" : "order-1"}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          isCurrentUser 
            ? "bg-blue-500 text-white rounded-br-none" 
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}>
          <p className="text-sm">{message.content}</p>
          <span className={`text-xs block mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}