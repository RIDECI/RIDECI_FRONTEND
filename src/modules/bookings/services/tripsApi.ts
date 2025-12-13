import type { AvailableTrip, TripDetails, BookingConfirmation } from '../types/Trip';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const BOOKINGS_BASE_URL = 'http://localhost:8080';

export interface SearchTripsParams {
  destination?: string;
  departureTime?: string;
  nearbySearch?: boolean;
}

export const searchTrips = async (params: SearchTripsParams): Promise<AvailableTrip[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.destination) {
      queryParams.append('destination', params.destination);
    }
    
    if (params.departureTime) {
      queryParams.append('departureTime', params.departureTime);
    }
    
    if (params.nearbySearch !== undefined) {
      queryParams.append('nearbySearch', params.nearbySearch.toString());
    }

    const response = await fetch(
      `${API_BASE_URL}/trips/search?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error al buscar viajes: ${response.statusText}`);
    }

    const data: AvailableTrip[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error en searchTrips:', error);
    throw error;
  }
};

export const getTripDetails = async (tripId: string): Promise<TripDetails> => {
  try {
    console.log('Fetching trip details for ID:', tripId);
    console.log('URL:', `${API_BASE_URL}/trips/${tripId}`);
    
    const response = await fetch(
      `${API_BASE_URL}/trips/${tripId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al obtener detalles del viaje: ${response.status} ${response.statusText}`);
    }

    const data: TripDetails = await response.json();
    console.log('Trip details received:', data);
    return data;
  } catch (error) {
    console.error('Error en getTripDetails:', error);
    throw error;
  }
};

export interface CreateBookingRequest {
  travelId: string;
  passengerId: number;
  origin: string;
  destination: string;
  reservedSeats: number;
  totalAmount: number;
  status?: string;
  notes?: string;
  bookingDate: string;
}

export interface CreateBookingResponse {
  id: string;
  travelId: string;
  passengerId: number;
  origin: string;
  destination: string;
  reservedSeats: number;
  totalAmount: number;
  status: string;
  notes: string;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
}

export const createBooking = async (bookingData: CreateBookingRequest): Promise<CreateBookingResponse> => {
  try {
    console.log('Creating booking with data:', bookingData);
    
    const response = await fetch(
      `${BOOKINGS_BASE_URL}/bookings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      }
    );

    console.log('Booking response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error creating booking:', errorText);
      throw new Error(`Error al crear la reserva: ${response.status} ${response.statusText}`);
    }

    const data: CreateBookingResponse = await response.json();
    console.log('Booking created:', data);
    return data;
  } catch (error) {
    console.error('Error en createBooking:', error);
    throw error;
  }
};

export const getBookingById = async (bookingId: string): Promise<CreateBookingResponse> => {
  try {
    console.log('Fetching booking details for ID:', bookingId);
    
    const response = await fetch(
      `${BOOKINGS_BASE_URL}/bookings/${bookingId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Booking response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching booking:', errorText);
      throw new Error(`Error al obtener la reserva: ${response.status} ${response.statusText}`);
    }

    const data: CreateBookingResponse = await response.json();
    console.log('Booking details received:', data);
    return data;
  } catch (error) {
    console.error('Error en getBookingById:', error);
    throw error;
  }
};

export const getMyBookings = async (passengerId: number): Promise<CreateBookingResponse[]> => {
  try {
    console.log('Fetching bookings for passenger:', passengerId);
    
    const response = await fetch(
      `${BOOKINGS_BASE_URL}/bookings/passenger/${passengerId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('My bookings response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching bookings:', errorText);
      throw new Error(`Error al obtener las reservas: ${response.status} ${response.statusText}`);
    }

    const data: CreateBookingResponse[] = await response.json();
    console.log('Bookings received:', data);
    return data;
  } catch (error) {
    console.error('Error en getMyBookings:', error);
    throw error;
  }
};
