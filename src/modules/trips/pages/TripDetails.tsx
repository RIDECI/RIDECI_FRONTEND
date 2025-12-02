import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TripDetailsHeader } from '../components/pasajero/TripDetailsHeader';
import { DriverInfoCard } from '../components/pasajero/DriverInfoCard';
import { VehicleInfoSection } from '../components/pasajero/VehicleInfoSection';
import { TripSummarySection } from '../components/pasajero/TripSummarySection';
import { TripMapPreview } from '../components/pasajero/TripMapPreview';
import { PaymentMethodSelector } from '../components/pasajero/PaymentMethodSelector';
import { TripPricingCard } from '../components/pasajero/TripPricingCard';
import { useTripDetails } from '../hooks/useTripDetails';

export function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const tripDetails = useTripDetails(tripId || '1');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('nequi');

  const handleReserve = () => {
    // TODO: Crear reserva y navegar a confirmación o pago
    console.log('Reservando viaje con método:', selectedPaymentMethod);
    
    // Simular creación de booking
    const bookingId = `BOOK-${Date.now()}`;
    
    // Navegar a la pantalla de pago correspondiente
    navigate(`/payment/${bookingId}`);
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

      <TripDetailsHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Trip Details */}
        <div className="lg:col-span-2">
          <DriverInfoCard driver={tripDetails.driver} />
          
          <VehicleInfoSection vehicle={tripDetails.vehicle} />
          
          <TripSummarySection trip={tripDetails.trip} />
        </div>

        {/* Right Column - Map & Pricing */}
        <div className="lg:col-span-1">
          <TripMapPreview mapImageUrl={tripDetails.mapImageUrl} />
          
          <TripPricingCard
            total={tripDetails.pricing.total}
            currency={tripDetails.pricing.currency}
            onReserve={handleReserve}
          />
          
          <div className="mt-6">
            <PaymentMethodSelector onMethodSelect={handlePaymentMethodChange} />
          </div>
        </div>
      </div>
    </div>
  );
}