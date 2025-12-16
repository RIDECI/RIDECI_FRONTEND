import React, { useState } from 'react';
import type { BrebKeyType } from '../types/breb.types';

export interface AddBrebKeyFormProps {
  onSave: (type: BrebKeyType, value: string) => void;
  onCancel: () => void;
}

export const AddBrebKeyForm: React.FC<AddBrebKeyFormProps> = ({ onSave, onCancel }) => {
  const [keyType, setKeyType] = useState<BrebKeyType>('email');
  const [keyValue, setKeyValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyValue.trim()) {
      setError('Por favor ingresa un valor para la llave');
      return;
    }

    // Validación básica según el tipo
    if (keyType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(keyValue)) {
        setError('Por favor ingresa un correo electrónico válido');
        return;
      }
    } else if (keyType === 'phone') {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(keyValue)) {
        setError('Por favor ingresa un número de teléfono válido (10 dígitos)');
        return;
      }
    } else if (keyType === 'document') {
      if (keyValue.length < 5) {
        setError('Por favor ingresa un documento válido');
        return;
      }
    }

    setError('');
    onSave(keyType, keyValue);
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Añadir nueva llave Bre-b
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Tipo de llave */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de llave
            </label>
            <select
              value={keyType}
              onChange={(e) => setKeyType(e.target.value as BrebKeyType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="email">Correo electrónico</option>
              <option value="document">Documento de identidad</option>
              <option value="phone">Teléfono celular</option>
            </select>
          </div>

          {/* Valor de la llave */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor de la llave
            </label>
            <input
              type="text"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              placeholder={
                keyType === 'email' ? 'ejemplo@correo.com' :
                keyType === 'phone' ? '3001234567' :
                '123456789'
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar llave
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};