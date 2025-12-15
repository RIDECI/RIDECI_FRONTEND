import { Bus } from 'lucide-react';

interface TransportMethodCardProps {
  method: string;
}

export function TransportMethodCard({ method }: TransportMethodCardProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Bus className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">Medio de Transporte</span>
      </div>
      <div className="flex items-center gap-2 ml-7">
        <Bus className="w-4 h-4 text-gray-500" />
        <span className="text-gray-700">{method}</span>
      </div>
    </div>
  );
}