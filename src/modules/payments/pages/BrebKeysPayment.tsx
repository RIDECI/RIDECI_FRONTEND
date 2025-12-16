import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Key } from 'lucide-react';
import { BrebKeysHeader } from '../components/BrebKeysHeader';
import { BrebKeysList } from '../components/BrebKeysList';
import { AddBrebKeyButton } from '../components/AddBrebKeyButton';
import { AddBrebKeyForm } from '../components/AddBrebKeyForm';
import { useBrebKeys } from '../hooks/useBrebKeys';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompleteBooking } from '../../bookings/hooks/useCompleteBooking';
import { useToast } from '@/components/ToastContext';

export const BrebKeysPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();
  const paymentAmount = (location.state as any)?.amount || 6600;
  const { completeBooking } = useCompleteBooking();
  const { showToast } = useToast();

  const { 
    brebKeys, 
    selectedKeyId, 
    showAddForm,
    handleSelectKey, 
    handleAddKey, 
    handleCancelAdd, 
    handleShowAddForm 
  } = useBrebKeys();

  const [isProcessing, setIsProcessing] = useState(false);
  const [brebKey, setBrebKey] = useState('');
  const [showConfirmForm, setShowConfirmForm] = useState(false);

  const handleShowConfirmForm = () => {
    if (!selectedKeyId) {
      alert('Por favor selecciona una llave BreB');
      return;
    }
    setShowConfirmForm(true);
  };

  const handleConfirmPayment = async () => {
    if (!brebKey.trim()) {
      alert('Por favor ingresa tu llave BreB');
      return;
    }

    try {
      setIsProcessing(true);

      console.log("🔄 Procesando pago MOCK con BreB:", {
        bookingId,
        keyId: selectedKeyId,
        brebKey
      });

      // Importar el servicio de almacenamiento mock
      const { createTransaction } = await import('../services/mockPaymentStorage');
      
      // Crear transacción mock en localStorage
      const transaction = createTransaction({
        bookingId: bookingId || "BKG-TEST-001",
        passengerId: "USR-200",
        amount: paymentAmount,
        paymentMethod: "BRE_B_KEY",
        extra: `BreB Key: ${brebKey}`,
        receiptCode: `RCPT-${Date.now()}`,
      });

      console.log("✅ Transacción mock creada:", transaction);

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

      navigate(`/app/payment/success/${transaction.id}`, {
        state: { 
          transaction: {
            ...transaction,
            currency: 'COP',
          }
        }
      });

    } catch (err) {
      console.error("❌ Error al procesar pago:", err);
      alert("Error procesando pago. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto ">

      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/app/payment/confirm/${bookingId}`)}
        className="w-fit text-blue-600 hover:bg-transparent hover:text-blue-700 font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

      <BrebKeysHeader />

      <BrebKeysList
        keys={brebKeys}
        selectedKeyId={selectedKeyId}
        onSelectKey={handleSelectKey}
      />

      <AddBrebKeyButton 
        onClick={handleShowAddForm}
        isFormVisible={showAddForm}
      />

      {showAddForm && (
        <AddBrebKeyForm
          onSave={handleAddKey}
          onCancel={handleCancelAdd}
        />
      )}

      {!showConfirmForm ? (
        <div className="mt-8">
          <Button
            onClick={handleShowConfirmForm}
            disabled={!selectedKeyId}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl text-lg"
          >
            Continuar con el pago
          </Button>
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Key className="w-6 h-6 text-blue-600" />
            Confirmar pago con BreB
          </h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Llave BreB
              </label>
              <Input
                type="text"
                placeholder="Ingresa tu llave BreB"
                value={brebKey}
                onChange={(e) => setBrebKey(e.target.value)}
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
              onClick={() => setShowConfirmForm(false)}
              variant="outline"
              className="flex-1 py-6 text-base"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={!brebKey.trim() || isProcessing}
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
