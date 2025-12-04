

export interface Stat {
  title: string;
  value: string;
  unit?: string;
}

export interface Destination {
  id: number;
  name: string;
}

export interface DepartureTime {
  range: string;
  count: number;
}

export interface ImpactMetric {
  title: string;
  value: string;
}

export interface TravelDistribution {
  type: 'Viajes Individuales' | 'Viajes Compartidos';
  count: number;
  percentage: number;
}