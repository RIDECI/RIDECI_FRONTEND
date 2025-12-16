import React from 'react';
import { Button } from '@/components/ui/button';

interface PaymentSuccessActionsProps {
  onGoToHistory: () => void;
  onGoToHome: () => void;
}

export const PaymentSuccessActions: React.FC<PaymentSuccessActionsProps> = ({
  onGoToHistory,
  onGoToHome,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={onGoToHistory}
        variant="outline"
        className="h-14 text-base font-semibold rounded-xl border-2 hover:bg-blue-50"
      >
        Ir al historial de pagos
      </Button>
      <Button
        onClick={onGoToHome}
        className="h-14 text-base font-semibold bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-xl"
      >
        Volver al inicio
      </Button>
    </div>
  );
};