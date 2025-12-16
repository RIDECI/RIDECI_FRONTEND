import { useState, useEffect } from 'react';
import type { TravelBackendResponse } from './createTravelHook';

export function useGetTravelsByDriver(driverId: string) {
    const [travels, setTravels] = useState<TravelBackendResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTravels = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://nemesistravelmanagementbackendmain-production.up.railway.app/travels/driver/${driverId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const result: TravelBackendResponse[] = await response.json();
            setTravels(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error fetching travels';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (driverId) {
            fetchTravels();
        }
    }, [driverId]);

    return {
        travels,
        loading,
        error,
        refetch: fetchTravels,
    };
}
