import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import type { PaymentFilters } from '../types/payment-history.types';

interface PaymentHistoryFiltersProps {
  filters: PaymentFilters;
  onFilterChange: (key: keyof PaymentFilters, value: string) => void;
}

export const PaymentHistoryFilters: React.FC<PaymentHistoryFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {/* Search */}
      <div className="relative col-span-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Buscar transacciones"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {/* Date Filter */}
      <div className="relative">
        <select
          value={filters.dateFilter}
          onChange={(e) => onFilterChange('dateFilter', e.target.value)}
          className="w-full h-11 px-3 pr-10 border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Fecha</option>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={filters.statusFilter}
          onChange={(e) => onFilterChange('statusFilter', e.target.value)}
          className="w-full h-11 px-3 pr-10 border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Estado</option>
          <option value="completed">Completado</option>
          <option value="failed">Fallido</option>
          <option value="pending">Pendiente</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>

      {/* Method Filter */}
      <div className="relative">
        <select
          value={filters.methodFilter}
          onChange={(e) => onFilterChange('methodFilter', e.target.value)}
          className="w-full h-11 px-3 pr-10 border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Método de Pago</option>
          <option value="nequi">Nequi</option>
          <option value="card">Tarjeta</option>
          <option value="cash">Efectivo</option>
          <option value="bre-b">Bre-B</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
};