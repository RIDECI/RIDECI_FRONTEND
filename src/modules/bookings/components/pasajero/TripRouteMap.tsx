import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface TripRouteMapProps {
  origin: string;
  destination: string;
  mapImageUrl?: string;
}

export const TripRouteMap: React.FC<TripRouteMapProps> = ({
  origin,
  destination,
  mapImageUrl,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Map */}
      <div className="relative">
        {mapImageUrl ? (
          <img 
            src={mapImageUrl} 
            alt="Ruta del viaje" 
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400">Mapa no disponible</p>
          </div>
        )}
      </div>

      {/* Route Details */}
      <div className="p-6 space-y-4">
        {/* Origin */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600 mb-1">Origen</p>
            <p className="text-gray-900 font-medium">{origin}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600 mb-1">Destino</p>
            <p className="text-gray-900 font-medium">{destination}</p>
          </div>
        </div>
      </div>

      {/* Rate Users Button */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Calificar usuarios
        </button>
      </div>
    </div>
  );
};