import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BrebKeysHeader } from '../components/BrebKeysHeader';
import { BrebKeysList } from '../components/BrebKeysList';
import { AddBrebKeyButton } from '../components/AddBrebKeyButton';
import { AddBrebKeyForm } from '../components/AddBrebKeyForm';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useBrebKeys } from '../hooks/useBrebKeys';
import { api } from "../utils/api";
import { Button } from "@/components/ui/button"

export const BrebKeysPayment: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

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

  /* -------------------------------------------------
        🔵 Confirmar pago con BreB (crea transacción)
  ---------------------------------------------------*/
  const handleConfirmPayment = async () => {
    if (!selectedKeyId) return;

    try {
      setIsProcessing(true);

      console.log("Creando pago BREB con:", {
        bookingId,
        keyId: selectedKeyId
      });

      // 🔹 cuerpo EXACTO que pide tu backend
      const body = {
        bookingId: bookingId || "BKG-001",
        passengerId: "USR-200",
        amount: 20000,
        paymentMethod: "BRE_B_key",
        extra: selectedKeyId,
        receiptCode: `RCPT-${Date.now()}`
      };

      const res = await api.post("/payments/create", body);

      // backend retorna TransactionResponse
      const txId = res.data.id;

      navigate(`/payment/success/${txId}`);

    } catch (err) {
      console.error("❌ Error en pago BREB:", err);
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
        onClick={() => navigate(`/payment/${bookingId}/confirm`)}
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

      <div className="mt-8">
        <PaymentConfirmButton
          disabled={!selectedKeyId}
          isLoading={isProcessing}
          onConfirm={handleConfirmPayment}
        />
      </div>
    </div>
  );
};
