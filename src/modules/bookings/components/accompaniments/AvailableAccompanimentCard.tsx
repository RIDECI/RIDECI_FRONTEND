import { MapPin, Clock, Star } from 'lucide-react';

interface AvailableAccompanimentCardProps {
  driverName: string;
  driverImage: string;
  rating: string;
  origin: string;
  destination: string;
  time: string;
  onViewDetails: () => void;
}

export function AvailableAccompanimentCard({
  driverName,
  driverImage,
  rating,
  origin,
  destination,
  time,
  onViewDetails,
}: AvailableAccompanimentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      {/* Driver Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={driverImage}
            alt={driverName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-gray-900">{driverName}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-600">{rating}</span>
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
      </div>

      {/* Route Info */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
        <MapPin className="w-4 h-4" />
        <span>{origin}</span>
        <span>•</span>
        <span>{destination}</span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
        <Clock className="w-4 h-4" />
        <span>{time}</span>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewDetails}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Ver detalles
      </button>
    </div>
  );
}