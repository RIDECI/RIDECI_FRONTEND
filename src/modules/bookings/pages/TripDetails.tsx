import { useState } from 'react';
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
import { useCreateBooking } from '../hooks/useCreateBooking';
import { useUpdateTravelSlots } from '../hooks/useUpdateTravelSlots';
import type { CreateBookingRequest } from '../types/booking';

export function TripDetails() {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  console.log('TripDetails - bookingId from params:', bookingId);
  console.log('TripDetails - all params:', useParams());
  const { tripDetails, isLoading, error } = useTripDetails(bookingId || '');
  const { handleCreateBooking } = useCreateBooking();
  const { updateSlots } = useUpdateTravelSlots();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('nequi');
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  const handleReserve = async () => {
    if (!tripDetails) return;
    
    setIsCreatingBooking(true);
    
    try {
      // Validar que hay cupos disponibles
      if (tripDetails.trip.availableSeats < 1) {
        alert('❌ No hay cupos disponibles para este viaje.');
        setIsCreatingBooking(false);
        return;
      }

      // 1. Crear la reserva en el backend de Poseidon
      const bookingData: CreateBookingRequest = {
        travelId: tripDetails.id,
        passengerId: 123, // TODO: Obtener del usuario logueado
        reservedSeats: 1,
        totalAmount: tripDetails.pricing.total,
        notes: `Método de pago: ${selectedPaymentMethod}`,
        bookingDate: new Date().toISOString(),
        origin: tripDetails.trip.origin,
        destination: tripDetails.trip.destination,
      };
      
      console.log('📤 Creando reserva en backend Poseidon:', bookingData);
      
      const bookingResponse = await handleCreateBooking(bookingData);
      
      if (!bookingResponse) {
        alert('❌ Error al crear la reserva en el backend.');
        setIsCreatingBooking(false);
        return;
      }
      
      console.log('✅ Reserva creada en Poseidon:', bookingResponse);
      
      // 2. Actualizar los cupos disponibles en el backend de Nemesis
      console.log('🔄 Actualizando cupos en backend Nemesis...');
      const updateResult = await updateSlots(tripDetails.id, 1);
      
      if (!updateResult.success) {
        console.error('⚠️ Error al actualizar cupos:', updateResult.error);
        alert('⚠️ La reserva se creó, pero hubo un problema al actualizar los cupos disponibles.');
        // Continuar de todas formas, ya que la reserva se creó
      } else {
        console.log('✅ Cupos actualizados exitosamente');
      }
      
      console.log('✅ Reserva completada exitosamente');
      
      // Navegar a la página de confirmación con los datos completos
      navigate(`/app/bookingConfirmed`, { 
        state: { 
          booking: {
            _id: bookingResponse.id,
            ...bookingData,
            status: bookingResponse.status,
            createdAt: bookingResponse.createdAt,
            updatedAt: bookingResponse.updatedAt,
          },
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