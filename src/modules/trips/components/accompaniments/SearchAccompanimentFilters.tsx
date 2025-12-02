import { Search, Clock } from 'lucide-react';

interface SearchAccompanimentFiltersProps {
  destination: string;
  departureTime: string;
  searchByProximity: boolean;
  onDestinationChange: (value: string) => void;
  onDepartureTimeChange: (value: string) => void;
  onProximityToggle: (value: boolean) => void;
}

export function SearchAccompanimentFilters({
  destination,
  departureTime,
  searchByProximity,
  onDestinationChange,
  onDepartureTimeChange,
  onProximityToggle,
}: SearchAccompanimentFiltersProps) {
  return (
    <div className="flex items-center gap-6 mb-6">
      {/* Destination */}
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Destino</label>
        <div className="relative">
          <input
            type="text"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="Portal 80"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Departure Time */}
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Hora de salida</label>
        <div className="relative">
          <input
            type="text"
            value={departureTime}
            onChange={(e) => onDepartureTimeChange(e.target.value)}
            placeholder="18:30"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Proximity Toggle */}
      <div className="flex items-center gap-2 pt-6">
        <span className="text-sm text-gray-600">Búsqueda por cercanía</span>
        <button
          onClick={() => onProximityToggle(!searchByProximity)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            searchByProximity ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              searchByProximity ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}