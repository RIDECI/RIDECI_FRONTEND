import { useMemo } from 'react';

export const useAccompanimentConfirmed = (accompanimentId: string) => {
  // Mock data - Replace with real API call
  const confirmedData = useMemo(() => ({
    id: accompanimentId,
    summary: {
      meetingPoint: 'Entrada Escuela Colombiana de Ingeniería',
      destination: 'Portal 80',
      dateTime: '19 de Noviembre, 2025 a las 19:00',
    },
    companion: {
      name: 'Raquel Selma',
      rating: '4.7',
      image: 'https://i.pravatar.cc/100?img=5',
    },
  }), [accompanimentId]);

  return { confirmedData };
};