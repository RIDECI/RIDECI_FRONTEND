import { useMemo } from 'react';
import type { TransactionDetails } from '../types/transaction.types';

export const useTransactionDetails = (
  paymentId: string,
  paymentMethod?: string
): TransactionDetails => {
  return useMemo(() => {
    // TODO: Estos datos deberían venir de una API
    // Por ahora generamos datos mock basados en el paymentId
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    let method = 'Nequi';
    if (paymentId.includes('BREB')) {
      method = 'Bre-B';
    } else if (paymentId.includes('CARD')) {
      method = 'Tarjeta';
    } else if (paymentMethod) {
      method = paymentMethod;
    }

    return {
      paymentMethod: method,
      amount: 8000,
      currency: 'COP',
      referenceId: paymentId.replace('PAY-', 'RTX'),
      date: dateStr,
      time: timeStr,
    };
  }, [paymentId, paymentMethod]);
};