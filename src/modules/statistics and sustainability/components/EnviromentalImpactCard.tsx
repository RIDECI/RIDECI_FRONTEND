// src/modules/statistics and sustainability/components/EnvironmentalImpactCard.tsx

import React from 'react';

export const EnvironmentalImpactCard: React.FC = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Impacto Ambiental y Sostenibilidad
      </h2>
      <div className="flex flex-wrap md:flex-row justify-between text-left">
        {/* Bloque Izquierdo */}
        <div className="w-full md:w-1/2 pr-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">CO₂ Reducido (Mes)</span>
            <span className="text-lg font-bold text-gray-800">4.8 t</span>
          </div>
          <div className="text-xs text-gray-400">Equivalente a:</div>
          <div className="text-right space-y-1">
            <p className="text-sm font-bold text-blue-700">45.2T</p>
            <p className="text-sm font-bold text-blue-700">2,847 árboles</p>
          </div>
        </div>

        {/* Bloque Derecho */}
        <div className="w-full md:w-1/2 pl-4 space-y-3 mt-4 md:mt-0 border-t md:border-t-0 md:border-l pt-4 md:pt-0">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Km Compartidos</span>
            <span className="text-lg font-bold text-green-600">34,567 km</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Pasajeros Compartidos</span>
            <span className="text-lg font-bold text-green-600">5,234 personas</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t mt-2">
            <span className="text-sm font-medium text-gray-600">Emisiones Evitadas</span>
            <span className="text-lg font-bold text-blue-700">89.4 t CO₂</span>
          </div>
        </div>
      </div>
    </div>
  );
};