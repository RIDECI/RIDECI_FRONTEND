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

  const handleConfirmPayment = async () => {
    if (!selectedMethod) return;

    /* ================= CARD ================= */
    if (selectedMethod === 'card') {
      navigate(`/app/payment/cards`);
      return;
    }

    /* ================= BRE-B ================= */
    if (selectedMethod === 'bre-b') {
      await api.post("/payment-methods", {
        userId: "USR-200",
        alias: "Método BRE-B",
        type: "BRE_B_key"
      });

      navigate(`/app/payment/breb/${safeBookingId}`);
      return;
    }

    /* ================= NEQUI ================= */
    if (selectedMethod === 'nequi') {
      await api.post("/payment-methods", {
        userId: "USR-200",
        alias: "Nequi personal",
        type: "NEQUI"
      });

      const txBody = {
        bookingId: safeBookingId,
        passengerId: "USR-200", // ✅ corregido
        amount: paymentAmount,
        paymentMethod: "NEQUI",
        extra: "nequi-test",
        receiptCode: `RCPT-${Date.now()}`
      };

      const resTx = await api.post("/payments/create", txBody);
      navigate(`/app/payment/success/${resTx.data.id}`);
      return;
    }

    /* ================= CASH ================= */
    if (selectedMethod === 'cash') {
      await api.post("/payment-methods", {
        userId: "USR-200",
        alias: "Pago en efectivo",
        type: "CASH"
      });

      const txBody = {
        bookingId: safeBookingId,
        passengerId: "USR-200",
        amount: paymentAmount,
        paymentMethod: "CASH",
        extra: "cash-test",
        receiptCode: `RCPT-${Date.now()}`
      };

      const resTx = await api.post("/payments/create", txBody);
      navigate(`/app/payment/success/${resTx.data.id}`);
      return;
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
