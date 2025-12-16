import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const useTransactionDetails = (paymentId: string) => {
  const [tx, setTx] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/payments/${paymentId}`);
        setTx(res.data);
      } catch (err) {
        console.error("❌ Error cargando transacción:", err);
        setTx(null); // evita romper UI
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [paymentId]);

  return { tx, loading };
};
