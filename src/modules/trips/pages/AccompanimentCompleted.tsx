import { useNavigate, useParams } from 'react-router-dom';
import { useAccompanimentCompleted } from '../hooks/useAccompanimentCompleted';
import { CompletedHeader } from '../components/accompaniments/CompletedHeader';
import { CompletedMapPreview } from '../components/accompaniments/CompletedMapPreview';
import { CompletedRouteSummary } from '../components/accompaniments/CompletedRouteSummary';
import { RateUsersButton } from '../components/accompaniments/RateUsersButton';

export function AccompanimentCompleted() {
  const navigate = useNavigate();
  const { accompanimentId } = useParams<{ accompanimentId: string }>();
  const { completedData } = useAccompanimentCompleted(accompanimentId || '');

  const handleRateUsers = () => {
    navigate(`/rate-accompaniment/${accompanimentId}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <CompletedHeader />
        <CompletedMapPreview mapImageUrl={completedData.mapImageUrl} />
        <CompletedRouteSummary
          origin={completedData.origin}
          destination={completedData.destination}
        />
        <RateUsersButton onClick={handleRateUsers} />
      </div>
    </div>
  );
}