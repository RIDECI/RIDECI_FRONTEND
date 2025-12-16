import { useState } from "react";
import type { CreateBookingRequest, BookingResponse } from "../types/booking";
import { useNavigate } from "react-router-dom";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

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
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al crear la reserva.");
        setIsLoading(false);
        console.log("Error al crear reserva:", errorData);
        return;
      }

      const bookingResponse: BookingResponse = await response.json();
      setBookingData(bookingResponse);
      setIsLoading(false);
      console.log("Reserva creada exitosamente:", bookingResponse);
      
      // No navegar automáticamente, dejar que el componente lo maneje
      // navigate(`/app/bookingConfirmed`, { state: { bookingId: bookingResponse.id } });
      
      return bookingResponse;
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error en la solicitud de creación:", err.message);
      throw err; // Propagar el error para que el componente lo maneje
    }
  };

  return { bookingData, handleCreateBooking, error, isLoading };
};
