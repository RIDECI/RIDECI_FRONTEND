import { useState, useMemo } from 'react';
import type { PaymentHistoryItem, PaymentFilters } from '../types/payment-history.types';

export const usePaymentHistory = () => {
  const [filters, setFilters] = useState<PaymentFilters>({
    searchQuery: '',
    dateFilter: '',
    statusFilter: '',
    methodFilter: '',
  });

  // Mock data - cambiar por los datos de la API
  const allPayments: PaymentHistoryItem[] = [
    {
      id: '1',
      date: '19 Nov, 2025',
      tripName: 'Viaje a Portal 89',
      amount: 8000,
      paymentMethod: 'nequi',
      status: 'completed',
    },
    {
      id: '2',
      date: '15 Nov, 2025',
      tripName: 'Viaje a Universidad ECI',
      amount: 7000,
      paymentMethod: 'card',
      status: 'completed',
    },
    {
      id: '3',
      date: '14 Nov, 2025',
      tripName: 'Viaje a Portal el Dorado',
      amount: 9000,
      paymentMethod: 'nequi',
      status: 'failed',
    },
    {
      id: '4',
      date: '14 Nov, 2025',
      tripName: 'Viaje Universidad ECI',
      amount: 10000,
      paymentMethod: 'cash',
      status: 'completed',
    },
  ];

  const filteredPayments = useMemo(() => {
    return allPayments.filter((payment) => {
      if (filters.searchQuery && !payment.tripName.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.statusFilter && payment.status !== filters.statusFilter) {
        return false;
      }
      if (filters.methodFilter && payment.paymentMethod !== filters.methodFilter) {
        return false;
      }
      return true;
    });
  }, [allPayments, filters]);

  const updateFilter = (key: keyof PaymentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    payments: filteredPayments,
    filters,
    updateFilter,
  };
};
