import { useMemo } from 'react';
import type { BookingConfirmation } from '../types/Trip';

export const useBookingConfirmation = (bookingId: string): BookingConfirmation => {
  return useMemo(() => {
    // APi
    return {
      bookingId,
      trip: {
        origin: 'Universidad Escuela Colombiana de Ingeniería',
        destination: 'Aeropuerto de Barcelona-El Prat (BCN)',
        dateTime: '19 de Noviembre, 2025 a las 19:00',
      },
      driver: {
        name: 'Raquel Selma',
        rating: '4.7',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      payment: {
        total: 8000,
        currency: 'COP',
        method: 'Nequi',
        methodIcon: '°N',
      },
    };
  }, [bookingId]);
};