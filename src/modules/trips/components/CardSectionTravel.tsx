import { useState } from "react";
import { Car, Search, MapPin, LocateFixed, Clock, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGetTravelsByDriver } from "../hooks/getTravelsByDriverId";

function CardSectionTravel(){
    const navigate = useNavigate();
    const driverId = "1";
    const { travels, loading, error } = useGetTravelsByDriver(driverId);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <MapPinned className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">Ver mis viajes</h1>
                </div>
                <Button 
                    onClick={() => navigate('/app/travels')}
                    className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-6"
                >
                    Añadir viaje
                </Button>
            </div>
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                    placeholder="Buscar por destino, id o fecha"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 rounded-lg bg-[#CAE8FF]/35"
                />
            </div>

            {loading && (
                <div className="text-center py-8">
                    <p className="text-gray-500">Cargando viajes...</p>
                </div>
            )}

            {error && (
                <div className="text-center py-8">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            )}

            {!loading && !error && travels.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                    <Car className="w-24 h-24 text-gray-300 mb-6 animate-[slideRight_2s_ease-in-out_infinite]" 
                         style={{ 
                           animation: 'slideRight 2s ease-in-out infinite',
                         }} />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3 text-center">
                        No tienes viajes creados
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 text-center max-w-md">
                        Crea tu primer viaje haciendo clic en "Añadir viaje"
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {travels
                    .filter(trip => {
                        const search = searchTerm.toLowerCase();
                        return (
                            trip.origin.direction.toLowerCase().includes(search) ||
                            trip.destiny.direction.toLowerCase().includes(search) ||
                            trip.id.toLowerCase().includes(search) ||
                            new Date(trip.departureDateAndTime).toLocaleDateString().includes(search)
                        );
                    })
                    .map((trip) => {
                        const statusMap: Record<string, { label: string; className: string }> = {
                            'ACTIVE': { label: 'Programado', className: 'bg-yellow-100 text-yellow-700' },
                            'IN_COURSE': { label: 'En curso', className: 'bg-green-100 text-green-700' },
                            'COMPLETED': { label: 'Completado', className: 'bg-blue-100 text-blue-700' },
                            'CANCELLED': { label: 'Cancelado', className: 'bg-red-100 text-red-700' },
                        };
                        
                        const status = statusMap[trip.status] || { label: trip.status, className: 'bg-gray-100 text-gray-700' };
                        const travelDate = new Date(trip.departureDateAndTime);
                        const formattedTime = travelDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
                        const formattedCost = trip.estimatedCost.toLocaleString('es-CO');

                        return (
                            <Card key={trip.id} className="gap-4 bg-[#CAE8FF]/35">
                                <CardHeader>
                                    <CardTitle className="flex items-start justify-between">
                                        <span className="text-base">{trip.destiny.direction.split(',')[0]}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${status.className}`}>
                                            {status.label}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className="truncate">{trip.origin.direction.split(',')[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <LocateFixed className="w-4 h-4" />
                                        <span className="truncate">{trip.destiny.direction.split(',')[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{formattedTime}</span>
                                    </div>
                                    <div className="text-[#0B8EF5] font-semibold text-base">
                                        ${formattedCost} COP
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {trip.availableSlots > 0 
                                            ? `${trip.availableSlots} ${trip.availableSlots === 1 ? 'cupo' : 'cupos'} disponible${trip.availableSlots === 1 ? '' : 's'}`
                                            : 'Sin cupos'
                                        }
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => navigate('/app/detailsOfTravel', { state: { travel: trip } })}
                                        className="w-full bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg"
                                    >
                                        Ver detalles
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
            </div>
        </div>
    )
}
export default CardSectionTravel;