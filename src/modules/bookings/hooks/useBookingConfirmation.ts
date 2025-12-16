import { useState, useEffect } from 'react';
import type { BookingConfirmation } from '../types/Trip';
import { getBookingById, getTripDetails } from '../services/tripsApi';

export const useBookingConfirmation = (bookingId: string) => {
  const [confirmationData, setConfirmationData] = useState<BookingConfirmation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingConfirmation = async () => {
      if (!bookingId) return;

      setIsLoading(true);
      setError(null);

      try {
        // 1. Obtener datos de la reserva
        const booking = await getBookingById(bookingId);

        if (!booking) {
          setError('Reserva no encontrada');
          setIsLoading(false);
          return;
        }

        // 2. Obtener detalles del viaje (conductor, vehículo)
        const trip = await getTripDetails(booking.travelId);

        const confirmation: BookingConfirmation | null = booking ? {
          bookingId: (booking as any).id || booking._id || '',
          trip: {
            origin: booking.origin,
            destination: booking.destination,
            dateTime: new Date(booking.bookingDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) + ' a las ' + new Date(booking.bookingDate).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            }),
          },
          driver: {
            name: trip.driver.name,
            rating: trip.driver.rating.toString(),
            avatar: trip.driver.profileImage
          },
          payment: {
            total: booking.totalAmount,
            currency: 'COP', // TODO: Obtener moneda real
            method: (booking.notes || '').charAt(0).toUpperCase() + (booking.notes || '').slice(1), // Capitalizar
            methodIcon: '💳', // TODO: Determinar ícono según método
          }
        } : null;
        setConfirmationData(confirmation);
      } catch (err) {
        setError('Error al cargar los detalles de la reserva');
        console.error('Error fetching booking confirmation:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingConfirmation();
  }, [bookingId]);

  return { confirmationData, isLoading, error };
};