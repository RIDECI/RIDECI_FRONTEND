import React from 'react';
import { RefreshCw } from 'lucide-react';
import { PaymentMethodIcon } from './PaymentMethodIcon';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import type { PaymentHistoryItem } from '../types/payment-history.types';

interface PaymentHistoryTableProps {
  payments: PaymentHistoryItem[];
  onRefresh?: (paymentId: string) => void;
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  payments,
  onRefresh,
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase">Fecha</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase">Viaje Asociado</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase">Monto</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase">Método de Pago</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase">Estado</th>
            <th className="w-16"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6 text-gray-900">{payment.date}</td>
              <td className="py-4 px-6 text-gray-900 font-medium">{payment.tripName}</td>
              <td className="py-4 px-6 text-gray-900 font-semibold">{formatAmount(payment.amount)}</td>
              <td className="py-4 px-6">
                <PaymentMethodIcon method={payment.paymentMethod} />
              </td>
              <td className="py-4 px-6">
                <PaymentStatusBadge status={payment.status} />
              </td>
              <td className="py-4 px-6">
                {onRefresh && (
                  <button
                    onClick={() => onRefresh(payment.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          No se encontraron transacciones
        </div>
      )}
    </div>
  );
};