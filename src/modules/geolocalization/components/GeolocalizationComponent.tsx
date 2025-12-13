import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import { Navigation, Clock, Users, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carIcon from '../../../../public/car-icon.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetRouteInformation } from '../hooks/getRouteInformationHook';
import type { LocationDocument } from '../types/location';
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp, CompatClient } from '@stomp/stompjs';

const containerStyle = {
  width: "100%",
  height: "600px",
};

interface GeolocalizationComponentProps {
  role?: 'DRIVER' | 'PASSENGER'; 
}

const libraries: ("geometry")[] = ["geometry"];

function GeolocalizationComponent({ role = "PASSENGER"}: GeolocalizationComponentProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const travelId = searchParams.get("travelId");

  const { route, loading, error } = useGetRouteInformation(travelId);

  const [decodedPath, setDecodedPath] = useState<google.maps.LatLngLiteral[]>(
    []
  );
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 4.7827109,
    lng: -74.0426038,
  });

  const [driverPosition, setDriverPosition] = useState<google.maps.LatLngLiteral | null> (null);
  
  const stompClientRef = useRef<CompatClient | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDnaSQL9XWXEVLt4BnIb5TWvWKG3Lg8gLU",
    libraries: libraries,
  });

  useEffect(() => {
    if (route && isLoaded && globalThis.google) {
      // Decodificar la polyline del backend
      const path = google.maps.geometry.encoding.decodePath(route.polyline);
      const pathArray = path.map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));
      setDecodedPath(pathArray);

      // Centrar el mapa en el origen
      setCenter({
        lat: route.origin.latitude,
        lng: route.origin.longitude,
      });
    }
  }, [route, isLoaded]);

  useEffect(() => {
    if( role !== "DRIVER" || !travelId) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

  const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, speed, accuracy} = pos.coords;

        setDriverPosition({lat: latitude, lng: longitude});

        const locationData: LocationDocument = {
          latitude: latitude,
          longitude: longitude,
          timeStamp: new Date().toISOString(),
          speed: speed || 0,
          placeId: "driver-live",
          direction: "",
          accuracy: accuracy
        };

        axios.put(`http://nemesisroutesandtrackingbackend-production.up.railway.app/geolocations/${travelId}/traveltracking/location`, locationData)
              .then(() => console.log("Location Sent"))
              .catch(e => console.error("Error sending location", e))
      },
      (err) => console.error("Error with GPS", err),
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  },[travelId]); 

  useEffect(() => {
    if (role !== 'PASSENGER' || !travelId) return;

    const socket = new SockJS('http://nemesisroutesandtrackingbackend-production.up.railway.app/ws/live-tracking');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame: any) => {
      console.log("Connected to websocket: " + frame);

      stompClient.subscribe(`/topic/route/${travelId}/location`, (message) => {
        if(message.body){
          try {
            const LocationDocument = JSON.parse(message.body);
            console.log("Nueva ubicación recibida:", LocationDocument);
        
            setDriverPosition({
              lat: LocationDocument.latitude,
              lng: LocationDocument.longitude
            }); 
          } catch (e){
            console.error("Error parsing JSON", e);
          }
        }
      });
    }, (error: unknown) => {
      console.error('Error connecting with websocket:', error);
    });

    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
         stompClientRef.current.disconnect();
      }
    };
  }, [travelId, role]);

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} min`;
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B8EF5] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B8EF5] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información de ruta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">
            Error al cargar la ruta
          </h3>
          <p className="text-red-700 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => globalThis.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Reintentar
            </Button>
            <Button
              onClick={() => navigate("/app/sectionTravel")}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Volver a viajes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="flex items-center justify-center h-[600px] p-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-md text-center">
          <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-yellow-900 mb-2">
            Ruta no disponible
          </h3>
          <p className="text-yellow-700 mb-6">
            No se encontró información de ruta para este viaje.
          </p>
          <Button
            onClick={() => navigate("/app/sectionTravel")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Volver a viajes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8" />
          <h1 className="text-3xl font-bold">
            {role === 'DRIVER' ? 'Modo Conductor' : 'Sigue tu Viaje'}
          </h1>
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
            zoomControl: true,
          }}
        >
          {/* Marcador de origen */}
          {route.origin && (
            <Marker
              position={{
                lat: route.origin.latitude,
                lng: route.origin.longitude,
              }}
              label={{
                text: "O",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4CAF50",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
              }}
            />
          )}

          {/* Marcador de destino */}
          {route.destiny && (
            <Marker
              position={{
                lat: route.destiny.latitude,
                lng: route.destiny.longitude,
              }}
              label={{
                text: "D",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#F44336",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
              }}
            />
          )}

          {driverPosition && (
            <Marker
              position={driverPosition}
              title='Mi Ubicacion'
              icon={{
                url: carIcon,
                scaledSize: new window.google.maps.Size(30,30)
              }}
              zIndex={1000}
            />
          )}
          
          {/* Polyline de la ruta */}
          {decodedPath.length > 0 && (
            <Polyline
              path={decodedPath}
              options={{
                strokeColor: "#0B8EF5",
                strokeWeight: 5,
                strokeOpacity: 0.8,
              }}
            />
          )}
        </GoogleMap>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-8 border z-10">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-gray-700" />
            <div>
              <p className="text-xs text-gray-600">Distancia Total</p>
              <p className="font-bold">{formatDistance(route.totalDistance)}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-700" />
            <div>
              <p className="text-xs text-gray-600">Tiempo Estimado</p>
              <p className="font-bold">{formatTime(route.estimatedTime)}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-300"></div>
          <button
            className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={() => {
              /* Add navigation or modal logic here */
            }}
          >
            <Users className="w-5 h-5 text-gray-700" />
            <p className="font-medium text-gray-700">Contactos de Emergencia</p>
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          onClick={() => navigate(`/app/detailsOfTravel?travelId=${travelId}`)}
          className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-8"
        >
          Detalles de Viaje
        </Button>
        <Button
          onClick={() => navigate("/app/conversations")}
          className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-8"
        >
          Ir al chat con el conductor
        </Button>
      </div>
    </div>
  );
}

export default GeolocalizationComponent;
