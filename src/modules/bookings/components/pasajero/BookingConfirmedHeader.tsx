import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const BookingConfirmedHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">¡Reserva Confirmada!</h1>
        <p className="text-gray-600">¡Tu viaje a tu destino está confirmado!</p>
      </div>
    </div>
  );
};
