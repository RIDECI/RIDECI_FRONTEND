import { useNavigate, useParams } from 'react-router-dom';
import { useRouteDetails } from '../hooks/useRouteDetails';
import { RouteDetailsHeader } from '../components/accompaniments/RouteDetailsHeader';
import { DriverInfoCard } from '../components/accompaniments/DriverInfoCard';
import { TransportMethodCard } from '../components/accompaniments/TransportMethodCard';
import { RouteSummaryCard } from '../components/accompaniments/RouteSummaryCard';
import { RouteMapPreview } from '../components/accompaniments/RouteMapPreview';
import { AccompanimentActionButton } from '../components/accompaniments/AccompanimentActionButton';

export function AccompanimentRouteDetails() {
  const navigate = useNavigate();
  const { routeId } = useParams<{ routeId: string }>();
  const { routeDetails } = useRouteDetails(routeId || '');

  const handleRequestAccompaniment = () => {
    navigate(`/accompaniments/${routeId}/confirmed`);
  };

  return (
    <div className="max-w-4xl">
      <RouteDetailsHeader />
      
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <DriverInfoCard
              name={routeDetails.driver.name}
              rating={routeDetails.driver.rating}
              badge={routeDetails.driver.badge}
              image={routeDetails.driver.image}
            />
            <TransportMethodCard method={routeDetails.transport.method} />
            <RouteSummaryCard
              meetingPoint={routeDetails.route.meetingPoint}
              destination={routeDetails.route.destination}
              departureTime={routeDetails.route.departureTime}
              estimatedArrival={routeDetails.route.estimatedArrival}
            />
            <AccompanimentActionButton
              label="Realizar acompañamiento"
              onClick={handleRequestAccompaniment}
            />
          </div>

          {/* Right Column - Map */}
          <div className="flex items-start">
            <RouteMapPreview mapImageUrl={routeDetails.mapImageUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}