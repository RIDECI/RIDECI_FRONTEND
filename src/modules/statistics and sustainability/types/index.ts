// src/modules/statistics and sustainability/types/index.ts

export interface KpiData {
  value: string;
  unit: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export interface Destination {
  name: string;
  value: number;
  fill: string;
}

export interface Schedule {
  time: string;
  count: number;
  fill: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  unit: string;
}

export interface Distribution {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

// Nuevos tipos para ReportDownload
export interface ReportFormState {
  fileType: string;
  timeRange: string;
}

export interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

// NUEVOS TIPOS PARA GENERAL STATISTICS
export interface TravelTrendsDataPoint {
  name: string;
  Conductores: number;
  Pasajeros: number;
  Activos: number;
}

export interface UserTrendsDataPoint {
  name: string;
  valor: number;
}

export interface CO2ReductionDataPoint {
  name: string;
  '2023': number;
  '2024': number;
  '2025': number;
}

export interface DistributionItem {
  name: string;
  value: number;
  percent: number;
  color: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  unit?: string;
}

export interface MetricCardProps {
  value: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
}