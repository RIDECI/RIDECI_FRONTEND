import React from 'react';
import { Input } from '@/components/ui/input';
import { HelpCircle } from 'lucide-react';

interface ExpiryAndCVVInputsProps {
  expiryValue: string;
  cvvValue: string;
  onExpiryChange: (value: string) => void;
  onCVVChange: (value: string) => void;
  expiryError?: string;
  cvvError?: string;
}

export const ExpiryAndCVVInputs: React.FC<ExpiryAndCVVInputsProps> = ({
  expiryValue,
  cvvValue,
  onExpiryChange,
  onCVVChange,
  expiryError,
  cvvError,
}) => {
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    if (value.length <= 5) {
      onExpiryChange(value);
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      onCVVChange(value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fecha de expiración
        </label>
        <Input
          type="text"
          placeholder="MM/YY"
          value={expiryValue}
          onChange={handleExpiryChange}
          className={expiryError ? 'border-red-500' : ''}
          maxLength={5}
        />
        {expiryError && <p className="text-red-500 text-sm mt-1">{expiryError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
          CVV
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </label>
        <Input
          type="password"
          placeholder="•••"
          value={cvvValue}
          onChange={handleCVVChange}
          className={cvvError ? 'border-red-500' : ''}
          maxLength={4}
        />
        {cvvError && <p className="text-red-500 text-sm mt-1">{cvvError}</p>}
      </div>
    </div>
  );
};


