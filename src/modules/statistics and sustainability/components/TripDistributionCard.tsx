// src/modules/statistics and sustainability/components/TripDistributionCard.tsx

import React from 'react';
import type { DistributionItem } from '../types';

interface TripDistributionCardProps {
  data: DistributionItem[];
}

export const TripDistributionCard: React.FC<TripDistributionCardProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribución Viajes</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-600">{item.name}</span>
              <span className="text-gray-800 font-bold">
                {item.value.toLocaleString('es-ES')} ({item.percent}%)
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ width: `${item.percent}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm font-medium text-gray-600">Reducción Promedio</p>
        <p className="text-xl font-bold text-blue-700">3.8 kg CO₂/viaje</p>
      </div>
    </div>
  );
};