// src/modules/administration/components/ReportDetailsModal.tsx

import React from 'react';
import type { Report } from '../types';
import { getSeverityColor } from '../utils/helpers';

interface ReportDetailsModalProps {
  open: boolean;
  report: Report | null;
  onClose: () => void;
  onArchive: () => void;
}

export const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  open,
  report,
  onClose,
  onArchive
}) => {
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">{report.title}</h2>
            <div className="text-sm text-slate-500 mt-1">#{report.id}</div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-500 mb-1">Reportado por</div>
              <div className="font-semibold text-slate-800">{report.reporter}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Conductor</div>
              <div className="font-semibold text-slate-800">{report.conductor}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Fecha</div>
              <div className="font-semibold text-slate-800">{report.date}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Hora</div>
              <div className="font-semibold text-slate-800">{report.time}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Ruta</div>
              <div className="font-semibold text-slate-800">{report.route}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Severidad</div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(report.severity)}`}>
                {report.severity}
              </span>
            </div>
          </div>

          {report.amount && (
            <div>
              <div className="text-sm text-slate-500 mb-1">Monto</div>
              <div className="font-semibold text-slate-800">{report.amount}</div>
            </div>
          )}

          <div>
            <div className="text-sm text-slate-500 mb-1">Detalles</div>
            <div className="text-sm text-slate-700">
              {report.details ?? "No hay información adicional."}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button 
            onClick={onArchive}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7M10 3h4l1 4H9l1-4z" />
            </svg>
            <span>Archivar reporte</span>
          </button>

          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};