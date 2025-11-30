import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BrebKeysHeader } from '../components/BrebKeysHeader';
import { BrebKeysList } from '../components/BrebKeysList';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useBrebKeys } from '../hooks/useBrebKeys';

export const BrebKeysPayment: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { brebKeys, selectedKeyId, handleSelectKey } = useBrebKeys();

  const handleConfirmPayment = () => {
    if (!selectedKeyId) return;
    
    console.log('Processing Bre-B payment with key:', {
      bookingId,
      keyId: selectedKeyId,
    });
    
    const mockPaymentId = `PAY-BREB-${Date.now()}`;
    navigate(`/payment/success-detailed/${mockPaymentId}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <BrebKeysHeader />
      
      <BrebKeysList
        keys={brebKeys}
        selectedKeyId={selectedKeyId}
        onSelectKey={handleSelectKey}
      />

      <div className="mt-8">
        <PaymentConfirmButton
          disabled={!selectedKeyId}
          onConfirm={handleConfirmPayment}
        />
      </div>
    </div>
  );
};
