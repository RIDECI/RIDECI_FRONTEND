import { Star } from "lucide-react";
import type { Profile } from "@/modules/reputation&profiles/hooks/GetProfile/getProfileHook";

interface RatingSummaryProps {
  readonly profile: Profile | null;
}

export default function RatingSummary({ profile }: RatingSummaryProps) {
  // Obtener el promedio de calificación del perfil o usar 0 por defecto
  const averageRating = profile?.reputation?.average || 0;
  const totalRatings = profile?.reputation?.totalRatings || 0;
  
  // Calcular porcentajes de distribución de calificaciones
  // Si no hay datos del perfil, mostrar valores por defecto
  const calculateRatingDistribution = () => {
    if (!profile?.reputation?.wightedScores || totalRatings === 0) {
      return [
        { stars: 5, percent: 0 },
        { stars: 4, percent: 0 },
        { stars: 3, percent: 0 },
        { stars: 2, percent: 0 },
        { stars: 1, percent: 0 },
      ];
    }

    const scores = profile.reputation.wightedScores;
    return [
      { stars: 5, percent: Math.round(((scores.get?.(5) || 0) / totalRatings) * 100) },
      { stars: 4, percent: Math.round(((scores.get?.(4) || 0) / totalRatings) * 100) },
      { stars: 3, percent: Math.round(((scores.get?.(3) || 0) / totalRatings) * 100) },
      { stars: 2, percent: Math.round(((scores.get?.(2) || 0) / totalRatings) * 100) },
      { stars: 1, percent: Math.round(((scores.get?.(1) || 0) / totalRatings) * 100) },
    ];
  };

  const ratings = calculateRatingDistribution();
  const ratingSuffix = totalRatings === 1 ? '' : 'es';
  const ratingText = totalRatings === 0 
    ? 'Sin calificaciones aún' 
    : `Basado en ${totalRatings} calificación${ratingSuffix}`;

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
      <h3 className="text-xl font-semibold mb-3">Calificaciones</h3>

      <div className="flex items-center gap-3 mb-4">
        <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
        <span className="text-gray-500 text-xl">/ 5.0</span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {ratingText}
      </p>

      {ratings.map((r) => (
        <div key={r.stars} className="flex items-center gap-3 mb-2">
          <span className="w-4">{r.stars}</span>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${r.percent}%` }} />
          </div>
          <span className="w-10 text-gray-600">{r.percent}%</span>
        </div>
      ))}
    </div>
  );
}