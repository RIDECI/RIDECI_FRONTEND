// src/modules/statistics and sustainability/components/CustomTooltip.tsx

import React from 'react';
import type { CustomTooltipProps } from '../types';

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  active, 
  payload, 
  label, 
  unit = '' 
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 shadow-lg rounded-lg text-sm">
        <p className="font-semibold text-gray-700">{label}</p>
        {payload.map((p, index) => (
          <p key={`item-${index}`} className="mt-1" style={{ color: p.color }}>
            {`${p.name}: `}
            <span className="font-bold">{`${p.value}${unit}`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};