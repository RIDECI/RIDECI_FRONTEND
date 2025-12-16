import { FileText } from 'lucide-react';

interface RouteSummaryCardProps {
  meetingPoint: string;
  destination: string;
  departureTime: string;
  estimatedArrival: string;
}

export function RouteSummaryCard({
  meetingPoint,
  destination,
  departureTime,
  estimatedArrival,
}: RouteSummaryCardProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">Resumen de la Ruta</span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Punto de Encuentro</span>
          <span className="text-gray-900 font-medium">{meetingPoint}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Destino</span>
          <span className="text-gray-900 font-medium">{destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Salida</span>
          <span className="text-gray-900 font-medium">{departureTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Llegada (Est.)</span>
          <span className="text-gray-900 font-medium">{estimatedArrival}</span>
        </div>
      </div>
    </div>
  );
}