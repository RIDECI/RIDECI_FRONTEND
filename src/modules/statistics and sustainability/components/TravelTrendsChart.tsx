// src/modules/statistics and sustainability/components/TravelTrendsChart.tsx

import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import type { TravelTrendsDataPoint, UserTrendsDataPoint } from '../types';

interface TravelTrendsChartProps {
  travelData: TravelTrendsDataPoint[];
  userData: UserTrendsDataPoint[];
}

export const TravelTrendsChart: React.FC<TravelTrendsChartProps> = ({ 
  travelData, 
  userData 
}) => {
  const formatYAxis = (tick: number) => (tick > 0 ? `${tick}` : '');

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 h-96">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Tendencias de Viajes y Usuarios
      </h2>
      <div className="flex flex-col md:flex-row h-[calc(100%-40px)]">
        {/* Gráfica de Barras (Izquierda) */}
        <div className="w-full md:w-1/2 h-full pr-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={travelData} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="name" fontSize={12} stroke="#a0a0a0" />
              <YAxis tickFormatter={formatYAxis} fontSize={12} stroke="#a0a0a0" />
              <Tooltip content={<CustomTooltip unit="" />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} align="center" verticalAlign="bottom" />
              <Bar dataKey="Conductores" stackId="a" fill="#3B82F6" name="Conductores" />
              <Bar dataKey="Pasajeros" stackId="a" fill="#60A5FA" name="Pasajeros" />
              <Bar dataKey="Activos" stackId="a" fill="#93C5FD" name="Activos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Línea (Derecha) */}
        <div className="w-full md:w-1/2 h-full pl-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userData} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="name" fontSize={12} stroke="#a0a0a0" />
              <YAxis tickFormatter={formatYAxis} fontSize={12} stroke="#a0a0a0" />
              <Tooltip content={<CustomTooltip unit="" />} />
              <Line 
                type="monotone" 
                dataKey="valor" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={false} 
                name="Acompañantes" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};