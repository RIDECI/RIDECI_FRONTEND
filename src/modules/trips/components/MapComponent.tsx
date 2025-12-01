import { useMemo } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 4.7827109,
  lng: -74.0426038
};

function MapComponent() {
  // Para usar Google Maps, necesitas:
  // 1. Instalar: npm install @react-google-maps/api
  // 2. Usar una API key válida de Google Cloud Console
  // 
  // Por ahora, retornamos un placeholder con la estructura
  // que se verá cuando se integre completamente

  return (
    <div 
      style={containerStyle}
      className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden"
    >
      {/* Placeholder del mapa */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%22100%25%22%20height=%22100%25%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpattern%20id=%22grid%22%20width=%2240%22%20height=%2240%22%20patternUnits=%22userSpaceOnUse%22%3E%3Cpath%20d=%22M%2040%200L0%200L0%2040%22%20fill=%22none%22%20stroke=%22%23e0e0e0%22%20stroke-width=%220.5%22/%3E%3C/pattern%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20fill=%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-50" />
      
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">Mapa interactivo</p>
        <p className="text-sm text-gray-500 mt-1">Google Maps API Key requerida</p>
      </div>
    </div>
  );
}

export default MapComponent;
