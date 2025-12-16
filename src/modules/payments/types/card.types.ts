export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'generic';

export interface SavedCard {
  id: string;
  lastFourDigits: string;
  expiryDate: string;
  brand: CardBrand;
  holderName?: string;
  isDefault?: boolean;
}

export interface NewCardFormData {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
}