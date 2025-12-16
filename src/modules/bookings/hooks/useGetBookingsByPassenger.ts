import { useState, useEffect } from "react";
import type { BookingResponse } from "../types/booking";
import { getBookingsApiUrl } from '../utils/apiConfig';

export const useGetBookingsByPassenger = (passengerId: number | null) => {
  const [bookingsData, setBookingsData] = useState<BookingResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBookings = async () => {
    if (!passengerId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = getBookingsApiUrl();
      const response = await fetch(
        `${baseUrl}/passenger/${passengerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al obtener las reservas.");
        setIsLoading(false);
        return;
      }

      const bookingsResponse: BookingResponse[] = await response.json();
      setBookingsData(bookingsResponse);
      setIsLoading(false);
      console.log(`Reservas del pasajero ${passengerId}:`, bookingsResponse);
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al obtener reservas:", err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [passengerId]);

  // Función para refrescar los datos manualmente
  const refetch = async () => {
    await fetchBookings();
  };

  return { bookingsData, error, isLoading, refetch };
};
