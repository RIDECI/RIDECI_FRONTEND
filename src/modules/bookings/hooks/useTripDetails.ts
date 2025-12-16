import { useState, useEffect } from 'react';
import type { TripDetails } from '../types/Trip';
import { getTripDetails } from '../services/tripsApi';

export const useTripDetails = (tripId: string) => {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!tripId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getTripDetails(tripId);
        setTripDetails(data);
      } catch (err) {
        setError('Error al cargar los detalles del viaje');
        console.error('Error fetching trip details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  return { tripDetails, isLoading, error };
};