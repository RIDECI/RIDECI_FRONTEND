import React from 'react';
import { Car } from 'lucide-react';

interface VehicleInfoSectionProps {
  vehicle: {
    brand: string;
    model: string;
    color: string;
    plate: string;
  };
}

export const VehicleInfoSection: React.FC<VehicleInfoSectionProps> = ({ vehicle }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-gray-700" />
        <h3 className="text-xl font-bold text-gray-900">Vehículo</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm mb-1">Marca y Modelo</p>
          <p className="text-gray-900 font-semibold">{vehicle.brand} {vehicle.model}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">Color</p>
          <p className="text-gray-900 font-semibold">{vehicle.color}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600 text-sm mb-1">Matrícula</p>
          <p className="text-gray-900 font-semibold">{vehicle.plate}</p>
        </div>
      </div>
    </div>
  );
};