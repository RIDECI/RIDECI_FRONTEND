// src/modules/administration/components/ReportsFilterSection.tsx

import React from 'react';
import type { StatusFilter, SeverityFilter } from '../types';

interface ReportsFilterSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  severityFilter: SeverityFilter;
  onSeverityFilterChange: (value: SeverityFilter) => void;
  resultsCount: number;
}

export const ReportsFilterSection: React.FC<ReportsFilterSectionProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  severityFilter,
  onSeverityFilterChange,
  resultsCount
}) => {
  return (
    <section className="mb-6">
      <div className="flex gap-3 items-center">
        <input 
          value={search} 
          onChange={(e) => onSearchChange(e.target.value)} 
          placeholder="Buscar reporte..." 
          className="flex-1 rounded-lg p-3 border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)} 
          className="rounded-lg p-3 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
        >
          <option>Todos</option>
          <option>ABIERTO</option>
          <option>EN INVESTIGACIÓN</option>
          <option>RESUELTO</option>
          <option>CRÍTICO</option>
        </select>
        <select 
          value={severityFilter} 
          onChange={(e) => onSeverityFilterChange(e.target.value as SeverityFilter)} 
          className="rounded-lg p-3 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
        >
          <option>Todas</option>
          <option>CRÍTICA</option>
          <option>ALTA</option>
          <option>MEDIA</option>
          <option>BAJA</option>
        </select>
        <div className="text-sm text-slate-500 ml-2">{resultsCount} resultados</div>
      </div>
    </section>
  );
};