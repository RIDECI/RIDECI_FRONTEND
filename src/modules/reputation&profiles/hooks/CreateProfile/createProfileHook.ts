import { useState } from 'react';
import type { Profile } from '../../types/profile';
import type { Reputation } from '../../types/reputation';
import type { ProfileType, IdentificationType } from '../../types/enums';

export interface ProfileRequest {
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

export interface ProfileBackendResponse extends ProfileRequest {}

export interface ProfileResponse {
    success: boolean;
    data?: ProfileBackendResponse;
    error?: string;
}

export function useCreateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    const createProfile = async (
        type: "driver" | "companiant" | "passenger",
        profileRequest: ProfileRequest
    ): Promise<ProfileResponse> => {
        setLoading(true);
        setError(null);

        // SIMULACIÓN SIN BACKEND - Solo datos locales
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));

            // Crear perfil simulado con ID aleatorio
            const simulatedProfile: ProfileBackendResponse = {
                ...profileRequest,
                id: Math.floor(Math.random() * 10000),
                ratings: [],
                badges: ['Nuevo Usuario'],
            };

            setProfile({
                ...simulatedProfile,
                birthDate: new Date(simulatedProfile.birthDate),
            });

            // Guardar en localStorage
            const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
            existingProfiles.push(simulatedProfile);
            localStorage.setItem('profiles', JSON.stringify(existingProfiles));
            localStorage.setItem('currentProfile', JSON.stringify(simulatedProfile));

            console.log('Perfil creado (simulado):', simulatedProfile);

            return {
                success: true,
                data: simulatedProfile,
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating profile';
            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setProfile(null);
    };

    return {
        createProfile,
        loading,
        error,
        profile,
        resetState,
    };
}