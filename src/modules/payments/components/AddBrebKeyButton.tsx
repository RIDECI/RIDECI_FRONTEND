import React from 'react';
import { Plus } from 'lucide-react';

interface AddBrebKeyButtonProps {
  onClick: () => void;
  isFormVisible?: boolean;
}

export const AddBrebKeyButton: React.FC<AddBrebKeyButtonProps> = ({ 
  onClick, 
  isFormVisible = false 
}) => {
  if (isFormVisible) return null;

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-200 rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 hover:border-blue-500 hover:bg-blue-50/30 hover:shadow-md mt-6"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
          <Plus className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Añadir llave Bre-b</h3>
          <p className="text-sm text-gray-500">Añadir nueva llave para pagos</p>
        </div>
      </div>
    </button>
  );
};