import React from 'react';

interface PaymentSummaryCardProps {
  payment: {
    total: number;
    currency: string;
    method: string;
    methodIcon: string;
  };
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({ payment }) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: payment.currency,
    minimumFractionDigits: 0,
  }).format(payment.total);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pago</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total del viaje</span>
          <span className="text-2xl font-bold text-gray-900">{formattedPrice}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-gray-600">Pagado con</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-xs">
              {payment.methodIcon}
            </div>
            <span className="font-semibold text-gray-900">{payment.method}</span>
          </div>
        </div>
      </div>
    </div>
  );
};