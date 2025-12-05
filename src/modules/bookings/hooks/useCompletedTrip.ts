import { useMemo } from 'react';
import type { CompletedTrip } from '../types/Trip';

export const useCompletedTrip = (tripId: string): CompletedTrip => {
  return useMemo(() => {
    // TODO:conectar a la Api
    return {
      tripId,
      origin: 'Universidad Escuela Colombiana de ingeniería',
      destination: 'Portal 80',
      payment: {
        status: 'pending',
        baseFare: 8000,
        total: 8000,
        currency: 'COP',
      },
      mapImageUrl: 'https://via.placeholder.com/500x300?text=Mapa+de+Ruta+Completada',
    };
  }, [tripId]);
};
