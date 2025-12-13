// src/modules/administration/components/StatusCardsSection.tsx

import React from 'react';

interface StatusCounts {
  ABIERTO: number;
  "EN INVESTIGACIÓN": number;
  RESUELTO: number;
  CRÍTICO: number;
}

interface StatusCardsSectionProps {
  statusCounts: StatusCounts;
}

export const StatusCardsSection: React.FC<StatusCardsSectionProps> = ({ statusCounts }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {Object.entries(statusCounts).map(([key, val]) => (
        <article key={key} className="bg-white rounded-2xl shadow-lg p-6 border border-blue-50 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{val}</div>
            <div className="text-sm text-slate-600 uppercase tracking-wide">{key}</div>
            <div className="text-xs text-slate-400 mt-2">Última actualización</div>
          </div>
          <div>
            {key === "ABIERTO" && (
              <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
              </div>
            )}
            {key === "EN INVESTIGACIÓN" && (
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6M11 17a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            )}
            {key === "RESUELTO" && (
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {key === "CRÍTICO" && (
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};