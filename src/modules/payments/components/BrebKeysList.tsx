import React from 'react';
import { BrebKeyItem } from './BrebKeyItem';
import type { BrebKey } from '../types/breb.types';

interface BrebKeysListProps {
  keys: BrebKey[];
  selectedKeyId: string | null;
  onSelectKey: (keyId: string) => void;
}

export const BrebKeysList: React.FC<BrebKeysListProps> = ({
  keys,
  selectedKeyId,
  onSelectKey,
}) => {
  return (
    <div className="space-y-3">
      {keys.map((key) => (
        <BrebKeyItem
          key={key.id}
          brebKey={key}
          isSelected={selectedKeyId === key.id}
          onSelect={() => onSelectKey(key.id)}
        />
      ))}
    </div>
  );
};