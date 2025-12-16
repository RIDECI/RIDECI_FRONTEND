import React from 'react';
import { Button } from '@/components/ui/button';

interface AddCardActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isLoading?: boolean;
}

export const AddCardActions: React.FC<AddCardActionsProps> = ({
  onCancel,
  onSave,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={onCancel}
        variant="outline"
        className="h-14 text-lg font-semibold rounded-xl"
        disabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        onClick={onSave}
        disabled={isLoading}
        className="h-14 text-lg font-semibold bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-xl"
      >
        {isLoading ? 'Guardando...' : 'Guardar tarjeta'}
      </Button>
    </div>
  );
};
