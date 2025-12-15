// src/modules/administration/components/ReportsCarousel.tsx

import React from 'react';
import type { Report } from '../types';
import { getSeverityColor, getStatusColor } from '../utils/helpers';

interface ReportsCarouselProps {
  chunks: Report[][];
  currentPage: number;
  itemsPerPage: number;
  selectedIds: Record<string, boolean>;
  onToggleSelect: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onViewReport: (report: Report) => void;
  onActOnReport: (report: Report) => void;
}

export const ReportsCarousel: React.FC<ReportsCarouselProps> = ({
  chunks,
  currentPage,
  itemsPerPage,
  selectedIds,
  onToggleSelect,
  onPrevious,
  onNext,
  onViewReport,
  onActOnReport
}) => {
  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative mb-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onPrevious} 
          disabled={currentPage === 0} 
          className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all ${currentPage === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex-1 overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {chunks.length > 0 ? (
              chunks.map((chunk, i) => (
                <div key={i} className="min-w-full flex gap-4 px-1">
                  {chunk.map((r) => (
                    <div key={r.id} className="flex-1 rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col" style={{ backgroundColor: "#D6E9FF", minHeight: 220 }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={!!selectedIds[r.id]} 
                            onChange={() => onToggleSelect(r.id)} 
                            className="w-4 h-4 rounded cursor-pointer" 
                          />
                          <div className="text-sm font-bold text-blue-800">#{r.id}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(r.severity)}`}>
                          {r.severity}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 mb-3">{r.title}</h3>

                      <div className="space-y-1 text-xs mb-3 flex-1">
                        <div className="text-slate-700">
                          Reportado por: <span className="text-slate-900 font-medium">{r.reporter}</span>
                        </div>
                        <div className="text-slate-700">
                          Conductor: <span className="text-slate-900 font-medium">{r.conductor}</span>
                        </div>
                        <div className="text-slate-700">
                          Fecha: <span className="text-slate-900 font-medium">{r.date} - {r.time}</span>
                        </div>
                        <div className="text-slate-700">
                          Ruta: <span className="text-slate-900 font-medium">{r.route}</span>
                        </div>
                        {r.amount && (
                          <div className="text-slate-700">
                            Monto: <span className="text-slate-900 font-medium">{r.amount}</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => onViewReport(r)} 
                          className="flex-1 py-2 px-3 bg-white border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
                        >
                          Ver
                        </button>
                        <button 
                          onClick={() => onActOnReport(r)} 
                          className="flex-1 py-2 px-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors font-medium text-sm"
                        >
                          Actuar
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {chunk.length < itemsPerPage && Array.from({ length: itemsPerPage - chunk.length }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="flex-1 opacity-0 pointer-events-none" style={{ minHeight: 220 }} />
                  ))}
                </div>
              ))
            ) : (
              <div className="min-w-full text-center py-10 text-slate-500">No hay reportes.</div>
            )}
          </div>
        </div>

        <button 
          onClick={onNext} 
          disabled={currentPage >= chunks.length - 1} 
          className={`flex-shrink-0 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all ${currentPage >= chunks.length - 1 ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};