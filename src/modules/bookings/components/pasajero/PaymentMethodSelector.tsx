import React, { useState } from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

interface PaymentMethodSelectorProps {
  onMethodSelect: (methodId: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'nequi', name: 'Nequi', icon: '°N' },
  { id: 'card', name: 'Tarjeta', icon: '💳' },
  { id: 'cash', name: 'Efectivo', icon: '💵' },
  { id: 'bre-b', name: 'Bre-B', icon: 'Bre-B' },
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ onMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('nequi');

  const handleSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    onMethodSelect(methodId);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Método de pago</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{method.icon}</div>
              <div className={`text-sm font-medium ${
                selectedMethod === method.id ? 'text-blue-700' : 'text-gray-700'
              }`}>
                {method.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-gray-500 text-xs mt-3">
        Puedes cancelar hasta 30 minutos antes sin sanción.
      </p>
    </div>
  );
};
