import { ArrowLeft, MapPin, LocateFixed, Clock, Car, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockTripDetails = {
    origin: "Portal Norte",
    destination: "Portal 80",
    departureDate: "7 de Septiembre 18:30 PM",
    passengers: [
        { id: 1, name: "Jorge rodriguez", avatar: "/placeholder-avatar.jpg", price: "5,000 COP" },
        { id: 2, name: "Jorge rodriguez", avatar: "/placeholder-avatar.jpg", price: "7,000 COP" },
        { id: 3, name: "Jorge rodriguez", avatar: "/placeholder-avatar.jpg", price: "8,000 COP" }
    ],
    vehicle: {
        brand: "Renault Duster",
        plate: "FVK 46B",
        color: "Negro"
    }
};
function DetailsOfTravelComponent(){
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/sectionTravel')}
                    className="hover:bg-gray-100"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-3xl font-bold">Detalles de viaje</h1>
                <div className="ml-auto flex gap-3">
                    <Button
                        onClick={() => navigate('/travels')}
                        className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-6">
                        Editar Viaje
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-red-300 text-red-500 hover:bg-red-50 rounded-lg px-6"
                    >
                        Cancelar viaje
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-1" />
                    <div>
                        <p className="text-sm font-semibold">Origen</p>
                        <input 
                            type="text" 
                            value={mockTripDetails.origin}
                            readOnly
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 mt-1 w-56"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <LocateFixed className="w-5 h-5 mt-1" />
                    <div>
                        <p className="text-sm font-semibold">Destino</p>
                        <input 
                            type="text" 
                            value={mockTripDetails.destination}
                            readOnly
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 mt-1 w-56"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 mt-1" />
                    <div>
                        <p className="text-sm font-semibold">Fecha y Hora de Salida</p>
                        <input 
                            type="text" 
                            value={mockTripDetails.departureDate}
                            readOnly
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 mt-1 w-64"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Pasajeros confirmados</h2>
                    <div className="space-y-3">
                        {mockTripDetails.passengers.map((passenger) => (
                            <div key={passenger.id} className="bg-[#CAE8FF]/35 rounded-full border shadow-sm px-4 py-3 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    <User className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{passenger.name}</p>
                                    <p className="text-[#0B8EF5] font-semibold">{passenger.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <h2 className="text-2xl font-bold mb-4 text-center">Información del vehículo</h2>
                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <div className="flex items-center justify-between pb-6">
                            <div className="flex items-center gap-3">
                                <Car className="w-5 h-5" />
                                <div>
                                    <p className="text-xs text-gray-600">Marca y modelo</p>
                                    <p className="font-semibold">{mockTripDetails.vehicle.brand}</p>
                                </div>
                            </div>
                            <div className="bg-yellow-400 border-2 border-black rounded px-4 py-1">
                                <p className="font-bold text-sm">{mockTripDetails.vehicle.plate}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200"></div>
                        <div className="flex items-center gap-3 pt-6">
                            <div className="w-8 h-8 rounded-full bg-black"></div>
                            <div>
                                <p className="text-xs text-gray-600">Color</p>
                                <p className="font-semibold">{mockTripDetails.vehicle.color}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-64">
                <Button className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-8">
                    Chat Con Pasajeros
                </Button>
                <Button className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-8">
                    Seguimiento del Viaje
                </Button>
            </div>
        </div>
    );
}


export default DetailsOfTravelComponent;