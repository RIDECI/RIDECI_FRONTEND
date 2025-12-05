import React from 'react';
import { User, Star } from 'lucide-react';

interface DriverCardProps {
  driver: {
    name: string;
    rating: string;
    avatar?: string;
  };
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Tu Conductor</h2>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {driver.avatar ? (
            <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-gray-600" />
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-lg font-semibold text-gray-900">{driver.name}</p>
          <div className="flex items-center gap-1 text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{driver.rating} Estrellas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
