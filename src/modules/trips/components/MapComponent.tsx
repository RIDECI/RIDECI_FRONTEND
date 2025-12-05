import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import CardMapComponent from './CardMapComponent';

const containerStyle = {
  width: '100%',
  height: '700px'
};

const center = {
  lat: 4.7827109,
  lng: -74.0426038
};

const libraries: ("geometry")[] = ["geometry"];

interface MapComponentProps {
  origin: string;
  destination: string;
  departureDateAndTime: string;
  estimatedCost: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCostChange: (value: string) => void;
}

function MyMapComponent({
  origin,
  destination,
  departureDateAndTime,
  estimatedCost,
  onOriginChange,
  onDestinationChange,
  onDateChange,
  onCostChange
}: MapComponentProps) {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDnaSQL9XWXEVLt4BnIb5TWvWKG3Lg8gLU",
    libraries: libraries
  })
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <div className="relative w-full h-[650px]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
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
      </GoogleMap>
      <CardMapComponent 
        origin={origin}
        destination={destination}
        departureDateAndTime={departureDateAndTime}
        estimatedCost={estimatedCost}
        onOriginChange={onOriginChange}
        onDestinationChange={onDestinationChange}
        onDateChange={onDateChange}
        onCostChange={onCostChange}
      />
    </div>
  )
}

export default MyMapComponent