import type { Notification } from "../types/Notification";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "trip",
    title: "Tu viaje ha finalizado. Es momento de pagar",
    timeAgo: "Hace 3 minutos",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: "2",
    type: "message",
    title: "Nuevo mensaje de Goku",
    timeAgo: "Hace 5 minutos",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "3",
    type: "info",
    title: "Tu conductor está a 5 minutos",
    timeAgo: "Hace 8 minutos",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: "4",
    type: "info",
    title: "Reserva confirmada",
    timeAgo: "Hace 1 hora",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
  },
];
