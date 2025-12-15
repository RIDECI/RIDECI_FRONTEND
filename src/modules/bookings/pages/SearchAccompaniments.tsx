import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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
    showResults,
    isLoading,
    error,
    handleSearch,
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
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      
      {error ? (
        <div className="flex items-center justify-center flex-1">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      ) : showResults ? (
        <AvailableAccompanimentsList
          accompaniments={availableAccompaniments}
          totalCount={totalCount}
          onViewDetails={handleViewDetails}
        />
      ) : null}
    </div>
  );
}