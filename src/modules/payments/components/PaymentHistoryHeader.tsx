import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface PaymentHistoryHeaderProps {
  onDownloadReport: () => void;
}

export const PaymentHistoryHeader: React.FC<PaymentHistoryHeaderProps> = ({
  onDownloadReport,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Historial de Pagos</h1>
      <Button
        onClick={onDownloadReport}
        className="bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-xl h-12 px-6"
      >
        <Download className="w-5 h-5 mr-2" />
        Descargar mi reporte
      </Button>
    </div>
  );
};
