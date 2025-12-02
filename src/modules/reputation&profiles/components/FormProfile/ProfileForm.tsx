"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfilePhoto from "./ProfilePhoto";
import ProfileInfo from "./ProfileInfo";
import AcademicInfo from "./AcademicInfo";
import SaveChangesButton from "./SaveChangesButton";

export default function ProfileForm() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);

  const handleConfirm = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">Mi Perfil</h1>
        <p className="text-slate-500 mt-1">
          Gestiona tu información personal y configuración de cuenta.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <ProfilePhoto
          photo={photo}
          onChange={(file) => setPhoto(URL.createObjectURL(file))}
        />

        <div className="flex-1 space-y-10">
          <ProfileInfo />
          <AcademicInfo />

          <div className="pt-4 flex justify-end">
            <SaveChangesButton onConfirm={handleConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}
