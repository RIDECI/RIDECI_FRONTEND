/**
 * Helper para obtener las URLs de API según el entorno
 * En desarrollo (localhost) usa el proxy de Vite para evitar CORS
 * En producción usa las URLs directas de los backends
 */

const isDevelopment = () => window.location.hostname === 'localhost';

export const getBookingsApiUrl = () => {
  return isDevelopment() 
    ? '/api/bookings' 
    : 'https://poseidonsearchandbooking-production-98fe.up.railway.app/bookings';
};

export const getTravelsApiUrl = () => {
  return isDevelopment()
    ? '/api/travels'
    : 'https://nemesistravelmanagementbackend-production.up.railway.app/travels';
};

export const getPaymentsApiUrl = () => {
  return isDevelopment()
    ? '/api/payments'
    : 'https://poseidonpayments-production-b501.up.railway.app/api';
};
