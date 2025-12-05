import { useState } from 'react';

export const useSearchAccompaniments = () => {
  const [destination, setDestination] = useState('Portal 80');
  const [departureTime, setDepartureTime] = useState('18:30');
  const [searchByProximity, setSearchByProximity] = useState(true);

  // Mock data: conectar con los datos de la API
  const availableAccompaniments = [
    {
      id: '1',
      driverName: 'Carlos Santana',
      driverImage: 'https://i.pravatar.cc/40?img=1',
      rating: '3.5',
      origin: 'Universidad',
      destination: 'Portal 80',
      time: '18:30',
    },
    {
      id: '2',
      driverName: 'Carlos Gomez',
      driverImage: 'https://i.pravatar.cc/40?img=2',
      rating: '4.5',
      origin: 'Universidad',
      destination: 'Portal 80',
      time: '18:30',
    },
    {
      id: '3',
      driverName: 'Alex Ramirez',
      driverImage: 'https://i.pravatar.cc/40?img=3',
      rating: '4.0',
      origin: 'Universidad',
      destination: 'Portal 80',
      time: '18:30',
    },
    {
      id: '4',
      driverName: 'José Torres',
      driverImage: 'https://i.pravatar.cc/40?img=4',
      rating: '3.5',
      origin: 'Universidad',
      destination: 'Portal 80',
      time: '18:30',
    },
    {
      id: '5',
      driverName: 'Fernando Lopez',
      driverImage: 'https://i.pravatar.cc/40?img=5',
      rating: '4.5',
      origin: 'Universidad',
      destination: 'Portal 80',
      time: '18:30',
    },
    {
      id: '6',
      driverName: 'Camilo Saenz',
      driverImage: 'https://i.pravatar.cc/40?img=6',
      rating: '4.5',
      origin: 'Universidad',
      destination: 'Portal 80',
      time: '18:30',
    },
  ];

  return {
    destination,
    setDestination,
    departureTime,
    setDepartureTime,
    searchByProximity,
    setSearchByProximity,
    availableAccompaniments,
    totalCount: availableAccompaniments.length,
  };
};