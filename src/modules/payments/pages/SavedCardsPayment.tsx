import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SavedCardsHeader } from '../components/SavedCardsHeader';
import { SavedCardsList } from '../components/SavedCardsList';
import { AddCardButton } from '../components/AddCardButton';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useSavedCards } from '../hooks/useSavedCards';

export const SavedCardsPayment: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { 
    savedCards, 
    selectedCardId, 
    handleSelectCard,
    handleAddNewCard 
  } = useSavedCards();

  const handleConfirmPayment = () => {
    if (!selectedCardId) return;
    
    console.log('Processing payment with card:', {
      bookingId,
      cardId: selectedCardId,
    });
    
    const mockPaymentId = `PAY-CARD-${Date.now()}`;
    navigate(`/payment/success/${mockPaymentId}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <SavedCardsHeader />
      
      <SavedCardsList
        cards={savedCards}
        selectedCardId={selectedCardId}
        onSelectCard={handleSelectCard}
      />

      <div className="mt-3">
        <AddCardButton onAddCard={handleAddNewCard} />
      </div>

      <div className="mt-8">
        <PaymentConfirmButton
          disabled={!selectedCardId}
          onConfirm={handleConfirmPayment}
        />
      </div>
    </div>
  );
};