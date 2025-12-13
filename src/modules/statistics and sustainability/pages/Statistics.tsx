// src/modules/statistics and sustainability/pages/Statistics.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KpiCard, DestinationRanking, ImpactSection } from '../components';
import { kpiData, destinationData, scheduleData, impactMetrics, tripDistribution } from '../utils/mockData';

export function Statistics() {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate('/statistics/report-download');
  };

  const handleGeneralStatistics = () => {
    navigate('/statistics/general');
  };

  return (
    <div className="p-4 sm:p-8 flex justify-center items-start font-sans">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl border-t-8 border-blue-600">
        
        <h1 className="text-2xl font-extrabold text-gray-900 p-4 md:p-8 pb-2 border-b border-gray-100">
          Estadísticas y Sostenibilidad
        </h1>
        
        <div className="p-4 md:p-8 pt-0">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {kpiData.map((data, index) => (
              <KpiCard key={index} data={data} />
            ))}
          </div>

          {/* Ranking Section */}
          <DestinationRanking 
            destinationData={destinationData}
            scheduleData={scheduleData}
          />

          {/* Impact Section */}
          <ImpactSection 
            impactMetrics={impactMetrics}
            tripDistribution={tripDistribution}
          />

          {/* Footer Buttons */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-10">
            <button 
              onClick={handleGeneralStatistics}
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-[1.03]"
            >
              Estadísticas Generales
            </button>
            <button 
              onClick={handleGenerateReport}
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition duration-150 transform hover:scale-[1.03]"
            >
              Generar Reporte
            </button>
            <button className="px-6 py-3 text-sm font-semibold text-blue-700 bg-white border border-blue-700 rounded-lg shadow-md hover:bg-gray-50 transition duration-150 transform hover:scale-[1.03]">
              Filtrado de Estadísticas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}