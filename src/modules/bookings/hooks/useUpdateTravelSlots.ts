import { useState } from 'react';
import type { UpdateTravelRequest } from '../../trips/hooks/updateTravelHook';

interface UpdateSlotsResult {
  success: boolean;
  error?: string;
}

/**
 * Hook para actualizar solo los cupos disponibles de un viaje en el backend Nemesis
 * Obtiene los datos actuales del viaje y solo modifica los cupos disponibles
 */
export function useUpdateTravelSlots() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSlots = async (
    travelId: string,
    slotsToReduce: number
  ): Promise<UpdateSlotsResult> => {
    setLoading(true);
    setError(null);

    try {
      // Primero obtener los datos actuales del viaje
      const getTravelResponse = await fetch(
        `https://nemesistravelmanagementbackend-production.up.railway.app/travels/${travelId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!getTravelResponse.ok) {
        throw new Error('Error al obtener información del viaje');
      }

      const currentTravel = await getTravelResponse.json();
      console.log('📊 Viaje actual (GET):', currentTravel);

      // Validar que hay suficientes cupos (usar el nombre correcto del backend)
      const currentSlots = currentTravel.availableSlots;
      if (!currentSlots || currentSlots < slotsToReduce) {
        throw new Error('No hay suficientes cupos disponibles');
      }

      const newAvailableSlots = currentSlots - slotsToReduce;
      console.log(`📉 Cupos: ${currentSlots} → ${newAvailableSlots} (reservando ${slotsToReduce})`);

      // Construir el objeto de actualización manteniendo TODOS los campos sin cambios
      // Solo modificamos availableSlots
      const updateData: UpdateTravelRequest = {
        id: currentTravel.id,
        organizerId: currentTravel.organizerId,
        driverId: currentTravel.driverId,
        availableSlots: newAvailableSlots, // ⬅️ ÚNICO CAMPO QUE CAMBIA
        estimatedCost: currentTravel.estimatedCost,
        departureDateAndTime: currentTravel.departureDateAndTime,
        passengersId: currentTravel.passengersId || [],
        conditions: currentTravel.conditions || '',
        origin: currentTravel.origin,
        destiny: currentTravel.destiny,
      };

      console.log('🔄 Actualizando viaje con:', updateData);

      // Realizar la actualización
      const updateResponse = await fetch(
        `https://nemesistravelmanagementbackend-production.up.railway.app/travels/${travelId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Error al actualizar cupos: ${updateResponse.status}`);
      }

      const result = await updateResponse.json();
      console.log('✅ Cupos actualizados exitosamente:', result);

      return {
        success: true,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar cupos';
      setError(errorMessage);
      console.error('❌ Error al actualizar cupos:', err);

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
