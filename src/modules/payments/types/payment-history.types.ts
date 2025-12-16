export type PaymentStatus = 'completed' | 'failed' | 'pending';
export type PaymentMethodType = 'nequi' | 'card' | 'cash' | 'bre-b';

export interface PaymentHistoryItem {
  id: string;
  date: string;
  tripName: string;
  amount: number;
  paymentMethod: PaymentMethodType;
  status: PaymentStatus;
}

export interface PaymentFilters {
  searchQuery: string;
  dateFilter: string;
  statusFilter: string;
  methodFilter: string;
}