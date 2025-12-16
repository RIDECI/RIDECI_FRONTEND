import { useState } from "react";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

export const useConfirmBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const confirmBooking = async (bookingId: string) => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    if (!bookingId) {
      setError("ID de reserva no proporcionado.");
      setIsLoading(false);
      return false;
    }

    try {
      console.log(`📝 Intentando confirmar reserva: ${bookingId}`);
      console.log(`🎯 URL: ${API_URL}/bookings/${bookingId}/confirm`);
      
      const response = await fetch(`${API_URL}/bookings/${bookingId}/confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`📡 Respuesta recibida - Status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Error del servidor - Status: ${response.status}`);
        console.error(`❌ Response body:`, errorText);
        
        let errorData = null;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          // No es JSON
        }
        
        const errorMsg = errorData?.message || errorText || `Error ${response.status}: ${response.statusText}`;
        console.error(`❌ Error final:`, errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return false;
      }

      const responseText = await response.text();
      console.log(`📄 Response text:`, responseText);
      
      let data = null;
      if (responseText) {
        try {
          data = JSON.parse(responseText);
          console.log(`✅ Reserva confirmada exitosamente:`, data);
        } catch (e) {
          console.log(`✅ Reserva confirmada (sin JSON response)`);
        }
      }
      
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

  return { confirmBooking, error, isLoading, isSuccess };
};
