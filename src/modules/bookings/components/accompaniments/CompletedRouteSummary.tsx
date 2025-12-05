import { MapPin, Navigation } from 'lucide-react';

interface CompletedRouteSummaryProps {
  origin: string;
  destination: string;
}

export function CompletedRouteSummary({ origin, destination }: CompletedRouteSummaryProps) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-500">Origen</p>
          <p className="text-gray-900">{origin}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Navigation className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-500">Destino</p>
          <p className="text-gray-900">{destination}</p>
        </div>
      </div>
    </div>
  );
}