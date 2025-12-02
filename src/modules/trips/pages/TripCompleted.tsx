import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TripCompletedHeader } from '../components/pasajero/TripCompletedHeader';
import { TripRouteMap } from '../components/pasajero/TripRouteMap';
import { PaymentSummarySection } from '../components/pasajero/PaymentSummarySection';
import { useCompletedTrip } from '../hooks/useCompletedTrip';

export function TripCompleted() {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const trip = useCompletedTrip(tripId || 'UNKNOWN');

  const handleMakePayment = () => {
    // Crear un bookingId basado en el tripId
    const bookingId = `BOOK-${tripId || Date.now()}`;
    
    // Navegar a la pantalla de selección de método de pago
    navigate(`/payment/${bookingId}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <TripCompletedHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Map and Route */}
        <div>
          <TripRouteMap
            origin={trip.origin}
            destination={trip.destination}
            mapImageUrl={trip.mapImageUrl}
          />
        </div>

        {/* Right Column - Payment Summary */}
        <div>
          <PaymentSummarySection
            payment={trip.payment}
            onMakePayment={handleMakePayment}
          />
        </div>
      </div>
    </div>
  );
}