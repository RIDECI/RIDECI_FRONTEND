import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TripDetailsHeader } from '../components/pasajero/TripDetailsHeader';
import { DriverInfoCard } from '../components/pasajero/DriverInfoCard';
import { VehicleInfoSection } from '../components/pasajero/VehicleInfoSection';
import { TripSummarySection } from '../components/pasajero/TripSummarySection';
import { TripMapPreview } from '../components/pasajero/TripMapPreview';
import { PaymentMethodSelector } from '../components/pasajero/PaymentMethodSelector';
import { TripPricingCard } from '../components/pasajero/TripPricingCard';
import { useTripDetails } from '../hooks/useTripDetails';
import { createBooking } from '../services/tripsApi';

export function TripDetails() {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  console.log('TripDetails - bookingId from params:', bookingId);
  console.log('TripDetails - all params:', useParams());
  const { tripDetails, isLoading, error } = useTripDetails(bookingId || '');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('nequi');
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  const handleReserve = async () => {
    if (!tripDetails) return;
    
    setIsCreatingBooking(true);
    
    try {
      const bookingData = {
        travelId: tripDetails.id,
        passengerId: 123, // TODO: Obtener del usuario logueado
        origin: tripDetails.trip.origin,
        destination: tripDetails.trip.destination,
        reservedSeats: 1,
        totalAmount: tripDetails.pricing.total,
        status: 'PENDING',
        notes: selectedPaymentMethod, // Solo el nombre del método: "nequi", "card", etc.
        bookingDate: new Date().toISOString()
      };
      
      console.log('Creando reserva con:', bookingData);
      
      const booking = await createBooking(bookingData);
      
      console.log('✅ Reserva creada exitosamente:', booking);
      console.log('📋 ID de la reserva:', booking.id);
      
      // Mostrar mensaje de éxito
      alert(`✅ ¡Reserva creada exitosamente!\n\nID: ${booking.id}\n\nSerás redirigido a la página de confirmación.`);
      
      // Navegar a la página de confirmación con el ID real del backend
      navigate(`/booking/confirmed/${booking.id}`, { 
        state: { 
          booking,
          tripDetails,
          paymentMethod: selectedPaymentMethod 
        } 
      });
    } catch (err) {
      console.error('❌ Error al crear la reserva:', err);
      alert('❌ Error al crear la reserva. Por favor, intenta nuevamente.');
    } finally {
      setIsCreatingBooking(false);
    }
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Cargando detalles del viaje...</p>
        </div>
      </div>
    );
  }

  if (error || !tripDetails) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-medium mb-4">
              {error || 'No se pudo cargar el viaje'}
            </p>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            isLoading={isCreatingBooking}
          />
          
          <div className="mt-6">
            <PaymentMethodSelector onMethodSelect={handlePaymentMethodChange} />
          </div>
        </div>
      </div>
    </div>
  );
}