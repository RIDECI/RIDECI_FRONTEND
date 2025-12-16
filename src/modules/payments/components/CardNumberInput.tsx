import React from 'react';
import { Input } from '@/components/ui/input';

interface CardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CardNumberInput: React.FC<CardNumberInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\s/g, '');
    if (cleaned.length <= 16 && /^\d*$/.test(cleaned)) {
      onChange(formatCardNumber(cleaned));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Número de Tarjeta
      </label>
      <Input
        type="text"
        placeholder="1234 5678 9101 1121"
        value={value}
        onChange={handleChange}
        className={error ? 'border-red-500' : ''}
        maxLength={19}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
