// src/modules/statistics and sustainability/components/Dropdown.tsx

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DropdownProps } from '../types';

export const Dropdown: React.FC<DropdownProps> = ({ 
  label, 
  placeholder, 
  options, 
  value, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer hover:border-blue-500 transition duration-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-150"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};