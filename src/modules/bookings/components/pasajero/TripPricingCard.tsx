import React from 'react';
import { Loader2 } from 'lucide-react';

interface TripPricingCardProps {
  total: number;
  currency: string;
  onReserve: () => void;
  isLoading?: boolean;
}

export const TripPricingCard: React.FC<TripPricingCardProps> = ({
  total,
  currency,
  onReserve,
  isLoading = false,
}) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(total);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="mb-6">
        <p className="text-gray-700 text-lg mb-2">Precio total:</p>
        <p className="text-4xl font-bold text-gray-900">{formattedPrice}</p>
      </div>

      <button
        onClick={onReserve}
        disabled={isLoading}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Reservando...
          </>
        ) : (
          'Reservar viaje'
        )}
      </button>
    </div>
  );
};