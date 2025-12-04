import { ArrowLeft, MapPin, LocateFixed, Clock, Car, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import type { TravelBackendResponse } from "../hooks/createTravelHook";
import { deleteTravelHook } from "../hooks/deleteTravelHook";



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
    const location = useLocation();
    const travel = location.state?.travel as TravelBackendResponse | undefined;
    
    console.log('Travel data in details:', travel);

    const handleConfirmDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas cancelar este viaje?')) {
            return;
        }
        
        try {
            await deleteTravelHook(id);
            alert('Viaje cancelado exitosamente');
            navigate('/sectionTravel');
        } catch (error) {
            console.error('Error al eliminar viaje:', error);
            alert('Error al cancelar el viaje. Por favor intenta de nuevo.');
        }
    };

    let availableSlotsText = 'Viaje completo';
    if (travel?.availableSlots && travel.availableSlots > 0) {
        const plural = travel.availableSlots > 1;
        availableSlotsText = `${travel.availableSlots} cupo${plural ? 's' : ''} disponible${plural ? 's' : ''}`;
    }

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
                        onClick={() => {
                            console.log('Navigating to edit with travel:', travel);
                            navigate('/travels', { state: { travel } });
                        }}
                        className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-6">
                        Editar Viaje
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-red-300 text-red-500 hover:bg-red-50 rounded-lg px-6"
                        onClick={() => {
                            if (travel?.id) {
                                handleConfirmDelete(travel.id);
                            } else {
                                console.error('No travel id to delete', travel);
                                alert('No se encontró el id del viaje para eliminar');
                            }
                        }}
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
                            value={travel?.origin.direction}
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
                            value={travel?.destiny.direction}
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
                            value={travel?.departureDateAndTime ? new Date(travel.departureDateAndTime).toLocaleString('es-CO') : mockTripDetails.departureDate}
                            readOnly
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 mt-1 w-64"
                        />
                    </div>
                </div>
            </div>
            <div className={`grid ${travel?.passengersId && travel.passengersId.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
                {travel?.passengersId && travel.passengersId.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Pasajeros confirmados</h2>
                        <div className="space-y-3">
                            {travel.passengersId.map((passengerId, index) => (
                                <div key={passengerId} className="bg-[#CAE8FF]/35 rounded-full border shadow-sm px-4 py-3 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                        <User className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Pasajero {index + 1}</p>
                                        <p className="text-gray-500 text-sm">ID: {passengerId}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                {availableSlotsText}
                            </p>
                        </div>
                    </div>
                )}

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