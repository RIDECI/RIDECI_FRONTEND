import React from 'react';
import { SavedCardItem } from './SavedCardItem';
import type { SavedCard } from '../types/card.types';

interface SavedCardsListProps {
  cards: SavedCard[];
  selectedCardId: string | null;
  onSelectCard: (cardId: string) => void;
}

export const SavedCardsList: React.FC<SavedCardsListProps> = ({
  cards,
  selectedCardId,
  onSelectCard,
}) => {
  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <SavedCardItem
          key={card.id}
          card={card}
          isSelected={selectedCardId === card.id}
          onSelect={() => onSelectCard(card.id)}
        />
      ))}
    </div>
  );
};