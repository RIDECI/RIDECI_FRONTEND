import { useState, useEffect } from 'react';
import { getAccompanimentRequestById, getAccompanimentDetails } from '../services/accompanimentsApi';

export const useAccompanimentConfirmed = (requestId: string) => {
  const [confirmedData, setConfirmedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfirmation = async () => {
      if (!requestId) {
        setError('ID de solicitud no proporcionado');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log('Fetching confirmation for request ID:', requestId);
        
        // Obtener la solicitud de acompañamiento
        const request = await getAccompanimentRequestById(requestId);
        console.log('Request data:', request);
        
        // Obtener detalles del acompañamiento
        const accompaniment = await getAccompanimentDetails(request.accompanimentId);
        console.log('Accompaniment data:', accompaniment);

        const adapted = {
          id: requestId,
          summary: {
            meetingPoint: accompaniment?.route?.meetingPoint || 'Punto de encuentro',
            destination: accompaniment?.route?.destination || 'Destino',
            dateTime: accompaniment?.route?.departureTime || 'Hora no especificada',
          },
          companion: {
            name: accompaniment?.passenger?.name || 'Acompañante',
            rating: accompaniment?.passenger?.rating || '0.0',
            image: accompaniment?.passenger?.avatar || `https://i.pravatar.cc/100?u=${requestId}`,
          },
        };

        console.log('Adapted confirmation data:', adapted);
        setConfirmedData(adapted);
      } catch (err: any) {
        const errorMessage = err.message || 'Error al cargar confirmación';
        setError(errorMessage);
        console.error('Error fetching confirmation:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfirmation();
  }, [requestId]);

  return { confirmedData, isLoading, error };
};