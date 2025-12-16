import { useState } from "react";
import type { CreateBookingRequest, BookingResponse } from "../types/booking";
import { useNavigate } from "react-router-dom";
import { getBookingsApiUrl } from '../utils/apiConfig';

export const useCreateBooking = () => {
  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCreateBooking = async (data: CreateBookingRequest) => {
    setError(null);
    setIsLoading(true);

    // Validaciones
    if (
      !data.travelId ||
      !data.passengerId ||
      !data.origin ||
      !data.destination ||
      !data.reservedSeats ||
      !data.totalAmount ||
      !data.bookingDate
    ) {
      setError("Datos de reserva incompletos.");
      setIsLoading(false);
      console.log("Datos incompletos");
      return;
    }

    if (data.reservedSeats < 1) {
      setError("Debe reservar al menos 1 asiento.");
      setIsLoading(false);
      return;
    }

    if (data.totalAmount <= 0) {
      setError("El monto total debe ser mayor a 0.");
      setIsLoading(false);
      return;
    }

    try {
      const baseUrl = getBookingsApiUrl();
      console.log('📤 Enviando al backend Poseidon:', baseUrl);
      console.log('📦 Payload:', JSON.stringify(data, null, 2));
      
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || errorData?.error || `Error ${response.status}: ${response.statusText}`;
        setError(errorMessage);
        setIsLoading(false);
        console.error("❌ Error al crear reserva:", errorData);
        console.error("❌ Status:", response.status, response.statusText);
        throw new Error(errorMessage);
      }

      const bookingResponse: BookingResponse = await response.json();
      setBookingData(bookingResponse);
      setIsLoading(false);
      console.log("✅ Reserva creada exitosamente:", bookingResponse);
      
      // No navegar automáticamente, dejar que el componente lo maneje
      // navigate(`/app/bookingConfirmed`, { state: { bookingId: bookingResponse.id } });
      
      return bookingResponse;
    } catch (err: any) {
      const errorMessage = err.message || "Error de conexión con el servidor.";
      setError(errorMessage);
      setIsLoading(false);
      console.error("❌ Error en la solicitud de creación:", err);
      throw err; // Propagar el error para que el componente lo maneje
    }
  };

  return { bookingData, handleCreateBooking, error, isLoading };
};
