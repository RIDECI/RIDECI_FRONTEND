import { Star } from "lucide-react";

const ratings = [
  { stars: 5, percent: 70 },
  { stars: 4, percent: 20 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 2 },
];

export default function RatingSummary() {
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
      <h3 className="text-xl font-semibold mb-3">Calificaciones</h3>

      <div className="flex items-center gap-3 mb-4">
        <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
        {/* Llega del back */}
        <span className="text-4xl font-bold">4.8</span>
        <span className="text-gray-500 text-xl">/ 5.0</span>
      </div>

      {ratings.map((r) => (
        <div key={r.stars} className="flex items-center gap-3 mb-2">
          <span className="w-4">{r.stars}</span>
          <div className="w-full bg-gray-200 rounded-full h-3">
            {/* Llega del back */}
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${r.percent}%` }} />
          </div>
          <span className="w-10 text-gray-600">{r.percent}%</span>
        </div>
      ))}
    </div>
  );
}