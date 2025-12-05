import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { SelectImagesPropsSchema } from "../../../../lib/schema";
import { cn } from "../../../../lib/utils";

import acompanante from "../../../../assets/acompanante.jpg";
import pasajero from "../../../../assets/imgPasajero.jpg";
import conductor from "../../../../assets/imgConductor.jpg";

type Profile = {
  name: string;
  avatarUrl: string;
};

const profiles: Profile[] = [
  { name: "Conductor", avatarUrl: conductor },
  { name: "Pasajero", avatarUrl: pasajero },
  { name: "Acompañante", avatarUrl: acompanante },
];

export default function FormSelectProfile() {
  const [selected, setSelected] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = () => {
    const result = SelectImagesPropsSchema.safeParse({
      profileName: selected?.name,
      avatarUrl: selected?.avatarUrl,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    navigate("/createProfile", {
    navigate("/app/createProfile", {
    state: {
    selectedRole: selected?.name,
  },
  });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-4xl mb-10 font-bold">Selecciona un Rol</h1>

      <RadioGroup className="flex gap-16">
        {profiles.map((p) => (
          <label key={p.name} htmlFor={p.name} className="cursor-pointer">
            <RadioGroupItem
              id={p.name}
              value={p.name}
              onClick={() => {
                setSelected(p);
                setError("");
              }}
              className="hidden"
            />

            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-40 h-40 rounded-xl overflow-hidden transition-all border-4",
                  "flex items-center justify-center",

                  selected?.name === p.name
                    ? "border-teal-400 shadow-[0_0_25px_5px_rgba(0,255,255,0.5)] scale-110"
                    : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                )}
              >
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  className="w-full h-full object-cover filter saturate-150 hue-rotate-0"
                />
              </div>

              <p className="mt-3 text-xl font-semibold">{p.name}</p>
            </div>
          </label>
        ))}
      </RadioGroup>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        onClick={handleSubmit}
        className="mt-10 bg-teal-500 px-8 py-3 rounded-xl text-xl font-semibold 
             hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30"
      >
        Continuar
      </button>
    </div>
  );
}
