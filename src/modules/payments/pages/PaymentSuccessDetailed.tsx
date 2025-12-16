import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PaymentSuccessIcon } from '../components/PaymentSuccessIcon';
import { TransactionDetailsCard } from '../components/TransactionDetailsCard';
import { PaymentSuccessActions } from '../components/PaymentSuccessActions';
import { useTransactionDetails } from '../hooks/useTransactionDetails';

export const PaymentSuccessDetailed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = useParams<{ paymentId: string }>();

  // Intentar obtener la transacción desde el estado de navegación (mock)
  const mockTransaction = (location.state as any)?.transaction;
  
  const { tx, loading } = useTransactionDetails(paymentId!);

  // Si hay una transacción mock, usarla directamente
  if (mockTransaction) {
    console.log('✅ Usando transacción mock:', mockTransaction);
    
    const formattedDate = new Date(mockTransaction.timestamp || mockTransaction.createdAt).toLocaleDateString('es-CO');
    const formattedTime = new Date(mockTransaction.timestamp || mockTransaction.createdAt).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className="max-w-8xl mx-auto">
        <PaymentSuccessIcon />

        <TransactionDetailsCard
          transaction={{
            paymentMethod: mockTransaction.paymentMethod,
            amount: mockTransaction.amount,
            currency: mockTransaction.currency || "COP",
            referenceId: mockTransaction.receiptCode || mockTransaction.id,
            date: formattedDate,
            time: formattedTime
          }}
        />

        <PaymentSuccessActions
          onGoToHistory={() => navigate("/app/payment/history")}
          onGoToHome={() => navigate("/app/myTrips")}
        />
      </div>
    );
  }

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
