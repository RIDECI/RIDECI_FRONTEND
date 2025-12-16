import { useState, useEffect } from 'react';
import { getAccompanimentDetails } from '../services/accompanimentsApi';

export const useRouteDetails = (routeId: string) => {
  const [routeDetails, setRouteDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!routeId) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getAccompanimentDetails(routeId);
        
        // Adaptar datos del backend al formato del frontend
        const adapted = {
          id: data.id,
          driver: {
            name: data.passenger.name,
            rating: data.passenger.rating,
            badge: data.passenger.verificationStatus,
            image: data.passenger.avatar || `https://i.pravatar.cc/100?u=${data.id}`,
          },
          transport: {
            method: data.route.transportMethod,
          },
          route: {
            meetingPoint: data.route.meetingPoint,
            destination: data.route.destination,
            departureTime: data.route.departureTime,
            estimatedArrival: data.route.estimatedArrival,
          },
          mapImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Madrid&zoom=12&size=400x200&maptype=roadmap',
        };

        setRouteDetails(adapted);
      } catch (err) {
        setError('Error al cargar detalles del acompañamiento');
        console.error('Error fetching accompaniment details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [routeId]);

  return { routeDetails, isLoading, error };
};