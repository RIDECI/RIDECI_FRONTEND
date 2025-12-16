import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaymentSuccessIcon } from '../components/PaymentSuccessIcon';
import { TransactionDetailsCard } from '../components/TransactionDetailsCard';
import { PaymentSuccessActions } from '../components/PaymentSuccessActions';
import { useTransactionDetails } from '../hooks/useTransactionDetails';

export const PaymentSuccessDetailed: React.FC = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams<{ paymentId: string }>();

  const { tx, loading } = useTransactionDetails(paymentId!);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Cargando detalles de la transacción...
      </div>
    );
  }

  if (!tx) {
    return (
      <div className="text-center py-10 text-red-600">
        No se pudo cargar la transacción.
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto">
      <PaymentSuccessIcon />

      <TransactionDetailsCard
        transaction={{
          paymentMethod: tx.paymentMethod,
          amount: tx.amount,
          currency: "COP",
          referenceId: tx.id,
          date: tx.createdAt?.substring(0, 10),
          time: tx.createdAt?.substring(11, 16)
        }}
      />

      <PaymentSuccessActions
        onGoToHistory={() => navigate("/app/payment/history")}
        onGoToHome={() => navigate("/app/myTrips")}
      />
    </div>
  );
};
