import { MapPin, Clock } from 'lucide-react';
import type { Trip } from '../../types/Trip';

interface TripCardProps {
  trip: Trip;
}

const statusColors = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
};

export function TripCard({ trip }: TripCardProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors bg-white">
      {/* Left side - Trip details */}
      <div className="flex items-start gap-4 flex-1">
        <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-base">{trip.route}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <Clock className="w-4 h-4" />
            <span>{trip.date}, {trip.time}</span>
          </div>
        </div>
      </div>

      {/* Right side - Driver and status */}
      <div className="flex items-center gap-6 ml-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img 
              src={trip.driverImage} 
              alt={trip.driverName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 text-sm font-medium">{trip.driverName}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${statusColors[trip.statusColor]}`}>
              {trip.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
