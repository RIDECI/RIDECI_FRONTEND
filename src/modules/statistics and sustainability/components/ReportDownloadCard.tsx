// src/modules/statistics and sustainability/components/ReportDownloadCard.tsx

import React, { useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import { Dropdown } from './Dropdown';
import type { ReportFormState } from '../types';

export const ReportDownloadCard: React.FC = () => {
  const [formData, setFormData] = useState<ReportFormState>({
    fileType: '',
    timeRange: '',
  });

  const fileTypeOptions = ['PDF', 'XLSX'];
  const timeRangeOptions = ['Últimos 7 días', 'Este mes', 'Personalizado'];

  const handleChange = useCallback((field: keyof ReportFormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileType || !formData.timeRange) {
      console.error('Por favor, selecciona el tipo de archivo y la franja de tiempo.');
      return;
    }
    console.log('Descargando reporte con los siguientes parámetros:', formData);
    // Lógica real de descarga
  };

  const isFormValid = formData.fileType !== '' && formData.timeRange !== '';

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
        Descargar Reporte
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Dropdown
          label="Tipo de Archivo"
          placeholder="Selecciona un formato"
          options={fileTypeOptions}
          value={formData.fileType}
          onChange={(value) => handleChange('fileType', value)}
        />

        <Dropdown
          label="Franja de tiempo"
          placeholder="Selecciona una franja de tiempo"
          options={timeRangeOptions}
          value={formData.timeRange}
          onChange={(value) => handleChange('timeRange', value)}
        />

        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 shadow-lg
              ${isFormValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
                : 'bg-blue-300 text-blue-100 cursor-not-allowed'
              }`}
            disabled={!isFormValid}
          >
            <Download className="w-5 h-5" />
            <span>Descargar</span>
          </button>
        </div>
      </form>
    </div>
  );
};