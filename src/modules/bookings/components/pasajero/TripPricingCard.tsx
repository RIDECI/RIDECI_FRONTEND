import React from 'react';

interface TripPricingCardProps {
  total: number;
  currency: string;
  onReserve: () => void;
}

export const TripPricingCard: React.FC<TripPricingCardProps> = ({
  total,
  currency,
  onReserve,
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
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-colors"
      >
        Reservar viaje
      </button>
    </div>
  );
};