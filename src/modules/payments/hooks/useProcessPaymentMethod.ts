import { api } from "../utils/api";

export const useProcessPaymentMethod = () => {

  const createPaymentMethod = async (
    userId: string,
    type: string,
    alias: string
  ) => {
    const payload = { userId, alias, type };

    const res = await api.post("/payment-methods", payload);
    return res.data; // contiene el PaymentMethod creado
  };

  return { createPaymentMethod };
};
