// src/modules/statistics and sustainability/components/DestinationRanking.tsx

import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from '../utils/mockCharts';
import type { Destination, Schedule } from '../types';

interface DestinationRankingProps {
  destinationData: Destination[];
  scheduleData: Schedule[];
}

export const DestinationRanking: React.FC<DestinationRankingProps> = ({
  destinationData,
  scheduleData,
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; name: string; value: number; percentage: number } | null>(null);

  // Calcular el total para obtener porcentajes
  const total = destinationData.reduce((sum, item) => sum + item.value, 0);

  const handleMouseEnter = (entry: Destination, index: number, event: React.MouseEvent) => {
    const percentage = ((entry.value / total) * 100).toFixed(1);
    setHoveredSlice(index);
    setTooltipData({
      x: event.clientX,
      y: event.clientY,
      name: entry.name,
      value: entry.value,
      percentage: parseFloat(percentage)
    });
  };

  const handleMouseLeave = () => {
    setHoveredSlice(null);
    setTooltipData(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltipData) {
      setTooltipData({
        ...tooltipData,
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="w-full lg:w-1/2">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Ranking de Destinos
        </h3>
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-full max-w-[250px] flex justify-center relative" onMouseMove={handleMouseMove}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={250} height={250}>
                <Pie
                  data={destinationData}
                  cx={125}
                  cy={125}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {destinationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={hoveredSlice === index ? entry.fill : entry.fill}
                      opacity={hoveredSlice === null ? 1 : hoveredSlice === index ? 1 : 0.5}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e: any) => handleMouseEnter(entry, index, e)}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Tooltip personalizado */}
            {tooltipData && (
              <div 
                className="fixed z-50 bg-white border-2 border-gray-300 rounded-lg shadow-xl px-4 py-3 pointer-events-none"
                style={{
                  left: `${tooltipData.x + 15}px`,
                  top: `${tooltipData.y - 10}px`,
                  transform: 'translate(0, -50%)'
                }}
              >
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  {tooltipData.name}
                </p>
                <p className="text-gray-600 text-xs">
                  Viajes: <span className="font-bold text-blue-600">{tooltipData.value}</span>
                </p>
                <p className="text-gray-600 text-xs">
                  Porcentaje: <span className="font-bold text-blue-600">{tooltipData.percentage}%</span>
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 w-full md:w-auto md:mt-0">
            <h4 className="text-base font-semibold text-gray-700 mb-2">
              Top 5 Destinos Más Populares Este Mes
            </h4>
            <ul className="text-sm space-y-2">
              {destinationData.map((dest, index) => {
                const percentage = ((dest.value / total) * 100).toFixed(1);
                return (
                  <li 
                    key={index} 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition"
                    onMouseEnter={(e) => handleMouseEnter(dest, index, e as any)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: dest.fill }}
                    ></span>
                    <span className="text-gray-700 flex-1">{dest.name}</span>
                    <span className="text-gray-500 text-xs font-medium">
                      {percentage}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8 lg:border-l border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Ranking de Horarios de Salida
        </h3>
        <div className="space-y-4">
          {scheduleData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{item.time}</span>
                <span>{item.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full shadow-md"
                  style={{
                    width: `${(item.count / 20) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};