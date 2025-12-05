import { Star } from 'lucide-react';

interface CompanionCardProps {
  name: string;
  rating: string;
  image: string;
}

export function CompanionCard({ name, rating, image }: CompanionCardProps) {
  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-4">Tu Acompañante</h2>
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{rating} Estrellas</span>
          </div>
        </div>
      </div>
    </div>
  );
}