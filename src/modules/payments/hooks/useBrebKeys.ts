import { useState } from 'react';
import type { BrebKey } from '../types/breb.types';

export const useBrebKeys = () => {
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);

  // Mock data - cambiar por datos de ka API
  const brebKeys: BrebKey[] = [
    {
      id: '1',
      type: 'document',
      value: '1079508128',
      label: 'Documento de identidad',
      icon: 'Bre-B',
    },
    {
      id: '2',
      type: 'email',
      value: 'chavarrodiegofernando12@gmail.com',
      label: 'Correo electrónico',
      icon: 'Bre-B',
    },
    {
      id: '3',
      type: 'phone',
      value: '3212694956',
      label: 'Número de teléfono',
      icon: 'Bre-B',
    },
  ];

  const handleSelectKey = (keyId: string) => {
    setSelectedKeyId(keyId);
  };

  return {
    brebKeys,
    selectedKeyId,
    handleSelectKey,
  };
};