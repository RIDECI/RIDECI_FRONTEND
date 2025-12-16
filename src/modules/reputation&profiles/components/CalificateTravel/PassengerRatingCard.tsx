import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PassengerRatingCardProps {
  name: string;
  id: string;
  avatarUrl?: string;
  onRate?: (rating: number) => void;
}

export default function PassengerRatingCard({
  name,
  id,
  avatarUrl,
  onRate
}: PassengerRatingCardProps) {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRating = (value: number) => {
    setRating(value);
    onRate?.(value);
  };

  const handleReport = () => {
    navigate("/app/security/reports/new", {
  state: {
    passengerId: id,
    passengerName: name
  }
});
  };

  return (
    <Card className="w-full max-w-sm bg-[#E9F2FF] rounded-xl shadow-md">
      <CardContent className="p-5">

        {/* INFO DEL PASAJERO */}
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-700">{name}</p>
            <span className="text-sm text-gray-500">{id}</span>
          </div>
        </div>

        {/* TEXTO */}
        <p className="mt-4 text-gray-600 text-sm">Califica tu experiencia</p>

        {/* ESTRELLAS */}
        <div className="flex gap-2 mt-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={24}
              className={`cursor-pointer transition ${
                value <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => handleRating(value)}
            />
          ))}
        </div>

        {/* BOTÓN REPORTAR */}
        <Button
          variant="destructive"
          className="w-full mt-5 bg-red-300 text-red-800 hover:bg-red-400"
          onClick={handleReport}
        >
          Reportar usuario
        </Button>

      </CardContent>
    </Card>
  );
}
