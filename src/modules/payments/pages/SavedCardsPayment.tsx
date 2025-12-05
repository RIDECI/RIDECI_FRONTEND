import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SavedCardsHeader } from '../components/SavedCardsHeader';
import { SavedCardsList } from '../components/SavedCardsList';
import { AddCardButton } from '../components/AddCardButton';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useSavedCards } from '../hooks/useSavedCards';
import { Button } from "@/components/ui/button"

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
    <div className="max-w-8xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/payment/${bookingId}/confirm`)}
        className="w-fit text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

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