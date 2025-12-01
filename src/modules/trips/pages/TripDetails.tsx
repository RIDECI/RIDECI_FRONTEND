import { ArrowLeft, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import CardMapComponent from '../components/CardMapComponent';
import type { TripDetails } from '../types/Trip';
import nequiLogo from '@/assets/nequi.png';
import breBLogo from '@/assets/bre-b logo.png';

// Trip details retrieved from navigation state or API
const mockTripDetails: TripDetails = {
  id: '1',
  driverName: 'Raquel Selma',
  vehicleType: 'Minivan',
  rating: '4.5',
  route: 'Universidad @ Portal 80',
  departureTime: '18:30',
  price: 8000,
  availableSeats: 6,
  driverImage: 'https://i.pravatar.cc/150?img=2',
  origin: 'Universidad Escuela Colombiana de Ing',
  destination: 'Portal 80',
  date: '18 de Noviembre, 2025',
  arrivalTime: '20:00',
  vehicle: {
    brand: 'Toyota Camry',
    plate: '1234 ABC',
    color: 'Gris Plata'
  },
  totalPrice: 8000,
  paymentMethods: ['nequi', 'bre-b']
};

export function TripDetails() {
  const navigate = useNavigate();

  const handleReserveTrip = () => {
    // Navigate to reservation confirmed page
    navigate('/reservation-confirmed', { state: { tripDetails: mockTripDetails } });
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/search-trips')}
        className="w-fit text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">Detalles del viaje</h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Left Column - Driver Info and Trip Details */}
        <div className="md:col-span-2 space-y-3">
          {/* Driver Card */}
          <Card className="rounded-2xl border-0 shadow-md py-3">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <User className="w-7 h-7 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{mockTripDetails.driverName}</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600">{mockTripDetails.rating} Estrellas (120 viajes)</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Vehicle Info Card */}
          <Card className="rounded-2xl border-0 shadow-md py-3">
            <CardHeader className="pb-0 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">Vehículo</h3>
            </CardHeader>
            <CardContent className="pt-3 space-y-2 px-6">
              <div>
                <p className="text-xs text-gray-600 font-medium">Marca y Modelo</p>
                <p className="text-sm font-semibold text-gray-900">{mockTripDetails.vehicle.brand}</p>
              </div>
              <div className="flex gap-6">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Color</p>
                  <p className="text-sm font-semibold text-gray-900">{mockTripDetails.vehicle.color}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Matrícula</p>
                  <p className="text-sm font-bold text-gray-900 font-mono">{mockTripDetails.vehicle.plate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Summary Card */}
          <Card className="rounded-2xl border-0 shadow-md py-3">
            <CardHeader className="pb-0 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">Resumen del Viaje</h3>
            </CardHeader>
            <CardContent className="pt-3 space-y-2 px-6">
              <div className="flex justify-between items-start text-xs">
                <span className="text-gray-600">Origen</span>
                <span className="font-semibold text-gray-900 text-right">{mockTripDetails.origin}</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-gray-600">Destino</span>
                <span className="font-semibold text-gray-900 text-right">{mockTripDetails.destination}</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-gray-600">Fecha</span>
                <span className="font-semibold text-gray-900">{mockTripDetails.date}</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-gray-600">Salida</span>
                <span className="font-semibold text-gray-900">{mockTripDetails.departureTime}</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-gray-600">Llegada</span>
                <span className="font-semibold text-gray-900">{mockTripDetails.arrivalTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Map and Booking */}
        <div className="space-y-3 flex flex-col">
          {/* Map Section - Compact */}
          <div className="relative h-24 rounded-2xl overflow-hidden shadow-md">
            <MapComponent />
          </div>

          {/* Spacer to push content down */}
          <div className="flex-1"></div>

          {/* Price and Payment Methods Card */}
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="pt-3 px-6 space-y-3">
              {/* Price Section */}
              <div>
                <p className="text-xs text-gray-600 font-bold mb-1">Precio total:</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockTripDetails.totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                </p>
              </div>

              {/* Payment Methods Section */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 mb-2">Método de pago</h3>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {/* Nequi */}
                  <button className="flex flex-col items-center justify-center gap-1 p-2 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <img src={nequiLogo} alt="Nequi" className="h-4 w-auto object-contain" />
                    <span className="text-xs font-medium text-gray-900">Nequi</span>
                  </button>

                  {/* Tarjeta */}
                  <button className="flex flex-col items-center justify-center gap-1 p-2 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <div className="w-4 h-3 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">💳</div>
                    <span className="text-xs font-medium text-gray-900">Tarjeta</span>
                  </button>

                  {/* Efectivo */}
                  <button className="flex flex-col items-center justify-center gap-1 p-2 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">$</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">Efectivo</span>
                  </button>

                  {/* Bre-B */}
                  <button className="flex flex-col items-center justify-center gap-1 p-2 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <img src={breBLogo} alt="Bre-B" className="h-3 w-auto object-contain" />
                    <span className="text-xs font-medium text-gray-900">Bre-B</span>
                  </button>
                </div>
                <p className="text-xs text-gray-600">Puedes cancelar hasta 30 minutos antes sin sanción.</p>
              </div>
            </CardContent>
          </Card>

          {/* Reserve Button */}
          <Button
            onClick={handleReserveTrip}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-2xl font-semibold text-sm transition-all"
          >
            Reservar viaje
          </Button>
        </div>
      </div>
    </div>
  );
}
