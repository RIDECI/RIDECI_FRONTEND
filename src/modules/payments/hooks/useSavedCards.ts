import { useEffect, useState } from "react";
import { api } from "../utils/api";
import type { SavedCard } from "../types/card.types";

export const useSavedCards = () => {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: reemplazar con usuario real de sesión
  const userId = "USR-200";

  const loadCards = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/credit-cards/user/${userId}`);

      const mapped = res.data.map((c: any) => ({
        id: c.id,
        lastFourDigits: c.cardNumber.slice(-4),
        expiryDate: c.expiration,
        brand: c.alias || "generic",
        holderName: c.cardHolder,
        isDefault: c.isDefault
      }));

      setSavedCards(mapped);
    } catch (err) {
      console.error("Error loading cards", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCard = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handleAddNewCard = () => {
    window.location.href = "/app/payment/cards/new";
  };

  useEffect(() => {
    loadCards();
  }, []);

  return {
    savedCards,
    selectedCardId,
    handleSelectCard,
    handleAddNewCard,
    loading
  };
};
