import { useState, useEffect } from 'react';
import type { TripDetails } from '../types/Trip';
import { useGetTravelById } from '../../trips/hooks/getTravelByIdHook';

export const useTripDetails = (tripId: string) => {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const { travel, loading, error: fetchError } = useGetTravelById(tripId);

  useEffect(() => {
    if (!travel) {
      setTripDetails(null);
      return;
    }

    // Convertir TravelBackendResponse a TripDetails
    const convertedDetails: TripDetails = {
      id: travel.id,
      driver: {
        name: `Conductor #${travel.driverId || 'N/A'}`, // Mock por ahora - TODO: obtener del backend Kratos
        rating: 4.5, // Mock por ahora
        totalTrips: 100, // Mock por ahora
        phoneNumber: '+57 300 000 0000', // Mock por ahora
        profileImage: 'https://i.pravatar.cc/150?img=1',
      },
      vehicle: {
        brand: 'Toyota', // Mock por ahora - TODO: obtener del backend de vehículos
        model: 'Corolla', // Mock por ahora
        year: 2022, // Mock por ahora
        color: 'Blanco', // Mock por ahora
        plate: 'ABC-123', // Mock por ahora
        type: 'Sedán', // Mock por ahora
      },
      trip: {
        origin: travel.origin.direction || 'Origen no disponible',
        destination: travel.destiny.direction || 'Destino no disponible',
        departureTime: new Date(travel.departureDateAndTime).toLocaleString('es-CO', {
          dateStyle: 'short',
          timeStyle: 'short'
        }),
        estimatedArrival: new Date(travel.departureDateAndTime).toLocaleString('es-CO', {
          timeStyle: 'short'
        }),
        availableSeats: travel.availableSlots || 0,
        distance: '15 km', // Mock por ahora
      },
      pricing: {
        basePrice: travel.estimatedCost || 0,
        serviceFee: Math.round((travel.estimatedCost || 0) * 0.1),
        total: Math.round((travel.estimatedCost || 0) * 1.1),
        currency: 'COP',
      },
      mapImageUrl: '/map-preview.png',
    };

    setTripDetails(convertedDetails);
  }, [travel]);

  return { 
    tripDetails, 
    isLoading: loading, 
    error: fetchError 
  };
};