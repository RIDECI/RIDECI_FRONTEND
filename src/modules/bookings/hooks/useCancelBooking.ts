import { useState } from "react";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

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
      const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al cancelar la reserva.");
        setIsLoading(false);
        return false;
      }

      setIsSuccess(true);
      setIsLoading(false);
      console.log(`Reserva ${bookingId} cancelada exitosamente.`);
      return true;
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al cancelar reserva:", err.message);
      return false;
    }
  };

  return { cancelBooking, error, isLoading, isSuccess };
};
