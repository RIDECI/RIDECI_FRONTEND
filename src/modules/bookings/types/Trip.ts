export type TripStatus = 'Confirmado' | 'Confirmado' | 'Pendiente' | 'Cancelado';

export interface Trip {
  id: string;
  route: string;
  date: string;
  time: string;
  driverName: string;
  driverImage: string;
  status: TripStatus;
  statusColor: 'green' | 'yellow' | 'red';
}

export interface TabType {
  id: 'scheduled' | 'history';
  label: string;
}

export interface AvailableTrip {
  id: string;
  driverName: string;
  vehicleType: string;
  rating: string;
  route: string;
  departureTime: string;
  price: number;
  availableSeats: number;
}
export interface TripDetails {
  id: string;
  driver: {
    name: string;
    rating: string;
    totalTrips: number;
    avatar?: string;
  };
  vehicle: {
    brand: string;
    model: string;
    color: string;
    plate: string;
  };
  trip: {
    origin: string;
    destination: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
  };
  pricing: {
    total: number;
    currency: string;
  };
  mapImageUrl?: string;
}
export interface BookingConfirmation {
  bookingId: string;
  trip: {
    origin: string;
    destination: string;
    dateTime: string;
  };
  driver: {
    name: string;
    rating: string;
    avatar?: string;
  };
  payment: {
    total: number;
    currency: string;
    method: string;
    methodIcon: string;
  };
  
}
export interface CompletedTrip {
  tripId: string;
  origin: string;
  destination: string;
  payment: {
    status: 'pending' | 'completed';
    baseFare: number;
    total: number;
    currency: string;
  };
  mapImageUrl?: string;

}
