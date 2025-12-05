import React from 'react';
import { User, Star } from 'lucide-react';

interface DriverInfoCardProps {
  driver: {
    name: string;
    rating: string;
    totalTrips: number;
    avatar?: string;
  };
}

export const DriverInfoCard: React.FC<DriverInfoCardProps> = ({ driver }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {driver.avatar ? (
          <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-10 h-10 text-gray-600" />
        )}
      </div>

      {/* Info */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{driver.name}</h2>
        <div className="flex items-center gap-1 text-gray-600">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{driver.rating} Estrellas</span>
          <span className="text-gray-500">({driver.totalTrips} viajes)</span>
        </div>
      </div>
    </div>
  );
};