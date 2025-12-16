import { Navigation } from 'lucide-react';
import type { Trip } from '../../types/Trip';

interface AccompanimentCardProps {
  accompaniment: Trip;
}

const statusColors = {
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  red: 'text-red-500',
};

export function AccompanimentCard({ accompaniment }: AccompanimentCardProps) {
  return (
    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
      {/* Left - Route info */}
      <div className="flex items-start gap-3 flex-1">
        <Navigation className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-gray-900 text-sm font-medium">{accompaniment.route}</p>
          <p className="text-gray-500 text-sm">{accompaniment.date}, {accompaniment.time}</p>
        </div>
      </div>

      {/* Right - Driver and status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img 
            src={accompaniment.driverImage} 
            alt={accompaniment.driverName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-gray-900 text-sm">{accompaniment.driverName}</span>
        </div>
        <span className={`text-sm font-medium ${statusColors[accompaniment.statusColor]}`}>
          {accompaniment.status}
        </span>
      </div>
    </div>
  );
}