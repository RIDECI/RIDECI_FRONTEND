import { useState } from 'react';
import type { NewCardFormData } from '../types/card.types';

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
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewCardFormData, string>> = {};

    // Validar numero de tarjeta de 16 digotos
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean || cardNumberClean.length < 15) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    // Validar titular
    if (!formData.holderName.trim()) {
      newErrors.holderName = 'El nombre es requerido';
    }

    // Validar fecha de expiracion (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/YY)';
    }

    // Validar CVV 
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCard = async () => {
    if (!validateForm()) return false;

    setIsLoading(true);
    
    try {
      // TODO: Llamar al servicio de API para guardar la tarjeta
      console.log('Saving card:', formData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error saving card:', error);
      setIsLoading(false);
      return false;
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
