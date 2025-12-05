"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateProfile } from "../../hooks/CreateProfile/createProfileHook";
import type { Reputation } from "../../types/reputation";

import ProfileInfo from "./ProfileInfo";
import SaveChangesButton from "./SaveChangesButton";

export default function ProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedRole = (location.state as { selectedRole?: string } | null)?.selectedRole || "NOT_DEFINED";

  const roleMap: Record<string, "driver" | "companiant" | "passenger"> = {
    Conductor: "driver",
    Pasajero: "passenger",
    Acompañante: "companiant",
  };

  const [photo, setPhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    vehicles: [] as string[],
    phoneNumber: "",
    ratings: [] as string[],
    badges: [] as string[],
    profileType: "PASSENGER" as const,
    reputation: { wightedScores: {}, average: 0, totalRatings: 0 } as Reputation,
    identificationType: "CC" as const,
    identificationNumber: "",
    address: "",
    profilePictureUrl: "",
    birthDate: new Date(),
  });

  const { createProfile, loading } = useCreateProfile();

  const handleConfirm = async () => {
    const profileType = roleMap[selectedRole] || "PASSENGER";

    const profileData = {
      ...formData,
      profileType: profileType as "driver" | "companiant" | "passenger",
      profilePictureUrl: photo || formData.profilePictureUrl,
      birthDate: formData.birthDate instanceof Date ? formData.birthDate.toISOString() : formData.birthDate,
    };

    const response = await createProfile(profileType, profileData);

    if (response.success) navigate("/profile");
  };

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Crear Perfil — {selectedRole}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-10">
          <ProfileInfo
            photo={photo}
            onPhotoChange={(file) =>
              setPhoto(file ? URL.createObjectURL(file) : null)
            }
            formData={formData}
            onFormDataChange={setFormData}
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