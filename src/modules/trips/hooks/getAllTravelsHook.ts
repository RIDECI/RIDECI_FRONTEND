import { useState, useEffect } from 'react';
import type { TravelBackendResponse } from './createTravelHook';

const API_URL = 'https://nemesistravelmanagementbackendmain-production.up.railway.app';

export function useGetAllTravels() {
    const [travels, setTravels] = useState<TravelBackendResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTravels = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/travels/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result: TravelBackendResponse[] = await response.json();
            setTravels(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error fetching all travels';
            setError(errorMessage);
            console.error('Error in useGetAllTravels:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    return {
        travels,
        loading,
        error,
        refetch: fetchTravels,
    };
}
