import { Car, Search, MapPin, LocateFixed, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGlobalNotifications } from "../../../context/GlobalNotificationContext";
const mockTrips = [
    {
        id: 1,
        title: "Viaje a portal 80",
        status: "en curso",
        origin: "Universidad",
        destination: "Portal 80",
        time: "15:30",
        price: "6,000 COP"
    },
    {
        id: 2,
        title: "Viaje a portal norte",
        status: "programado",
        origin: "Universidad",
        destination: "Portal 80",
        time: "17:30",
        price: "6,000 COP"
    },
    {
        id: 3,
        title: "Viaje a \"lugar\"",
        status: "programado",
        origin: "Universidad",
        destination: "Portal 80",
        time: "19:30",
        price: "6,000 COP"
    },
    {
        id: 4,
        title: "Viaje a \"lugar\"",
        status: "programado",
        origin: "Universidad",
        destination: "Portal 80",
        time: "20:30",
        price: "6,000 COP"
    },
    {
        id: 5,
        title: "Viaje a \"lugar\"",
        status: "programado",
        origin: "Universidad",
        destination: "Portal 80",
        time: "21:30",
        price: "6,000 COP"
    },
    {
        id: 6,
        title: "Viaje a \"lugar\"",
        status: "programado",
        origin: "Universidad",
        destination: "Portal 80",
        time: "22:30",
        price: "6,000 COP"
    }
];
function CardSectionTravel() {
    const navigate = useNavigate();
    const { addNotification } = useGlobalNotifications();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Car className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">Ver mis viajes</h1>
                </div>
                <Button
                    onClick={() => {
                        // Simulating adding a trip
                        addNotification({
                            type: "success",
                            title: "Nuevo viaje creado exitosamente"
                        });
                        navigate('/travels');
                    }}
                    className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-6"
                >
                    Añadir viaje
                </Button>
            </div>
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Buscar por destino, id o fecha"
                    className="pl-10 h-12 rounded-lg bg-[#CAE8FF]/35"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTrips.map((trip) => (
                    <Card key={trip.id} className="gap-4 bg-[#CAE8FF]/35">
                        <CardHeader>
                            <CardTitle className="flex items-start justify-between">
                                <span>{trip.title}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${trip.status === 'en curso'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {trip.status}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{trip.origin}</span>
                                <LocateFixed className="w-4 h-4" />
                                <span>{trip.destination}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{trip.time}</span>
                            </div>
                            <div className="text-blue-600 font-semibold text-base">
                                {trip.price}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => navigate('/detailsOfTravel')}
                                className="w-full bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg"
                            >
                                Ver detalles
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default CardSectionTravel;