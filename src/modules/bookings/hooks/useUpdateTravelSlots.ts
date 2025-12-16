import { useState } from 'react';
import { getTravelsApiUrl } from '../utils/apiConfig';

interface UpdateSlotsResult {
  success: boolean;
  error?: string;
}

interface UpdateAvailableSlotsRequest {
  availableSlots: number;
}

/**
 * Hook para actualizar solo los cupos disponibles de un viaje en el backend Nemesis
 * Usa el nuevo endpoint PATCH /{id}/available-slots
 */
export function useUpdateTravelSlots() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSlots = async (
    travelId: string,
    newAvailableSlots: number
  ): Promise<UpdateSlotsResult> => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = getTravelsApiUrl();
      const url = `${baseUrl}/${travelId}/available-slots`;
      console.log(`🔄 Actualizando cupos del viaje ${travelId} a: ${newAvailableSlots}`);
      console.log(`🌐 URL: ${url}`);

      const requestBody: UpdateAvailableSlotsRequest = {
        availableSlots: newAvailableSlots,
      };

      console.log(`📤 Request body:`, requestBody);

      // Usar el nuevo endpoint PATCH específico para actualizar cupos
      const updateResponse = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`📥 Response status: ${updateResponse.status} ${updateResponse.statusText}`);

      if (!updateResponse.ok) {
        const responseText = await updateResponse.text();
        console.error(`❌ Error response body:`, responseText);
        
        let errorData: any = {};
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        
        throw new Error(errorData.message || `Error al actualizar cupos: ${updateResponse.status} - ${responseText}`);
      }

      const result = await updateResponse.json();
      console.log('✅ Cupos actualizados exitosamente:', result);

      return {
        success: true,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar cupos';
      setError(errorMessage);
      console.error('❌ Error completo al actualizar cupos:', err);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateSlots,
    loading,
    error,
  };
}
