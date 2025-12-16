// src/modules/administration/components/ReportsList.tsx
/**
 * Lista de reportes con paginación
 * SIN props de suspender (van en ActOnReportModal)
 */

import React, { useState, useEffect } from 'react';
import { ReportCard } from './ReportCard';
import { useReports } from '../hooks/useReports';
import type { EnrichedReport } from '../services/reportEnrichmentService';

interface ReportsListProps {
  onViewReport: (report: EnrichedReport) => void;
  onActOnReport: (report: EnrichedReport) => void;
  itemsPerPage?: number;
  onReportOpened?: (reportId: string) => void;
}

export const ReportsList: React.FC<ReportsListProps> = ({
  onViewReport,
  onActOnReport,
  itemsPerPage = 3,
  onReportOpened,
}) => {
  const { reports, loading, error, refreshReports, markAsOpened } = useReports();
  const [currentPage, setCurrentPage] = useState(0);

  const chunks: EnrichedReport[][] = [];
  for (let i = 0; i < reports.length; i += itemsPerPage) {
    chunks.push(reports.slice(i, i + itemsPerPage));
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [reports.length]);

  const handlePrevious = () => {
    setCurrentPage(p => Math.max(0, p - 1));
  };

  const handleNext = () => {
    setCurrentPage(p => Math.min(chunks.length - 1, p + 1));
  };

  const handleViewReport = (report: EnrichedReport) => {
    markAsOpened(report.id);
    if (onReportOpened) {
      onReportOpened(report.id);
    }
    onViewReport(report);
  };

  const handleActOnReport = (report: EnrichedReport) => {
    markAsOpened(report.id);
    if (onReportOpened) {
      onReportOpened(report.id);
    }
    onActOnReport(report);
  };

  if (loading && reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-red-900 font-semibold mb-2">Error al cargar reportes</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={refreshReports}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-slate-900 font-semibold mb-1">No hay reportes</p>
            <p className="text-slate-600 text-sm">No se encontraron reportes en el sistema</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative mb-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer ${
            currentPage === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex-1">
          <div 
            className="grid gap-4 transition-all duration-500" 
            style={{ 
              gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`,
            }}
          >
            {chunks[currentPage]?.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={() => handleViewReport(report)}
                onActOn={() => handleActOnReport(report)}
              />
            ))}
            
            {chunks[currentPage] && chunks[currentPage].length < itemsPerPage && 
              Array.from({ length: itemsPerPage - chunks[currentPage].length }).map((_, idx) => (
                <div key={`empty-${idx}`} className="opacity-0 min-h-[300px]" />
              ))
            }
          </div>
        </div>

        <button 
          onClick={handleNext}
          disabled={currentPage >= chunks.length - 1}
          className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer ${
            currentPage >= chunks.length - 1 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm text-slate-600">
          Página {currentPage + 1} de {chunks.length || 1}
        </span>
      </div>
    </section>
  );
};