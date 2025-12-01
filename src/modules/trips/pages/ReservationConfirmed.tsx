import { CheckCircle, MapPin, Clock, User, MessageCircle, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import type { TripDetails } from '../types/Trip';
import nequiLogo from '@/assets/nequi.png';

export function ReservationConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const tripDetails = (location.state?.tripDetails as TripDetails) || {
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

  const handleConfirmCancel = () => {
    navigate('/search-trips');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Success Header */}
      <div className="flex items-start gap-3">
        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">¡Reserva Confirmada!</h1>
          <p className="text-sm text-gray-600">¡Tu viaje a tu destino está confirmado!</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Trip Summary */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Resumen del Viaje</h2>
          <Card className="rounded-2xl border-0 shadow-md">
            <CardContent className="pt-4 px-6 space-y-4">
              {/* Origin */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Desde</p>
                  <p className="text-sm font-semibold text-gray-900">{tripDetails.origin}</p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Hacia</p>
                  <p className="text-sm font-semibold text-gray-900">{tripDetails.destination}</p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Fecha y Hora</p>
                  <p className="text-sm font-semibold text-gray-900">{tripDetails.date} a las {tripDetails.departureTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Driver and Payment */}
        <div className="space-y-4">
          {/* Driver Card */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">Tu Conductor</h2>
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="pt-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{tripDetails.driverName}</p>
                    <p className="text-xs text-gray-600">⭐ {tripDetails.rating} Estrellas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">Resumen del Pago</h2>
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="pt-4 px-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total del viaje</span>
                  <span className="text-lg font-bold text-gray-900">
                    {tripDetails.totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pagado con</span>
                  <div className="flex items-center gap-1">
                    <img src={nequiLogo} alt="Nequi" className="h-4 w-auto object-contain" />
                    <span className="text-sm font-medium text-gray-900">Nequi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Top Row - Two Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            onClick={() => {}}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Ir a seguimiento en tiempo real
          </Button>
          <Button
            onClick={() => {}}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ir al chat con el conductor
          </Button>
        </div>
        
        {/* Cancel Button - Centered */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowCancelModal(true)}
            className="bg-red-100 hover:bg-red-200 text-red-500 border border-red-300 py-2 px-12 rounded-2xl font-semibold text-sm transition-all w-full md:w-1/2"
          >
            Cancelar reserva
          </Button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="rounded-2xl border-0 shadow-lg w-80">
            <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
              {/* Warning Icon */}
              <div className="mb-4 flex justify-center">
                <AlertTriangle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 mb-2">Confirmar cancelación</h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">Por favor confirma la cancelación de tu reserva</p>

              {/* Buttons */}
              <div className="w-full space-y-3">
                <Button
                  onClick={() => {
                    handleConfirmCancel();
                    setShowCancelModal(false);
                  }}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-600 border border-green-300 py-2 px-4 rounded-2xl font-semibold text-sm transition-all"
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => setShowCancelModal(false)}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-500 border border-red-300 py-2 px-4 rounded-2xl font-semibold text-sm transition-all"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
