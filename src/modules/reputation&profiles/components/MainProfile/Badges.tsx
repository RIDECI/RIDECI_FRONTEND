import { useState } from "react";
import { Star, ThumbsUp, Clock, MessageCircle, Award, Shield, Trophy } from "lucide-react";
import type { Profile } from "@/modules/reputation&profiles/hooks/GetProfile/getProfileHook";

interface BadgesProps {
  readonly profile: Profile | null;
}

function getIconForBadge(index: number): React.ReactNode {
  const iconIndex = index % 7;

  switch (iconIndex) {
    case 0: return <Star />;
    case 1: return <Clock />;
    case 2: return <MessageCircle />;
    case 3: return <ThumbsUp />;
    case 4: return <Award />;
    case 5: return <Shield />;
    case 6: return <Trophy />;
    default: return <Star />;
  }
}

export default function Badges({ profile }: BadgesProps) {
  // Obtener badges reales del perfil
  const profileBadges = profile?.badges || [];

  // Si no hay badges, mostrar mensaje
  const hasBadges = profileBadges.length > 0;

  // Crear estructura de badges con iconos
  // Los badges del backend son strings (IDs), necesitaríamos más info para mostrarlos correctamente
  const badgesWithIcons = profileBadges.map((badgeId, index) => ({
    icon: getIconForBadge(index),
    label: `Insignia ${badgeId}`,
    id: badgeId
  }));

  const [showAll, setShowAll] = useState(false);
  const displayedBadges = showAll ? badgesWithIcons : badgesWithIcons.slice(0, 3);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Insignias</h3>

      {hasBadges ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            {displayedBadges.map((b) => (
              <div
                key={b.id}
                className="h-24 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600">{b.icon}</div>
                <p className="text-sm mt-1 text-center text-gray-700">{b.label}</p>
              </div>
            ))}
          </div>

          {badgesWithIcons.length > 3 && (
            <div className="mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showAll ? "Ocultar insignias" : `Mostrar todas las insignias (${badgesWithIcons.length})`}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-xl border">
          <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Aún no has obtenido insignias.</p>
          <p className="text-sm text-gray-400 mt-1">Completa viajes y recibe buenas calificaciones para desbloquearlas.</p>
        </div>
      )}
    </div>
  );
}