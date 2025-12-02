import { MapPin, Navigation, Calendar } from 'lucide-react';

interface AccompanimentSummaryCardProps {
  meetingPoint: string;
  destination: string;
  dateTime: string;
}

export function AccompanimentSummaryCard({
  meetingPoint,
  destination,
  dateTime,
}: AccompanimentSummaryCardProps) {
  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-4">Resumen del Acompañamiento</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Punto de Encuentro</p>
            <p className="text-gray-900">{meetingPoint}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Destino</p>
            <p className="text-gray-900">{destination}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Fecha y Hora</p>
            <p className="text-gray-900">{dateTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}