import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useRouteDetails } from '../hooks/useRouteDetails';
import { RouteDetailsHeader } from '../components/accompaniments/RouteDetailsHeader';
import { DriverInfoCard } from '../components/accompaniments/DriverInfoCard';
import { TransportMethodCard } from '../components/accompaniments/TransportMethodCard';
import { RouteSummaryCard } from '../components/accompaniments/RouteSummaryCard';
import { RouteMapPreview } from '../components/accompaniments/RouteMapPreview';
import { AccompanimentActionButton } from '../components/accompaniments/AccompanimentActionButton';
import { createAccompanimentRequest } from '../services/accompanimentsApi';

export function AccompanimentRouteDetails() {
  const navigate = useNavigate();
  const { routeId } = useParams<{ routeId: string }>();
  const { routeDetails, isLoading, error } = useRouteDetails(routeId || '');
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestAccompaniment = async () => {
    if (!routeId) return;

    setIsRequesting(true);
    try {
      const request = await createAccompanimentRequest(routeId);
      console.log('Accompaniment request created:', request);
      
      // Verificar que se recibió un requestId válido
      const requestId = request?.requestId || request?.id;
      if (!requestId) {
        console.error('Response received but no requestId found:', request);
        throw new Error('No se recibió ID de solicitud del servidor');
      }
      
      console.log('✅ Request ID to navigate:', requestId);
      
      // Mostrar alerta de éxito
      alert('¡Solicitud de acompañamiento creada!');
      
      // Navegar a la página de confirmación con el ID de la SOLICITUD
      navigate(`/accompaniments/${requestId}/confirmed`);
    } catch (err: any) {
      console.error('❌ Error creating accompaniment request:', err);
      const errorMsg = err.message.includes('Failed to fetch') || err.message.includes('NetworkError')
        ? 'Error de conexión con el servidor. Verifica que el backend esté corriendo y que CORS esté configurado.'
        : `Error al crear la solicitud: ${err.message}`;
      alert(errorMsg);
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error || !routeDetails) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium mb-4">{error || 'No se encontró el acompañamiento'}</p>
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
    <div className="max-w-6xl">
      <RouteDetailsHeader />
      
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex gap-8">
          {/* Left Column - Information */}
          <div className="flex-1 space-y-6">
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
            <button
              onClick={handleRequestAccompaniment}
              disabled={isRequesting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isRequesting ? 'Creando solicitud...' : 'Realizar acompañamiento'}
            </button>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-200"></div>

          {/* Right Column - Map */}
          <div className="flex-shrink-0 w-[400px] flex items-center justify-center">
            <RouteMapPreview mapImageUrl={routeDetails.mapImageUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}