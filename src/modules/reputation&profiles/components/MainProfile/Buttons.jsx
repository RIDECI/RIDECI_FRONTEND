"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import UpdateProfilePopUp from "./UpdateProfilePopUp";
import DeleteProfilePopUp from "./DeleteProfilePopUp";

export default function Buttons({ onProfileDeleted, profileId }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();

  const handleUpdateConfirm = () => {
    setOpenUpdate(false);
    navigate("/updateProfile");
  };

  const handleProfileDeleted = () => {
    // Navigate to home or create profile screen after deletion
    navigate("/");
    if (onProfileDeleted) {
      onProfileDeleted();
    }
  };

  return (
    <>
      {/* Botones */}
      <Button className="bg-blue-600 text-white px-6">
        Crear Perfil
      </Button>

      <Button
        className="bg-blue-500 text-white px-6"
        onClick={() => setOpenUpdate(true)}
      >
        Actualizar Perfil
      </Button>

      <Button
        className="bg-blue-600 text-white px-6"
        onClick={() => navigate("/tripHistory")}
      >
        Historial de Viajes
      </Button>

      <Button
        className="bg-red-500 text-white px-6"
        onClick={() => setOpenDelete(true)}
      >
        Eliminar Perfil
      </Button>

      {/* Modales */}
      <UpdateProfilePopUp
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onConfirm={handleUpdateConfirm}
      />

      <DeleteProfilePopUp
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onProfileDeleted={handleProfileDeleted}
        profileId={profileId}
      />
    </>
  );
}
