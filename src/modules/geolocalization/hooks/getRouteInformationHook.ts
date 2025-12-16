import { useState, useEffect } from 'react';
import type { RouteDocument } from '../types/route';

interface UseGetRouteInformationResult {
    route: RouteDocument | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useGetRouteInformation(travelId: string | null): UseGetRouteInformationResult {
    const [route, setRoute] = useState<RouteDocument | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRouteInformation = async () => {
        if (!travelId) {
            setRoute(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://nemesisroutesandtrackingbackendmain-production.up.railway.app/geolocations/${travelId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 502) {
                    throw new Error('El servicio de rutas no está disponible en este momento. Por favor, intenta más tarde.');
                }
                if (response.status === 404) {
                    throw new Error('No se encontró información de ruta para este viaje. La ruta puede no haber sido generada aún.');
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const result: RouteDocument = await response.json();
            setRoute(result);
        } catch (err) {
            let errorMessage = 'Error al obtener información de ruta';

            if (err instanceof Error) {
                if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                    errorMessage = 'No se pudo conectar con el servicio de rutas. Verifica tu conexión a internet.';
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            console.error('Error fetching route:', errorMessage, err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRouteInformation();
    }, [travelId]);

    return {
        route,
        loading,
        error,
        refetch: fetchRouteInformation,
    };
}
