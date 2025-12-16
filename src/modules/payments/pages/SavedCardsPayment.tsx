import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SavedCardsHeader } from '../components/SavedCardsHeader';
import { SavedCardsList } from '../components/SavedCardsList';
import { AddCardButton } from '../components/AddCardButton';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useSavedCards } from '../hooks/useSavedCards';
import { api } from "../utils/api";
import { Button } from "@/components/ui/button";

export const SavedCardsPayment: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const {
    savedCards,
    selectedCardId,
    handleSelectCard,
    handleAddNewCard
  } = useSavedCards();

  /* -------------------------------------------------
     🔵 Confirmar pago con tarjeta (conectado al backend)
  ---------------------------------------------------*/
  const handleConfirmPayment = async () => {
    if (!selectedCardId) return;

    try {
      console.log("Procesando pago REAL con tarjeta:", {
        bookingId,
        cardId: selectedCardId
      });

      const body = {
        bookingId: bookingId || "BKG-TEST-001",   // <--- VALOR POR DEFECTO
        passengerId: "USR-200",
        amount: 20000,
        paymentMethod: "CREDIT_CARD_PAYU",
        extra: selectedCardId,
        receiptCode: `RCPT-${Date.now()}`
      };

      const res = await api.post("/payments/create", body);

      const txId = res.data.id; // Backend retorna TransactionResponse

      // 🔹 Mantener tu flujo EXACTO (ir a success)
      navigate(`/payment/success/${txId}`);

    } catch (err) {
      console.error("❌ Error creando pago:", err);
      alert("Error procesando el pago. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto">

      {/* Botón Volver */}
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
