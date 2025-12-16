import { Button } from "@/components/ui/button";
import { useGlobalNotifications } from "../../../context/GlobalNotificationContext";
import { User } from "lucide-react";

export default function UsersPage() {
    const { addNotification } = useGlobalNotifications();

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <User className="w-8 h-8" /> Gestión de Usuarios
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Mi Perfil</h2>
                <div className="space-y-4 max-w-md">
                    <div className="flex gap-4">
                        <input className="border p-2 rounded w-full" placeholder="Nombre de usuario" defaultValue="Jorge Rodriguez" />
                    </div>

                    <Button
                        onClick={() => addNotification({ type: "success", title: "Perfil actualizado correctamente" })}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Guardar Cambios
                    </Button>

                    <hr className="my-4" />

                    <h3 className="font-medium">Seguridad</h3>
                    <Button
                        onClick={() => addNotification({ type: "success", title: "Alerta de seguridad activada" })}
                        className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 w-full justify-start"
                    >
                        Activar Alerta SOS
                    </Button>
                </div>
            </div>
        </div>
    );
}
