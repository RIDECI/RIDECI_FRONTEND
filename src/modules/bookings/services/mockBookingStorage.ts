// Sistema de almacenamiento de reservas en el frontend
export interface BookingData {
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

// Interfaz para disponibilidad de viajes
export interface TripAvailability {
  travelId: string;
  availableSeats: number;
  totalSeats: number;
  reservedSeats: number;
}

const STORAGE_KEY = 'rideci_bookings';
const AVAILABILITY_KEY = 'rideci_trips_availability';

// Obtener todas las reservas del localStorage
export const getAllBookings = (): BookingData[] => {
  try {
    const bookings = localStorage.getItem(STORAGE_KEY);
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
};

// Guardar una nueva reserva
export const saveBooking = (booking: BookingData): BookingData => {
  try {
    const bookings = getAllBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    console.log('✅ Booking saved to localStorage:', booking);
    return booking;
  } catch (error) {
    console.error('Error saving booking to localStorage:', error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getBookingById = (bookingId: string): BookingData | null => {
  try {
    const bookings = getAllBookings();
    return bookings.find(b => b._id === bookingId) || null;
  } catch (error) {
    console.error('Error getting booking by ID:', error);
    return null;
  }
};

// Cancelar una reserva (actualizar estado)
export const cancelBookingById = (bookingId: string): boolean => {
  try {
    const bookings = getAllBookings();
    const bookingIndex = bookings.findIndex(b => b._id === bookingId);
    
    if (bookingIndex === -1) {
      console.warn('Booking not found:', bookingId);
      return false;
    }
    
    // Actualizar estado a CANCELLED
    bookings[bookingIndex].status = 'CANCELLED';
    bookings[bookingIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    console.log('✅ Booking cancelled:', bookingId);
    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
};

// Confirmar una reserva (cambiar de PENDING a CONFIRMED)
export const confirmBookingById = (bookingId: string): boolean => {
  try {
    const bookings = getAllBookings();
    const bookingIndex = bookings.findIndex(b => b._id === bookingId);
    
    if (bookingIndex === -1) {
      console.warn('Booking not found:', bookingId);
      return false;
    }
    
    // Actualizar estado a CONFIRMED
    bookings[bookingIndex].status = 'CONFIRMED';
    bookings[bookingIndex].confirmationDate = new Date().toISOString();
    bookings[bookingIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    console.log('✅ Booking confirmed:', bookingId);
    return true;
  } catch (error) {
    console.error('Error confirming booking:', error);
    return false;
  }
};

// Completar una reserva (cambiar a COMPLETED)
export const completeBookingById = (bookingId: string): boolean => {
  try {
    const bookings = getAllBookings();
    const bookingIndex = bookings.findIndex(b => b._id === bookingId);
    
    if (bookingIndex === -1) {
      console.warn('Booking not found:', bookingId);
      return false;
    }
    
    // Actualizar estado a COMPLETED
    bookings[bookingIndex].status = 'COMPLETED';
    bookings[bookingIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    console.log('✅ Booking completed:', bookingId);
    return true;
  } catch (error) {
    console.error('Error completing booking:', error);
    return false;
  }
};

// Eliminar una reserva completamente
export const deleteBooking = (bookingId: string): boolean => {
  try {
    const bookings = getAllBookings();
    const filteredBookings = bookings.filter(b => b._id !== bookingId);
    
    if (filteredBookings.length === bookings.length) {
      console.warn('Booking not found:', bookingId);
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBookings));
    console.log('✅ Booking deleted:', bookingId);
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
};

// Obtener reservas por pasajero
export const getBookingsByPassenger = (passengerId: number): BookingData[] => {
  try {
    const bookings = getAllBookings();
    return bookings.filter(b => b.passengerId === passengerId);
  } catch (error) {
    console.error('Error getting bookings by passenger:', error);
    return [];
  }
};

// Limpiar todas las reservas (para desarrollo)
export const clearAllBookings = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ All bookings cleared');
  } catch (error) {
    console.error('Error clearing bookings:', error);
  }
};

// ==================== SISTEMA DE DISPONIBILIDAD ====================

// Inicializar disponibilidad de viajes (se llama al cargar la app)
export const initializeTripAvailability = (): void => {
  try {
    const existing = localStorage.getItem(AVAILABILITY_KEY);
    if (existing) return; // Ya está inicializado
    
    // Disponibilidad inicial para todos los viajes mock
    const initialAvailability: Record<string, TripAvailability> = {
      '1': { travelId: '1', availableSeats: 1, totalSeats: 4, reservedSeats: 3 },
      '2': { travelId: '2', availableSeats: 2, totalSeats: 5, reservedSeats: 3 },
      '3': { travelId: '3', availableSeats: 3, totalSeats: 4, reservedSeats: 1 },
      '4': { travelId: '4', availableSeats: 2, totalSeats: 4, reservedSeats: 2 },
      '5': { travelId: '5', availableSeats: 1, totalSeats: 3, reservedSeats: 2 },
      '6': { travelId: '6', availableSeats: 3, totalSeats: 4, reservedSeats: 1 },
      '7': { travelId: '7', availableSeats: 2, totalSeats: 5, reservedSeats: 3 },
      '8': { travelId: '8', availableSeats: 4, totalSeats: 5, reservedSeats: 1 },
      '9': { travelId: '9', availableSeats: 1, totalSeats: 4, reservedSeats: 3 },
      '10': { travelId: '10', availableSeats: 2, totalSeats: 4, reservedSeats: 2 },
    };
    
    localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(initialAvailability));
    console.log('✅ Trip availability initialized');
  } catch (error) {
    console.error('Error initializing trip availability:', error);
  }
};

// Obtener disponibilidad de un viaje
export const getTripAvailability = (travelId: string): TripAvailability | null => {
  try {
    const data = localStorage.getItem(AVAILABILITY_KEY);
    if (!data) return null;
    
    const availability: Record<string, TripAvailability> = JSON.parse(data);
    return availability[travelId] || null;
  } catch (error) {
    console.error('Error getting trip availability:', error);
    return null;
  }
};

// Reducir disponibilidad cuando se hace una reserva
export const reduceAvailability = (travelId: string, seatsToReserve: number): boolean => {
  try {
    const data = localStorage.getItem(AVAILABILITY_KEY);
    if (!data) {
      console.error('Availability data not initialized');
      return false;
    }
    
    const availability: Record<string, TripAvailability> = JSON.parse(data);
    const tripAvailability = availability[travelId];
    
    if (!tripAvailability) {
      console.error('Trip not found:', travelId);
      return false;
    }
    
    if (tripAvailability.availableSeats < seatsToReserve) {
      console.error('Not enough seats available');
      return false;
    }
    
    // Reducir asientos disponibles
    tripAvailability.availableSeats -= seatsToReserve;
    tripAvailability.reservedSeats += seatsToReserve;
    
    availability[travelId] = tripAvailability;
    localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(availability));
    
    console.log(`✅ Availability reduced for trip ${travelId}:`, tripAvailability);
    return true;
  } catch (error) {
    console.error('Error reducing availability:', error);
    return false;
  }
};

// Aumentar disponibilidad cuando se cancela una reserva
export const restoreAvailability = (travelId: string, seatsToRestore: number): boolean => {
  try {
    const data = localStorage.getItem(AVAILABILITY_KEY);
    if (!data) return false;
    
    const availability: Record<string, TripAvailability> = JSON.parse(data);
    const tripAvailability = availability[travelId];
    
    if (!tripAvailability) return false;
    
    tripAvailability.availableSeats += seatsToRestore;
    tripAvailability.reservedSeats -= seatsToRestore;
    
    availability[travelId] = tripAvailability;
    localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(availability));
    
    console.log(`✅ Availability restored for trip ${travelId}:`, tripAvailability);
    return true;
  } catch (error) {
    console.error('Error restoring availability:', error);
    return false;
  }
};
