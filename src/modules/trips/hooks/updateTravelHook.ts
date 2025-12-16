import { useState } from 'react';
import type { Location, Status, TravelType } from '../types';
import { useGlobalNotifications } from '@/context/GlobalNotificationContext';

// URL del backend desplegado
const API_URL = 'https://poseidonsearchandbooking-production-98fe.up.railway.app';

export interface UpdateTravelRequest {
    id: string,
    organizerId: number,
    driverId: number,
    availableSlots: number;
    estimatedCost: number;
    departureDateAndTime: string;
    passengersId?: number[];
    conditions?: string;
    origin: Location;
    destiny: Location;
}

export interface UpdateTravelBackendResponse {
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

export interface UpdateTravelResponse {
    success: boolean;
    data?: UpdateTravelBackendResponse;
    error?: string;
}

export function useUpdateTravel() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addNotification } = useGlobalNotifications();

    const updateTravel = async (id: string, travelRequest: UpdateTravelRequest): Promise<UpdateTravelResponse> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://nemesistravelmanagementbackendmain-production.up.railway.app/travels/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travelRequest),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const result: UpdateTravelBackendResponse = await response.json();

            addNotification({
                title: 'Viaje actualizado exitosamente',
                type: 'success',
            });

            return {
                success: true,
                data: result,
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error updating travel';
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
        updateTravel,
        loading,
        error,
        resetState,
    };
}
