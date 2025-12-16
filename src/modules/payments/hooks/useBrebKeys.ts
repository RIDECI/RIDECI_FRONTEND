import { useState, useEffect } from "react";
import { api } from "../utils/api";
import type { BrebKey, BrebKeyType } from "../types/breb.types";

export const useBrebKeys = () => {
  const [brebKeys, setBrebKeys] = useState<BrebKey[]>([]);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const USER_ID = "USR-100"; // TODO: cambiar por usuario en sesión

  /* -------------------------------
     🔵 Obtener llaves desde backend
  --------------------------------*/
  const loadKeys = async () => {
    try {
      const res = await api.get(`/breb-keys/user/${USER_ID}`);
      const keysBackend = res.data;

      const mapped = keysBackend.map((k: any) => ({
        id: k.id,
        type: k.type.toLowerCase() as BrebKeyType,
        value: k.value,
        label:
          k.type === "EMAIL"
            ? "Correo electrónico"
            : k.type === "DOCUMENT"
            ? "Documento de identidad"
            : "Teléfono celular",
        icon:
          k.type === "EMAIL" ? "📧" : k.type === "DOCUMENT" ? "📄" : "📱"
      }));

      setBrebKeys(mapped);

      if (mapped.length > 0) {
        setSelectedKeyId(mapped[0].id);
      }
    } catch (err) {
      console.error("Error cargando llaves Bre-B", err);
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  /* -------------------------------
     🔵 Seleccionar llave
  --------------------------------*/
  const handleSelectKey = (keyId: string) => {
    setSelectedKeyId(keyId);
  };

  /* -------------------------------
     🔵 Crear nueva llave en backend
  --------------------------------*/
  const handleAddKey = async (type: BrebKeyType, value: string) => {
    try {
      const body = {
        userId: USER_ID,
        value,
        type: type.toUpperCase()
      };

      const res = await api.post("/breb-keys", body);
      const key = res.data;

      const newKey: BrebKey = {
        id: key.id,
        type: type,
        value: key.value,
        label:
          type === "email"
            ? "Correo electrónico"
            : type === "document"
            ? "Documento de identidad"
            : "Teléfono celular",
        icon:
          type === "email" ? "📧" : type === "document" ? "📄" : "📱"
      };

      setBrebKeys((prev) => [...prev, newKey]);
      setSelectedKeyId(newKey.id);
      setShowAddForm(false);

    } catch (err) {
      console.error("Error creando llave Bre-B", err);
      alert("Error creando Bre-B Key");
    }
  };

  const handleCancelAdd = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);

  return {
    brebKeys,
    selectedKeyId,
    showAddForm,
    handleSelectKey,
    handleAddKey,
    handleCancelAdd,
    handleShowAddForm,
  };
};
