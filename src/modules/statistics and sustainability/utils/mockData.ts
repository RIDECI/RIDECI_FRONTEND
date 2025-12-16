// src/modules/statistics and sustainability/utils/mockData.ts

import { Zap, Compass, TrendingDown, Leaf } from 'lucide-react';
import type { KpiData, Destination, Schedule, ImpactMetric, Distribution } from '../types/index.ts';

export const kpiData: KpiData[] = [
  { value: '48', unit: 'VIAJES', description: 'MES', icon: Zap, color: 'text-blue-500' },
  { value: '8,234', unit: 'km', description: 'DISTANCIA PROMEDIO EN UN VIAJE', icon: Compass, color: 'text-green-500' },
  { value: '$287,350', unit: '', description: 'DINERO GASTADO MES', icon: TrendingDown, color: 'text-red-500' },
  { value: '45.2T', unit: '', description: 'CO₂ REDUCIDO', icon: Leaf, color: 'text-cyan-500' },
];

export const destinationData: Destination[] = [
  { name: '1. Escuela Colombiana de Ingeniería', value: 300, fill: '#3B82F6' },
  { name: '2. Zona Rosa', value: 250, fill: '#2563EB' },
  { name: '3. Usaquén', value: 180, fill: '#1D4ED8' },
  { name: '4. La Candelaria', value: 120, fill: '#1E40AF' },
  { name: '5. Chapinero', value: 100, fill: '#1E3A8A' },
];

export const scheduleData: Schedule[] = [
  { time: '08:00 - 09:30', count: 20, fill: '#3B82F6' },
  { time: '12:00 - 13:30', count: 20, fill: '#3B82F6' },
  { time: '17:00 - 19:00', count: 5, fill: '#60A5FA' },
  { time: '19:00 - 21:00', count: 3, fill: '#93C5FD' },
];

export const impactMetrics: ImpactMetric[] = [
  { label: 'CO₂ Reducción (Mes)', value: '45.2T', unit: '' },
  { label: 'Equivalente a', value: '2,847', unit: 'árboles' },
  { label: 'Km Compartidos', value: '34,867', unit: 'km' },
  { label: 'Pasajeros Compartidos', value: '5,234', unit: 'personas' },
  { label: 'Emisiones Evitadas', value: '88.4T', unit: 'CO₂' },
];

export const tripDistribution: Distribution[] = [
  { label: 'Viajes Individuales', count: 7456, percentage: 59, color: '#3B82F6' },
  { label: 'Viajes Compartidos', count: 5091, percentage: 41, color: '#2563EB' },
];