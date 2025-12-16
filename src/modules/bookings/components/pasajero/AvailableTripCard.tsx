import { MapPin, Clock, ArrowRight, Users, Star } from 'lucide-react';
import type { AvailableTrip } from '../../types/Trip';

interface AvailableTripCardProps {
  trip: AvailableTrip;
  onViewDetails: (trip: AvailableTrip) => void;
}

export function AvailableTripCard({ trip, onViewDetails }: AvailableTripCardProps) {
  const getSeatsColor = (seats: number) => {
    if (seats > 0) return 'text-green-600 bg-green-50';
    return 'text-red-600 bg-red-50';
  };

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

  return (
    <div 
      onClick={() => trip.availableSeats > 0 && onViewDetails(trip)}
      className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all ${
        trip.availableSeats > 0 ? 'cursor-pointer' : 'opacity-60'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Conductor Info */}
        <div className="flex items-center gap-3">
          {/* Avatar circular */}
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
            {getInitials(trip.driverName)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{trip.driverName}</h3>
            <div className="flex items-center gap-1 text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{trip.rating}</span>
              <span className="text-yellow-400">★</span>
            </div>
          </div>
        </div>
        
        {/* Arrow icon */}
        <ArrowRight className="w-6 h-6 text-gray-400" />
      </div>

      {/* Ruta */}
      <div className="flex items-center gap-2 mb-2 text-gray-700">
        <MapPin className="w-4 h-4 flex-shrink-0 text-gray-500" />
        <p className="text-sm font-medium">{trip.route}</p>
      </div>

      {/* Hora */}
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <Clock className="w-4 h-4 flex-shrink-0 text-gray-500" />
        <p className="text-sm font-medium">{trip.departureTime}</p>
      </div>

      {/* Precio y Cupos */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <p className="text-3xl font-bold text-blue-600">
          ${trip.price.toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP
        </p>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getSeatsColor(trip.availableSeats)}`}>
          <Users className="w-4 h-4" />
          <span className="font-semibold text-sm">{getCuposLabel(trip.availableSeats)}</span>
        </div>
      </div>

      {/* Mensaje de viaje completo */}
      {trip.availableSeats === 0 && (
        <div className="mt-3 text-center">
          <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
            ❌ Viaje completo - No disponible
          </span>
        </div>
      )}

      {/* Ver detalles button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (trip.availableSeats > 0) {
            onViewDetails(trip);
          }
        }}
        disabled={trip.availableSeats === 0}
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
      >
        {trip.availableSeats === 0 ? 'No disponible' : 'Ver detalles'}
      </button>
    </div>
  );
}
