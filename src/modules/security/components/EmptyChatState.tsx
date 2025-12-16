import { MessageCircle } from "lucide-react";

export function EmptyChatState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mb-6">
          {/* Círculo con solo borde (sin relleno) */}
          <div className="relative inline-flex items-center justify-center">
            {/* Borde del círculo (sin fondo) */}
            <div className="w-32 h-32 border-2 border-blue-300 rounded-full"></div>
            {/* Icono dentro */}
            <MessageCircle className="h-24 w-24 text-blue-500 absolute" />
          </div>
        </div>
        {/* Texto "Tus mensajes" en color azul */}
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Tus mensajes</h2>
        <p className="text-blue-600 font-medium max-w-md mx-auto mb-8">
          Selecciona alguno de los chats disponibles para comenzar a comunicarte.
        </p>
      </div>
    </div>
  );
}