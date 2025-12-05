// src/modules/statistics and sustainability/components/CO2ReductionChart.tsx

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import type { CO2ReductionDataPoint } from '../types';

interface CO2ReductionChartProps {
  data: CO2ReductionDataPoint[];
}

export const CO2ReductionChart: React.FC<CO2ReductionChartProps> = ({ data }) => {
  const formatYAxis = (tick: number) => (tick > 0 ? `${tick}` : '');

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 h-96">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">CO₂ Reducido</h2>
      <div className="flex space-x-4 text-xs font-medium mb-4">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
          2023
        </div>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          2024
        </div>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          2025
        </div>
      </div>
      <div className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="name" fontSize={12} stroke="#a0a0a0" />
            <YAxis tickFormatter={formatYAxis} fontSize={12} stroke="#a0a0a0" />
            <Tooltip content={<CustomTooltip unit="T" />} />
            <Area 
              type="monotone" 
              dataKey="2023" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#color2023)" 
              strokeWidth={2} 
            />
            <Area 
              type="monotone" 
              dataKey="2024" 
              stroke="#22C55E" 
              fillOpacity={1} 
              fill="url(#color2024)" 
              strokeWidth={2} 
            />
            <Area 
              type="monotone" 
              dataKey="2025" 
              stroke="#EF4444" 
              fillOpacity={1} 
              fill="url(#color2025)" 
              strokeWidth={2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};