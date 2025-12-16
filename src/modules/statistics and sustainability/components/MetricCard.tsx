// src/modules/statistics and sustainability/components/MetricCard.tsx

import React from 'react';
import type { MetricCardProps } from '../types';

export const MetricCard: React.FC<MetricCardProps> = ({ 
  value, 
  label, 
  icon: Icon, 
  iconColor 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <div className={`text-4xl font-extrabold ${iconColor}`}>{value}</div>
          <div className="text-sm font-medium text-gray-500 mt-1">{label}</div>
        </div>
        <Icon size={36} className={`${iconColor} opacity-50`} />
      </div>
    </div>
  );
};