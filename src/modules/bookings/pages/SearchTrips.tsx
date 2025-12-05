import { useState } from 'react';
import { Search, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { AvailableTrip } from '../types/Trip';
import { AvailableTripCard } from '../components/pasajero/AvailableTripCard';

export function SearchTrips() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Portal 80');
  const [departureTime, setDepartureTime] = useState('18:30');
  const [nearbySearch, setNearbySearch] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const availableTrips: AvailableTrip[] = [
    {
      id: '1',
      driverName: 'Carlos Santana',
      vehicleType: 'Minivan',
      rating: '4.9',
      route: 'Universidad @ Portal 80',
      departureTime: '18:30',
      price: 6000,
      availableSeats: 4,
    },
    {
      id: '2',
      driverName: 'Raquel Selma',
      vehicleType: 'Minivan',
      rating: '4.8',
      route: 'Universidad @ Portal 80',
      departureTime: '18:30',
      price: 8000,
      availableSeats: 6,
    },
    {
      id: '3',
      driverName: 'Sebastian Garcia',
      vehicleType: 'Sedan',
      rating: '4.9',
      route: 'Universidad @ Portal 80',
      departureTime: '18:30',
      price: 5000,
      availableSeats: 1,
    },
    {
      id: '4',
      driverName: 'Alex Forero',
      vehicleType: 'SUV',
      rating: '4.9',
      route: 'Universidad @ Portal 80',
      departureTime: '18:30',
      price: 12000,
      availableSeats: 2,
    },
    {
      id: '5',
      driverName: 'Carlos Santana',
      vehicleType: 'Minivan',
      rating: '4.8',
      route: 'Universidad @ Portal 80',
      departureTime: '18:30',
      price: 9000,
      availableSeats: 3,
    },
    {
      id: '6',
      driverName: 'Carlos Santana',
      vehicleType: 'Sedan',
      rating: '4.7',
      route: 'Universidad @ Portal 80',
      departureTime: '18:30',
      price: 7000,
      availableSeats: 3,
    },
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleViewDetails = (trip: AvailableTrip) => {
    navigate('/bookings/:bookingId', { state: { trip } });
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/bookings')}
        className="w-fit text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

      {/* Search Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Encuentra tu próximo viaje</h1>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Destination Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Destino</label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destino"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Departure Time Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hora de salida</label>
              <div className="relative">
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
                />
              </div>
            </div>

            {/* Nearby Search Toggle */}
            <div className="flex flex-col justify-end">
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">Búsqueda por cercanía</label>
                <button
                  onClick={() => setNearbySearch(!nearbySearch)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
                    nearbySearch ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      nearbySearch ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-base transition-colors"
          >
            Buscar
          </Button>
        </div>
      </div>

      {/* Results Count */}
      {showResults && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {availableTrips.length} viajes encontrados
          </h2>
        </div>
      )}

      {/* Available Trips Grid */}
      <div className="flex-1 overflow-y-auto -mx-8 -mb-8 px-8 pb-8">
        {showResults && availableTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTrips.map((trip) => (
              <AvailableTripCard 
                key={trip.id} 
                trip={trip}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : showResults ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay viajes disponibles para tu búsqueda</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
