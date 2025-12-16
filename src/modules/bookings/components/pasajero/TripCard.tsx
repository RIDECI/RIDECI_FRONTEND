import { MapPin, Clock, CheckCircle, Flag, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Trip } from '../../types/Trip';
import { useConfirmBooking } from '../../hooks/useConfirmBooking';
import { useCompleteBooking } from '../../hooks/useCompleteBooking';
import { useCancelBooking } from '../../hooks/useCancelBooking';
import { useToast } from '@/components/ToastContext';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface TripCardProps {
  trip: Trip;
  onStatusChange?: () => void;
}

const statusColors = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
};

export function TripCard({ trip, onStatusChange }: TripCardProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // Hooks para actualizar estado de reservas
  const { confirmBooking, isLoading: isConfirming, error: confirmError } = useConfirmBooking();
  const { completeBooking, isLoading: isCompleting, error: completeError } = useCompleteBooking();
  const { cancelBooking, isLoading: isCancelling, error: cancelError } = useCancelBooking();

  const handleViewDetails = () => {
    // Navegar a los detalles de la reserva existente
    navigate(`/app/bookingDetails/${trip.id}`);
  };

  const handleConfirmClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmConfirm = async () => {
    setShowConfirmDialog(false);
    try {
      const success = await confirmBooking(trip.id);
      if (success) {
        showToast('Reserva confirmada exitosamente', 'success');
        onStatusChange?.();
      } else {
        showToast(confirmError || 'Error al confirmar la reserva', 'error');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      showToast('Error al confirmar la reserva', 'error');
    }
  };

  const handleCompleteClick = () => {
    setShowCompleteDialog(true);
  };

  const handleCompleteConfirm = async () => {
    setShowCompleteDialog(false);
    try {
      const success = await completeBooking(trip.id);
      if (success) {
        showToast('Viaje completado exitosamente', 'success');
        onStatusChange?.();
      } else {
        showToast(completeError || 'Error al completar el viaje', 'error');
      }
    } catch (error) {
      console.error('Error completing booking:', error);
      showToast('Error al completar el viaje', 'error');
    }
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    setShowCancelDialog(false);
    try {
      const success = await cancelBooking(trip.id);
      if (success) {
        showToast('Reserva cancelada exitosamente', 'success');
        onStatusChange?.();
      } else {
        showToast(cancelError || 'Error al cancelar la reserva', 'error');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      showToast('Error al cancelar la reserva', 'error');
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors bg-white">
      {/* Left side - Trip details */}
      <div className="flex items-start gap-4 flex-1">
        <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-base">{trip.route}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <Clock className="w-4 h-4" />
            <span>{trip.date}, {trip.time}</span>
          </div>
        </div>
      </div>

      {/* Right side - Driver and status */}
      <div className="flex items-center gap-6 ml-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img 
              src={trip.driverImage} 
              alt={trip.driverName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 text-sm font-medium">{trip.driverName}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${statusColors[trip.statusColor]}`}>
              {trip.status}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Ver detalles button - always visible */}
          <button
            onClick={handleViewDetails}
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            Ver detalles
          </button>

          {/* Confirmar button - only for Pendiente */}
          {trip.status === 'Pendiente' && (
            <>
              <button
                onClick={handleConfirmClick}
                disabled={isConfirming}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                {isConfirming ? 'Confirmando...' : 'Confirmar'}
              </button>
              <button
                onClick={handleCancelClick}
                disabled={isCancelling}
                className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                {isCancelling ? 'Cancelando...' : 'Cancelar'}
              </button>
            </>
          )}
          
          {/* Terminar viaje and Cancelar buttons - only for Confirmado */}
          {trip.status === 'Confirmado' && (
            <>
              <button
                onClick={handleCompleteClick}
                disabled={isCompleting}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Flag className="w-4 h-4" />
                {isCompleting ? 'Terminando...' : 'Terminar viaje'}
              </button>
              <button
                onClick={handleCancelClick}
                disabled={isCancelling}
                className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                {isCancelling ? 'Cancelando...' : 'Cancelar'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modales de confirmación */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="¿Confirmar reserva?"
        message="¿Deseas confirmar esta reserva?"
        confirmText="Aceptar"
        cancelText="Cancelar"
        onConfirm={handleConfirmConfirm}
        onCancel={() => setShowConfirmDialog(false)}
      />

      <ConfirmDialog
        isOpen={showCompleteDialog}
        title="¿Completar viaje?"
        message="¿Has completado este viaje? Esto lo moverá al historial."
        confirmText="Aceptar"
        cancelText="Cancelar"
        onConfirm={handleCompleteConfirm}
        onCancel={() => setShowCompleteDialog(false)}
      />

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
