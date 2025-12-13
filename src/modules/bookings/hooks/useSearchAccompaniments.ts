import { useState } from 'react';
import { searchAccompaniments } from '../services/accompanimentsApi';

export const useSearchAccompaniments = () => {
  const [destination, setDestination] = useState('Portal 80');
  const [departureTime, setDepartureTime] = useState('18:30');
  const [searchByProximity, setSearchByProximity] = useState(true);
  const [availableAccompaniments, setAvailableAccompaniments] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!destination || !departureTime) return;

    setIsLoading(true);
    setError(null);
    setShowResults(false);

    try {
      const results = await searchAccompaniments({
        destination,
        departureTime,
      });

      // Adaptar la respuesta del backend al formato que espera el frontend
      const adapted = results.map((acc: any) => ({
        id: acc.id,
        driverName: acc.passengerName,
        driverImage: `https://i.pravatar.cc/40?u=${acc.id}`,
        rating: acc.rating,
        origin: acc.route.split(' • ')[0] || 'Universidad',
        destination: acc.route.split(' • ')[1] || destination,
        time: acc.departureTime,
      }));

      setAvailableAccompaniments(adapted);
      setShowResults(true);
    } catch (err) {
      setError('Error al buscar acompañamientos');
      console.error('Error fetching accompaniments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    destination,
    setDestination,
    departureTime,
    setDepartureTime,
    searchByProximity,
    setSearchByProximity,
    availableAccompaniments,
    totalCount: availableAccompaniments.length,
    showResults,
    isLoading,
    error,
    handleSearch,
  };
};