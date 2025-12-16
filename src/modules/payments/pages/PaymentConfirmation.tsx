import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaymentHeader } from '../components/PaymentHeader';
import { PaymentMethodList } from '../components/PaymentMethodList';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { api } from "../utils/api";

export const PaymentConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { paymentMethods, selectedMethod, handleSelectMethod } = usePaymentMethods();

  const paymentAmount = 8000;
  const currency = 'COP';

  // 🔒 BookingId seguro
  const safeBookingId = bookingId || "BKG-TEST-001";
  
  console.log('💳 PaymentConfirmation - BookingId:', bookingId);
  console.log('💳 Safe BookingId:', safeBookingId);

  const handleConfirmPayment = async () => {
    if (!selectedMethod) return;

    console.log('💳 Procesando pago para booking:', safeBookingId);
    console.log('💳 Método seleccionado:', selectedMethod);

    try {
      // Importar el servicio de almacenamiento mock
      const { createTransaction } = await import('../services/mockPaymentStorage');
      
      // Crear transacción en localStorage
      const transaction = createTransaction({
        bookingId: safeBookingId,
        passengerId: "USR-200",
        amount: paymentAmount,
        paymentMethod: selectedMethod.toUpperCase(),
        extra: `Pago con ${selectedMethod}`,
        receiptCode: `RCPT-${Date.now()}`,
      });

      console.log('✅ Transacción guardada en localStorage:', transaction);

      /* ================= CARD ================= */
      if (selectedMethod === 'card') {
        navigate(`/app/payment/cards`);
        return;
      }

      /* ================= Otros métodos (BRE-B, NEQUI, CASH) ================= */
      // Navegar a la página de éxito con el ID de la transacción
      navigate(`/app/payment/success/${transaction.id}`, {
        state: { 
          transaction: {
            ...transaction,
            currency: currency,
          }
        }
      });
      
    } catch (error) {
      console.error('❌ Error al procesar pago:', error);
      alert('Error al procesar el pago. Intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-8xl mx-auto">
      <PaymentHeader amount={paymentAmount} currency={currency} />

      <PaymentMethodList
        methods={paymentMethods}
        selectedMethod={selectedMethod}
        onSelectMethod={handleSelectMethod}
      />

      <div className="mt-8">
        <PaymentConfirmButton
          disabled={!selectedMethod}
          onConfirm={handleConfirmPayment}
        />
      </div>
    </div>
  );
};
