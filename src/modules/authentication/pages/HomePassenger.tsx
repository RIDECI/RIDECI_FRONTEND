import React, { useState } from 'react';
import { Calendar, MapPin, Navigation, Star, ArrowRight, CheckCircle, AlertTriangle, HandCoins, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

export const HomePassenger: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    // Ofertas de viaje disponibles
    const allMockOffers = [
        {
            id: 1,
            driver: 'Carlos Santana',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            rating: 4.5,
            carType: 'Volkswagen Nivus',
            startPoint: 'Universidad Nacional',
            endPoint: 'Portal 80',
            time: '18:30',
            price: '6.000 COP',
            availableSeats: 3,
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: 2,
            driver: 'María González',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            rating: 4.8,
            carType: 'Mazda CX-5',
            startPoint: 'Centro',
            endPoint: 'Aeropuerto',
            time: '15:45',
            price: '8.500 COP',
            availableSeats: 2,
            statusColor: 'bg-yellow-100 text-yellow-700'
        },
        {
            id: 3,
            driver: 'Juan Pérez',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            rating: 4.2,
            carType: 'Chevrolet Spark',
            startPoint: 'Portal Norte',
            endPoint: 'Universidad',
            time: '07:00',
            price: '5.500 COP',
            availableSeats: 1,
            statusColor: 'bg-red-100 text-red-700'
        }
    ];

    // Ordenar ofertas por cupos disponibles (menor a mayor = más urgente primero)
    const sortedOffers = [...allMockOffers].sort((a, b) => a.availableSeats - b.availableSeats);

    // Notificaciones
    const notifications = [
        {
            id: 1,
            icon: CheckCircle,
            iconColor: 'text-green-600',
            message: 'Tu viaje ha sido reservado con éxito.',
            time: 'Hace 2 min'
        },
        {
            id: 2,
            icon: AlertTriangle,
            iconColor: 'text-orange-400',
            message: 'Te han generado un nuevo reporte.',
            time: 'Hace 9 hrs'
        },
        {
            id: 3,
            icon: HandCoins,
            iconColor: 'text-blue-600',
            message: 'Tu viaje ha finalizado. Es momento de pagar.',
            time: 'Hace 1 día'
        }
    ];

    const handleReserve = () => {
        if (!selectedDate || !origin || !destination) {
            console.log('Por favor completa todos los campos');
            return;
        }
        
        // Navegar a la página de búsqueda con los parámetros
        navigate('/app/searchTrips', {
            state: {
                date: selectedDate,
                origin,
                destination
            }
        });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'dd/mm/aaaa';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="flex-1 min-h-screen bg-white">
            <div className="p-6 md:p-8">
                {/* Reservar viaje */}
                <div className="mb-12">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
                        {/* Form Section */}
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">Reserva tu viaje ahora</h2>
                                <p className="text-base text-gray-600">
                                    Viaja seguro y confiado con nosotros
                                </p>
                            </div>

                            {/* Fecha de partida */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent cursor-pointer"
                                    style={{backgroundColor: '#E8F4FF'}}
                                    onClick={() => document.getElementById('date-input-passenger')?.showPicker()}
                                >
                                    <Calendar className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-600 mb-1 font-medium">
                                            Fecha de partida
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {selectedDate ? formatDate(selectedDate) : 'dd/mm/aaaa'}
                                        </div>
                                        <input
                                            id="date-input-passenger"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="absolute opacity-0 pointer-events-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Partida Input */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                    style={{backgroundColor: '#E8F4FF'}}
                                >
                                    <MapPin className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <Input
                                        type="text"
                                        placeholder="Partida"
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-600 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Destino Input */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                    style={{backgroundColor: '#E8F4FF'}}
                                >
                                    <Navigation className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <Input
                                        type="text"
                                        placeholder="Destino"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-600 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Buscar Button */}
                            <Button
                                onClick={handleReserve}
                                className="w-full text-white font-semibold shadow-lg hover:opacity-90 h-12"
                                style={{
                                    backgroundColor: '#0B8EF5',
                                    borderRadius: '15px'
                                }}
                            >
                                Buscar
                            </Button>
                        </div>

                        {/* Image Section */}
                        <div className="hidden lg:block">
                            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=500&fit=crop"
                                    alt="Pasajeros abordando vehículo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ofertas de viaje */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">Ofertas de viaje</h2>
                            <p className="text-base text-gray-600">
                                Mira los viajes que tenemos en este momento
                            </p>
                        </div>
                        <Button
                            onClick={() => navigate('/app/searchTrips')}
                            className="text-white font-semibold shadow-lg hover:opacity-90 px-6 py-3"
                            style={{
                                backgroundColor: '#0B8EF5',
                                borderRadius: '8px'
                            }}
                        >
                            Más ofertas
                        </Button>
                    </div>

                    {/* Offer Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedOffers.map((offer) => (
                            <div
                                key={offer.id}
                                className="rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                style={{backgroundColor: '#E8F4FF'}}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                        <img
                                            src={offer.image}
                                            alt={offer.driver}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-semibold text-sm text-gray-900 truncate">
                                                {offer.driver}
                                            </h3>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <span className="text-xs text-gray-600">{offer.rating}</span>
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"/>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">{offer.carType}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/app/tripDetails`, { state: { tripId: offer.id } })}
                                        className="shrink-0 -mt-1 -mr-1 p-1 hover:bg-blue-200 rounded-lg transition-colors">
                                        <ArrowRight className="w-5 h-5 text-gray-900"/>
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                                        <span className="truncate">{offer.startPoint}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Navigation className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                                        <span className="truncate">{offer.endPoint}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5"/>
                                        <span>{offer.time}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold" style={{color: '#0B8EF5'}}>
                                        {offer.price}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${offer.statusColor}`}>
                                        <Users className="w-3.5 h-3.5"/>
                                        {offer.availableSeats} {offer.availableSeats === 1 ? 'cupo' : 'cupos'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Últimas notificaciones */}
                <div>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">Últimas notificaciones</h2>
                            <p className="text-base text-gray-600">
                                Entérate de lo que está pasando
                            </p>
                        </div>
                        <Button
                            onClick={() => navigate('/app/myTrips')}
                            className="text-white font-semibold shadow-lg hover:opacity-90 px-6 py-3"
                            style={{
                                backgroundColor: '#0B8EF5',
                                borderRadius: '8px'
                            }}
                        >
                            Ver mis Viajes
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {notifications.map((notification) => {
                            const IconComponent = notification.icon;
                            return (
                                <div
                                    key={notification.id}
                                    className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 bg-white hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="shrink-0">
                                        <IconComponent className={`w-8 h-8 ${notification.iconColor}`}/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 font-medium">
                                            {notification.message}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-sm text-gray-500">
                                        {notification.time}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}