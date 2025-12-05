import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BrebKeysHeader } from '../components/BrebKeysHeader';
import { BrebKeysList } from '../components/BrebKeysList';
import { AddBrebKeyButton } from '../components/AddBrebKeyButton';
import { AddBrebKeyForm } from '../components/AddBrebKeyForm';
import { PaymentConfirmButton } from '../components/PaymentConfirmButton';
import { useBrebKeys } from '../hooks/useBrebKeys';
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

  const handleConfirmPayment = () => {
    if (!selectedKeyId) return;
    
    console.log('Processing Bre-B payment with key:', {
      bookingId,
      keyId: selectedKeyId,
    });
    
    const mockPaymentId = `PAY-BREB-${Date.now()}`;
    navigate(`/payment/success/${mockPaymentId}`);
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
      
      {/* Lista de llaves existentes */}
      <BrebKeysList
        keys={brebKeys}
        selectedKeyId={selectedKeyId}
        onSelectKey={handleSelectKey}
      />

      {/* Botón para añadir nueva llave */}
      <AddBrebKeyButton 
        onClick={handleShowAddForm}
        isFormVisible={showAddForm}
      />

      {/* Formulario para añadir nueva llave */}
      {showAddForm && (
        <AddBrebKeyForm
          onSave={handleAddKey}
          onCancel={handleCancelAdd}
        />
      )}

      {/* Botón de confirmación de pago */}
      <div className="mt-8">
        <PaymentConfirmButton
          disabled={!selectedKeyId}
          onConfirm={handleConfirmPayment}
        />
      </div>
    </div>
  );
};