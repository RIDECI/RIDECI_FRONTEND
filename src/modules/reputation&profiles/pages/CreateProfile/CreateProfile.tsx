import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateProfile } from "@/modules/reputation&profiles/hooks/CreateProfile/createProfileHook"; 
import { useGetProfile } from "@/modules/reputation&profiles/hooks/GetProfile/getProfileHook";
import ProfileInfo from "@/modules/reputation&profiles/components/FormProfile/ProfileInfo";
import SaveChangesButton from "@/modules/reputation&profiles/components/FormProfile/SaveChangesButton";

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
  const [formData, setFormData] = useState({
    name: "",
    identificationNumber: "",
    identificationType: "CC",
    phoneNumber: "",
    birthDate: "",
    email: "",
    address: "",
    semester: "",
    program: "",
  });

  const { getProfile, loading: loadingProfile, profile } = useGetProfile();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getProfile(userId);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile.name || prev.name,
        identificationNumber:
          profile.identificationNumber ||
          localStorage.getItem('identificationNumber') ||
          localStorage.getItem('institutionalId') ||
          prev.identificationNumber,
        identificationType: (profile.identificationType as string) || prev.identificationType,
        phoneNumber: profile.phoneNumber || localStorage.getItem('phoneNumber') || prev.phoneNumber,
        birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().slice(0, 10) : prev.birthDate,
        email: profile.email || localStorage.getItem('userEmail') || prev.email,
        address: profile.address || localStorage.getItem('address') || prev.address,
      }));

      if (profile.profilePictureUrl) setPhoto(profile.profilePictureUrl);
    }
  }, [profile]);

  const { createProfile, loading } = useCreateProfile();

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = async () => {
    const profileType = roleMap[roleReceived] || "PASSENGER";

    const profileData = {
      id: 0,
      name: formData.name,
      email: formData.email,
      vehicles: [],
      phoneNumber: formData.phoneNumber,
      ratings: [],
      badges: [],
      reputation: { wightedScores: new Map<number, number>(), average: 0, totalRatings: 0 },
      identificationType: formData.identificationType,
      identificationNumber: formData.identificationNumber,
      address: formData.address,
      profilePictureUrl: photo || "",
      birthDate: new Date(formData.birthDate),
    };

    const response = await createProfile(profileType, profileData as any);

    if (response.success) {
      // Guardar el tipo de perfil creado para que solo ese rol aparezca en pickRole
      try {
        if (typeof roleReceived === 'string' && roleReceived.length > 0) {
          localStorage.setItem('userProfileType', roleReceived);
        }
        localStorage.removeItem("selectedProfile");
      } catch {}
      // Navegar a la pantalla de selección de rol (mostrará solo el rol creado)
      navigate('/roleRegisterPick');
    }
  };

  
  return (
    <div className="min-h-screen flex items-start justify-center bg-transparent">
      <div className="p-12 max-w-5xl w-full mt-24 pb-24 bg-[#e8f1fd] rounded-2xl shadow-md border border-slate-200">
        <h1 className="text-4xl font-bold mb-10 text-slate-800">Completa tu Perfil</h1>

        <div className="space-y-12 w-full">
          <ProfileInfo
            role={roleReceived}
            photo={photo}
            onPhotoChange={handlePhotoChange}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <div className="pt-10 flex justify-end border-t border-slate-300 mt-10">
            <SaveChangesButton onConfirm={handleConfirm} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}