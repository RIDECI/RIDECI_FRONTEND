import { useState, useEffect } from 'react';
import type { User } from '@/modules/authentication/types/user';

// Backend de User Management (KRATOS)
const API_URL = 'https://kratosusermanagementbackend-production.up.railway.app';

export function useGetUserById(userId: number | undefined) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async (id: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result: User = await response.json();
            setUser(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error fetching user';
            setError(errorMessage);
            console.error('Error in useGetUserById:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    return {
        user,
        loading,
        error,
        refetch: userId ? () => fetchUser(userId) : undefined,
    };
}
