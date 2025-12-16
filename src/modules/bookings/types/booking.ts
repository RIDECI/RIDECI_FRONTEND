// Enums para estados de reserva
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
