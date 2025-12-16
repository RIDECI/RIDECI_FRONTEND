import { useNavigate } from "react-router-dom";
import type { Profile } from "@/modules/reputation&profiles/hooks/GetProfile/getProfileHook";
import bob from '../../../../assets/bob.jpeg';

interface CommentListProps {
  readonly profile: Profile | null;
}

export default function CommentList({ profile }: CommentListProps) {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/app/comments");
  };

  // Obtener comentarios/ratings del perfil
  // Los ratings del perfil son IDs, necesitaríamos otro endpoint para obtener detalles
  // Por ahora, mostrar un mensaje si no hay comentarios
  const hasRatings = profile?.ratings && profile.ratings.length > 0;

  return (
    <div className="text-lg">
      <h3 className="text-2xl font-semibold mb-5">Comentarios</h3>

      <div className="space-y-8 bg-white border shadow-xl rounded-3xl p-8">
        {hasRatings ? (
          <>
            {/* Aquí se podrían cargar los detalles de los comentarios desde el backend */}
            {profile.ratings.slice(0, 2).map((ratingId) => (
              <div key={ratingId} className="flex gap-5 items-start">
                <img
                  src={bob}
                  className="w-14 h-14 rounded-full object-cover shadow-md"
                  alt="Usuario"
                />
                <div>
                  <div className="font-semibold text-slate-900 text-lg">Usuario</div>
                  <div className="text-sm text-gray-500">Rating ID: {ratingId}</div>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    Comentario del viaje
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={handleSeeAll}
              className="
                w-full mt-2 bg-blue-600 hover:bg-blue-700 
                text-white py-3 rounded-xl text-base font-semibold 
                transition shadow-md
              "
            >
              Ver todos los comentarios ({profile.ratings.length})
            </button>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">Aún no hay comentarios en este perfil.</p>
            <p className="text-sm mt-2">Los comentarios aparecerán aquí después de completar viajes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
