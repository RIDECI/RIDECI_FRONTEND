// src/modules/statistics and sustainability/components/ImpactSection.tsx

import React from 'react';
import type { ImpactMetric, Distribution } from '../types/index.ts';

interface ImpactSectionProps {
  impactMetrics: ImpactMetric[];
  tripDistribution: Distribution[];
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({
  impactMetrics,
  tripDistribution,
}) => {
  const totalTrips = tripDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Métricas de Impacto */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Impacto Ambiental y Sostenibilidad
          </h2>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Métricas de Impacto
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-xs text-gray-500 uppercase leading-tight mb-1">
                  {metric.label}
                </p>
                <p className="text-xl font-bold text-blue-900">
                  {metric.value}{' '}
                  <span className="text-sm font-normal">{metric.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución Viajes */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8 md:border-l border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Distribución Viajes
          </h3>
          <div className="space-y-4">
            {tripDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold text-blue-900">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(item.count / totalTrips) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 flex justify-between pt-4 border-t border-gray-100">
            <span className="font-medium">Reducción Promedio</span>
            <span className="font-bold text-blue-900">3.8 kg CO₂/viaje</span>
          </div>
        </div>
      </div>
    </div>
  );
};