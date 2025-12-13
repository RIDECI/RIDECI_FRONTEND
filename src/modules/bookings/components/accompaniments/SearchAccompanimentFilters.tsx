import { Search } from 'lucide-react';

interface SearchAccompanimentFiltersProps {
  destination: string;
  departureTime: string;
  searchByProximity: boolean;
  onDestinationChange: (value: string) => void;
  onDepartureTimeChange: (value: string) => void;
  onProximityToggle: (value: boolean) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export function SearchAccompanimentFilters({
  destination,
  departureTime,
  searchByProximity,
  onDestinationChange,
  onDepartureTimeChange,
  onProximityToggle,
  onSearch,
  isLoading,
}: SearchAccompanimentFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
      <div className="flex items-end gap-6">
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
            type="time"
            value={departureTime}
            onChange={(e) => onDepartureTimeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Proximity Toggle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-gray-700 whitespace-nowrap">Búsqueda por cercanía</span>
          <button
            onClick={() => onProximityToggle(!searchByProximity)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              searchByProximity ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={searchByProximity}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                searchByProximity ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex-shrink-0">
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      </div>
    </div>
  );
}