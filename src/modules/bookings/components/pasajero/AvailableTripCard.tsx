import { User, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ButtonPrimary from './ButtonPrimary';
import type { AvailableTrip } from '../../types/Trip';

interface AvailableTripCardProps {
  trip: AvailableTrip;
  onViewDetails: (trip: AvailableTrip) => void;
}

export function AvailableTripCard({ trip, onViewDetails }: AvailableTripCardProps) {
  const getSeatsColor = (seats: number) => {
    if (seats > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const getSeatsLabel = (seats: number) => {
    if (seats > 0) return `${seats} disponibles`;
    return 'Sin disponibilidad';
  };

  return (
    <Card className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Driver Avatar */}
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <User className="w-7 h-7 text-gray-600" />
            </div>
            {/* Driver Info */}
            <div>
              <p className="font-semibold text-gray-900 text-lg">{trip.driverName}</p>
              <p className="text-gray-500 text-sm">{trip.vehicleType}</p>
            </div>
          </div>
          {/* Rating */}
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{trip.rating}</p>
            <p className="text-xs text-gray-500">★</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-4 space-y-3">
        {/* Route */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
          <p className="font-medium text-gray-900">{trip.route}</p>
        </div>

        {/* Departure Time */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 flex-shrink-0 text-blue-600" />
          <p className="font-medium text-gray-900">{trip.departureTime}</p>
        </div>

        {/* Price and Available Seats */}
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-2xl font-bold text-blue-600">
            {trip.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full"></div>
            <span className={`font-semibold text-sm ${getSeatsColor(trip.availableSeats)}`}>
              {getSeatsLabel(trip.availableSeats)}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Button */}
      <div className="px-6 py-4 border-t">
        <ButtonPrimary
          title="Ver detalles"
          onClick={() => onViewDetails(trip)}
          disabled={trip.availableSeats === 0}
        />
      </div>
    </Card>
  );
}
