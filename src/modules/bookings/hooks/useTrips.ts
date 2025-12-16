import { useState, useEffect } from 'react';
import type { Trip, TripStatus } from "../types/Trip";
import { getMyBookings, getTripDetails } from '../services/tripsApi';

export function useTrips() {
  const [scheduledTrips, setScheduledTrips] = useState<Trip[]>([]);
  const [historyTrips, setHistoryTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTrips = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const passengerId = 123; // TODO: Obtener del usuario logueado

        // Obtener todas las reservas del usuario
        const bookings = await getMyBookings(passengerId);

        // Procesar cada reserva y obtener detalles del conductor
        const tripsWithDetails = await Promise.all(
          bookings.map(async (booking) => {
            try {
              // Obtener detalles del viaje para el conductor
              const tripDetails = await getTripDetails(booking.travelId);

              // Formatear fecha y hora
              const bookingDate = new Date(booking.bookingDate);
              const today = new Date();
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + 1);

              let dateStr = bookingDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short'
              });

              if (bookingDate.toDateString() === today.toDateString()) {
                dateStr = 'Hoy';
              } else if (bookingDate.toDateString() === tomorrow.toDateString()) {
                dateStr = 'Mañana';
              }

              const timeStr = bookingDate.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              });

              // Determinar color del estado
              let statusColor: 'green' | 'yellow' | 'red' = 'yellow';
              if (booking.status === 'CONFIRMED') statusColor = 'green';
              if (booking.status === 'CANCELLED') statusColor = 'red';

              return {
                id: booking._id,
                route: `${booking.origin} → ${booking.destination}`,
                date: dateStr,
                time: timeStr,
                driverName: tripDetails.driver.name,
                driverImage: tripDetails.driver.profileImage || `https://i.pravatar.cc/40?u=${booking.travelId}`,
                status: (booking.status === 'CONFIRMED' ? 'Confirmado' :
                  booking.status === 'PENDING' ? 'Pendiente' :
                    booking.status === 'COMPLETED' ? 'Completado' :
                      'Cancelado') as TripStatus,
                statusColor,
              };
            } catch (err) {
              console.error(`Error fetching details for booking ${booking._id}:`, err);
              // Retornar con datos básicos si falla
              return {
                id: booking._id,
                route: `${booking.origin} → ${booking.destination}`,
                date: new Date(booking.bookingDate).toLocaleDateString('es-ES'),
                time: new Date(booking.bookingDate).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit'
                }),
                driverName: 'Conductor',
                driverImage: 'https://i.pravatar.cc/40',
                status: (booking.status === 'CONFIRMED' ? 'Confirmado' :
                  booking.status === 'PENDING' ? 'Pendiente' :
                    booking.status === 'COMPLETED' ? 'Completado' :
                      'Cancelado') as TripStatus,
                statusColor: 'yellow' as const,
              };
            }
          })
        );

        // Separar en programados e historial
        const scheduled = tripsWithDetails.filter(booking =>
          booking.status === 'Pendiente' || booking.status === 'Confirmado'
        );

        const history = tripsWithDetails.filter(booking =>
          booking.status === 'Cancelado' || booking.status === 'Completado'
        );

        setScheduledTrips(scheduled);
        setHistoryTrips(history);
      } catch (err) {
        setError('Error al cargar tus viajes');
        console.error('Error fetching trips:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyTrips();
  }, []);

  return {
    scheduledTrips,
    historyTrips,
    isLoading,
    error,
  };
}
