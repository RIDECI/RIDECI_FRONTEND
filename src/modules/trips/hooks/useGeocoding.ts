import { useState } from 'react';
import type { Location } from '../types';

const GOOGLE_MAPS_API_KEY = "AIzaSyDnaSQL9XWXEVLt4BnIb5TWvWKG3Lg8gLU";

interface GeocodeResult {
    success: boolean;
    location?: Location;
    error?: string;
}

export function useGeocoding() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const geocodeAddress = async (address: string): Promise<GeocodeResult> => {
        if (!address || address.trim() === '') {
            return {
                success: false,
                error: 'La dirección no puede estar vacía'
            };
        }

        setLoading(true);
        setError(null);

        try {
            const encodedAddress = encodeURIComponent(address);
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'OK' && data.results && data.results.length > 0) {
                const result = data.results[0];
                const { lat, lng } = result.geometry.location;
                const formattedAddress = result.formatted_address;

                return {
                    success: true,
                    location: {
                        latitude: lat,
                        longitude: lng,
                        direction: formattedAddress
                    }
                };
            } else if (data.status === 'ZERO_RESULTS') {
                const errorMsg = 'No se encontraron resultados para esta dirección';
                setError(errorMsg);
                return {
                    success: false,
                    error: errorMsg
                };
            } else {
                const errorMsg = `Error de geocoding: ${data.status}`;
                setError(errorMsg);
                return {
                    success: false,
                    error: errorMsg
                };
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al convertir la dirección';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };
    const geocodeMultipleAddresses = async (addresses: string[]): Promise<GeocodeResult[]> => {
        const results: GeocodeResult[] = [];

        for (const address of addresses) {
            const result = await geocodeAddress(address);
            results.push(result);
        }

        return results;
    };

    return {
        geocodeAddress,
        geocodeMultipleAddresses,
        loading,
        error
    };
}
