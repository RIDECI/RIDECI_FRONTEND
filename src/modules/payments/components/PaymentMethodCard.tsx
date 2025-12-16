import React from 'react';
import type { PaymentMethodOption } from '../types/payments.types';

interface PaymentMethodCardProps {
  method: PaymentMethodOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      disabled={!method.enabled}
      className={`w-full text-left transition-all duration-200 rounded-xl border-2 p-4 hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50/50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${!method.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
          isSelected ? method.colorClass + ' text-white' : 'bg-gray-100 text-gray-700'
        } text-xl font-bold transition-colors duration-200`}>
          {method.iconContent}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{method.name}</h3>
          <p className="text-sm text-gray-500">{method.description}</p>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};