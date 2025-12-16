import { useState, useEffect } from 'react';
import type { TravelBackendResponse } from './createTravelHook';

// Usar URL directa del backend para evitar problemas con el proxy
const API_URL = 'https://nemesistravelmanagementbackendmain-production.up.railway.app/travels';

export function useGetAllTravels() {
    const [travels, setTravels] = useState<TravelBackendResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTravels = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('Fetching travels from:', `${API_URL}/all`);

            const response = await fetch(`${API_URL}/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result: TravelBackendResponse[] = await response.json();
            console.log('Travels fetched successfully:', result.length, 'travels');
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
