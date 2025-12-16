import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SavedCardsHeader } from '../components/SavedCardsHeader';
import { SavedCardsList } from '../components/SavedCardsList';
import { AddCardButton } from '../components/AddCardButton';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useSavedCards } from '../hooks/useSavedCards';
import { Button } from "@/components/ui/button";
import { useCompleteBooking } from '../../bookings/hooks/useCompleteBooking';
import { useToast } from '@/components/ToastContext';

export const SavedCardsPayment: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { completeBooking } = useCompleteBooking();
  const { showToast } = useToast();

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
      console.log("🔄 Procesando pago MOCK con tarjeta:", {
        bookingId,
        cardId: selectedCardId
      });

      // Importar el servicio de almacenamiento mock
      const { createTransaction } = await import('../services/mockPaymentStorage');
      
      // Crear transacción mock en localStorage
      const transaction = createTransaction({
        bookingId: bookingId || "BKG-TEST-001",
        passengerId: "USR-200",
        amount: 20000,
        paymentMethod: "CREDIT_CARD_PAYU",
        extra: selectedCardId,
        receiptCode: `RCPT-${Date.now()}`,
      });

      console.log("✅ Transacción mock creada:", transaction);

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 800));

      // Completar la reserva en el backend
      if (bookingId) {
        console.log('🔄 Completando reserva en backend...');
        const success = await completeBooking(bookingId);
        if (success) {
          console.log('✅ Reserva completada exitosamente');
          showToast('Pago realizado y viaje completado', 'success');
        } else {
          console.warn('⚠️ No se pudo completar la reserva, pero el pago se registró');
          showToast('Pago realizado, pero hubo un problema al actualizar la reserva', 'error');
        }
      }

      navigate(`/app/payment/success/${transaction.id}`, {
        state: { 
          transaction: {
            ...transaction,
            currency: 'COP',
          }
        }
      });

    } catch (err: any) {
      console.error("❌ Error al procesar pago:", err);
      alert("Error procesando el pago. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto">

      {/* Botón Volver */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/app/payment/confirm/${bookingId}`)}
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
