import { useEffect, useMemo, useState } from "react";
import { api } from "../utils/api";
import type { PaymentHistoryItem, PaymentFilters } from "../types/payment-history.types";

const USER_ID = "USR-200"; // TODO: sacar de sesión real

export const usePaymentHistory = () => {
  const [filters, setFilters] = useState<PaymentFilters>({
    searchQuery: "",
    dateFilter: "",
    statusFilter: "",
    methodFilter: "",
  });

  const [paymentsRaw, setPaymentsRaw] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------
     🔵 Cargar pagos por usuario
  --------------------------*/
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get(`/payments/user/${USER_ID}`);

        const mapped = res.data.map((tx: any) => ({
          id: tx.id,
          date: tx.createdAt,
          tripName: tx.bookingId,
          amount: tx.amount,
          paymentMethod: mapPaymentMethod(tx.paymentMethod),
          status: tx.status.toLowerCase(),
        }));

        setPaymentsRaw(mapped);
      } catch (err) {
        console.error("Error cargando historial", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  /* -------------------------
     🔵 Aplicar filtros
  --------------------------*/
  const payments = useMemo(() => {
    return paymentsRaw.filter((p) => {
      if (
        filters.searchQuery &&
        !p.tripName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (filters.statusFilter && p.status !== filters.statusFilter) {
        return false;
      }

      if (filters.methodFilter && p.paymentMethod !== filters.methodFilter) {
        return false;
      }

      if (filters.dateFilter) {
        const txDate = new Date(p.date);
        const today = new Date();

        if (filters.dateFilter === "today") {
          return txDate.toDateString() === today.toDateString();
        }

        if (filters.dateFilter === "week") {
          const diff = (today.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        }

        if (filters.dateFilter === "month") {
          return (
            txDate.getMonth() === today.getMonth() &&
            txDate.getFullYear() === today.getFullYear()
          );
        }
      }

      return true;
    });
  }, [paymentsRaw, filters]);

  const updateFilter = (key: keyof PaymentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    payments,
    filters,
    updateFilter,
    loading,
  };
};

/* -------------------------
   🔵 Helpers
--------------------------*/
const mapPaymentMethod = (method: string) => {
  switch (method) {
    case "CREDIT_CARD_PAYU":
      return "card";
    case "NEQUI":
      return "nequi";
    case "CASH":
      return "cash";
    case "BRE_B_key":
      return "bre-b";
    default:
      return "unknown";
  }
};
