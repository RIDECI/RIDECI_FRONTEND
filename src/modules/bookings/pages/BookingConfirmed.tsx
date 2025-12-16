import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookingConfirmedHeader } from '../components/pasajero/BookingConfirmedHeader';
import { TripSummaryCard } from '../components/pasajero/TripSummaryCard';
import { DriverCard } from '../components/pasajero/DriverCard';
import { PaymentSummaryCard } from '../components/pasajero/PaymentSummaryCard';
import { BookingActions } from '../components/pasajero/BookingActions';
import { cancelBooking } from '../services/tripsApi';
import type { BookingConfirmation } from '../types/Trip';
import type { CreateBookingResponse } from '../services/tripsApi';
import type { TripDetails } from '../types/Trip';

export function BookingConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { 
    booking: CreateBookingResponse; 
    tripDetails: TripDetails;
    paymentMethod: string;
  };
  
  // Construir confirmationData desde el estado de navegación
  const confirmationData: BookingConfirmation | null = state ? {
    bookingId: state.booking._id,
    trip: {
      origin: state.tripDetails.trip.origin,
      destination: state.tripDetails.trip.destination,
      dateTime: state.tripDetails.trip.departureTime,
    },
    driver: {
      name: state.tripDetails.driver.name,
      rating: state.tripDetails.driver.rating.toString(),
      avatar: state.tripDetails.driver.profileImage,
    },
    payment: {
      total: state.booking.totalAmount,
      currency: 'COP',
      method: state.paymentMethod,
      methodIcon: state.paymentMethod === 'nequi' ? '°N' : '💳',
    }
  } : null;

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

  const handleCancelBooking = async () => {
    if (!confirmationData?.bookingId) {
      alert('Error: ID de reserva no válido');
      return;
    }

    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      try {
        console.log('Cancelling booking:', confirmationData.bookingId);
        await cancelBooking(confirmationData.bookingId);
        
        alert('Reserva cancelada exitosamente');
        navigate('/app/myTrips');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Error al cancelar la reserva');
      }
    }
  };

  if (!confirmationData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-medium mb-4">
              No se encontraron datos de la reserva
            </p>
            <Button
              onClick={() => navigate('/app/searchTrips')}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Volver a buscar viajes
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
