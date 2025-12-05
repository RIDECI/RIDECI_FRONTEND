import { CheckCircle } from 'lucide-react';

export function ConfirmedHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">¡Acompañamiento Confirmado!</h1>
      <p className="text-gray-600">¡Tu acompañamiento está confirmado!</p>
    </div>
  );
}