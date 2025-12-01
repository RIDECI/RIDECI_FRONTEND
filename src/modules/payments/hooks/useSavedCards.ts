import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { SavedCard } from '../types/card.types';

export const useSavedCards = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);


  // cambiar por datos de la api
  const savedCards: SavedCard[] = [
    {
      id: '1',
      lastFourDigits: '1234',
      expiryDate: '12/25',
      brand: 'mastercard',
      holderName: 'Juan Pérez',
      isDefault: false,
    },
    {
      id: '2',
      lastFourDigits: '5678',
      expiryDate: '08/26',
      brand: 'visa',
      holderName: 'Juan Pérez',
      isDefault: true,
    },
    {
      id: '3',
      lastFourDigits: '9012',
      expiryDate: '01/27',
      brand: 'mastercard',
      holderName: 'Juan Pérez',
      isDefault: false,
    },
  ];

  const handleSelectCard = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handleAddNewCard = () => {
    navigate(`/payment/cards/add/${bookingId}`);
  };

  return {
    savedCards,
    selectedCardId,
    handleSelectCard,
    handleAddNewCard,
  };
};