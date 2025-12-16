import { useState } from 'react';
import type { PaymentMethod, PaymentMethodOption } from '../types/payments.types';

export const usePaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const paymentMethods: PaymentMethodOption[] = [
    {
      id: 'card',
      name: 'Tarjeta',
      description: 'Usa una tarjeta de crédito o débito',
      iconType: 'emoji',
      iconContent: '💳',
      colorClass: 'bg-blue-500',
      enabled: true,
    },
    {
      id: 'nequi',
      name: 'Nequi',
      description: 'Usa una tarjeta de crédito o débito',
      iconType: 'text',
      iconContent: '°N',
      colorClass: 'bg-purple-500',
      enabled: true,
    },
    {
      id: 'cash',
      name: 'Efectivo',
      description: 'Paga en efectivo al conductor',
      iconType: 'emoji',
      iconContent: '💵',
      colorClass: 'bg-green-500',
      enabled: true,
    },
    {
      id: 'bre-b',
      name: 'Bre-B',
      description: 'Paga a cualquier banco con Bre-B',
      iconType: 'text',
      iconContent: 'Bre-B',
      colorClass: 'bg-cyan-500',
      enabled: true,
    },
  ];

  const handleSelectMethod = (methodId: PaymentMethod) => {
    setSelectedMethod(methodId);
  };

  return {
    paymentMethods,
    selectedMethod,
    handleSelectMethod,
  };
};
