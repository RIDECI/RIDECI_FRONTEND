import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaymentHeader } from '../components/PaymentHeader';
import { PaymentMethodList } from '../components/PaymentMethodList';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

export const PaymentConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { paymentMethods, selectedMethod, handleSelectMethod } = usePaymentMethods();

  const paymentAmount = 8000;
  const currency = 'COP';

  const handleConfirmPayment = () => {
    if (!selectedMethod) return;
    
    if (selectedMethod === 'card') {
      navigate(`/payment/cards/${bookingId}`);
      return;
    }
    
    if (selectedMethod === 'bre-b') {
      navigate(`/payment/breb/${bookingId}`);
      return;
    }
    
    console.log('Processing payment:', {
      bookingId,
      method: selectedMethod,
      amount: paymentAmount,
    });
    
    const mockPaymentId = `PAY-${Date.now()}`;
    navigate(`/payment/success-detailed/${mockPaymentId}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PaymentHeader amount={paymentAmount} currency={currency} />
      
      <PaymentMethodList
        methods={paymentMethods}
        selectedMethod={selectedMethod}
        onSelectMethod={handleSelectMethod}
      />

      <div className="mt-8">
        <PaymentConfirmButton
          disabled={!selectedMethod}
          onConfirm={handleConfirmPayment}
        />
      </div>
    </div>
  );
};
