import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import CardMapComponent from './CardMapComponent';

const containerStyle = {
  width: '100%',
  height: '650px'
};

const center = {
  lat: 4.7827109,
  lng: -74.0426038
};

function MyMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDnaSQL9XWXEVLt4BnIb5TWvWKG3Lg8gLU"
  })
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <div className="relative w-full h-[650px]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      >
      </GoogleMap>
      <CardMapComponent />
    </div>
  )
}

export default MyMapComponent