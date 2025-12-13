import { useState } from 'react';
import type { Reputation } from '../../types/reputation';
import type { ProfileType, IdentificationType } from '../../types/enums';

export interface UpdateProfileRequest {
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

export interface UpdateProfileBackendResponse {
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

export interface UpdateProfileResponse {
    success: boolean;
    data?: UpdateProfileBackendResponse;
    error?: string;
}

export function useUpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (id: string, profileRequest: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
        setLoading(true);
        setError(null);

        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedProfile: UpdateProfileBackendResponse = {
                ...profileRequest,
            };

            const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
            const profileIndex = existingProfiles.findIndex((p: any) => p.id === parseInt(id));
            
            if (profileIndex !== -1) {
                existingProfiles[profileIndex] = updatedProfile;
                localStorage.setItem('profiles', JSON.stringify(existingProfiles));
            }
            
            localStorage.setItem('currentProfile', JSON.stringify(updatedProfile));

            console.log('Perfil actualizado (simulado):', updatedProfile);

            return {
                success: true,
                data: updatedProfile,
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error updating profile';
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
    };

    return {
        updateProfile,
        loading,
        error,
        resetState,
    };
}