import React from 'react';
import { Lock } from 'lucide-react';

export const SecurityNote: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
      <Lock className="w-4 h-4" />
      <span>Su información de pago se almacena de forma segura</span>
    </div>
  );
};