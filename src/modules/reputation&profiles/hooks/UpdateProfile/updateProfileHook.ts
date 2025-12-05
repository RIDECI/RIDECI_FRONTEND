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
            const response = await fetch(`https://troyareputationbackend-production.up.railway.app/profiles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileRequest),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const result: UpdateProfileBackendResponse = await response.json();

            return {
                success: true,
                data: result,
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