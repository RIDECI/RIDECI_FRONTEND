import { MessageCircle } from "lucide-react";

export function EmptyChatState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mb-6">
          <MessageCircle className="h-24 w-24 text-blue-500 mx-auto" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tus mensajes</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Selecciona un chat para empezar a comunicarte.
        </p>
      </div>
    </div>
  );
}