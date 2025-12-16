import React from "react";
import { PaymentHistoryHeader } from "../components/PaymentHistoryHeader";
import { PaymentHistoryFilters } from "../components/PaymentHistoryFilters";
import { PaymentHistoryTable } from "../components/PaymentHistoryTable";
import { usePaymentHistory } from "../hooks/usePaymentHistory";

export const PaymentHistory: React.FC = () => {
  const {
    payments,
    filters,
    updateFilter,
    loading,
  } = usePaymentHistory();

  const handleDownloadReport = () => {
    console.log("Descargando reporte...");
    // 🔜 implementar descarga PDF
  };

  if (loading) {
    return (
      <div className="max-w-8xl mx-auto text-center py-12 text-gray-600 font-medium">
        Cargando historial de pagos...
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto">
      <PaymentHistoryHeader onDownloadReport={handleDownloadReport} />

      <PaymentHistoryFilters
        filters={filters}
        onFilterChange={updateFilter}
      />

      <PaymentHistoryTable payments={payments} />
    </div>
  );
};
