import React from 'react';
import { Input } from '@/components/ui/input';

interface CardHolderInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CardHolderInput: React.FC<CardHolderInputProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Titular de la tarjeta
      </label>
      <Input
        type="text"
        placeholder="David Palacios"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'border-red-500' : ''}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
