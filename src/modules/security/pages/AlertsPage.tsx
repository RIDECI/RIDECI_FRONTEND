import { Button } from "@/components/ui/button";
import { useGlobalNotifications } from "../../../context/GlobalNotificationContext";
import { Siren } from "lucide-react";

export default function AlertsPage() {
    const { addNotification } = useGlobalNotifications();

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Siren className="w-8 h-8 text-red-500" /> Centro de Alertas
            </h1>

            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4 text-red-700">Alertas de Pánico</h2>
                <p className="mb-4 text-red-600">En caso de emergencia, utiliza estos botones para notificar inmediatamente.</p>

                <div className="flex gap-4">
                    <Button
                        onClick={() => addNotification({ type: "success", title: "ALERTA SOS ENVIADA A CONTACTOS Y POLICÍA" })}
                        className="bg-red-600 text-white hover:bg-red-700 px-8 py-6 text-lg font-bold"
                    >
                        BOTÓN DE PÁNICO
                    </Button>
                    <Button
                        onClick={() => addNotification({ type: "info", title: "Ubicación compartida en tiempo real" })}
                        className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                    >
                        Compartir Ubicación
                    </Button>
                </div>
            </div>
        </div>
    );
}
