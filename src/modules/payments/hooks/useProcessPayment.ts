import { api } from "../utils/api";

export const useProcessPayment = () => {
  const payWithCard = async ({
    bookingId,
    cardId,
    amount
  }: {
    bookingId: string;
    cardId: string;
    amount: number;
  }) => {

    if (!bookingId) {
      throw new Error("bookingId es requerido");
    }

    if (!cardId) {
      throw new Error("cardId es requerido");
    }

    if (!amount || amount <= 0) {
      throw new Error("El monto es inválido");
    }

    try {
      const body = {
        bookingId,
        passengerId: "USR-200", 
        amount,
        paymentMethod: "CREDIT_CARD_PAYU",   // ← CORRECTO
        extra: cardId,
        receiptCode: `RCPT-${Date.now()}`   // ← NECESARIO
      };

      // EL ENDPOINT CORRECTO
      const res = await api.post("/payments/create", body);

      return res.data; 

    } catch (err: any) {
      console.error("Error procesando pago:", err);
      throw err; 
    }
  };

  return { payWithCard };
};
