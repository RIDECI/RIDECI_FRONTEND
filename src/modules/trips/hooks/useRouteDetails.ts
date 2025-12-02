import { useMemo } from 'react';

export const useRouteDetails = (routeId: string) => {
  // Mock data Reemplazar con los datos de la API
  const routeDetails = useMemo(() => ({
    id: routeId,
    driver: {
      name: 'Alex Ramírez',
      rating: '4.9',
      badge: 'Estudiante Verificado',
      image: 'https://i.pravatar.cc/100?img=3',
    },
    transport: {
      method: 'Transmilenio',
    },
    route: {
      meetingPoint: 'Entrada Universidad',
      destination: 'Portal 80',
      departureTime: '18:30',
      estimatedArrival: '19:50',
    },
    mapImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Madrid&zoom=12&size=400x200&maptype=roadmap',
  }), [routeId]);

  return { routeDetails };
};