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

export interface TripDetails extends AvailableTrip {
  driverImage: string;
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  vehicle: {
    brand: string;
    plate: string;
    color: string;
  };
  totalPrice: number;
  paymentMethods: string[];
}
