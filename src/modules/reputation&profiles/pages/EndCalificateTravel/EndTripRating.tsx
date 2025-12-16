import momo from '../../../../assets/momo.jpeg';
import ok from '../../../../assets/ok.jpeg';

import PassengerRatingCard from "@/modules/reputation&profiles/components/CalificateTravel/PassengerRatingCard";
import { Button } from "@/components/ui/button";

const passengers = [
  {
    name: "Pasajero #1",
    id: "idUser:1234",
    avatar: momo
  },
  {
    name: "Pasajero #2",
    id: "idUser:1236",
    avatar: ok
  },
  {
    name: "Pasajero #3",
    id: "idUser:1238",
    avatar: momo
  },
  {
    name: "Pasajero #4",
    id: "idUser:1240",
    avatar: ok
  }
];

export default function EndTripRating() {
  const handleFinish = () => {
    console.log("Calificaciones enviadas");
  };

  return (
    <div className="w-full h-full flex justify-center">
      {/* Contenedor central */}
      <div className="w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          El viaje ha finalizado
        </h1>

        <p className="text-gray-600 mt-2 text-center">
          ¡Califica a tus acompañantes y ayúdanos a mejorar cada viaje!
        </p>

        {/* GRID CENTRADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 place-items-center">
          {passengers.map((p) => (
            <PassengerRatingCard
              key={p.id}
              name={p.name}
              id={p.id}
              avatarUrl={p.avatar}
              onRate={(r) => console.log(`Rating de ${p.name}:`, r)}

            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 px-10 py-4 text-white text-lg" onClick={handleFinish}>
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}
