import { useState } from 'react';
import { getTravelsApiUrl } from '../utils/apiConfig';

interface UpdateSlotsResult {
  success: boolean;
  error?: string;
}

/**
 * Hook para actualizar solo los cupos disponibles de un viaje en el backend Nemesis
 * Usa el nuevo endpoint PATCH /{id}/slots que recibe directamente el número de cupos
 */
export function useUpdateTravelSlots() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateSlots = async (
    travelId: string,
    quantity: number
  ): Promise<UpdateSlotsResult> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const baseUrl = getTravelsApiUrl();
      const url = `${baseUrl}/${travelId}/slots`;
      const bodyToSend = JSON.stringify(quantity);
      
      console.log('╔══════════════════════════════════════════════════════════════╗');
      console.log('║           PATCH REQUEST - Actualización de Cupos             ║');
      console.log('╠══════════════════════════════════════════════════════════════╣');
      console.log(`║ Travel ID: ${travelId}`);
      console.log(`║ Nuevo valor de cupos: ${quantity}`);
      console.log(`║ URL completa: ${url}`);
      console.log(`║ Body: ${bodyToSend}`);
      console.log('╚══════════════════════════════════════════════════════════════╝');

      // El endpoint espera solo el número en el body
      const updateResponse = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyToSend,
      });

      console.log('╔══════════════════════════════════════════════════════════════╗');
      console.log('║                    RESPUESTA DEL BACKEND                     ║');
      console.log('╠══════════════════════════════════════════════════════════════╣');
      console.log(`║ Status: ${updateResponse.status} ${updateResponse.statusText}`);
      console.log(`║ OK: ${updateResponse.ok}`);

      if (!updateResponse.ok) {
        const responseText = await updateResponse.text();
        console.log(`║ Response Body: ${responseText}`);
        console.log('╚══════════════════════════════════════════════════════════════╝');
        console.error('❌ ERROR: La actualización de cupos falló en el backend');
        
        let errorData: any = {};
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        
        const errorMessage = errorData.message || `Error al actualizar cupos: ${updateResponse.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      const result = await updateResponse.json();
      console.log(`║ Response Body:`, result);
      console.log('╚══════════════════════════════════════════════════════════════╝');
      console.log('✅ ¡ÉXITO! Cupos actualizados correctamente en el backend');
      console.log('📊 Verifica en la base de datos que el valor de availableSlots sea:', quantity);
      
      setSuccess(true);

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
    success,
  };
}
