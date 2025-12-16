import React from 'react';
import type { PaymentStatus } from '../types/payment-history.types';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return { label: 'Completado', color: 'bg-green-100 text-green-700' };
      case 'failed':
        return { label: 'Fallido', color: 'bg-red-100 text-red-700' };
      case 'pending':
        return { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};