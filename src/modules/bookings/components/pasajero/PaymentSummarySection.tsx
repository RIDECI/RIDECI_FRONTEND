import React from 'react';

interface PaymentSummarySectionProps {
  payment: {
    status: 'pending' | 'completed';
    baseFare: number;
    total: number;
    currency: string;
  };
  onMakePayment: () => void;
}

export const PaymentSummarySection: React.FC<PaymentSummarySectionProps> = ({
  payment,
  onMakePayment,
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: payment.currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del pago</h2>

      <div className="space-y-4">
        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estado</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            Pago pendiente
          </span>
        </div>

        {/* Base Fare */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tarifa Base</span>
          <span className="text-gray-900 font-semibold">{formatPrice(payment.baseFare)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">{formatPrice(payment.total)}</span>
        </div>
      </div>

      {/* Make Payment Button */}
      <div className="mt-6">
        <button
          onClick={onMakePayment}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-colors"
        >
          Realizar pago
        </button>
      </div>
    </div>
  );
};