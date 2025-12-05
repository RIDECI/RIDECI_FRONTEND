"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProfile } from "../../hooks/GetProfile/getProfileHook";
import { useUpdateProfile } from "../../hooks/UpdateProfile/updateProfileHook";
import type { Profile, UpdateProfileRequest } from "../../hooks/UpdateProfile/updateProfileHook";
import type { Reputation } from "../../types/reputation";

import ProfileInfo from "./ProfileInfo";
import SaveChangesButton from "./SaveChangesButton";

export default function UpdateProfileForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Profile ID from URL

  const { getProfile, profile, loading: loadingProfile } = useGetProfile();
  const { updateProfile, loading: updating, error } = useUpdateProfile();

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    id: 0,
    name: "",
    email: "",
    vehicles: [] as string[],
    phoneNumber: "",
    ratings: [] as string[],
    badges: [] as string[],
    profileType: "NOT_DEFINED" as const,
    reputation: { wightedScores: {}, average: 0, totalRatings: 0 } as Reputation,
    identificationType: "CC" as const,
    identificationNumber: "",
    address: "",
    profilePictureUrl: "",
    birthDate: new Date(),
  });

  const [photo, setPhoto] = useState<string | null>(null);

  // Load the current profile data
  useEffect(() => {
    if (id) {
      getProfile(id);
    }
  }, [id]);

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id,
        name: profile.name || "",
        email: profile.email || "",
        vehicles: profile.vehicles || [],
        phoneNumber: profile.phoneNumber || "",
        ratings: profile.ratings || [],
        badges: profile.badges || [],
        profileType: profile.profileType || "NOT_DEFINED",
        reputation: profile.reputation || { wightedScores: {}, average: 0, totalRatings: 0 } as Reputation,
        identificationType: profile.identificationType || "CC",
        identificationNumber: profile.identificationNumber || "",
        address: profile.address || "",
        profilePictureUrl: profile.profilePictureUrl || "",
        birthDate: profile.birthDate || new Date(),
      });
      setPhoto(profile.profilePictureUrl || null);
    }
  }, [profile]);

  const handleConfirm = async () => {
    const profileData = {
      ...formData,
      birthDate: formData.birthDate instanceof Date ? formData.birthDate.toISOString() : formData.birthDate,
      profilePictureUrl: photo || formData.profilePictureUrl,
    };

    const response = await updateProfile(formData.id.toString(), profileData);

    if (response.success) {
      navigate("/profile");
      navigate("/app/profile");
    }
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
            onPhotoChange={(file) =>
              setPhoto(file ? URL.createObjectURL(file) : null)
            }
            formData={formData}
            onFormDataChange={setFormData}
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