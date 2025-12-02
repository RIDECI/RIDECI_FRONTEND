import React from 'react';
import { FileText } from 'lucide-react';

interface TripSummarySectionProps {
  trip: {
    origin: string;
    destination: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
  };
}

export const TripSummarySection: React.FC<TripSummarySectionProps> = ({ trip }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-gray-700" />
        <h3 className="text-xl font-bold text-gray-900">Resumen del Viaje</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Origen</span>
          <span className="text-gray-900 font-medium text-right">{trip.origin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Destino</span>
          <span className="text-gray-900 font-medium text-right">{trip.destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Fecha</span>
          <span className="text-gray-900 font-medium">{trip.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Salida</span>
          <span className="text-gray-900 font-medium">{trip.departureTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Llegada</span>
          <span className="text-gray-900 font-medium">{trip.arrivalTime}</span>
        </div>
      </div>
    </div>
  );
};