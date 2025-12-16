import React from 'react';

export const SavedCardsHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Tarjetas guardadas
      </h1>
      <p className="text-gray-600">
        Selecciona una tarjeta para pagar o agrega una nueva
      </p>
    </div>
  );
};