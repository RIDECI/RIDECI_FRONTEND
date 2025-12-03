import { useState } from 'react';
import { type BrebKey, type BrebKeyType } from '../types/breb.types';

const getIconForType = (type: BrebKeyType): string => {
  switch (type) {
    case 'email':
      return '📧';
    case 'document':
      return '📄';
    case 'phone':
      return '📱';
    default:
      return '🔑';
  }
};

const getLabelForType = (type: BrebKeyType): string => {
  switch (type) {
    case 'email':
      return 'Correo electrónico';
    case 'document':
      return 'Documento de identidad';
    case 'phone':
      return 'Teléfono celular';
    default:
      return 'Llave Bre-b';
  }
};

export const useBrebKeys = () => {
  // Estado inicial con algunas llaves de ejemplo
  const [brebKeys, setBrebKeys] = useState<BrebKey[]>([
    {
      id: '1',
      type: 'email',
      value: 'david@example.com',
      label: 'Correo electrónico',
      icon: '📧',
    },
    {
      id: '2',
      type: 'document',
      value: 'CC 123456789',
      label: 'Documento de identidad',
      icon: '📄',
    },
    {
      id: '3',
      type: 'phone',
      value: '3001234567',
      label: 'Teléfono celular',
      icon: '📱',
    },
  ]);

  const [selectedKeyId, setSelectedKeyId] = useState<string | null>('1');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSelectKey = (keyId: string) => {
    setSelectedKeyId(keyId);
  };

  const handleAddKey = (type: BrebKeyType, value: string) => {
    const newKey: BrebKey = {
      id: `key-${Date.now()}`,
      type,
      value,
      label: getLabelForType(type),
      icon: getIconForType(type),
    };

    setBrebKeys([...brebKeys, newKey]);
    setShowAddForm(false);
    
    // Opcionalmente seleccionar la nueva llave
    setSelectedKeyId(newKey.id);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  return {
    brebKeys,
    selectedKeyId,
    showAddForm,
    handleSelectKey,
    handleAddKey,
    handleCancelAdd,
    handleShowAddForm,
  };
};