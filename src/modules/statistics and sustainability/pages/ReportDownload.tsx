// src/modules/statistics and sustainability/pages/ReportDownload.tsx

import React from 'react';
import { ChevronLeft, BarChart3 } from 'lucide-react';
import { ReportDownloadCard } from '../components';

const PageHeader: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center space-x-3 pb-6 border-b border-gray-100">
    <ChevronLeft 
      className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition" 
      onClick={onBack}
    />
    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
      <BarChart3 className="w-6 h-6 mr-2 text-blue-600 hidden sm:block" />
      Estadísticas y Sostenibilidad
    </h1>
  </div>
);

export function ReportDownload() {
  const handleBack = () => {
    // Aquí puedes usar tu sistema de navegación (react-router, next router, etc.)
    window.history.back();
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-white p-6 md:p-10 font-sans h-full">
      <PageHeader onBack={handleBack} />
      
      <main className="flex-1 flex justify-center items-center py-10 overflow-y-auto">
        <ReportDownloadCard />
      </main>
    </div>
  );
}