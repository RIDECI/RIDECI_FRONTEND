import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaymentHeader } from '../components/PaymentHeader';
import { PaymentMethodList } from '../components/PaymentMethodList';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone } from 'lucide-react';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { useCompleteBooking } from '../../bookings/hooks/useCompleteBooking';
import { useToast } from '@/components/ToastContext';

export const PaymentConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { paymentMethods, selectedMethod, handleSelectMethod } = usePaymentMethods();
  const { completeBooking } = useCompleteBooking();
  const { showToast } = useToast();

  const paymentAmount = 8000;
  const currency = 'COP';

  const [showNequiForm, setShowNequiForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔒 BookingId seguro
  const safeBookingId = bookingId || "BKG-TEST-001";
  
  console.log('💳 PaymentConfirmation - BookingId:', bookingId);
  console.log('💳 Safe BookingId:', safeBookingId);

  const handleContinuePayment = () => {
    if (!selectedMethod) return;

    // Si es Nequi, mostrar formulario
    if (selectedMethod === 'nequi') {
      setShowNequiForm(true);
      return;
    }

    // Si es tarjeta, ir a selección de tarjetas
    if (selectedMethod === 'card') {
      navigate(`/app/payment/cards`, { state: { amount: paymentAmount } });
      return;
    }

    // Si es BreB, ir a selección de llaves
    if (selectedMethod === 'breb') {
      navigate(`/app/payment/breb`, { state: { amount: paymentAmount } });
      return;
    }

    // Para cash, crear transacción directamente
    handleConfirmPayment();
  };

  const handleConfirmPayment = async () => {
    if (!selectedMethod) return;

    // Validar número de teléfono si es Nequi
    if (selectedMethod === 'nequi' && !phoneNumber.trim()) {
      alert('Por favor ingresa tu número de teléfono');
      return;
    }

    try {
      setIsProcessing(true);

      console.log('💳 Procesando pago para booking:', safeBookingId);
      console.log('💳 Método seleccionado:', selectedMethod);

      // Importar el servicio de almacenamiento mock
      const { createTransaction } = await import('../services/mockPaymentStorage');
      
      // Crear transacción en localStorage
      const transaction = createTransaction({
        bookingId: safeBookingId,
        passengerId: "USR-200",
        amount: paymentAmount,
        paymentMethod: selectedMethod.toUpperCase(),
        extra: selectedMethod === 'nequi' ? `Nequi: ${phoneNumber}` : `Pago con ${selectedMethod}`,
        receiptCode: `RCPT-${Date.now()}`,
      });

      console.log('✅ Transacción guardada en localStorage:', transaction);

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 800));

      // Completar la reserva en el backend
      if (bookingId) {
        console.log('🔄 Completando reserva en backend...');
        const success = await completeBooking(bookingId);
        if (success) {
          console.log('✅ Reserva completada exitosamente');
          showToast('Pago realizado y viaje completado', 'success');
        } else {
          console.warn('⚠️ No se pudo completar la reserva, pero el pago se registró');
          showToast('Pago realizado, pero hubo un problema al actualizar la reserva', 'error');
        }
      }

      // Navegar a la página de éxito
      navigate(`/app/payment/success/${transaction.id}`, {
        state: { 
          transaction: {
            ...transaction,
            currency: currency,
          }
        }
      });
      
    } catch (error) {
      console.error('❌ Error al procesar pago:', error);
      alert('Error al procesar el pago. Intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto">
      <PaymentHeader amount={paymentAmount} currency={currency} />

      <PaymentMethodList
        methods={paymentMethods}
        selectedMethod={selectedMethod}
        onSelectMethod={handleSelectMethod}
      />

      {!showNequiForm ? (
        <div className="mt-8">
          <Button
            onClick={handleContinuePayment}
            disabled={!selectedMethod}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl text-lg"
          >
            Continuar con el pago
          </Button>
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-blue-600" />
            Confirmar pago con Nequi
          </h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de teléfono
              </label>
              <Input
                type="tel"
                placeholder="Ej: 3001234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
                className="w-full"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Monto a pagar:</span>{' '}
                <span className="text-xl font-bold text-blue-600">
                  ${paymentAmount.toLocaleString('es-CO')} COP
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                setShowNequiForm(false);
                setPhoneNumber('');
              }}
              variant="outline"
              className="flex-1 py-6 text-base"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={!phoneNumber.trim() || phoneNumber.length < 10 || isProcessing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-base"
            >
              {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
