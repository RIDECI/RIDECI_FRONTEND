// src/modules/administration/components/ReportCard.tsx
/**
 * Tarjeta de reporte - SOLO Ver y Actuar
 */

import React from 'react';
import type { EnrichedReport } from '../services/reportEnrichmentService';

interface ReportCardProps {
  report: EnrichedReport;
  selected?: boolean;
  onToggleSelect?: () => void;
  onView: () => void;
  onActOn: () => void;
}

function getSeverityColor(severity?: string) {
  switch (severity?.toUpperCase()) {
    case 'HIGH': return 'bg-red-100 text-red-700 border-red-300';
    case 'MEDIUM': return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'LOW': return 'bg-blue-100 text-blue-700 border-blue-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
}

function getStatusColor(status: string) {
  switch (status?.toUpperCase()) {
    case 'OPEN':
    case 'PENDING': 
      return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
    case 'APPROVED': 
      return 'bg-green-50 text-green-700 border border-green-200';
    case 'REJECTED': 
      return 'bg-red-50 text-red-700 border border-red-200';
    case 'CLOSED': 
      return 'bg-gray-50 text-gray-700 border border-gray-200';
    default: 
      return 'bg-slate-50 text-slate-700 border border-slate-200';
  }
}

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return dateString;
  }
}

function formatTime(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  selected = false,
  onToggleSelect,
  onView,
  onActOn,
}) => {
  return (
    <div 
      className="rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col bg-blue-50 min-h-[300px]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {onToggleSelect && (
            <input 
              type="checkbox" 
              checked={selected}
              onChange={onToggleSelect}
              className="w-4 h-4 rounded cursor-pointer flex-shrink-0"
            />
          )}
          <div className="text-sm font-bold text-blue-800 truncate">
            #{report.id?.substring(0, 8) || 'N/A'}
          </div>
        </div>
        {report.severity && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(report.severity)} flex-shrink-0 ml-2`}>
            {report.severity}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-900 mb-3 line-clamp-2 text-base leading-tight">
        {report.title || 'Reporte sin título'}
      </h3>

      {/* Details */}
      <div className="space-y-2 text-sm mb-4 flex-1 overflow-hidden">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">Reportante:</span>
          <span className="text-slate-900 font-medium truncate">{report.reporterName}</span>
        </div>
        
        {report.offenderName && (
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Reportado:</span>
            <span className="text-slate-900 font-medium truncate">{report.offenderName}</span>
          </div>
        )}
        
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">Fecha:</span>
          <span className="text-slate-900 font-medium">
            {formatDate(report.occurredAt)} • {formatTime(report.occurredAt)}
          </span>
        </div>
        
        {report.route && (
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Ruta:</span>
            <span className="text-slate-900 font-medium truncate">{report.route}</span>
          </div>
        )}
        
        {report.description && (
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Descripción:</span>
            <span className="text-slate-700 text-xs line-clamp-2 leading-relaxed">
              {report.description}
            </span>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>

      {/* Actions - SOLO Ver y Actuar */}
      <div className="flex gap-2">
        <button 
          onClick={onView}
          className="flex-1 py-2.5 px-3 bg-white border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm cursor-pointer"
        >
          Ver
        </button>
        <button 
          onClick={onActOn}
          className="flex-1 py-2.5 px-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors font-semibold text-sm cursor-pointer"
        >
          Actuar
        </button>
      </div>
    </div>
  );
};