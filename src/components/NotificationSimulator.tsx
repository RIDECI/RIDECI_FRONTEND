import { useEffect } from "react";
import { useGlobalNotifications } from "../context/GlobalNotificationContext";

// This component doesn't render anything visually, it just runs side effects to simulate events.
export const NotificationSimulator = () => {
    const { addNotification } = useGlobalNotifications();

    useEffect(() => {
        const simulateEvents = () => {
            // Randomly simulate an event every 30-60 seconds for demo purposes
            // Or immediately on mount for testing

            const events = [
                { type: "trip", title: "Un conductor ha aceptado tu viaje" },
                { type: "message", title: "Nuevo mensaje de Soporte" },
                { type: "success", title: "Tu viaje ha finalizado con éxito" },
                { type: "info", title: "Recordatorio: Tu viaje programado es mañana" }
            ] as const;

            const randomEvent = events[Math.floor(Math.random() * events.length)];

            addNotification({
                type: randomEvent.type,
                title: randomEvent.title,
            });
        };

        // Trigger one immediately (optional, or rely on the timeout below)
        // simulateEvents();

        // Set up an interval to trigger every 15 seconds for demo
        const interval = setInterval(simulateEvents, 15000);

        // Expose a helper to window for manual testing from console
        (window as any).triggerNotification = (type: "info" | "message" | "trip" | "success", title: string) => {
            addNotification({ type, title });
        };

        // Simulate one on mount after 2 seconds to prove it works
        const timer = setTimeout(() => {
            addNotification({
                type: "info",
                title: "Bienvenido al sistema de notificaciones"
            });
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [addNotification]);

    return null;
};
