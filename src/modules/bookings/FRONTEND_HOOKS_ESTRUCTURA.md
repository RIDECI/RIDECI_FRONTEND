# 🪝 ESTRUCTURA DE HOOKS PARA BOOKINGS - SIGUIENDO PATRÓN DEL FRONTEND

## 📁 Estructura de Carpetas Recomendada

```
frontend/
├── src/
│   ├── bookings/
│   │   ├── components/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── BookingList.tsx
│   │   ├── hooks/
│   │   │   ├── createBookingHook.ts          ✅
│   │   │   ├── deleteBookingHook.ts          ✅
│   │   │   ├── getBookingByIdHook.ts         ✅
│   │   │   ├── getBookingsByPassengerHook.ts ✅
│   │   │   ├── getBookingsByTravelHook.ts    ✅
│   │   │   ├── updateBookingSeatsHook.ts     ✅
│   │   │   ├── confirmBookingHook.ts         ✅
│   │   │   ├── cancelBookingHook.ts          ✅
│   │   │   ├── completeBookingHook.ts        ✅
│   │   │   └── validateAvailabilityHook.ts   ✅
│   │   ├── pages/
│   │   │   ├── BookingsPage.tsx
│   │   │   ├── CreateBookingPage.tsx
│   │   │   └── BookingDetailPage.tsx
│   │   └── types/
│   │       └── booking.ts
```

---

## 📝 PASO 1: Definir Types

**Archivo:** `src/bookings/types/booking.ts`

```typescript
// Enums
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

// Request Types
export interface CreateBookingRequest {
  travelId: string;
  passengerId: number;
  origin: string;
  destination: string;
  reservedSeats: number;
  totalAmount: number;
  notes?: string;
  bookingDate: string; // ISO 8601
}

export interface UpdateSeatsRequest {
  newSeats: number;
}

export interface AvailabilityRequest {
  travelId: string;
  seats: number;
}

// Response Types
export interface BookingResponse {
  id: string;
  travelId: string;
  passengerId: number;
  origin: string;
  destination: string;
  reservedSeats: number;
  totalAmount: number;
  status: BookingStatus;
  notes?: string;
  bookingDate: string;
  cancellationDate?: string;
  confirmationDate?: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityResponse {
  available: boolean;
  travelId: string;
  requestedSeats: number;
  availableSeats: number;
}
```

---

## 🪝 PASO 2: Crear Hooks Individuales

### Hook 1: Crear Reserva

**Archivo:** `src/bookings/hooks/createBookingHook.ts`

```typescript
import { useState } from "react";
import type { CreateBookingRequest, BookingResponse } from "../types/booking";
import { useNavigate } from "react-router-dom";

// URL base del backend - Usar variable de entorno
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
      
      // Navegar a la página de detalle de la reserva
      navigate(`/bookings/${bookingResponse.id}`);
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error en la solicitud de creación:", err.message);
    }
  };

  return { bookingData, handleCreateBooking, error, isLoading };
};
```

---

### Hook 2: Obtener Reserva por ID

**Archivo:** `src/bookings/hooks/getBookingByIdHook.ts`

```typescript
import { useState, useEffect } from "react";
import type { BookingResponse } from "../types/booking";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

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
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
```

---

### Hook 3: Obtener Reservas por Pasajero

**Archivo:** `src/bookings/hooks/getBookingsByPassengerHook.ts`

```typescript
import { useState, useEffect } from "react";
import type { BookingResponse } from "../types/booking";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useGetBookingsByPassenger = (passengerId: number | null) => {
  const [bookingsData, setBookingsData] = useState<BookingResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!passengerId) return;

    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/bookings/passenger/${passengerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

    fetchBookings();
  }, [passengerId]);

  // Función para refrescar los datos manualmente
  const refetch = async () => {
    if (!passengerId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/bookings/passenger/${passengerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        const bookingsResponse: BookingResponse[] = await response.json();
        setBookingsData(bookingsResponse);
      }
    } catch (err: any) {
      console.log("Error al refrescar reservas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { bookingsData, error, isLoading, refetch };
};
```

---

### Hook 4: Obtener Reservas por Viaje

**Archivo:** `src/bookings/hooks/getBookingsByTravelHook.ts`

```typescript
import { useState, useEffect } from "react";
import type { BookingResponse } from "../types/booking";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useGetBookingsByTravel = (travelId: string | null) => {
  const [bookingsData, setBookingsData] = useState<BookingResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!travelId) return;

    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/bookings/travel/${travelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          setError(errorData?.message || "Error al obtener las reservas del viaje.");
          setIsLoading(false);
          return;
        }

        const bookingsResponse: BookingResponse[] = await response.json();
        setBookingsData(bookingsResponse);
        setIsLoading(false);
        console.log(`Reservas del viaje ${travelId}:`, bookingsResponse);
      } catch (err: any) {
        setError("Error de conexión con el servidor.");
        setIsLoading(false);
        console.log("Error al obtener reservas del viaje:", err.message);
      }
    };

    fetchBookings();
  }, [travelId]);

  const refetch = async () => {
    if (!travelId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/bookings/travel/${travelId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        const bookingsResponse: BookingResponse[] = await response.json();
        setBookingsData(bookingsResponse);
      }
    } catch (err: any) {
      console.log("Error al refrescar:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { bookingsData, error, isLoading, refetch };
};
```

---

### Hook 5: Confirmar Reserva

**Archivo:** `src/bookings/hooks/confirmBookingHook.ts`

```typescript
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useConfirmBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleConfirmBooking = async (bookingId: string) => {
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    if (!bookingId) {
      setError("ID de reserva requerido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/confirm`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al confirmar la reserva.");
        setIsLoading(false);
        console.log("Error al confirmar:", errorData);
        return;
      }

      setSuccess(true);
      setIsLoading(false);
      console.log(`Reserva ${bookingId} confirmada exitosamente`);
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al confirmar reserva:", err.message);
    }
  };

  return { handleConfirmBooking, error, isLoading, success };
};
```

---

### Hook 6: Cancelar Reserva

**Archivo:** `src/bookings/hooks/cancelBookingHook.ts`

```typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useCancelBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCancelBooking = async (bookingId: string, redirectToList: boolean = false) => {
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    if (!bookingId) {
      setError("ID de reserva requerido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al cancelar la reserva.");
        setIsLoading(false);
        console.log("Error al cancelar:", errorData);
        return;
      }

      setSuccess(true);
      setIsLoading(false);
      console.log(`Reserva ${bookingId} cancelada exitosamente`);
      
      if (redirectToList) {
        navigate("/bookings");
      }
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al cancelar reserva:", err.message);
    }
  };

  return { handleCancelBooking, error, isLoading, success };
};
```

---

### Hook 7: Actualizar Asientos

**Archivo:** `src/bookings/hooks/updateBookingSeatsHook.ts`

```typescript
import { useState } from "react";
import type { UpdateSeatsRequest, BookingResponse } from "../types/booking";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useUpdateBookingSeats = () => {
  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateSeats = async (
    bookingId: string,
    data: UpdateSeatsRequest
  ) => {
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    if (!bookingId) {
      setError("ID de reserva requerido.");
      setIsLoading(false);
      return;
    }

    if (!data.newSeats || data.newSeats < 1) {
      setError("Debe especificar al menos 1 asiento.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/seats`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al actualizar los asientos.");
        setIsLoading(false);
        console.log("Error al actualizar asientos:", errorData);
        return;
      }

      const bookingResponse: BookingResponse = await response.json();
      setBookingData(bookingResponse);
      setSuccess(true);
      setIsLoading(false);
      console.log("Asientos actualizados:", bookingResponse);
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al actualizar asientos:", err.message);
    }
  };

  return { bookingData, handleUpdateSeats, error, isLoading, success };
};
```

---

### Hook 8: Completar Reserva

**Archivo:** `src/bookings/hooks/completeBookingHook.ts`

```typescript
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useCompleteBooking = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleCompleteBooking = async (bookingId: string) => {
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    if (!bookingId) {
      setError("ID de reserva requerido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al completar la reserva.");
        setIsLoading(false);
        console.log("Error al completar:", errorData);
        return;
      }

      setSuccess(true);
      setIsLoading(false);
      console.log(`Reserva ${bookingId} completada exitosamente`);
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al completar reserva:", err.message);
    }
  };

  return { handleCompleteBooking, error, isLoading, success };
};
```

---

### Hook 9: Validar Disponibilidad

**Archivo:** `src/bookings/hooks/validateAvailabilityHook.ts`

```typescript
import { useState } from "react";
import type { AvailabilityResponse } from "../types/booking";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const useValidateAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleValidateAvailability = async (
    travelId: string,
    seats: number
  ) => {
    setError(null);
    setIsLoading(true);
    setAvailabilityData(null);

    if (!travelId) {
      setError("ID de viaje requerido.");
      setIsLoading(false);
      return;
    }

    if (!seats || seats < 1) {
      setError("Debe especificar al menos 1 asiento.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/bookings/validate-availability?travelId=${travelId}&seats=${seats}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Error al validar disponibilidad.");
        setIsLoading(false);
        console.log("Error al validar:", errorData);
        return;
      }

      const availabilityResponse: AvailabilityResponse = await response.json();
      setAvailabilityData(availabilityResponse);
      setIsLoading(false);
      console.log("Disponibilidad:", availabilityResponse);
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      setIsLoading(false);
      console.log("Error al validar disponibilidad:", err.message);
    }
  };

  return { availabilityData, handleValidateAvailability, error, isLoading };
};
```

---

## 📦 PASO 3: Exportar Todos los Hooks

**Archivo:** `src/bookings/hooks/index.ts`

```typescript
export { useCreateBooking } from "./createBookingHook";
export { useGetBookingById } from "./getBookingByIdHook";
export { useGetBookingsByPassenger } from "./getBookingsByPassengerHook";
export { useGetBookingsByTravel } from "./getBookingsByTravelHook";
export { useConfirmBooking } from "./confirmBookingHook";
export { useCancelBooking } from "./cancelBookingHook";
export { useUpdateBookingSeats } from "./updateBookingSeatsHook";
export { useCompleteBooking } from "./completeBookingHook";
export { useValidateAvailability } from "./validateAvailabilityHook";
```

---

## 🎯 PASO 4: Usar Hooks en Componentes

### Ejemplo 1: Formulario de Creación

**Archivo:** `src/bookings/components/BookingForm.tsx`

```typescript
import { useState } from "react";
import { useCreateBooking } from "../hooks";
import type { CreateBookingRequest } from "../types/booking";

interface BookingFormProps {
  travelId: string;
}

export const BookingForm = ({ travelId }: BookingFormProps) => {
  const { handleCreateBooking, error, isLoading } = useCreateBooking();
  
  const [formData, setFormData] = useState({
    passengerId: "",
    origin: "",
    destination: "",
    reservedSeats: 1,
    totalAmount: 0,
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData: CreateBookingRequest = {
      travelId,
      passengerId: Number(formData.passengerId),
      origin: formData.origin,
      destination: formData.destination,
      reservedSeats: formData.reservedSeats,
      totalAmount: formData.totalAmount,
      notes: formData.notes,
      bookingDate: new Date().toISOString(),
    };

    await handleCreateBooking(bookingData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label>ID Pasajero</label>
        <input
          type="number"
          value={formData.passengerId}
          onChange={(e) =>
            setFormData({ ...formData, passengerId: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label>Origen</label>
        <input
          type="text"
          value={formData.origin}
          onChange={(e) =>
            setFormData({ ...formData, origin: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label>Destino</label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label>Asientos</label>
        <input
          type="number"
          min="1"
          value={formData.reservedSeats}
          onChange={(e) =>
            setFormData({ ...formData, reservedSeats: Number(e.target.value) })
          }
          required
        />
      </div>

      <div>
        <label>Monto Total</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.totalAmount}
          onChange={(e) =>
            setFormData({ ...formData, totalAmount: Number(e.target.value) })
          }
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Creando..." : "Crear Reserva"}
      </button>
    </form>
  );
};
```

---

### Ejemplo 2: Lista de Reservas del Usuario

**Archivo:** `src/bookings/pages/BookingsPage.tsx`

```typescript
import { useEffect } from "react";
import { useGetBookingsByPassenger } from "../hooks";
import { BookingCard } from "../components/BookingCard";

export const BookingsPage = () => {
  // Obtener el ID del usuario actual (puede venir de un context de auth)
  const currentUserId = Number(localStorage.getItem("userId"));
  
  const { bookingsData, error, isLoading, refetch } = 
    useGetBookingsByPassenger(currentUserId);

  if (isLoading) {
    return <div>Cargando reservas...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded">
        {error}
        <button onClick={refetch} className="ml-4 underline">
          Reintentar
        </button>
      </div>
    );
  }

  if (!bookingsData || bookingsData.length === 0) {
    return <div>No tienes reservas aún.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      
      <button 
        onClick={refetch}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Actualizar
      </button>

      <div className="space-y-4">
        {bookingsData.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};
```

---

### Ejemplo 3: Detalle de Reserva con Acciones

**Archivo:** `src/bookings/pages/BookingDetailPage.tsx`

```typescript
import { useParams } from "react-router-dom";
import { 
  useGetBookingById, 
  useConfirmBooking, 
  useCancelBooking 
} from "../hooks";

export const BookingDetailPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  
  const { bookingData, error, isLoading } = useGetBookingById(bookingId || null);
  const { handleConfirmBooking, isLoading: confirming } = useConfirmBooking();
  const { handleCancelBooking, isLoading: cancelling } = useCancelBooking();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!bookingData) return <div>Reserva no encontrada</div>;

  const handleConfirm = async () => {
    if (window.confirm("¿Confirmar esta reserva?")) {
      await handleConfirmBooking(bookingData.id);
      window.location.reload(); // Refrescar para ver cambios
    }
  };

  const handleCancel = async () => {
    if (window.confirm("¿Cancelar esta reserva?")) {
      await handleCancelBooking(bookingData.id, true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle de Reserva</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">ID</p>
            <p className="font-medium">{bookingData.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Estado</p>
            <p className="font-medium">{bookingData.status}</p>
          </div>
          <div>
            <p className="text-gray-600">Origen</p>
            <p className="font-medium">{bookingData.origin}</p>
          </div>
          <div>
            <p className="text-gray-600">Destino</p>
            <p className="font-medium">{bookingData.destination}</p>
          </div>
          <div>
            <p className="text-gray-600">Asientos</p>
            <p className="font-medium">{bookingData.reservedSeats}</p>
          </div>
          <div>
            <p className="text-gray-600">Total</p>
            <p className="font-medium">${bookingData.totalAmount}</p>
          </div>
        </div>

        {bookingData.status === "PENDING" && (
          <div className="mt-6 flex gap-2">
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {confirming ? "Confirmando..." : "Confirmar"}
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              {cancelling ? "Cancelando..." : "Cancelar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 🔥 PASO 5: Variables de Entorno

**Archivo:** `.env`

```env
# Backend URL
VITE_API_URL=http://localhost:8080

# Otras configuraciones
VITE_APP_NAME=RideCi Bookings
```

**Archivo:** `.env.production`

```env
VITE_API_URL=https://poseidon-search-and-booking-production.up.railway.app
```

---

## ✅ COMPARACIÓN CON EL PATRÓN DE REGISTRO

| Aspecto | useRegister | useCreateBooking |
|---------|-------------|------------------|
| **Estructura** | ✅ Igual | useState + navigate + fetch |
| **Validaciones** | ✅ Igual | Validación de campos antes de fetch |
| **Manejo de Errores** | ✅ Igual | setError con mensajes descriptivos |
| **Estados de Carga** | ✅ Agregado | isLoading para UX |
| **Navegación** | ✅ Igual | useNavigate después de éxito |
| **Logs** | ✅ Igual | console.log para debugging |

---

## 📚 RESUMEN DE TODOS LOS HOOKS

| Hook | Método | Endpoint | Retorna |
|------|--------|----------|---------|
| `useCreateBooking` | POST | `/bookings` | BookingResponse |
| `useGetBookingById` | GET | `/bookings/:id` | BookingResponse |
| `useGetBookingsByPassenger` | GET | `/bookings/passenger/:id` | BookingResponse[] |
| `useGetBookingsByTravel` | GET | `/bookings/travel/:id` | BookingResponse[] |
| `useConfirmBooking` | PATCH | `/bookings/:id/confirm` | void |
| `useCancelBooking` | DELETE | `/bookings/:id` | void |
| `useUpdateBookingSeats` | PATCH | `/bookings/:id/seats` | BookingResponse |
| `useCompleteBooking` | PATCH | `/bookings/:id/complete` | void |
| `useValidateAvailability` | GET | `/bookings/validate-availability` | AvailabilityResponse |

---

## 🎯 VENTAJAS DE ESTA ESTRUCTURA

✅ **Separación de responsabilidades** - Un hook por funcionalidad  
✅ **Reutilizable** - Usar el mismo hook en múltiples componentes  
✅ **Mantenible** - Fácil de actualizar y debuggear  
✅ **Type-safe** - TypeScript previene errores  
✅ **Consistente** - Todos los hooks siguen el mismo patrón  
✅ **Escalable** - Fácil agregar nuevos hooks  

---

**¡Con esta estructura tendrás tus hooks organizados siguiendo el mismo patrón del microservicio de usuarios!** 🚀
