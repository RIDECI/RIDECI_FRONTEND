import { AvailableAccompanimentCard } from './AvailableAccompanimentCard';

interface Accompaniment {
  id: string;
  driverName: string;
  driverImage: string;
  rating: string;
  origin: string;
  destination: string;
  time: string;
}

interface AvailableAccompanimentsListProps {
  accompaniments: Accompaniment[];
  totalCount: number;
  onViewDetails: (id: string) => void;
}

export function AvailableAccompanimentsList({
  accompaniments,
  totalCount,
  onViewDetails,
}: AvailableAccompanimentsListProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">{totalCount} viajes encontrados</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accompaniments.map((acc) => (
          <AvailableAccompanimentCard
            key={acc.id}
            driverName={acc.driverName}
            driverImage={acc.driverImage}
            rating={acc.rating}
            origin={acc.origin}
            destination={acc.destination}
            time={acc.time}
            onViewDetails={() => onViewDetails(acc.id)}
          />
        ))}
      </div>
    </div>
  );
}