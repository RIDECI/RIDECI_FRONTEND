import { useNavigate } from 'react-router-dom';
import { useSearchAccompaniments } from '../hooks/useSearchAccompaniments';
import { SearchAccompanimentHeader } from '../components/accompaniments/SearchAccompanimentHeader';
import { SearchAccompanimentFilters } from '../components/accompaniments/SearchAccompanimentFilters';
import { AvailableAccompanimentsList } from '../components/accompaniments/AvailableAccompanimentsList';

export function SearchAccompaniments() {
  const navigate = useNavigate();
  const {
    destination,
    setDestination,
    departureTime,
    setDepartureTime,
    searchByProximity,
    setSearchByProximity,
    availableAccompaniments,
    totalCount,
  } = useSearchAccompaniments();

  const handleViewDetails = (id: string) => {
    navigate(`/accompaniment/${id}`);
  };

  return (
    <div className="flex flex-col h-full">
      <SearchAccompanimentHeader />
      <SearchAccompanimentFilters
        destination={destination}
        departureTime={departureTime}
        searchByProximity={searchByProximity}
        onDestinationChange={setDestination}
        onDepartureTimeChange={setDepartureTime}
        onProximityToggle={setSearchByProximity}
      />
      <AvailableAccompanimentsList
        accompaniments={availableAccompaniments}
        totalCount={totalCount}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}