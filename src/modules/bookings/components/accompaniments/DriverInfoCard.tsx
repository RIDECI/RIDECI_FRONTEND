import { Star } from 'lucide-react';

interface DriverInfoCardProps {
  name: string;
  rating: string;
  badge: string;
  image: string;
}

export function DriverInfoCard({ name, rating, badge, image }: DriverInfoCardProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h2 className="font-semibold text-gray-900">{name}</h2>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>{rating}</span>
          <span className="text-yellow-500">({badge})</span>
        </div>
      </div>
    </div>
  );
}