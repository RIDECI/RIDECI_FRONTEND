import { Button } from "@/components/ui/button";
import { useGlobalNotifications } from "../../../context/GlobalNotificationContext";
import { Star, Car } from "lucide-react";

export default function DriversPage() {
    const { addNotification } = useGlobalNotifications();

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Car className="w-8 h-8" /> Conductores Cercanos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Juan Perez</h3>
                                <p className="text-sm text-gray-500">Renault Logan - FVK 123</p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <span>4.8</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => addNotification({ type: "trip", title: "Solicitud enviada al conductor" })}
                                className="bg-blue-600 text-white flex-1"
                            >
                                Solicitar Viaje
                            </Button>
                            <Button
                                onClick={() => addNotification({ type: "success", title: "Conductor guardado en favoritos" })}
                                variant="outline"
                                className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                            >
                                Favorito
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
