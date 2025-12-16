import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import CardMapComponent from './CardMapComponent';

const containerStyle = {
  width: '100%',
  height: '700px'
};

const center = {
  lat: 4.7827109,
  lng: -74.0426038
};

const libraries: ("geometry" | "places")[] = ["geometry", "places"];

interface MapComponentProps {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  estimatedCost: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onCostChange: (value: string) => void;
}

function MyMapComponent({
  origin,
  destination,
  departureDate,
  departureTime,
  estimatedCost,
  onOriginChange,
  onDestinationChange,
  onDateChange,
  onTimeChange,
  onCostChange
}: MapComponentProps) {

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [originMarker, setOriginMarker] = useState<{lat: number, lng: number} | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<{lat: number, lng: number} | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDnaSQL9XWXEVLt4BnIb5TWvWKG3Lg8gLU",
    libraries: libraries
  })

  // Geocodificar direcciones y calcular ruta
  useEffect(() => {
    if (!isLoaded || !origin || !destination) {
      console.log('Esperando datos:', { isLoaded, origin, destination });
      return;
    }

    console.log('Iniciando geocodificación para:', { origin, destination });

    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();

    // Geocodificar origen
    geocoder.geocode({ address: origin }, (resultsOrigin, statusOrigin) => {
      console.log('Geocoding origen:', statusOrigin, resultsOrigin);
      
      if (statusOrigin === 'OK' && resultsOrigin && resultsOrigin[0]) {
        const originLocation = resultsOrigin[0].geometry.location;
        const originCoords = {
          lat: originLocation.lat(),
          lng: originLocation.lng()
        };
        console.log('Origen encontrado:', originCoords);
        setOriginMarker(originCoords);

        // Geocodificar destino
        geocoder.geocode({ address: destination }, (resultsDest, statusDest) => {
          console.log('Geocoding destino:', statusDest, resultsDest);
          
          if (statusDest === 'OK' && resultsDest && resultsDest[0]) {
            const destLocation = resultsDest[0].geometry.location;
            const destCoords = {
              lat: destLocation.lat(),
              lng: destLocation.lng()
            };
            console.log('Destino encontrado:', destCoords);
            setDestinationMarker(destCoords);

            // Calcular ruta
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                console.log('Ruta calculada:', status);
                
                if (status === 'OK' && result) {
                  setDirectionsResponse(result);
                  
                  // Ajustar el mapa para mostrar toda la ruta
                  if (map && result.routes[0]) {
                    const bounds = new google.maps.LatLngBounds();
                    result.routes[0].overview_path.forEach(point => {
                      bounds.extend(point);
                    });
                    map.fitBounds(bounds);
                  }
                } else {
                  console.error('Error calculating route:', status);
                  setDirectionsResponse(null);
                }
              }
            );
          } else {
            console.error('Error geocoding destino:', statusDest);
          }
        });
      } else {
        console.error('Error geocoding origen:', statusOrigin);
      }
    });
  }, [origin, destination, isLoaded, map]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <div className="relative w-full h-[650px]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: false,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "poi.business",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "administrative.neighborhood",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {/* Mostrar marcadores solo si no hay ruta calculada */}
        {!directionsResponse && originMarker && (
          <Marker 
            position={originMarker}
            label="A"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }}
          />
        )}
        
        {!directionsResponse && destinationMarker && (
          <Marker 
            position={destinationMarker}
            label="B"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }}
          />
        )}

        {/* Mostrar la ruta si está calculada */}
        {directionsResponse && (
          <DirectionsRenderer 
            directions={directionsResponse}
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
      <CardMapComponent 
        origin={origin}
        destination={destination}
        departureDate={departureDate}
        departureTime={departureTime}
        estimatedCost={estimatedCost}
        onOriginChange={onOriginChange}
        onDestinationChange={onDestinationChange}
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
        onCostChange={onCostChange}
      />
    </div>
  )
}

export default MyMapComponent