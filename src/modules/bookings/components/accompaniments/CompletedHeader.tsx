import { CheckCircle } from 'lucide-react';

export function CompletedHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-6 h-6 text-green-500" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Acompañamiento completado</h1>
        <p className="text-gray-600">Tu acompañamiento ha finalizado con éxito.</p>
      </div>
    </div>
  );
}