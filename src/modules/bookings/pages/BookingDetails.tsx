import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Star, Loader2, CheckCircle, X, Flag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetBookingById } from '../hooks/useGetBookingById';
import { useConfirmBooking } from '../hooks/useConfirmBooking';
import { useCompleteBooking } from '../hooks/useCompleteBooking';
import { useCancelBooking } from '../hooks/useCancelBooking';
import { useToast } from '@/components/ToastContext';
import { ConfirmDialog } from '@/components/ConfirmDialog';

// URL del backend de Nemesis (travels)
const NEMESIS_API_URL = "https://nemesistravelmanagementbackend-production.up.railway.app";
// URL del backend de Kratos (users)
const KRATOS_API_URL = "https://kratosusermanagementbackend-production.up.railway.app";

interface Travel {
  id: string;
  driverId: string;
  origin: {
    address: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  destination: {
    direction: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  status: string;
}

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
}

export function BookingDetails() {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookingData, isLoading: isLoadingBooking, error: bookingError } = useGetBookingById(bookingId || '');
  const { showToast } = useToast();
  
  const [travelData, setTravelData] = useState<Travel | null>(null);
  const [driverData, setDriverData] = useState<Driver | null>(null);
  const [isLoadingTravel, setIsLoadingTravel] = useState(false);
  const [isLoadingDriver, setIsLoadingDriver] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // Hooks para actualizar estado de reservas
  const { confirmBooking, isLoading: isConfirming, error: confirmError } = useConfirmBooking();
  const { completeBooking, isLoading: isCompleting, error: completeError } = useCompleteBooking();
  const { cancelBooking, isLoading: isCancelling, error: cancelError } = useCancelBooking();

  // Obtener detalles del travel
  useEffect(() => {
    if (!bookingData?.travelId) return;

    const fetchTravel = async () => {
      setIsLoadingTravel(true);
      try {
        const response = await fetch(`${NEMESIS_API_URL}/travels/${bookingData.travelId}`);
        if (!response.ok) {
          throw new Error('Error al obtener detalles del viaje');
        }
        const data = await response.json();
        setTravelData(data);
      } catch (err) {
        console.error('Error fetching travel:', err);
      } finally {
        setIsLoadingTravel(false);
      }
    };

    fetchTravel();
  }, [bookingData?.travelId]);

  // Obtener detalles del conductor
  useEffect(() => {
    if (!travelData?.driverId) return;

    const fetchDriver = async () => {
      setIsLoadingDriver(true);
      try {
        const response = await fetch(`${KRATOS_API_URL}/users/${travelData.driverId}`);
        if (!response.ok) {
          throw new Error('Error al obtener información del conductor');
        }
        const data = await response.json();
        setDriverData(data);
      } catch (err) {
        console.error('Error fetching driver:', err);
      } finally {
        setIsLoadingDriver(false);
      }
    };

    fetchDriver();
  }, [travelData?.driverId]);

  const handleConfirm = async () => {
    if (!bookingId) return;
    try {
      const success = await confirmBooking(bookingId);
      if (success) {
        showToast('Reserva confirmada exitosamente', 'success');
        // Refrescar datos
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(confirmError || 'Error al confirmar la reserva', 'error');
      }
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      showToast('Error al confirmar la reserva', 'error');
    }
  };

  const handleComplete = async () => {
    if (!bookingId) return;
    
    try {
      const success = await completeBooking(bookingId);
      if (success) {
        showToast('Viaje completado exitosamente', 'success');
        setTimeout(() => navigate('/app/myTrips'), 1000);
      } else {
        showToast(completeError || 'Error al completar el viaje', 'error');
      }
    } catch (error) {
      console.error('Error al completar viaje:', error);
      showToast('Error al completar el viaje', 'error');
    }
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    setShowCancelDialog(false);
    if (!bookingId) return;
    
    try {
      const success = await cancelBooking(bookingId);
      if (success) {
        showToast('Reserva cancelada exitosamente', 'success');
        setTimeout(() => navigate('/app/myTrips'), 1000);
      } else {
        showToast(cancelError || 'Error al cancelar la reserva', 'error');
      }
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      showToast('Error al cancelar la reserva', 'error');
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'CONFIRMED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800',
      'COMPLETED': 'bg-blue-100 text-blue-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'PENDING': 'Pendiente',
      'CONFIRMED': 'Confirmado',
      'CANCELLED': 'Cancelado',
      'COMPLETED': 'Completado',
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (isLoadingBooking || isLoadingTravel || isLoadingDriver) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Cargando detalles de la reserva...</p>
        </div>
      </div>
    );
  }

  if (bookingError || !bookingData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-medium mb-4">
              {bookingError || 'No se pudo cargar la reserva'}
            </p>
            <Button
              onClick={() => navigate('/app/myTrips')}
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

  const driverName = driverData 
    ? `${driverData.firstName} ${driverData.lastName}` 
    : `Conductor #${travelData?.driverId || bookingData.passengerId}`;

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/app/myTrips')}
        className="mb-4 text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a Mis Viajes
      </Button>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Header - Conductor Info & Status */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Avatar circular */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xl shadow-lg">
              {driverData 
                ? getInitials(driverData.firstName, driverData.lastName)
                : driverName.substring(0, 2).toUpperCase()
              }
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{driverName}</h2>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(bookingData.status)}`}>
            {getStatusText(bookingData.status)}
          </div>
        </div>

        {/* Trip Details Section */}
        <div className="space-y-6 mb-8">
          {/* Ruta */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Ruta del viaje</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 mb-2">{bookingData.origin}</p>
                <div className="border-l-2 border-gray-300 ml-2.5 h-6 mb-2" />
                <p className="text-lg font-semibold text-gray-900">{bookingData.destination}</p>
              </div>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Fecha</h3>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-medium">{formatDate(bookingData.bookingDate)}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Hora de salida</h3>
              <div className="flex items-center gap-2 text-gray-900">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-medium">{travelData ? formatTime(travelData.departureTime) : formatTime(bookingData.bookingDate)}</span>
              </div>
            </div>
          </div>

          {/* Pasajeros y Precio */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Pasajeros</h3>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-medium text-gray-900">
                  {bookingData.reservedSeats} {bookingData.reservedSeats === 1 ? 'asiento' : 'asientos'}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Precio total</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${bookingData.totalAmount.toLocaleString('es-CO')} COP
              </p>
            </div>
          </div>

          {/* Notas (si existen) */}
          {bookingData.notes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Notas</h3>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{bookingData.notes}</p>
            </div>
          )}

          {/* ID de Reserva */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ID de Reserva</span>
              <span className="font-mono text-sm font-semibold text-gray-900">{bookingData.id}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
          {/* Confirmar button - only for Pendiente */}
          {bookingData.status === 'PENDING' && (
            <>
              <button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                {isConfirming ? 'Confirmando...' : 'Confirmar reserva'}
              </button>
              <button
                onClick={handleCancelClick}
                disabled={isCancelling}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <X className="w-5 h-5" />
                {isCancelling ? 'Cancelando...' : 'Cancelar reserva'}
              </button>
            </>
          )}
          
          {/* Terminar viaje and Cancelar buttons - only for Confirmado */}
          {bookingData.status === 'CONFIRMED' && (
            <>
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <Flag className="w-5 h-5" />
                {isCompleting ? 'Terminando...' : 'Terminar viaje'}
              </button>
              <button
                onClick={handleCancelClick}
                disabled={isCancelling}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <X className="w-5 h-5" />
                {isCancelling ? 'Cancelando...' : 'Cancelar reserva'}
              </button>
            </>
          )}

          {/* Para estados finales (COMPLETED o CANCELLED), no mostrar botones de acción */}
          {(bookingData.status === 'COMPLETED' || bookingData.status === 'CANCELLED') && (
            <div className="w-full text-center py-4">
              <p className="text-gray-600 text-sm">
                Este viaje ya ha sido {bookingData.status === 'COMPLETED' ? 'completado' : 'cancelado'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación de cancelación */}
      <ConfirmDialog
        isOpen={showCancelDialog}
        title="¿Cancelar reserva?"
        message="¿Estás seguro de que deseas cancelar esta reserva?"
        confirmText="Aceptar"
        cancelText="Cancelar"
        onConfirm={handleCancelConfirm}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  );
}
