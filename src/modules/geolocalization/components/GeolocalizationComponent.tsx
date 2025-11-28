import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { Navigation, Clock, Users, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const mockRouteData = {
  origin: { lat: 4.7827109, lng: -74.0426038 },
  destination: { lat: 4.6486259, lng: -74.0991531 },
  waypoints: []
};


const mockTripInfo = {
  remainingDistance: "2 km",
  estimatedTime: "5 min",
  emergencyContacts: "Contactos de Emergencia"
};

function GeolocalizationComponent() {
  const navigate = useNavigate();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>(mockTripInfo.remainingDistance);
  const [duration, setDuration] = useState<string>(mockTripInfo.estimatedTime);
  const center = mockRouteData.origin;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBmSX5305EUPHA58uu9DcUOHDXzx3cSSjk"
  });

  useEffect(() => {
    if (isLoaded && globalThis.google) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: mockRouteData.origin,
          destination: mockRouteData.destination,
          waypoints: mockRouteData.waypoints.map(point => ({
            location: point,
            stopover: true
          })),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
  }, [isLoaded]);

  if (!isLoaded) return <div className="flex items-center justify-center h-[600px]">Cargando mapa...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Geolocalización en Tiempo Real</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full w-12 h-12 border-red-500 text-red-500 hover:bg-red-50"
        >
          <ShoppingBag className="w-6 h-6" />
        </Button>
      </div>
      <div className="relative w-full h-[600px]">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: true
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: '#0B8EF5',
                  strokeWeight: 5,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}
        </GoogleMap>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-8 border z-10">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-gray-700" />
            <div>
              <p className="text-xs text-gray-600">Distancia Restante</p>
              <p className="font-bold">{distance}</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-700" />
            <div>
              <p className="text-xs text-gray-600">Tiempo Estimado de Llegada</p>
              <p className="font-bold">{duration}</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-300"></div>
          <button 
            className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={() => {/* Add navigation or modal logic here */}}
          >
            <Users className="w-5 h-5 text-gray-700" />
            <p className="font-medium text-gray-700">{mockTripInfo.emergencyContacts}</p>
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button 
          onClick={() => navigate('/detailsOfTravel')}
          className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-8"
        >
          Detalles de Viaje
        </Button>
        <Button 
          className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-8"
        >
          Ir al chat con el conductor
        </Button>
      </div>
    </div>
  );
}

export default GeolocalizationComponent;