export type PaymentMethod = 'card' | 'nequi' | 'cash' | 'bre-b';

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  iconType: 'emoji' | 'text';
  iconContent: string;
  colorClass: string;
  enabled: boolean;
}

export interface PaymentConfirmation {
  bookingId: string;
  amount: number;
  currency: string;
  selectedMethod: PaymentMethod | null;
}