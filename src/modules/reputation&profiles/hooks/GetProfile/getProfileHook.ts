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
            await new Promise(resolve => setTimeout(resolve, 300));

            const currentProfile = localStorage.getItem('currentProfile');
            console.log('Buscando perfil en localStorage:', currentProfile);
            
            if (currentProfile) {
                const parsedProfile = JSON.parse(currentProfile);
                console.log('Perfil encontrado:', parsedProfile);
                
                setProfile({
                    ...parsedProfile,
                    birthDate: new Date(parsedProfile.birthDate)
                });
            } else {
                console.log('No hay perfil en localStorage, usando datos de ejemplo');
                
                const mockProfile: Profile = {
                    id: parseInt(id) || 1,
                    name: "Usuario Demo",
                    email: "demo@rideci.com",
                    vehicles: [],
                    phoneNumber: "3001234567",
                    ratings: [],
                    badges: ["Usuario Nuevo"],
                    profileType: "PASSENGER" as ProfileType,
                    reputation: {
                        wightedScores: new Map<number, number>(),
                        average: 0,
                        totalRatings: 0
                    },
                    identificationType: "CC" as IdentificationType,
                    identificationNumber: "1234567890",
                    address: "Calle 123",
                    profilePictureUrl: "https://via.placeholder.com/150",
                    birthDate: new Date('2000-01-01')
                };
                setProfile(mockProfile);
            }

            console.log('Perfil obtenido (simulado)');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error getting profile';
            setError(errorMessage);
            console.error('Error obteniendo perfil:', errorMessage);
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
