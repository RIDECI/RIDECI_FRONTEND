import { useState, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TabType, Trip } from '../types/Trip';
import { TripCard } from '../components/pasajero/TripCard';
import { useGetBookingsByPassenger } from '../hooks/useGetBookingsByPassenger';

export function MyTrips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'scheduled' | 'history'>('scheduled');

  // Obtener reservas del backend - TODO: usar ID real del usuario logueado
  const { bookingsData, isLoading, error, refetch } = useGetBookingsByPassenger(123);

  // Convertir BookingResponse[] a Trip[] y separar por estado
  const { scheduledTrips, historyTrips } = useMemo(() => {
    if (!bookingsData || bookingsData.length === 0) {
      return { scheduledTrips: [], historyTrips: [] };
    }

    const trips: Trip[] = bookingsData.map((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dateStr = bookingDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });

      if (bookingDate.toDateString() === today.toDateString()) {
        dateStr = 'Hoy';
      } else if (bookingDate.toDateString() === tomorrow.toDateString()) {
        dateStr = 'Mañana';
      }

      const timeStr = bookingDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });

      return {
        id: booking.id,
        bookingId: booking.id,
        driverName: `Conductor #${booking.passengerId}`,
        driverImage: 'https://i.pravatar.cc/150?img=3',
        rating: '4.5',
        carType: 'Vehículo particular',
        origin: booking.origin,
        destination: booking.destination,
        date: dateStr,
        time: timeStr,
        passengers: booking.reservedSeats,
        price: booking.totalAmount,
        status: booking.status as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
        route: `${booking.origin} → ${booking.destination}`,
        statusColor: booking.status === 'CONFIRMED' ? 'green' : booking.status === 'CANCELLED' ? 'red' : 'yellow',
      };
    });

    // Separar viajes por estado
    const scheduled = trips.filter(
      (trip) => trip.status === 'PENDING' || trip.status === 'CONFIRMED'
    );
    const history = trips.filter(
      (trip) => trip.status === 'COMPLETED' || trip.status === 'CANCELLED'
    );

    return { scheduledTrips: scheduled, historyTrips: history };
  }, [bookingsData]);

  console.log('MyTrips render:', { scheduledTrips, historyTrips, isLoading, error });

  const handleStatusChange = () => {
    // Refrescar desde el backend
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Cargando tus viajes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs: TabType[] = [
    { id: 'scheduled', label: 'Programados' },
    { id: 'history', label: 'Historial' },
  ];

  const displayTrips = activeTab === 'scheduled' ? scheduledTrips : historyTrips;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Viajes</h1>
        <button
          onClick={() => navigate('/bookings/search')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Buscar Próximo</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-medium text-base transition-colors ${activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trips List */}
      <div className="flex-1 overflow-y-auto -mx-8 -mb-8">
        {displayTrips.length > 0 ? (
          <div>
            {displayTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onStatusChange={handleStatusChange} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 text-lg">No hay viajes disponibles</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
