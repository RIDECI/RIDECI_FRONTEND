import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';

interface BookingActionsProps {
  onTrackRealTime: () => void;
  onChatWithDriver: () => void;
  onCancelBooking: () => void;
}

export const BookingActions: React.FC<BookingActionsProps> = ({
  onTrackRealTime,
  onChatWithDriver,
  onCancelBooking,
}) => {
  return (
    <div className="space-y-3">
      {/* Track in Real Time */}
      <button
        onClick={onTrackRealTime}
        className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-xl transition-colors"
      >
        <MapPin className="w-5 h-5" />
        Ir a seguimiento en tiempo real
      </button>

      {/* Chat with Driver */}
      <button
        onClick={onChatWithDriver}
        className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-xl transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        Ir al chat con el conductor
      </button>

      {/* Cancel Booking */}
      <button
        onClick={onCancelBooking}
        className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-base rounded-xl border-2 border-red-200 transition-colors"
      >
        Cancelar reserva
      </button>
    </div>
  );
};