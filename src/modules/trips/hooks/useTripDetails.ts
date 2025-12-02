import { useMemo } from 'react';
import type { TripDetails } from '../types/Trip';

export const useTripDetails = (tripId: string): TripDetails => {
  return useMemo(() => {
    // mock para cambiarlo por api
    return {
      id: tripId,
      driver: {
        name: 'Raquel Selma',
        rating: '4.5',
        totalTrips: 120,
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      vehicle: {
        brand: 'Toyota',
        model: 'Camry',
        color: 'Gris Plata',
        plate: '1234 ABC',
      },
      trip: {
        origin: 'Universidad Escuela Colombiana de ing',
        destination: 'Portal 80',
        date: '18 de Noviembre, 2025',
        departureTime: '18:30',
        arrivalTime: '20:00',
      },
      pricing: {
        total: 8000,
        currency: 'COP',
      },
      mapImageUrl: 'https://via.placeholder.com/500x300?text=Mapa+de+Ruta',
    };
  }, [tripId]);
};