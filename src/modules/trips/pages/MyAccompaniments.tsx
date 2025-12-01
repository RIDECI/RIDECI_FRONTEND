import { User, MapPin, Clock, Star, MessageCircle, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import type { TripDetails } from '../types/Trip';

// Mock data for accompaniments
const mockAccompaniments: TripDetails[] = [
  {
    id: '1',
    driverName: 'María García',
    vehicleType: 'Auto',
    rating: '4.8',
    route: 'Centro Comercial @ Parque Principal',
    departureTime: '14:30',
    price: 5000,
    availableSeats: 1,
    driverImage: 'https://i.pravatar.cc/150?img=5',
    origin: 'Centro Comercial',
    destination: 'Parque Principal',
    date: '20 de Noviembre, 2025',
    arrivalTime: '15:00',
    vehicle: {
      brand: 'Chevrolet Spark',
      plate: '5678 XYZ',
      color: 'Blanco'
    },
    totalPrice: 5000,
    paymentMethods: ['nequi', 'tarjeta']
  },
  {
    id: '2',
    driverName: 'Juan Pérez',
    vehicleType: 'Auto',
    rating: '4.5',
    route: 'Universidad @ Estación de Bus',
    departureTime: '16:00',
    price: 6000,
    availableSeats: 2,
    driverImage: 'https://i.pravatar.cc/150?img=3',
    origin: 'Universidad',
    destination: 'Estación de Bus',
    date: '21 de Noviembre, 2025',
    arrivalTime: '16:30',
    vehicle: {
      brand: 'Mazda 3',
      plate: '9876 ABC',
      color: 'Gris'
    },
    totalPrice: 6000,
    paymentMethods: ['nequi', 'efectivo']
  }
];

type TabType = 'programados' | 'historial';

export function MyAccompaniments() {
  const [activeTab, setActiveTab] = useState<TabType>('programados');

  const scheduledAccompaniments = mockAccompaniments;
  const historyAccompaniments: TripDetails[] = [];

  const displayedAccompaniments = activeTab === 'programados' ? scheduledAccompaniments : historyAccompaniments;

  return (
    <div className="flex flex-col h-full gap-6">
      <h1 className="text-3xl font-bold text-gray-900">Mis Acompañamientos</h1>

      {/* Tabs */}
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('programados')}
          className={`pb-3 font-semibold text-sm transition-all ${
            activeTab === 'programados'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Programados
        </button>
        <button
          onClick={() => setActiveTab('historial')}
          className={`pb-3 font-semibold text-sm transition-all ${
            activeTab === 'historial'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Historial
        </button>
      </div>

      {/* Accompaniments List */}
      <div className="space-y-3 flex-1">
        {displayedAccompaniments.length > 0 ? (
          displayedAccompaniments.map((accompaniment) => (
            <AccompanimentCard key={accompaniment.id} accompaniment={accompaniment} />
          ))
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-500">
            <p>No hay acompañamientos en esta sección</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface AccompanimentCardProps {
  accompaniment: TripDetails;
}

function AccompanimentCard({ accompaniment }: AccompanimentCardProps) {
  return (
    <Card className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-4 px-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Left Side - Trip Info */}
          <div className="flex-1 flex gap-4">
            {/* Driver Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-gray-600" />
            </div>

            {/* Trip Details */}
            <div className="flex-1 min-w-0">
              {/* Route */}
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {accompaniment.origin} → {accompaniment.destination}
                </p>
              </div>

              {/* Driver and Time */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-600 font-medium">{accompaniment.driverName}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <Clock className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-gray-600">{accompaniment.departureTime}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-gray-600">{accompaniment.rating} Estrellas</span>
              </div>
            </div>
          </div>

          {/* Right Side - Status and Actions */}
          <div className="flex flex-col items-end gap-2">
            {/* Status Badge */}
            <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
              Confirmado
            </span>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs py-1 px-3 flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                Chat
              </Button>
              <Button
                size="sm"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-2xl text-xs py-1 px-3 flex items-center gap-1"
              >
                <UserCheck className="w-3 h-3" />
                Detalles
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
