// src/modules/statistics and sustainability/pages/GeneralStatistics.tsx

import React from 'react';
import { ArrowLeft, TrendingUp, Cloud, Users } from 'lucide-react';
import {
  MetricCard,
  TravelTrendsChart,
  EnvironmentalImpactCard,
  CO2ReductionChart,
  TripDistributionCard
} from '../components';
import {
  travelTrendsData,
  userTrendsData,
  co2ReductionData,
  distributionData
} from '../utils/generalStatsData';

export function GeneralStatistics() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    // CAMBIO AQUÍ: Removemos flex-1, overflow-y-auto, min-h-screen y bg-gray-50
    <div className="p-4 md:p-6 font-sans">
      <main className="mx-auto max-w-full">
        {/* Título y Navegación */}
        <div className="flex items-center mb-6">
          <ArrowLeft 
            size={24} 
            className="text-gray-500 mr-4 cursor-pointer hover:text-gray-700 transition" 
            onClick={handleBack}
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Estadísticas y Sostenibilidad
          </h1>
        </div>

        {/* Fila de Tarjetas de Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            value="12,547"
            label="VIAJES MES"
            icon={TrendingUp}
            iconColor="text-blue-700"
          />
          <MetricCard
            value="8,234"
            label="USUARIOS ACTIVOS"
            icon={Users}
            iconColor="text-green-600"
          />
          <MetricCard
            value="45.2T"
            label="CO₂ REDUCIDO"
            icon={Cloud}
            iconColor="text-red-500"
          />
        </div>

        {/* Fila de Gráficas y Distribución */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna 1: Tendencias de Viajes y CO2 */}
          <div className="lg:col-span-2 space-y-6">
            <TravelTrendsChart 
              travelData={travelTrendsData}
              userData={userTrendsData}
            />
            <EnvironmentalImpactCard />
          </div>

          {/* Columna 2: CO2 Reducido y Distribución */}
          <div className="lg:col-span-1 space-y-6">
            <CO2ReductionChart data={co2ReductionData} />
            <TripDistributionCard data={distributionData} />
          </div>
        </div>
      </main>
    </div>
  );
}