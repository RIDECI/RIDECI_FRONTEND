import React from 'react';

interface TransactionDetailRowProps {
  label: string;
  value: string;
  valueColor?: string;
  isLast?: boolean;
}

export const TransactionDetailRow: React.FC<TransactionDetailRowProps> = ({
  label,
  value,
  valueColor = 'text-gray-900',
  isLast = false,
}) => {
  return (
    <div className={`flex justify-between items-center py-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${valueColor}`}>{value}</span>
    </div>
  );
};