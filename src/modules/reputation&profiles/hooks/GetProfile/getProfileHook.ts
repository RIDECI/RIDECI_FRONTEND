import { useState, useEffect } from 'react';
import type { Profile, ProfileBackend } from '../../types/profile';
import type { Reputation } from '../../types/reputation';
import type { ProfileType, IdentificationType } from '../../types/enums';

export interface GetProfileResponse {
    success: boolean;
    data?: Profile;
    error?: string;
}

export function useGetProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    const getProfile = async (id: string): Promise<GetProfileResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://troyareputationbackend-production.up.railway.app/profiles/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
            const errorMessage = err instanceof Error ? err.message : 'Error fetching profile';
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
        getProfile,
        loading,
        error,
        profile,
        resetState,
    };
}