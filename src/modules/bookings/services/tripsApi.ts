import type { AvailableTrip, TripDetails } from '../types/Trip';
import { 
  saveBooking, 
  getBookingById as getBookingFromStorage, 
  cancelBookingById, 
  confirmBookingById,
  completeBookingById,
  getBookingsByPassenger,
  getTripAvailability,
  reduceAvailability,
  restoreAvailability,
  initializeTripAvailability
} from './mockBookingStorage';
import type { BookingData } from './mockBookingStorage';

// Inicializar disponibilidad al cargar el módulo
initializeTripAvailability();

// URL del backend de reservas desplegado (no usado actualmente - todo en frontend)
// const BOOKINGS_BASE_URL = 'https://poseidonsearchandbooking-production-98fe.up.railway.app';

export interface SearchTripsParams {
  destination?: string;
  departureTime?: string;
  nearbySearch?: boolean;
}

export const searchTrips = async (params?: SearchTripsParams): Promise<AvailableTrip[]> => {
  try {
    // Datos base de los viajes mock
    const baseMockTrips = [
      {
        id: '1',
        driverName: 'Juan Pérez',
        vehicleType: 'Chevrolet Spark',
        rating: 4.2,
        route: 'Portal Norte → Universidad',
        departureTime: '07:00',
        price: 5500,
      },
      {
        id: '2',
        driverName: 'María González',
        vehicleType: 'Mazda CX-5',
        rating: 4.8,
        route: 'Centro → Aeropuerto',
        departureTime: '15:45',
        price: 8500,
      },
      {
        id: '3',
        driverName: 'Carlos Santana',
        vehicleType: 'Volkswagen Nivus',
        rating: 4.5,
        route: 'Universidad Nacional → Portal 80',
        departureTime: '18:30',
        price: 6000,
      },
      {
        id: '4',
        driverName: 'Ana María López',
        vehicleType: 'Renault Logan',
        rating: 4.7,
        route: 'Portal 80 → Centro',
        departureTime: '06:30',
        price: 4500,
      },
      {
        id: '5',
        driverName: 'Roberto Díaz',
        vehicleType: 'Toyota Corolla',
        rating: 4.6,
        route: 'Suba → Universidad',
        departureTime: '08:15',
        price: 7000,
      },
      {
        id: '6',
        driverName: 'Laura Martínez',
        vehicleType: 'Nissan Versa',
        rating: 4.9,
        route: 'Fontibón → Terminal',
        departureTime: '09:00',
        price: 6500,
      },
      {
        id: '7',
        driverName: 'Pedro Ramírez',
        vehicleType: 'Kia Sportage',
        rating: 4.4,
        route: 'Usaquén → Centro',
        departureTime: '07:30',
        price: 5800,
      },
      {
        id: '8',
        driverName: 'Sofía Torres',
        vehicleType: 'Honda City',
        rating: 4.6,
        route: 'Kennedy → Portal 80',
        departureTime: '16:00',
        price: 4800,
      },
      {
        id: '9',
        driverName: 'Miguel Ángel Castro',
        vehicleType: 'Chevrolet Onix',
        rating: 4.3,
        route: 'Chapinero → Salitre',
        departureTime: '10:15',
        price: 5200,
      },
      {
        id: '10',
        driverName: 'Isabella Rojas',
        vehicleType: 'Mazda 3',
        rating: 4.8,
        route: 'Suba → Calle 100',
        departureTime: '14:30',
        price: 6200,
      },
    ];

    // Obtener disponibilidad actualizada para cada viaje
    const mockTrips: AvailableTrip[] = baseMockTrips.map(trip => {
      const availability = getTripAvailability(trip.id);
      return {
        ...trip,
        availableSeats: availability?.availableSeats ?? 0,
      };
    });

    console.log('Using mock trips data with dynamic availability');
    
    // Si hay parámetros de búsqueda, filtrar los viajes mock
    if (params?.destination) {
      const filtered = mockTrips.filter(trip => 
        trip.route.toLowerCase().includes(params.destination!.toLowerCase())
      );
      return filtered.length > 0 ? filtered : mockTrips;
    }
    
    return mockTrips;
  } catch (error) {
    console.error('Error en searchTrips:', error);
    throw error;
  }
};

export const getTripDetails = async (tripId: string): Promise<TripDetails> => {
  try {
    console.log('Getting trip details for ID:', tripId);
    
    // Datos mock detallados que coinciden con las imágenes
    const mockDetails: Record<string, TripDetails> = {
      '1': {
        id: '1',
        driver: {
          name: 'Juan Pérez',
          rating: 4.2,
          totalTrips: 145,
          phoneNumber: '+57 312 456 7890',
          profileImage: 'https://i.pravatar.cc/150?img=1',
        },
        vehicle: {
          brand: 'Chevrolet',
          model: 'Spark',
          year: 2020,
          color: 'Blanco',
          plate: 'ABC-123',
          type: 'Sedán',
        },
        trip: {
          origin: 'Cra. 74 #163-33, Bogotá, Colombia',
          destination: 'AK 45 (Autopista) #205-59, Suba, Bogotá, Colombia',
          departureTime: '24/12/2025, 10:00 a.m.',
          estimatedArrival: '10:30 a.m.',
          availableSeats: 1,
          distance: '15.2 km',
        },
        pricing: {
          basePrice: 5000,
          serviceFee: 500,
          total: 5500,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '2': {
        id: '2',
        driver: {
          name: 'María González',
          rating: 4.8,
          totalTrips: 320,
          phoneNumber: '+57 315 789 1234',
          profileImage: 'https://i.pravatar.cc/150?img=5',
        },
        vehicle: {
          brand: 'Mazda',
          model: 'CX-5',
          year: 2022,
          color: 'Gris',
          plate: 'XYZ-789',
          type: 'SUV',
        },
        trip: {
          origin: 'Centro, Bogotá, Colombia',
          destination: 'El Dorado Airport, Bogotá, Colombia',
          departureTime: '24/12/2025, 3:45 p.m.',
          estimatedArrival: '4:30 p.m.',
          availableSeats: 2,
          distance: '12.5 km',
        },
        pricing: {
          basePrice: 7500,
          serviceFee: 1000,
          total: 8500,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '3': {
        id: '3',
        driver: {
          name: 'Carlos Santana',
          rating: 4.5,
          totalTrips: 210,
          phoneNumber: '+57 318 234 5678',
          profileImage: 'https://i.pravatar.cc/150?img=3',
        },
        vehicle: {
          brand: 'Volkswagen',
          model: 'Nivus',
          year: 2021,
          color: 'Negro',
          plate: 'DEF-456',
          type: 'SUV',
        },
        trip: {
          origin: 'Universidad Nacional, Bogotá, Colombia',
          destination: 'Portal 80, Suba, Bogotá, Colombia',
          departureTime: '24/12/2025, 6:30 p.m.',
          estimatedArrival: '7:15 p.m.',
          availableSeats: 3,
          distance: '18.7 km',
        },
        pricing: {
          basePrice: 5500,
          serviceFee: 500,
          total: 6000,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '4': {
        id: '4',
        driver: {
          name: 'Ana María López',
          rating: 4.7,
          totalTrips: 189,
          phoneNumber: '+57 310 987 6543',
          profileImage: 'https://i.pravatar.cc/150?img=9',
        },
        vehicle: {
          brand: 'Renault',
          model: 'Logan',
          year: 2019,
          color: 'Azul',
          plate: 'GHI-789',
          type: 'Sedán',
        },
        trip: {
          origin: 'Portal 80, Suba, Bogotá, Colombia',
          destination: 'Centro, Bogotá, Colombia',
          departureTime: '24/12/2025, 6:30 a.m.',
          estimatedArrival: '7:15 a.m.',
          availableSeats: 2,
          distance: '16.3 km',
        },
        pricing: {
          basePrice: 4000,
          serviceFee: 500,
          total: 4500,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '5': {
        id: '5',
        driver: {
          name: 'Roberto Díaz',
          rating: 4.6,
          totalTrips: 267,
          phoneNumber: '+57 316 345 6789',
          profileImage: 'https://i.pravatar.cc/150?img=12',
        },
        vehicle: {
          brand: 'Toyota',
          model: 'Corolla',
          year: 2023,
          color: 'Plata',
          plate: 'JKL-012',
          type: 'Sedán',
        },
        trip: {
          origin: 'Suba, Bogotá, Colombia',
          destination: 'Universidad Nacional, Bogotá, Colombia',
          departureTime: '24/12/2025, 8:15 a.m.',
          estimatedArrival: '9:00 a.m.',
          availableSeats: 1,
          distance: '14.8 km',
        },
        pricing: {
          basePrice: 6500,
          serviceFee: 500,
          total: 7000,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '6': {
        id: '6',
        driver: {
          name: 'Laura Martínez',
          rating: 4.9,
          totalTrips: 340,
          phoneNumber: '+57 320 123 4567',
          profileImage: 'https://i.pravatar.cc/150?img=10',
        },
        vehicle: {
          brand: 'Nissan',
          model: 'Versa',
          year: 2022,
          color: 'Blanco',
          plate: 'MNO-345',
          type: 'Sedán',
        },
        trip: {
          origin: 'Fontibón, Bogotá, Colombia',
          destination: 'Terminal de Transporte, Bogotá, Colombia',
          departureTime: '24/12/2025, 9:00 a.m.',
          estimatedArrival: '9:35 a.m.',
          availableSeats: 3,
          distance: '10.2 km',
        },
        pricing: {
          basePrice: 6000,
          serviceFee: 500,
          total: 6500,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '7': {
        id: '7',
        driver: {
          name: 'Pedro Ramírez',
          rating: 4.4,
          totalTrips: 156,
          phoneNumber: '+57 314 567 8901',
          profileImage: 'https://i.pravatar.cc/150?img=7',
        },
        vehicle: {
          brand: 'Kia',
          model: 'Sportage',
          year: 2021,
          color: 'Rojo',
          plate: 'PQR-678',
          type: 'SUV',
        },
        trip: {
          origin: 'Usaquén, Bogotá, Colombia',
          destination: 'Centro Internacional, Bogotá, Colombia',
          departureTime: '24/12/2025, 7:30 a.m.',
          estimatedArrival: '8:15 a.m.',
          availableSeats: 2,
          distance: '13.8 km',
        },
        pricing: {
          basePrice: 5300,
          serviceFee: 500,
          total: 5800,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '8': {
        id: '8',
        driver: {
          name: 'Sofía Torres',
          rating: 4.6,
          totalTrips: 198,
          phoneNumber: '+57 319 234 5678',
          profileImage: 'https://i.pravatar.cc/150?img=16',
        },
        vehicle: {
          brand: 'Honda',
          model: 'City',
          year: 2020,
          color: 'Gris oscuro',
          plate: 'STU-901',
          type: 'Sedán',
        },
        trip: {
          origin: 'Kennedy, Bogotá, Colombia',
          destination: 'Portal 80, Bogotá, Colombia',
          departureTime: '24/12/2025, 4:00 p.m.',
          estimatedArrival: '4:40 p.m.',
          availableSeats: 4,
          distance: '11.5 km',
        },
        pricing: {
          basePrice: 4300,
          serviceFee: 500,
          total: 4800,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '9': {
        id: '9',
        driver: {
          name: 'Miguel Ángel Castro',
          rating: 4.3,
          totalTrips: 178,
          phoneNumber: '+57 311 345 6789',
          profileImage: 'https://i.pravatar.cc/150?img=13',
        },
        vehicle: {
          brand: 'Chevrolet',
          model: 'Onix',
          year: 2022,
          color: 'Azul',
          plate: 'VWX-234',
          type: 'Hatchback',
        },
        trip: {
          origin: 'Chapinero, Bogotá, Colombia',
          destination: 'Salitre, Bogotá, Colombia',
          departureTime: '24/12/2025, 10:15 a.m.',
          estimatedArrival: '10:50 a.m.',
          availableSeats: 1,
          distance: '8.3 km',
        },
        pricing: {
          basePrice: 4700,
          serviceFee: 500,
          total: 5200,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
      '10': {
        id: '10',
        driver: {
          name: 'Isabella Rojas',
          rating: 4.8,
          totalTrips: 245,
          phoneNumber: '+57 317 890 1234',
          profileImage: 'https://i.pravatar.cc/150?img=20',
        },
        vehicle: {
          brand: 'Mazda',
          model: '3',
          year: 2023,
          color: 'Plateado',
          plate: 'YZA-567',
          type: 'Sedán',
        },
        trip: {
          origin: 'Suba Centro, Bogotá, Colombia',
          destination: 'Calle 100, Bogotá, Colombia',
          departureTime: '24/12/2025, 2:30 p.m.',
          estimatedArrival: '3:10 p.m.',
          availableSeats: 2,
          distance: '9.7 km',
        },
        pricing: {
          basePrice: 5700,
          serviceFee: 500,
          total: 6200,
          currency: 'COP',
        },
        mapImageUrl: '/map-preview.png',
      },
    };

    const details = mockDetails[tripId];
    
    if (!details) {
      throw new Error('Viaje no encontrado');
    }

    // Obtener disponibilidad actualizada
    const availability = getTripAvailability(tripId);
    if (availability) {
      details.trip.availableSeats = availability.availableSeats;
    }

    console.log('Trip details (mock):', details);
    return details;
  } catch (error) {
    console.error('Error en getTripDetails:', error);
    throw error;
  }
};

export interface CreateBookingRequest {
  travelId: string;
  passengerId: number;
  reservedSeats: number;
  totalAmount: number;
  status: string; // "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"
  notes?: string;
  bookingDate: string; // ISO 8601 format
  origin: string;
  destination: string;
}

export interface CreateBookingResponse {
  _id: string;
  travelId: string;
  passengerId: number;
  reservedSeats: number;
  totalAmount: number;
  status: string;
  notes?: string;
  bookingDate: string;
  confirmationDate?: string;
  createdAt: string;
  updatedAt: string;
  _class?: string;
  origin: string;
  destination: string;
}

export const createBooking = async (bookingData: CreateBookingRequest): Promise<CreateBookingResponse> => {
  try {
    console.log('Creating booking with data:', bookingData);
    
    // Reducir disponibilidad antes de crear la reserva
    const availabilityReduced = reduceAvailability(bookingData.travelId, bookingData.reservedSeats);
    
    if (!availabilityReduced) {
      throw new Error('No hay suficientes asientos disponibles para esta reserva');
    }
    
    // Crear reserva usando almacenamiento local
    const newBooking: BookingData = {
      _id: `BOOKING-${Date.now()}`,
      travelId: bookingData.travelId,
      passengerId: bookingData.passengerId,
      reservedSeats: bookingData.reservedSeats,
      totalAmount: bookingData.totalAmount,
      status: bookingData.status,
      notes: bookingData.notes,
      bookingDate: bookingData.bookingDate,
      confirmationDate: bookingData.status === 'CONFIRMED' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _class: 'edu.dosw.rideci.infrastructure.persistence.entity.BookingDocument',
      origin: bookingData.origin,
      destination: bookingData.destination,
    };
    
    // Guardar en localStorage
    const savedBooking = saveBooking(newBooking);
    
    console.log('✅ Booking created and saved to localStorage:', savedBooking);
    console.log('📉 Availability reduced for trip:', bookingData.travelId);
    return savedBooking;
  } catch (error) {
    console.error('Error en createBooking:', error);
    throw error;
  }
};

export const getBookingById = async (bookingId: string): Promise<CreateBookingResponse | null> => {
  try {
    console.log('Fetching booking details for ID:', bookingId);
    
    // Obtener de localStorage
    const booking = getBookingFromStorage(bookingId);
    
    if (!booking) {
      console.warn('Booking not found in localStorage:', bookingId);
      throw new Error('Reserva no encontrada');
    }

    console.log('Booking details received from localStorage:', booking);
    return booking;
  } catch (error) {
    console.error('Error en getBookingById:', error);
    throw error;
  }
};

export const getMyBookings = async (passengerId: number): Promise<CreateBookingResponse[]> => {
  try {
    console.log('Fetching bookings for passenger:', passengerId);
    
    // Obtener de localStorage
    const bookings = getBookingsByPassenger(passengerId);
    
    console.log('Bookings received from localStorage:', bookings);
    return bookings;
  } catch (error) {
    console.error('Error en getMyBookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
  try {
    console.log('Cancelling booking with ID:', bookingId);
    
    // Primero obtener la reserva para saber cuántos asientos restaurar
    const booking = getBookingFromStorage(bookingId);
    
    if (!booking) {
      throw new Error('Reserva no encontrada.');
    }
    
    // Cancelar en localStorage
    const success = cancelBookingById(bookingId);
    
    if (!success) {
      throw new Error('No se pudo cancelar la reserva.');
    }
    
    // Restaurar disponibilidad
    restoreAvailability(booking.travelId, booking.reservedSeats);

    console.log('✅ Booking cancelled successfully');
    console.log('📈 Availability restored for trip:', booking.travelId);
  } catch (error) {
    console.error('Error en cancelBooking:', error);
    throw error;
  }
};

export const confirmBooking = async (bookingId: string): Promise<void> => {
  try {
    console.log('Confirming booking with ID:', bookingId);
    
    const success = confirmBookingById(bookingId);
    
    if (!success) {
      throw new Error('No se pudo confirmar la reserva.');
    }

    console.log('✅ Booking confirmed successfully');
  } catch (error) {
    console.error('Error en confirmBooking:', error);
    throw error;
  }
};

export const completeBooking = async (bookingId: string): Promise<void> => {
  try {
    console.log('Completing booking with ID:', bookingId);
    
    const success = completeBookingById(bookingId);
    
    if (!success) {
      throw new Error('No se pudo completar la reserva.');
    }

    console.log('✅ Booking completed successfully');
  } catch (error) {
    console.error('Error en completeBooking:', error);
    throw error;
  }
};
