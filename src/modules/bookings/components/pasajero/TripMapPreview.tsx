import React from 'react';
import mapImage from '../../utils/map.png'; 

interface TripMapPreviewProps {
  mapImageUrl?: string;
}

export const TripMapPreview: React.FC<TripMapPreviewProps> = ({ mapImageUrl }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 mb-6">
      {mapImageUrl ? (
        <img 
          src={mapImageUrl} 
          alt="Mapa de ruta" 
          className="w-full h-64 object-cover"
        />
      ) : (
        <img 
          src={mapImage} 
          alt="Mapa por defecto" 
          className="w-full h-64 object-cover"
        />
      )}
    </div>
  );
};