import React from 'react';

interface PaymentHeaderProps {
  amount: number;
  currency?: string;
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({
  amount,
  currency = 'COP',
}) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Confirma tu pago
      </h1>
      <p className="text-xl text-gray-600 font-medium">{formattedAmount}</p>
    </div>
  );
};