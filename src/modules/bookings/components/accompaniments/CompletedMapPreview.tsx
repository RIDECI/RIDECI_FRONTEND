interface CompletedMapPreviewProps {
  mapImageUrl: string;
}

export function CompletedMapPreview({ mapImageUrl }: CompletedMapPreviewProps) {
  return (
    <div className="rounded-xl overflow-hidden mb-6">
      <img
        src={mapImageUrl}
        alt="Mapa de ruta completada"
        className="w-full h-48 object-cover"
      />
    </div>
  );
}