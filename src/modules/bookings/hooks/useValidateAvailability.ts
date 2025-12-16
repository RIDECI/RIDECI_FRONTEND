import { useState } from "react";
import type { AvailabilityRequest, AvailabilityResponse } from "../types/booking";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

export const useValidateAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAvailability = async (data: AvailabilityRequest) => {
    setError(null);
    setIsLoading(true);

    if (!data.travelId || !data.seats) {
      setError("Datos incompletos para validar disponibilidad.");
      setIsLoading(false);
      return null;
    }

    try {
      const queryParams = new URLSearchParams({
        travelId: data.travelId,
        seats: data.seats.toString(),
      });

      const response = await fetch(
        `${API_URL}/bookings/validate-availability?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al validar disponibilidad.");
        setIsLoading(false);
        return null;
      }

      const availabilityResponse: AvailabilityResponse = await response.json();
      setAvailabilityData(availabilityResponse);
      setIsLoading(false);
      console.log("Disponibilidad validada:", availabilityResponse);
      
      return availabilityResponse;
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al validar disponibilidad:", err.message);
      return null;
    }
  };

  return { availabilityData, checkAvailability, error, isLoading };
};
