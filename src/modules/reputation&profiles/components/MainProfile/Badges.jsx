import { Star, ThumbsUp, Clock, MessageCircle } from "lucide-react";

export default function Badges() {
  const badges = [
    { icon: <Star />, label: "Excelente" },
    { icon: <MessageCircle />, label: "Buen trato" },
    { icon: <Clock />, label: "Puntual" },
    { icon: <ThumbsUp />, label: "Recomendado" },
  ];

  return (
    <div>
      {/* Llega del back */}
      <h3 className="text-xl font-semibold mb-3">Insignias</h3>

      <div className="flex gap-6">
        {badges.map((b, i) => (
          <div
            key={i}
            className="w-25 h-20 bg-gray-100 border rounded-xl flex flex-col items-center justify-center shadow-sm"
          >
            <div className="text-blue-600">{b.icon}</div>
            <p className="text-sm mt-1">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
