import { useState } from 'react';
import type { NewCardFormData } from '../types/card.types';
import { api } from "../utils/api";

// 🔍 Detecta automáticamente la marca
const detectBrand = (cardNumber: string): string => {
  const n = cardNumber.replace(/\s/g, '');

  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  return "generic";
};

export const useAddCard = () => {
  const [formData, setFormData] = useState<NewCardFormData>({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewCardFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof NewCardFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const e: Partial<Record<keyof NewCardFormData, string>> = {};

    const cleanNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanNumber || cleanNumber.length < 15)
      e.cardNumber = "Número inválido";

    if (!formData.holderName.trim())
      e.holderName = "El nombre es requerido";

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
      e.expiryDate = "Formato inválido";

    if (!formData.cvv || formData.cvv.length < 3)
      e.cvv = "CVV inválido";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveCard = async () => {
    if (!validateForm()) return false;

    setIsLoading(true);
    try {
      // ⚠ TODO — Reemplaza con usuario real de sesión
      const userId = "USR-200";

      const payload = {
        userId,
        cardHolder: formData.holderName,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiration: formData.expiryDate,
        cvv: formData.cvv,
        alias: detectBrand(formData.cardNumber) // ✔ marca automática
      };

      const res = await api.post("/credit-cards", payload);

      console.log("Tarjeta creada:", res.data);

      return true;
    } catch (err) {
      console.error("Error guardando tarjeta:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSaveCard,
  };
};
