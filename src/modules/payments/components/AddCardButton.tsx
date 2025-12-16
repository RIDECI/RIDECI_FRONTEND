import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AddCardButtonProps {
  onAddCard?: () => void;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({ onAddCard }) => {
  const navigate = useNavigate();

  const handleAddCard = () => {
    if (onAddCard) {
      onAddCard();
    }
    
    navigate('/payment/cards/add');
  };

  return (
    <button
      onClick={handleAddCard}
      className="w-full text-left transition-all duration-200 rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 hover:border-blue-500 hover:bg-blue-50/30 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
          <Plus className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Añadir tarjeta</h3>
          <p className="text-sm text-gray-500">Añadir nueva tarjeta de debito o credito</p>
        </div>
      </div>
    </button>
  );
};