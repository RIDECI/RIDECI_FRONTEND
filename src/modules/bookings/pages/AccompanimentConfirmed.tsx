import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAccompanimentConfirmed } from '../hooks/useAccompanimentConfirmed';
import { cancelAccompanimentRequest } from '../services/accompanimentsApi';
import { ConfirmedHeader } from '../components/accompaniments/ConfirmedHeader';
import { AccompanimentSummaryCard } from '../components/accompaniments/AccompanimentSummaryCard';
import { CompanionCard } from '../components/accompaniments/CompanionCard';
import { ConfirmedActions } from '../components/accompaniments/ConfirmedActions';
import { CancelConfirmationModal } from '../components/accompaniments/CancelConfirmationModal';

export function AccompanimentConfirmed() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { confirmedData, isLoading, error } = useAccompanimentConfirmed(id || '');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleChat = () => {
    navigate(`/chat/${id}`);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      if (!id) {
        alert('Error: ID de solicitud no válido');
        return;
      }

      console.log('Cancelling accompaniment request:', id);
      await cancelAccompanimentRequest(id);
      
      alert('Solicitud de acompañamiento cancelada exitosamente');
      setShowCancelModal(false);
      navigate('/accompaniments');
    } catch (error) {
      console.error('Error cancelling accompaniment:', error);
      alert('Error al cancelar la solicitud de acompañamiento');
      setShowCancelModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Cargando confirmación...</p>
        </div>
      </div>
    );
  }

  if (error || !confirmedData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium mb-4">{error || 'No se encontró la confirmación'}</p>
          <button
            onClick={() => navigate('/accompaniments/search')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver a búsqueda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <ConfirmedHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AccompanimentSummaryCard
            meetingPoint={confirmedData.summary.meetingPoint}
            destination={confirmedData.summary.destination}
            dateTime={confirmedData.summary.dateTime}
          />

          <CompanionCard
            name={confirmedData.companion.name}
            rating={confirmedData.companion.rating}
            image={confirmedData.companion.image}
          />
        </div>

        <ConfirmedActions
          onChat={handleChat}
          onCancel={handleCancelClick}
        />
      </div>

      <CancelConfirmationModal
        isOpen={showCancelModal}
        onConfirm={handleConfirmCancel}
        onCancel={handleCloseModal}
      />
    </div>
  );
}