import { useState } from 'react';
import type { Profile, ProfileBackend } from '../../types/profile';
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
    birthDate: Date | string;
}

export interface ProfileResponse {
    success: boolean;
    data?: Profile;
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

        try {
            // Format the request body to ensure proper date serialization
            const requestBody = {
                ...profileRequest,
                birthDate: typeof profileRequest.birthDate === 'string'
                    ? profileRequest.birthDate
                    : profileRequest.birthDate.toISOString(),
            };

            const response = await fetch(
                `https://troyareputationbackend-production-e75f.up.railway.app/profiles/${type}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const result: ProfileBackend = await response.json();

            // Create profile object with proper date handling
            const profileData: Profile = {
                ...result,
                birthDate: new Date(result.birthDate),
            };

            setProfile(profileData);

            return {
                success: true,
                data: profileData,
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