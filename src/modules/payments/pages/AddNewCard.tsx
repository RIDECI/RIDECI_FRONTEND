import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AddCardHeader } from '../components/AddCardHeader';
import { CardNumberInput } from '../components/CardNumberInput';
import { CardHolderInput } from '../components/CardHolderInput';
import { ExpiryAndCVVInputs } from '../components/ExpiryAndCVVInputs';
import { SecurityNote } from '../components/SecurityNote';
import { AddCardActions } from '../components/AddCardActions';
import { useAddCard } from '../hooks/useAddCard';
import { Button } from "@/components/ui/button"

export const AddNewCard: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSaveCard,
  } = useAddCard();

  const handleCancel = () => {
    navigate(`/payment/cards`);
  };

  const handleSave = async () => {
    const success = await handleSaveCard();
    if (success) {
      navigate(`/payment/cards`);
    }
  };

  return (
    <div className="max-w-8xl mx-auto min-h-8xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/payment/cards')}
        className="w-fit text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

      <AddCardHeader />

      <div className="space-y-6">
        <CardNumberInput
          value={formData.cardNumber}
          onChange={(value) => handleInputChange('cardNumber', value)}
          error={errors.cardNumber}
        />

        <CardHolderInput
          value={formData.holderName}
          onChange={(value) => handleInputChange('holderName', value)}
          error={errors.holderName}
        />

        <ExpiryAndCVVInputs
          expiryValue={formData.expiryDate}
          cvvValue={formData.cvv}
          onExpiryChange={(value) => handleInputChange('expiryDate', value)}
          onCVVChange={(value) => handleInputChange('cvv', value)}
          expiryError={errors.expiryDate}
          cvvError={errors.cvv}
        />

        <SecurityNote />

        <AddCardActions
          onCancel={handleCancel}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};