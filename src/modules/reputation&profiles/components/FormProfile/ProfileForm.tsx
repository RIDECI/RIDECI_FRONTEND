"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateProfile } from "@/modules/reputation&profiles/hooks/CreateProfile/createProfileHook";

import ProfileInfo from "./ProfileInfo";
import SaveChangesButton from "./SaveChangesButton";

export default function ProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Permitir que el usuario seleccione el rol
  const [selectedRole, setSelectedRole] = useState<string>(
    (location.state as { selectedRole?: string } | null)?.selectedRole || "Pasajero"
  );

  const roleMap: Record<string, "driver" | "companiant" | "passenger"> = {
    Conductor: "driver",
    Pasajero: "passenger",
    Acompañante: "companiant",
  };

  const [photo, setPhoto] = useState<string | null>(null);

  // ESTADO: Almacena lo que el usuario escribe
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

  const { createProfile, loading } = useCreateProfile();

  // Prellenar formulario con datos del usuario autenticado y del perfil si existe
  useEffect(() => {
    const currentProfile = localStorage.getItem('currentProfile');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');

    if (currentProfile) {
      try {
        const profile = JSON.parse(currentProfile);
        setFormData({
          name: profile.name || userName || '',
          identificationNumber: profile.identificationNumber || userId || '',
          identificationType: profile.identificationType || 'CC',
          phoneNumber: profile.phoneNumber || '',
          birthDate: profile.birthDate ? profile.birthDate.split('T')[0] : '',
          email: profile.email || userEmail || '',
          address: profile.address || '',
          semester: profile.semester || '',
          program: profile.program || '',
        });
        if (profile.profilePictureUrl) {
          setPhoto(profile.profilePictureUrl);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    } else {
      // Prellenar solo con datos básicos del usuario autenticado
      setFormData(prev => ({
        ...prev,
        name: userName || '',
        email: userEmail || '',
        identificationNumber: userId || '',
      }));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = async () => {
    const profileType = roleMap[selectedRole] || "PASSENGER";

    const profileData = {
      userId: null,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      
      identificationType: formData.identificationType,
      identificationNumber: formData.identificationNumber,
      
      birthDate: formData.birthDate ? `${formData.birthDate}T00:00:00` : new Date().toISOString(),
      
      profileType: profileType.toUpperCase(), 

      profilePictureUrl: photo || "https://via.placeholder.com/150",
      vehicles: [],
      ratings: [],
      badges: [],
      
      calification: { 
        average: 0, 
        totalRatings: 0,
        wightedScores: {} 
      },
    };

    console.log("Enviando JSON:", profileData);

    const response = await createProfile(profileType, profileData as any);

    if (response.success) {
      // Guardar el rol seleccionado en localStorage
      localStorage.setItem('userProfileType', selectedRole);
      localStorage.setItem('userProfileRole', profileType);
      
      // Ir al perfil actualizado
      navigate("/app/profile");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Crear Perfil
        </h1>
        <p className="text-gray-600 mt-2">Completa tu información y selecciona tu rol inicial</p>
      </div>

      {/* Selector de Rol */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Selecciona tu rol inicial
        </label>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(roleMap).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === role
                  ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${selectedRole === role ? 'text-blue-600' : 'text-gray-600'}`}>
                  {role === 'Conductor' && '🚗'}
                  {role === 'Pasajero' && '👤'}
                  {role === 'Acompañante' && '👥'}
                </div>
                <div className={`font-semibold ${selectedRole === role ? 'text-blue-600' : 'text-gray-700'}`}>
                  {role}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-10">
          <ProfileInfo
              photo={photo}
              onPhotoChange={(file) => setPhoto(file ? URL.createObjectURL(file) : null)}
              role={selectedRole}
              formData={formData}            
              onInputChange={handleInputChange}
            />

          <div className="pt-4 flex justify-end">
            <SaveChangesButton
              onConfirm={handleConfirm}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}