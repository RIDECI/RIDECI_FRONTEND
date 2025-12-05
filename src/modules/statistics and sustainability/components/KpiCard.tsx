// src/modules/statistics and sustainability/components/KpiCard.tsx

import React from 'react';
import type { KpiData } from '../types/index.ts';

interface KpiCardProps {
  data: KpiData;
}

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => (
  <div className="flex-1 min-w-[200px] p-4 bg-white rounded-xl shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <div className='flex flex-col'>
        <div className={`text-3xl font-bold ${data.color}`}>{data.value}</div>
        <div className="text-sm font-semibold text-gray-500 uppercase">{data.unit}</div>
      </div>
      <data.icon size={30} className={data.color} />
    </div>
    <p className="text-xs text-gray-400 mt-1 h-8 flex items-end">{data.description}</p>
  </div>
);