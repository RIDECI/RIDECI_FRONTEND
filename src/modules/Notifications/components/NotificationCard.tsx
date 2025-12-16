import { Bell, MessageSquareText, Clock, CheckCircle } from "lucide-react";
import type { Notification } from "../types/Notification";
import type { JSX } from "react";

const iconMap: Record<Notification["type"], JSX.Element> = {
  trip: <Bell className="w-9 h-9 text-black" />,
  message: <MessageSquareText className="w-9 h-9 text-black" />,
  info: <Clock className="w-9 h-9 text-black" />,
  success: <CheckCircle className="w-9 h-9 text-green-500" />,
};

export default function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <div className="flex items-center justify-between py-5 border-b last:border-none border-gray-300">
      <div className="flex items-center gap-4">
        {iconMap[notification.type]}
        <span className="text-lg">{notification.title}</span>
      </div>

      <span className="text-sm text-gray-500 whitespace-nowrap">
        {notification.timeAgo}
      </span>
    </div>
  );
}
    