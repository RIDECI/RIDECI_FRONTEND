import { createContext, useContext, useState, type ReactNode } from "react";
import { useToast } from "../components/ToastContext";
import type { Notification } from "../modules/Notifications/types/Notification";

interface GlobalNotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Omit<Notification, "id" | "timestamp" | "timeAgo">) => void;
    markAsRead: (id: string) => void;
    clearAll: () => void;
}

const GlobalNotificationContext = createContext<GlobalNotificationContextType | undefined>(undefined);

export const useGlobalNotifications = () => {
    const ctx = useContext(GlobalNotificationContext);
    if (!ctx) throw new Error("useGlobalNotifications must be used within GlobalNotificationProvider");
    return ctx;
};

export const GlobalNotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { showToast } = useToast();

    const addNotification = (notifData: Omit<Notification, "id" | "timestamp" | "timeAgo">) => {
        const newNotification: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
            timeAgo: "Just now",
            ...notifData,
        };

        setNotifications((prev) => [newNotification, ...prev]);

        // Map notification type to toast type
        const toastType =
            notifData.type === "success" ? "success" :
                notifData.type === "trip" ? "info" :
                    "info";

        showToast(notifData.title, toastType);
    };

    const markAsRead = (id: string) => {
        // In a real app, this might make an API call.
        // For now, we just might want to flag it locally if we had a 'read' property.
        console.log("Marked as read:", id);
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.length; // Simplified for now

    return (
        <GlobalNotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, clearAll }}>
            {children}
        </GlobalNotificationContext.Provider>
    );
};
