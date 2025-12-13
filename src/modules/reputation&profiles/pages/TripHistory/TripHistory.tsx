"use client";

import TripCard from "@/modules/reputation&profiles/components/TripCard/TripCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TripHistory() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen bg-[#e8f1fd] overflow-hidden text-lg">

      <main className="flex-1 p-12 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <ArrowLeft
            className="w-7 h-7 text-slate-700 cursor-pointer hover:text-slate-900 transition"
            onClick={() => navigate("/app/profile")}
          />
          <h1 className="text-4xl font-bold text-slate-900">
            Historial de Viajes
          </h1>
        </div>

        {/* Card Grandota */}
        <div className="bg-white shadow-2xl rounded-3xl p-14 max-w-6xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {Array.from({ length: 9 }).map((_, index) => (
              <TripCard key={index} />
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}
