import React from 'react';
import { Button } from '@/components/ui/button';

interface PaymentConfirmButtonProps {
  disabled?: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const PaymentConfirmButton: React.FC<PaymentConfirmButtonProps> = ({
  disabled,
  onConfirm,
  isLoading,
}) => {
  return (
    <Button
      onClick={onConfirm}
      disabled={disabled || isLoading}
      className="w-full h-14 text-lg font-semibold bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Procesando...' : 'Confirmar Pago'}
    </Button>
  );
};