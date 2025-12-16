// src/modules/administration/components/ExportButton.tsx
/**
 * Componente de botón de exportación con indicador de progreso
 * Soporta PDF, Excel y CSV
 */

import React, { useState } from 'react';

interface ExportButtonProps {
  format: 'pdf' | 'xlsx' | 'csv';
  onExport: () => Promise<void>;
  disabled?: boolean;
  selectedCount: number;
}

const iconMap = {
  pdf: {
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    hoverBg: 'hover:bg-yellow-100',
  },
  xlsx: {
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    hoverBg: 'hover:bg-green-100',
  },
  csv: {
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    hoverBg: 'hover:bg-blue-100',
  },
};

export const ExportButton: React.FC<ExportButtonProps> = ({
  format,
  onExport,
  disabled = false,
  selectedCount,
}) => {
  const [exporting, setExporting] = useState(false);
  const config = iconMap[format];

  const handleExport = async () => {
    setExporting(true);
    try {
      await onExport();
    } catch (error) {
      console.error(`Error exporting ${format}:`, error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || exporting}
      className={`flex items-center gap-3 transition-all duration-300 rounded-xl border ${config.borderColor} ${config.hoverBg} disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${
        exporting ? 'min-w-[220px] px-6 py-3' : 'px-4 py-3'
      }`}
    >
      {/* Animación de fondo durante exportación */}
      {exporting && (
        <div className={`absolute inset-0 ${config.bgColor} animate-pulse opacity-60 rounded-xl`} />
      )}

      <div className="relative flex items-center gap-3 z-10">
        {/* Icono */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          {format === 'pdf' && (
            <svg className={`w-full h-full ${exporting ? 'animate-bounce' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3v4a1 1 0 001 1h4" />
            </svg>
          )}
          {format === 'xlsx' && (
            <svg className={`w-full h-full ${exporting ? 'animate-bounce' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          {format === 'csv' && (
            <svg className={`w-full h-full ${exporting ? 'animate-bounce' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>

        {/* Texto */}
        <div className="flex flex-col">
          <span className={`relative ${config.textColor} font-medium z-10`}>
            {exporting ? 'Exportando...' : `${format.toUpperCase()} (${selectedCount})`}
          </span>
          {exporting && (
            <span className={`text-xs ${config.textColor} z-10`}>
              Preparando archivo {format.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};