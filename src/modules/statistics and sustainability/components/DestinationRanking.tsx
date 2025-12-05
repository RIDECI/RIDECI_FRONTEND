// src/modules/statistics and sustainability/components/DestinationRanking.tsx

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from '../utils/mockCharts';
import type { Destination, Schedule } from '../types/index.ts';

interface DestinationRankingProps {
  destinationData: Destination[];
  scheduleData: Schedule[];
}

export const DestinationRanking: React.FC<DestinationRankingProps> = ({
  destinationData,
  scheduleData,
}) => {
  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="w-full lg:w-1/2">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Ranking de Destinos
        </h3>
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-full max-w-[250px] flex justify-center">
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
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 w-full md:w-auto md:mt-0">
            <h4 className="text-base font-semibold text-gray-700 mb-2">
              Top 5 Destinos Más Populares Este Mes
            </h4>
            <ul className="text-sm space-y-2">
              {destinationData.map((dest, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dest.fill }}
                  ></span>
                  <span className="text-gray-700">{dest.name}</span>
                </li>
              ))}
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