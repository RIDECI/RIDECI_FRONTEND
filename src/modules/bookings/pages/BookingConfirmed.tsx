import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingConfirmedHeader } from '../components/pasajero/BookingConfirmedHeader';
import { TripSummaryCard } from '../components/pasajero/TripSummaryCard';
import { DriverCard } from '../components/pasajero/DriverCard';
import { PaymentSummaryCard } from '../components/pasajero/PaymentSummaryCard';
import { BookingActions } from '../components/pasajero/BookingActions';
import { useBookingConfirmation } from '../hooks/useBookingConfirmation';

export function BookingConfirmed() {
  const navigate = useNavigate();
  const { bookinId } = useParams<{ bookinId: string }>();
  const { confirmationData, isLoading, error } = useBookingConfirmation(bookinId || '');

  const handleTrackRealTime = () => {
    // TODO: Navegar a pantalla de seguimiento en tiempo real
    console.log('Ir a seguimiento en tiempo real');
    // navigate(`/tracking/${bookinId}`);
  };

  const handleChatWithDriver = () => {
    // TODO: Navegar a chat con el conductor
    console.log('Ir al chat con el conductor');
    // navigate(`/chat/${bookinId}`);
  };

  const handleCancelBooking = () => {
    // TODO: Mostrar modal de confirmación y cancelar reserva
    console.log('Cancelar reserva');
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      // API call to cancel booking
      navigate('/bookings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Cargando confirmación de reserva...</p>
        </div>
      </div>
    );
  }

  if (error || !confirmationData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-medium mb-4">
              {error || 'No se pudo cargar la reserva'}
            </p>
            <Button
              onClick={() => navigate('/bookings')}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Volver a Mis Viajes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <BookingConfirmedHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TripSummaryCard trip={confirmationData.trip} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DriverCard driver={confirmationData.driver} />
          <PaymentSummaryCard payment={confirmationData.payment} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8">
        <BookingActions
          onTrackRealTime={handleTrackRealTime}
          onChatWithDriver={handleChatWithDriver}
          onCancelBooking={handleCancelBooking}
        />
      </div>
    </div>
  );
}
