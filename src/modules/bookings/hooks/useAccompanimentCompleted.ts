import { useMemo } from 'react';

export const useAccompanimentCompleted = (accompanimentId: string) => {
  // Mock data - Replace with real API call
  const completedData = useMemo(() => ({
    id: accompanimentId,
    origin: 'Universidad Escuela Colombiana de ingeniería',
    destination: 'Portal 80',
    mapImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Madrid&zoom=12&size=600x300&maptype=roadmap',
  }), [accompanimentId]);

  return { completedData };
};