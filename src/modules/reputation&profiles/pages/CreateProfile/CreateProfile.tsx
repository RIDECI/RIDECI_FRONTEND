import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateProfile } from "../../hooks/CreateProfile/createProfileHook"; 
import ProfileInfo from "@/modules/reputation&profiles/components/FormProfile/ProfileInfo";
import SaveChangesButton from "../../components/FormProfile/SaveChangesButton";

export default function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const roleReceived = location.state?.selectedRole || "Rol no asignado";

  const roleMap: Record<string, "driver" | "companiant" | "passenger"> = {
    Conductor: "driver",
    Pasajero: "passenger",
    Acompañante: "companiant",
  };

  const [photo, setPhoto] = useState<string | null>(null);

  const { createProfile, loading } = useCreateProfile();

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleConfirm = async () => {
    const profileType = roleMap[roleReceived] || "PASSENGER";

    const profileData = {
      id: 0,
      name: "",
      email: "",
      vehicles: [],
      phoneNumber: "",
      ratings: [],
      badges: [],
      reputation: { wightedScores: new Map<number, number>(), average: 0, totalRatings: 0 },
      identificationType: "",
      identificationNumber: "",
      address: "",
      profilePictureUrl: photo || "",
      birthDate: new Date(),
    };

    const response = await createProfile(profileType, profileData as any);

    if (response.success) navigate("/profile");
  };

  return (
    <div className="p-10 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-8">Completa tu Perfil</h1>
      
      <div className="space-y-10">
        <ProfileInfo 
          role={roleReceived} 
          photo={photo}
          onPhotoChange={handlePhotoChange}
        />

        <div className="pt-8 flex justify-end border-t border-slate-100 mt-8">
          <SaveChangesButton
            onConfirm={handleConfirm} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
}