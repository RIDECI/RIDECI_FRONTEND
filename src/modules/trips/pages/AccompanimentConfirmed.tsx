import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAccompanimentConfirmed } from '../hooks/useAccompanimentConfirmed';
import { ConfirmedHeader } from '../components/accompaniments/ConfirmedHeader';
import { AccompanimentSummaryCard } from '../components/accompaniments/AccompanimentSummaryCard';
import { CompanionCard } from '../components/accompaniments/CompanionCard';
import { ConfirmedActions } from '../components/accompaniments/ConfirmedActions';
import { CancelConfirmationModal } from '../components/accompaniments/CancelConfirmationModal';

export function AccompanimentConfirmed() {
  const navigate = useNavigate();
  const { accompanimentId } = useParams<{ accompanimentId: string }>();
  const { confirmedData } = useAccompanimentConfirmed(accompanimentId || '');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleChat = () => {
    navigate(`/chat/${accompanimentId}`);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    navigate('/accompaniments');
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

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