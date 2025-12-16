import { useState } from "react";
import type { CreateBookingRequest, BookingResponse } from "../types/booking";
import { useNavigate } from "react-router-dom";
import { useGlobalNotifications } from "@/context/GlobalNotificationContext";

// URL del backend desplegado
const API_URL = "https://poseidonsearchandbooking-production-98fe.up.railway.app";

export const useCreateBooking = () => {
  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addNotification } = useGlobalNotifications();

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
      console.log('📤 Enviando al backend Poseidon:', `${API_URL}/bookings`);
      console.log('📦 Payload:', JSON.stringify(data, null, 2));
      
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
<<<<<<< HEAD
        const errorMsg = errorData?.message || "Error al crear la reserva.";
        setError(errorMsg);
        setIsLoading(false);
        console.log("Error al crear reserva:", errorData);

        addNotification({
          title: errorMsg,
          type: 'info',
        });
        return;
=======
        const errorMessage = errorData?.message || errorData?.error || `Error ${response.status}: ${response.statusText}`;
        setError(errorMessage);
        setIsLoading(false);
        console.error("❌ Error al crear reserva:", errorData);
        console.error("❌ Status:", response.status, response.statusText);
        throw new Error(errorMessage);
>>>>>>> d820b38c2ea572da5080de6b76430a5d496038d8
      }

      const bookingResponse: BookingResponse = await response.json();
      setBookingData(bookingResponse);
      setIsLoading(false);
<<<<<<< HEAD
      console.log("Reserva creada exitosamente:", bookingResponse);

      addNotification({
        title: '¡Reserva creada exitosamente!',
        type: 'success',
      });

=======
      console.log("✅ Reserva creada exitosamente:", bookingResponse);
      
>>>>>>> d820b38c2ea572da5080de6b76430a5d496038d8
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
