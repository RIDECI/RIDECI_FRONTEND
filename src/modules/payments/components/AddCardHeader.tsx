import React from 'react';

export const AddCardHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Añadir nueva tarjeta
      </h1>
      <p className="text-gray-600">
        Llena los datos para añadir una nueva tarjeta
      </p>
    </div>
  );
};