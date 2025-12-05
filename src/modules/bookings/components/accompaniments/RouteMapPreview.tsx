interface RouteMapPreviewProps {
  mapImageUrl: string;
}

export function RouteMapPreview({ mapImageUrl }: RouteMapPreviewProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <img
        src={mapImageUrl}
        alt="Mapa de ruta"
        className="w-full h-48 object-cover"
      />
    </div>
  );
}