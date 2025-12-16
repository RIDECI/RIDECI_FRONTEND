import React from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import type { PaymentMethod, PaymentMethodOption } from '../types/payments.types';

interface PaymentMethodListProps {
  methods: PaymentMethodOption[];
  selectedMethod: PaymentMethod | null;
  onSelectMethod: (methodId: PaymentMethod) => void;
}

export const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  methods,
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <PaymentMethodCard
          key={method.id}
          method={method}
          isSelected={selectedMethod === method.id}
          onSelect={() => onSelectMethod(method.id)}
        />
      ))}
    </div>
  );
};