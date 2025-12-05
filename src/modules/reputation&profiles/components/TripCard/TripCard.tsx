import { Calendar, MapPin, Clock, BadgeCheck } from "lucide-react";

export default function TripCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-xs border border-slate-100">
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-slate-800 text-sm">
          17 de Noviembre 2025
        </h3>

        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
          Pasajero
        </span>
      </div>

      <div className="space-y-1 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          Universidad → Portal 80
        </p>

        <p className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          20:30
        </p>

        <p className="flex items-center gap-2 font-semibold text-slate-800">
          6,000 COP
        </p>
      </div>

      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg shadow-sm">
        Ver detalles
      </button>
    </div>
  );
}
