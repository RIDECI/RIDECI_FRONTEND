import { useState } from 'react';
import type { Travel, Location, Status, TravelType } from '../types';

export interface TravelRequest {
    id?: string;
    organizerId?: number;
    driverId?: number;
    availableSlots: number;
    status: Status;
    travelType: TravelType;
    estimatedCost: number;
    departureDateAndTime: string;
    passengersId?: number[];
    conditions?: string;
    origin: Location;
    destiny: Location;
}

export interface TravelBackendResponse {
    id: string;
    organizerId?: number;
    driverId?: number;
    availableSlots: number;
    status: Status;
    travelType: TravelType;
    estimatedCost: number;
    departureDateAndTime: string;
    passengersId?: number[];
    conditions?: string;
    origin: Location;
    destiny: Location;
}

export interface TravelResponse {
    success: boolean;
    data?: TravelBackendResponse;
    error?: string;
}

export function useCreateTravel() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [travel, setTravel] = useState<Travel | null>(null);

    const createTravel = async (travelRequest: TravelRequest): Promise<TravelResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://nemesistravelmanagementbackend-production.up.railway.app/travels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travelRequest),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const result: TravelBackendResponse = await response.json();

            const travelData: Travel = {
                id: result.id,
                organizerId: result.organizerId || 0,
                driverId: result.driverId || 0,
                availableSlots: result.availableSlots,
                status: result.status,
                travelType: result.travelType,
                estimatedCost: result.estimatedCost,
                departureDateTime: new Date(result.departureDateAndTime).getTime(),
                passengersId: result.passengersId || [],
                conditions: result.conditions || '',
                origin: result.origin,
                destiny: result.destiny
            };

            setTravel(travelData);

            return {
                success: true,
                data: result,
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating travel';
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
        setTravel(null);
    };

    return {
        createTravel,
        loading,
        error,
        travel,
        resetState,
    };
}
