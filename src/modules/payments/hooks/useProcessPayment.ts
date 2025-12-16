import { api } from "../utils/api";
import { useGlobalNotifications } from "@/context/GlobalNotificationContext";

export const useProcessPayment = () => {
  const { addNotification } = useGlobalNotifications();
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

      addNotification({
        title: '¡Pago realizado exitosamente!',
        type: 'success',
      });

      return res.data;

    } catch (err: any) {
      console.error("Error procesando pago:", err);
      addNotification({
        title: 'Error al procesar el pago. Intente nuevamente.',
        type: 'info',
      });
      throw err;
    }
  };

  return { payWithCard };
};
