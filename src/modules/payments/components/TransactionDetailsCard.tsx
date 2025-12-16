import React from 'react';
import { TransactionDetailRow } from './TransactionDetailRow';
import type { TransactionDetails } from '../types/transaction.types';

interface TransactionDetailsCardProps {
  transaction: TransactionDetails;
}

export const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  transaction,
}) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: transaction.currency,
    minimumFractionDigits: 0,
  }).format(transaction.amount);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
      <TransactionDetailRow 
        label="Método de Pago" 
        value={transaction.paymentMethod} 
      />
      <TransactionDetailRow 
        label="Monto Pagado" 
        value={formattedAmount}
        valueColor="text-green-600"
      />
      <TransactionDetailRow 
        label="ID de Referencia" 
        value={transaction.referenceId} 
      />
      <TransactionDetailRow 
        label="Fecha y Hora" 
        value={`${transaction.date} ${transaction.time}`}
        isLast
      />
    </div>
  );
};