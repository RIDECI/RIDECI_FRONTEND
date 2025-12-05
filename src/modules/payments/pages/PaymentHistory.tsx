import React from 'react';
import { PaymentHistoryHeader } from '../components/PaymentHistoryHeader';
import { PaymentHistoryFilters } from '../components/PaymentHistoryFilters';
import { PaymentHistoryTable } from '../components/PaymentHistoryTable';
import { usePaymentHistory } from '../hooks/usePaymentHistory';

export const PaymentHistory: React.FC = () => {
  const { payments, filters, updateFilter } = usePaymentHistory();

  const handleDownloadReport = () => {
    console.log('Descargando reporte...');
    // implementar descargar el reporte
  };

  const handleRefreshPayment = (paymentId: string) => {
    console.log('Refrescando pago:', paymentId);
    // implementar refrescar pago
  };

  return (
    <div className="max-w-8xl mx-auto">
      <PaymentHistoryHeader onDownloadReport={handleDownloadReport} />
      
      <PaymentHistoryFilters
        filters={filters}
        onFilterChange={updateFilter}
      />

      <PaymentHistoryTable
        payments={payments}
        onRefresh={handleRefreshPayment}
      />
    </div>
  );
};
