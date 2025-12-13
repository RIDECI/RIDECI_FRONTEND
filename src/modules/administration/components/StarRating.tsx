// src/modules/administration/components/StarRating.tsx

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 20 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-400 text-yellow-400 opacity-50"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
};