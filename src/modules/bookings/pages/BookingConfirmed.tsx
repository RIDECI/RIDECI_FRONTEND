import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookingConfirmedHeader } from '../components/pasajero/BookingConfirmedHeader';
import { TripSummaryCard } from '../components/pasajero/TripSummaryCard';
import { DriverCard } from '../components/pasajero/DriverCard';
import { PaymentSummaryCard } from '../components/pasajero/PaymentSummaryCard';
import { BookingActions } from '../components/pasajero/BookingActions';
import { useCancelBooking } from '../hooks/useCancelBooking';
import { useToast } from '@/components/ToastContext';
import type { BookingConfirmation } from '../types/Trip';
import type { CreateBookingResponse } from '../services/tripsApi';
import type { TripDetails } from '../types/Trip';

export function BookingConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { cancelBooking, isLoading: isCancelling, error: cancelError } = useCancelBooking();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const state = location.state as {
    booking: CreateBookingResponse;
    tripDetails: TripDetails;
    paymentMethod: string;
  };

  console.log('📋 BookingConfirmed - State:', state);
  console.log('📋 Booking ID:', state?.booking?._id);

  // Construir confirmationData desde el estado de navegación
  const confirmationData: BookingConfirmation | null = state && (state.booking?._id || (state.booking as any)?.id) ? {
    bookingId: state.booking._id || (state.booking as any).id,
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

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const confirmCancelBooking = async () => {
    setShowCancelModal(false);

    if (!confirmationData?.bookingId) {
      console.error('❌ Error: No hay bookingId disponible');
      console.log('confirmationData:', confirmationData);
      showToast('Error: ID de reserva no válido', 'error');
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
      <div className="mt-8 space-y-4">
        <BookingActions
          onTrackRealTime={handleTrackRealTime}
          onChatWithDriver={handleChatWithDriver}
          onCancelBooking={handleCancelBooking}
        />

        {/* Botón para volver */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/app/searchTrips')}
            variant="outline"
            className="w-full max-w-md"
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Modal de confirmación para cancelar */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowCancelModal(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-xl p-6">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Ícono de alerta */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Título y descripción */}
            <h3 className="text-center text-lg font-bold text-gray-900 mb-2">
              ¿Cancelar reserva?
            </h3>
            <p className="text-center text-sm text-gray-600 mb-6 px-2">
              Se cancelará tu reserva y se liberarán los cupos. ¿Estás seguro?
            </p>

            {/* Botones */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCancelModal(false)}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Volver
              </Button>
              <Button
                onClick={confirmCancelBooking}
                disabled={isCancelling}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {isCancelling ? 'Cancelando...' : 'Cancelar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
