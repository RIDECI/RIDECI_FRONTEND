import { useState, useEffect } from 'react';
import type { TravelBackendResponse } from './createTravelHook';

interface UseGetTravelByIdResult {
    travel: TravelBackendResponse | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useGetTravelById(travelId: string | null): UseGetTravelByIdResult {
    const [travel, setTravel] = useState<TravelBackendResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTravel = async () => {
        if (!travelId) {
            setTravel(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://nemesistravelmanagementbackendmain-production.up.railway.app/travels/${travelId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No se encontró el viaje');
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const result: TravelBackendResponse = await response.json();
            setTravel(result);
        } catch (err) {
            let errorMessage = 'Error al obtener información del viaje';

            if (err instanceof Error) {
                if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                    errorMessage = 'No se pudo conectar con el servicio. Verifica tu conexión a internet.';
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            console.error('Error fetching travel:', errorMessage, err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTravel();
    }, [travelId]);

    return {
        travel,
        loading,
        error,
        refetch: fetchTravel,
    };
}
