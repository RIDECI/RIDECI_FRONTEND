import { useState } from "react";
import { Star, ThumbsUp, Clock, MessageCircle } from "lucide-react";

export default function Badges() {
  const badges = [
    { icon: <Star />, label: "Buen Conductor" },
    { icon: <Clock />, label: "Muy Puntual" },
    { icon: <MessageCircle />, label: "Muy Amable" },
    { icon: <ThumbsUp />, label: "Excelentes Calificaciones" },
    { icon: <Star />, label: "Responsable" },
    { icon: <Clock />, label: "Entrega Rápida" },
    { icon: <ThumbsUp />, label: "Recomendado" },
  ];

  const [showAll, setShowAll] = useState(false);

  const displayedBadges = showAll ? badges : badges.slice(0, 3);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Insignias</h3>

      <div className="grid grid-cols-3 gap-4">
        {displayedBadges.map((b, i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 border rounded-xl flex flex-col items-center justify-center shadow-sm"
          >
            <div className="text-blue-600">{b.icon}</div>
            <p className="text-sm mt-1 text-center">{b.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showAll ? "Ocultar insignias" : "Mostrar todas las insignias"}
        </button>
      </div>
    </div>
  );
}