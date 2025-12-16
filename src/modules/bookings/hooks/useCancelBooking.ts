import { useState } from "react";
import { getBookingsApiUrl } from '../utils/apiConfig';

export const useCancelBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const cancelBooking = async (bookingId: string) => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    if (!bookingId) {
      setError("ID de reserva no proporcionado.");
      setIsLoading(false);
      return false;
    }

    try {
      const baseUrl = getBookingsApiUrl();
      const url = `${baseUrl}/${bookingId}`;
      console.log(`📝 Intentando cancelar reserva: ${bookingId}`);
      console.log(`🎯 URL: ${url}`);
      
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`📡 Respuesta recibida - Status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.message || `Error ${response.status}: ${response.statusText}`;
        console.error(`❌ Error del servidor:`, errorMsg, errorData);
        setError(errorMsg);
        setIsLoading(false);
        return false;
      }

      const data = await response.json().catch(() => null);
      console.log(`✅ Reserva cancelada exitosamente:`, data);
      setIsSuccess(true);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error(`❌ Error de conexión:`, err);
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      return false;
    }
  };

  return { cancelBooking, error, isLoading, isSuccess };
};
