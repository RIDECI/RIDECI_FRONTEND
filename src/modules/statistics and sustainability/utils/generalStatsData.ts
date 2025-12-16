// src/modules/statistics and sustainability/utils/generalStatsData.ts

import type { 
  TravelTrendsDataPoint, 
  UserTrendsDataPoint, 
  CO2ReductionDataPoint, 
  DistributionItem 
} from '../types';

export const travelTrendsData: TravelTrendsDataPoint[] = [
  { name: 'Noviembre', Conductores: 20, Pasajeros: 15, Activos: 25 },
  { name: 'Diciembre', Conductores: 25, Pasajeros: 20, Activos: 35 },
  { name: 'Enero', Conductores: 30, Pasajeros: 25, Activos: 45 },
  { name: 'Elemento 4', Conductores: 35, Pasajeros: 30, Activos: 50 },
];

export const userTrendsData: UserTrendsDataPoint[] = [
  { name: 'Enero', valor: 25 },
  { name: 'Febrero', valor: 20 },
  { name: 'Marzo', valor: 35 },
  { name: 'Abril', valor: 42 },
  { name: 'Mayo', valor: 38 },
];

export const co2ReductionData: CO2ReductionDataPoint[] = [
  { name: 'Enero', '2023': 15, '2024': 20, '2025': 25 },
  { name: 'Febrero', '2023': 20, '2024': 25, '2025': 35 },
  { name: 'Marzo', '2023': 30, '2024': 35, '2025': 50 },
  { name: 'Abril', '2023': 45, '2024': 50, '2025': 75 },
  { name: 'Mayo', '2023': 55, '2024': 60, '2025': 100 },
];

export const distributionData: DistributionItem[] = [
  { name: 'Viajes Individuales', value: 7456, percent: 59, color: 'hsl(210, 80%, 55%)' },
  { name: 'Viajes Compartidos', value: 5091, percent: 41, color: 'hsl(140, 60%, 50%)' },
];

export const impactMetricsGeneral = [
  { label: 'CO₂ Reducido (Mes)', value: '4.8 t', detail: 'Equivalente a' },
  { label: 'Km Compartidos', value: '34,567 km', detail: '' },
  { label: 'Pasajeros Compartidos', value: '5,234 personas', detail: '' },
  { label: 'Emisiones Evitadas', value: '89.4 t CO₂', detail: '' },
];