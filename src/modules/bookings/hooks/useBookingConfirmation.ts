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
        
        // 2. Obtener detalles del viaje (conductor, vehículo)
        const trip = await getTripDetails(booking.travelId);
        
        // 3. Combinar datos para la estructura BookingConfirmation
        const confirmation: BookingConfirmation = {
          bookingId: booking.id,
          trip: {
            origin: booking.origin,
            destination: booking.destination,
            dateTime: new Date(booking.bookingDate).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) + ' a las ' + new Date(booking.bookingDate).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })
          },
          driver: {
            name: trip.driver.name,
            rating: trip.driver.rating,
            avatar: trip.driver.avatar
          },
          payment: {
            total: booking.totalAmount,
            currency: 'COP',
            method: booking.notes.charAt(0).toUpperCase() + booking.notes.slice(1), // Capitalizar
            methodIcon: '°N'
          }
        };
        
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