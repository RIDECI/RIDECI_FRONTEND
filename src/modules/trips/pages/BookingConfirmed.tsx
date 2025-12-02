import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingConfirmedHeader } from '../components/pasajero/BookingConfirmedHeader';
import { TripSummaryCard } from '../components/pasajero/TripSummaryCard';
import { DriverCard } from '../components/pasajero/DriverCard';
import { PaymentSummaryCard } from '../components/pasajero/PaymentSummaryCard';
import { BookingActions } from '../components/pasajero/BookingActions';
import { useBookingConfirmation } from '../hooks/useBookingConfirmation';

export function BookingConfirmed() {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = useBookingConfirmation(bookingId || 'UNKNOWN');

  const handleTrackRealTime = () => {
    // TODO: Navegar a pantalla de seguimiento en tiempo real
    console.log('Ir a seguimiento en tiempo real');
    // navigate(`/tracking/${bookingId}`);
  };

  const handleChatWithDriver = () => {
    // TODO: Navegar a chat con el conductor
    console.log('Ir al chat con el conductor');
    // navigate(`/chat/${bookingId}`);
  };

  const handleCancelBooking = () => {
    // TODO: Mostrar modal de confirmación y cancelar reserva
    console.log('Cancelar reserva');
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      // API call to cancel booking
      navigate('/trips');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <BookingConfirmedHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TripSummaryCard trip={booking.trip} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DriverCard driver={booking.driver} />
          <PaymentSummaryCard payment={booking.payment} />
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
