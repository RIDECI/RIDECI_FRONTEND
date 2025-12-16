"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/GetProfile/getProfileHook";
import { useUpdateProfile } from "../../hooks/UpdateProfile/updateProfileHook";
import type { Reputation } from "../../types/reputation";

import ProfileInfo from "./ProfileInfo";
import SaveChangesButton from "./SaveChangesButton";

export default function UpdateProfileForm() {
  const navigate = useNavigate();

  const { getProfile, profile, loading: loadingProfile } = useGetProfile();
  const { updateProfile, loading: updating, error } = useUpdateProfile();

  const [formData, setFormData] = useState<any>({
    id: 0,
    name: "",
    email: "",
    vehicles: [] as string[],
    phoneNumber: "",
    ratings: [] as string[],
    badges: [] as string[],
    profileType: profile?.profileType || 'NOT_DEFINED',
    reputation: { wightedScores: {}, average: 0, totalRatings: 0 } as Reputation,
    identificationType: "CC" as const,
    identificationNumber: "",
    address: "",
    profilePictureUrl: "",
    birthDate: "",
    semester: "",
    program: "",
  });

  const [photo, setPhoto] = useState<string | null>(null);

  // Load the current profile data on mount
  useEffect(() => {
    // Use a default ID or get from localStorage
    const profileId = localStorage.getItem('currentProfileId') || '1';
    getProfile(profileId);
  }, []);

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      console.log('Perfil cargado:', profile);

      // Convertir birthDate a formato YYYY-MM-DD para el input date
      let birthDateStr = "";
      if (profile.birthDate) {
        const date = new Date(profile.birthDate);
        birthDateStr = date.toISOString().split('T')[0];
      }

      const newFormData = {
        id: profile.id,
        name: profile.name || "",
        email: profile.email || "",
        vehicles: profile.vehicles || [],
        phoneNumber: profile.phoneNumber || "",
        ratings: profile.ratings || [],
        badges: profile.badges || [],
        profileType: profile.profileType,
        reputation: profile.reputation || { wightedScores: {}, average: 0, totalRatings: 0 } as Reputation,
        identificationType: profile.identificationType || "CC",
        identificationNumber: profile.identificationNumber || "",
        address: profile.address || "",
        profilePictureUrl: profile.profilePictureUrl || "",
        birthDate: birthDateStr,
        semester: "",
        program: "",
      };

      console.log('Formulario actualizado con:', newFormData);
      setFormData(newFormData);
      setPhoto(profile.profilePictureUrl || null);
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      // Convertir la imagen a base64 para poder guardarla
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhoto(base64String);
        // También guardar en localStorage para persistencia
        localStorage.setItem('profilePictureUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    const profileData = {
      ...formData,
      birthDate: formData.birthDate ? new Date(formData.birthDate) : new Date(),
      profilePictureUrl: photo || formData.profilePictureUrl,
    };

    const response = await updateProfile(formData.id.toString(), profileData);

    if (response.success) {
      // Guardar la imagen actualizada en localStorage
      if (photo) {
        localStorage.setItem('profilePictureUrl', photo);
      }
      navigate("/app/profile");
    }
  };

  // Convertir profileType a formato legible
  const getRoleName = (profileType: string) => {
    const roleMap: Record<string, string> = {
      'DRIVER': 'Conductor',
      'driver': 'Conductor',
      'PASSENGER': 'Pasajero',
      'passenger': 'Pasajero',
      'COMPANIANT': 'Acompañante',
      'companiant': 'Acompañante',
      'NOT_DEFINED': 'No asignado'
    };
    return roleMap[profileType] || profileType || 'No asignado';
  };

  if (loadingProfile) {
    return <div>Cargando perfil...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Actualizar Perfil
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-10">
          <ProfileInfo
            photo={photo}
            onPhotoChange={handlePhotoChange}
            role={getRoleName(formData.profileType)}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <div className="pt-4 flex justify-end">
            <SaveChangesButton
              onConfirm={handleConfirm}
              loading={updating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}