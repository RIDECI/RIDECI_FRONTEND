import { useMemo } from 'react';
import type { Trip, TabType } from '../types/Trip';

export const useAccompaniments = () => {
  // Mock data - Luego hay que reemplazarse con los datos de la API
  const scheduledAccompaniments: Trip[] = useMemo(() => [
    {
      id: '1',
      route: 'Universidad Escuela colombiana de Ing → Portal 80',
      date: 'Hoy',
      time: '18:30',
      driverName: 'Carlos Ruiz',
      driverImage: 'https://i.pravatar.cc/40?img=1',
      status: 'Confirmado',
      statusColor: 'green',
    },
    {
      id: '2',
      route: 'Universidad Escuela colombiana de Ing → Portal 80',
      date: 'Mañana',
      time: '18:30',
      driverName: 'Carlos Ruiz',
      driverImage: 'https://i.pravatar.cc/40?img=1',
      status: 'Confirmado',
      statusColor: 'green',
    },
  ], []);

  const historyAccompaniments: Trip[] = useMemo(() => [
    {
      id: '3',
      route: 'Centro Comercial → Casa',
      date: '25 Nov',
      time: '19:45',
      driverName: 'María García',
      driverImage: 'https://i.pravatar.cc/40?img=2',
      status: 'Confirmado',
      statusColor: 'green',
    },
    {
      id: '4',
      route: 'Parque Arvi → Universidad',
      date: '24 Nov',
      time: '07:20',
      driverName: 'Juan López',
      driverImage: 'https://i.pravatar.cc/40?img=3',
      status: 'Confirmado',
      statusColor: 'green',
    },
  ], []);

  const tabs: TabType[] = [
    { id: 'scheduled', label: 'Programados' },
    { id: 'history', label: 'Historial' },
  ];

  return {
    scheduledAccompaniments,
    historyAccompaniments,
    tabs,
  };
};
