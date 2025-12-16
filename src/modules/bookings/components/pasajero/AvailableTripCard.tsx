import { MapPin, Clock, ArrowRight, Users, Star, Navigation } from 'lucide-react';
import type { AvailableTrip } from '../../types/Trip';

interface AvailableTripCardProps {
  trip: AvailableTrip;
  onViewDetails: (trip: AvailableTrip) => void;
}

export function AvailableTripCard({ trip, onViewDetails }: AvailableTripCardProps) {
  const getCuposLabel = (seats: number) => {
    if (seats === 0) return 'Sin cupos';
    if (seats === 1) return '1 cupo';
    return `${seats} cupos`;
  };

  // Obtener iniciales del conductor para el avatar
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const hasAvailableSeats = trip.availableSeats > 0;

  return (
    <div
      onClick={() => hasAvailableSeats && onViewDetails(trip)}
      className={`rounded-2xl p-4 transition-shadow ${
        hasAvailableSeats 
          ? 'hover:shadow-lg cursor-pointer' 
          : 'opacity-60 cursor-not-allowed'
      }`}
      style={{backgroundColor: '#E8F4FF'}}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-300 flex items-center justify-center text-white font-semibold">
          {getInitials(trip.driverName)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {trip.driverName}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-xs text-gray-600">{trip.rating}</span>
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"/>
            </div>
          </div>
          <p className="text-xs text-gray-500">{trip.vehicleType}</p>
        </div>
        <div className="shrink-0 -mt-1 -mr-1 p-1">
          <ArrowRight className="w-5 h-5 text-gray-900"/>
        </div>
      </div>

      <div className="mb-3 text-xs text-gray-600 space-y-1">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
          <span className="truncate">{trip.origin || 'undefined'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
          <span className="truncate">{trip.destination || 'undefined'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5"/>
          <span>{trip.departureTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold" style={{color: '#0B8EF5'}}>
          ${trip.price.toLocaleString('es-CO')} COP
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
          trip.availableSeats === 0 
            ? 'bg-red-100 text-red-600'
            : 'bg-green-100 text-green-600'
        }`}>
          <Users className="w-3.5 h-3.5"/>
          {getCuposLabel(trip.availableSeats)}
        </span>
      </div>
      
      {!hasAvailableSeats && (
        <div className="mt-3 text-center">
          <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
            ❌ Viaje completo - No disponible
          </span>
        </div>
      )}
    </div>
  );
}
