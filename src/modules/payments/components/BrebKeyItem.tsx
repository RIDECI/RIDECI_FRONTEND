import React from 'react';
import type { BrebKey } from '../types/breb.types';

interface BrebKeyItemProps {
  brebKey: BrebKey;
  isSelected: boolean;
  onSelect: () => void;
}

export const BrebKeyItem: React.FC<BrebKeyItemProps> = ({
  brebKey,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left transition-all duration-200 rounded-xl border-2 p-4 hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50/50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold ${
          isSelected ? 'bg-cyan-500 text-white' : 'bg-cyan-100 text-cyan-600'
        } transition-colors duration-200`}>
          {brebKey.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {brebKey.value}
          </h3>
          <p className="text-sm text-gray-500">{brebKey.label}</p>
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