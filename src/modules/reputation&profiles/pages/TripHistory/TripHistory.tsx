"use client";

import TripCard from "@/modules/reputation&profiles/components/TripCard/TripCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TripHistory() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen bg-[#e8f1fd] overflow-hidden">

      <main className="flex-1 p-10 overflow-y-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft
            className="w-6 h-6 text-slate-700 cursor-pointer hover:text-slate-900 transition"
            onClick={() => navigate("/app/profile")}
          />
          <h1 className="text-3xl font-bold text-slate-900">Historial de Viajes</h1>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {Array.from({ length: 9 }).map((_, index) => (
              <TripCard key={index} />
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}
