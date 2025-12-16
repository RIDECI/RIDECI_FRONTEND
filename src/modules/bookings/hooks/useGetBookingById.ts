import { useState, useEffect } from "react";
import type { BookingResponse } from "../types/booking";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

export const useGetBookingById = (bookingId: string | null) => {
  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError("Reserva no encontrada.");
          } else {
            const errorData = await response.json().catch(() => null);
            setError(errorData?.message || "Error al obtener la reserva.");
          }
          setIsLoading(false);
          return;
        }

        const bookingResponse: BookingResponse = await response.json();
        setBookingData(bookingResponse);
        setIsLoading(false);
        console.log("Reserva obtenida:", bookingResponse);
      } catch (err: any) {
        setError("Error de conexión con el servidor.");
        setIsLoading(false);
        console.log("Error al obtener reserva:", err.message);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return { bookingData, error, isLoading };
};
