import { useState } from "react";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

export const useCompleteBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const completeBooking = async (bookingId: string) => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    if (!bookingId) {
      setError("ID de reserva no proporcionado.");
      setIsLoading(false);
      return false;
    }

    try {
      console.log(`📝 Intentando completar reserva: ${bookingId}`);
      console.log(`🎯 URL: ${API_URL}/bookings/${bookingId}/complete`);
      
      const response = await fetch(`${API_URL}/bookings/${bookingId}/complete`, {
        method: "PATCH",
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

      const data = await response.json();
      console.log(`✅ Reserva completada exitosamente:`, data);
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

  return { completeBooking, error, isLoading, isSuccess };
};
