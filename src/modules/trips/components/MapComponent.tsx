import { GoogleMap, useJsApiLoader} from '@react-google-maps/api'
function MapComponent(){
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBmSX5305EUPHA58uu9DcUOHDXzx3cSSjk"
    });
    return isLoaded ? (
        <GoogleMap />
    ) : null;

}

export default MapComponent;
