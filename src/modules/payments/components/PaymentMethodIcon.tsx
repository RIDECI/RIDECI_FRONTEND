import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';
import type { PaymentMethodType } from '../types/payment-history.types';

interface PaymentMethodIconProps {
  method: PaymentMethodType;
}

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method }) => {
  const getMethodDisplay = () => {
    switch (method) {
      case 'nequi':
        return { icon: '°N', color: 'bg-purple-100 text-purple-600', text: 'Nequi' };
      case 'card':
        return { icon: <CreditCard className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600', text: 'Tarjeta' };
      case 'cash':
        return { icon: <DollarSign className="w-5 h-5" />, color: 'bg-green-100 text-green-600', text: 'Efectivo' };
      case 'bre-b':
        return { icon: 'Bre-B', color: 'bg-cyan-100 text-cyan-600', text: 'Bre-B', isText: true };
      default:
        return { icon: '?', color: 'bg-gray-100 text-gray-600', text: 'Desconocido' };
    }
  };

  const display = getMethodDisplay();

  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${display.color} ${display.isText ? 'text-xs font-bold' : ''}`}>
      {display.icon}
    </div>
  );
};