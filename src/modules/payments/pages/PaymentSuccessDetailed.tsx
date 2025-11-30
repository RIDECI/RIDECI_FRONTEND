import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaymentSuccessIcon } from '../components/PaymentSuccessIcon';
import { TransactionDetailsCard } from '../components/TransactionDetailsCard';
import { PaymentSuccessActions } from '../components/PaymentSuccessActions';
import { useTransactionDetails } from '../hooks/useTransactionDetails';

export const PaymentSuccessDetailed: React.FC = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams<{ paymentId: string }>();
  
  const transaction = useTransactionDetails(paymentId || 'UNKNOWN');

  const handleGoToHistory = () => {
    navigate('/payment/history');
  };

  const handleGoToHome = () => {
    navigate('/home');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PaymentSuccessIcon />
      
      <TransactionDetailsCard transaction={transaction} />

      <PaymentSuccessActions
        onGoToHistory={handleGoToHistory}
        onGoToHome={handleGoToHome}
      />
    </div>
  );
};