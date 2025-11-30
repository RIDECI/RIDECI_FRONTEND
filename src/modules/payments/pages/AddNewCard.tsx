import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddCardHeader } from '../components/AddCardHeader';
import { CardNumberInput } from '../components/CardNumberInput';
import { CardHolderInput } from '../components/CardHolderInput';
import { ExpiryAndCVVInputs } from '../components/ExpiryAndCVVInputs';
import { SecurityNote } from '../components/SecurityNote';
import { AddCardActions } from '../components/AddCardActions';
import { useAddCard } from '../hooks/useAddCard';

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
    navigate(`/payment/cards/${bookingId}`);
  };

  const handleSave = async () => {
    const success = await handleSaveCard();
    if (success) {
      navigate(`/payment/cards/${bookingId}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
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
