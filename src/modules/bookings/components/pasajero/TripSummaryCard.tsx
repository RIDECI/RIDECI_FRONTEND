import React from 'react';
import { MapPin, Navigation, Calendar } from 'lucide-react';

interface TripSummaryCardProps {
  trip: {
    origin: string;
    destination: string;
    dateTime: string;
  };
}

export const TripSummaryCard: React.FC<TripSummaryCardProps> = ({ trip }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del Viaje</h2>

      <div className="space-y-4">
        {/* Origin */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600 mb-1">Desde</p>
            <p className="text-gray-900 font-medium">{trip.origin}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600 mb-1">Hasta</p>
            <p className="text-gray-900 font-medium">{trip.destination}</p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600 mb-1">Fecha y Hora</p>
            <p className="text-gray-900 font-medium">{trip.dateTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
