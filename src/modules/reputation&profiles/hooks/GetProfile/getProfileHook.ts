import { useState } from 'react';
import type { Reputation } from '../../types/reputation';
import type { ProfileType, IdentificationType } from '../../types/enums';

export interface Profile {
    id: number;
    name: string;
    email: string;
    vehicles: string[];
    phoneNumber: string;
    ratings: string[];
    badges: string[];
    profileType: ProfileType;
    reputation: Reputation;
    identificationType: IdentificationType;
    identificationNumber: string;
    address: string;
    profilePictureUrl: string;
    birthDate: Date;
}

export function useGetProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    const getProfile = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            // Intentar obtener el perfil desde el backend TROYA
            const TROYA_BASE_URL = 'https://troyareputationbackend-production.up.railway.app';

            console.log(`Obteniendo perfil con userId: ${id}`);

            const response = await fetch(`${TROYA_BASE_URL}/profiles/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching profile: ${response.status}`);
            }

            const profileData = await response.json();
            console.log('Perfil obtenido del backend:', profileData);

            setProfile({
                ...profileData,
                birthDate: profileData.birthDate ? new Date(profileData.birthDate) : new Date('2000-01-01')
            });

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error getting profile';
            setError(errorMessage);
            console.error('Error obteniendo perfil:', errorMessage);

            // Fallback: usar datos del localStorage o usuario actual
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');

            const fallbackProfile: Profile = {
                id: parseInt(userId || id) || 1,
                name: userName || "Usuario",
                email: userEmail || "usuario@rideci.com",
                vehicles: [],
                phoneNumber: "3001234567",
                ratings: [],
                badges: [],
                profileType: "NOT_DEFINED" as ProfileType,
                reputation: {
                    wightedScores: new Map<number, number>(),
                    average: 0,
                    totalRatings: 0
                },
                identificationType: "CC" as IdentificationType,
                identificationNumber: "1234567890",
                address: "Dirección no especificada",
                profilePictureUrl: "https://via.placeholder.com/150",
                birthDate: new Date('2000-01-01')
            };
            setProfile(fallbackProfile);
        } finally {
            setLoading(false);
        }
    };

    return {
        getProfile,
        loading,
        error,
        profile,
    };
}
