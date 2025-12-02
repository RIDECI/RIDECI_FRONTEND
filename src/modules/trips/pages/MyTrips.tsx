import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Trip, TabType } from '../types/Trip';
import { TripCard } from '../components/pasajero/TripCard';

export function MyTrips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'scheduled' | 'history'>('scheduled');

  // Mock data - Replace with real API data
  const scheduledTrips: Trip[] = [
    {
      id: '1',
      route: 'Universidad Escuela colombiana de Ing → Portal 80',
      date: 'Hoy',
      time: '18:30',
      driverName: 'Carlos Ruiz',
      driverImage: 'https://i.pravatar.cc/40?img=1',
      status: 'Confirmado',
      statusColor: 'green',
    },
    {
      id: '2',
      route: 'Universidad Escuela colombiana de Ing → Portal 80',
      date: 'Mañana',
      time: '18:30',
      driverName: 'Carlos Ruiz',
      driverImage: 'https://i.pravatar.cc/40?img=1',
      status: 'Confirmado',
      statusColor: 'yellow',
    },
  ];

  const historyTrips: Trip[] = [
    {
      id: '3',
      route: 'Centro Comercial → Casa',
      date: '25 Nov',
      time: '19:45',
      driverName: 'María García',
      driverImage: 'https://i.pravatar.cc/40?img=2',
      status: 'Confirmado',
      statusColor: 'green',
    },
    {
      id: '4',
      route: 'Parque Arvi → Universidad',
      date: '24 Nov',
      time: '07:20',
      driverName: 'Juan López',
      driverImage: 'https://i.pravatar.cc/40?img=3',
      status: 'Confirmado',
      statusColor: 'green',
    },
  ];

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
          onClick={() => navigate('/search-trips')}
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
            className={`pb-3 font-medium text-base transition-colors ${
              activeTab === tab.id
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
              <TripCard key={trip.id} trip={trip} />
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
