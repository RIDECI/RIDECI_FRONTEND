import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Navigation, Star, ArrowRight, CheckCircle, AlertTriangle, HandCoins, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useGetTravelsByDriver } from '@/modules/trips';
import { useGetUserById } from '@/modules/authentication';

export const HomeDriver: React.FC = () => {
    const navigate = useNavigate();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDateAndTime, setDepartureDateAndTime] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');
    const userId = localStorage.getItem('userId') || '';
    const userIdNumber = userId ? parseInt(userId, 10) : undefined;
    
    const { user: currentUser, loading: loadingUser } = useGetUserById(userIdNumber);
    
    const { travels, loading: loadingTravels, error: errorTravels } = useGetTravelsByDriver(userId);

    console.log('HomeDriver - userId:', userId);
    console.log('HomeDriver - currentUser:', currentUser);
    console.log('HomeDriver - loadingUser:', loadingUser);
    console.log('HomeDriver - travels:', travels);
    console.log('HomeDriver - loading:', loadingTravels);
    console.log('HomeDriver - error:', errorTravels);


    const transformedTrips = useMemo(() => {
        if (!travels || travels.length === 0) return [];

        const mockDriverImages = [
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
        ];

        // Obtener nombre del usuario
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const displayName = currentUser?.name || userName || (userEmail ? userEmail.split('@')[0] : 'Usuario');

        return travels.map((travel, index) => {
            const departureDate = new Date(travel.departureDateAndTime);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const travelDate = new Date(departureDate);
            travelDate.setHours(0, 0, 0, 0);

            let status = 'Programado';
            let statusColor = 'bg-green-100 text-green-700';

            if (travelDate < today) {
                status = 'Pasado';
                statusColor = 'bg-yellow-100 text-yellow-700';
            } else if (travelDate.getTime() === today.getTime()) {
                status = 'Hoy';
                statusColor = 'bg-yellow-200 text-yellow-800';
            }

            const time = departureDate.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            });

            return {
                id: travel.id,
                passenger: displayName,
                image: mockDriverImages[index % mockDriverImages.length],
                rating: 4.5,
                carType: 'Vehículo particular',
                startPoint: travel.origin.direction,
                endPoint: travel.destiny.direction,
                time: time,
                date: travel.departureDateAndTime.split('T')[0],
                price: `${travel.estimatedCost.toLocaleString('es-CO')} COP`,
                status: status,
                statusColor: statusColor
            };
        });
    }, [travels, currentUser]);

    // Filtrar solo viajes de Hoy y Programado, ordenados por fecha
    const sortedTrips = transformedTrips
        .filter(trip => trip.status === 'Hoy' || trip.status === 'Programado')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const displayedTrips = sortedTrips.slice(0, 3);

    // Mock trips comentado - ya no se usa
    /*const allMockTrips = [
        {
            id: 1,
            passenger: 'Carlos Santana',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            rating: 3.5,
            carType: 'Sedan',
            startPoint: 'Universidad',
            endPoint: 'Portal 80',
            time: '18:30',
            date: '2024-12-12',
            price: '6.000 COP',
            status: 'Hoy',
            statusColor: 'bg-yellow-200 text-yellow-800'
        },
        {
            id: 2,
            passenger: 'María González',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            rating: 4.8,
            carType: 'SUV',
            startPoint: 'Centro',
            endPoint: 'Aeropuerto',
            time: '15:45',
            date: '2024-11-22',
            price: '8.500 COP',
            status: 'Pasado',
            statusColor: 'bg-yellow-100 text-yellow-700'
        },
        {
            id: 3,
            passenger: 'Juan Pérez',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            rating: 4.2,
            carType: 'Sedan',
            startPoint: 'Portal Norte',
            endPoint: 'Universidad',
            time: '07:00',
            date: '2024-12-19',
            price: '5.500 COP',
            status: 'Programado',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: 4,
            passenger: 'Ana Rodríguez',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            rating: 4.9,
            carType: 'Hatchback',
            startPoint: 'Suba',
            endPoint: 'Chapinero',
            time: '09:15',
            date: '2024-12-18',
            price: '7.000 COP',
            status: 'Programado',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: 5,
            passenger: 'Luis Martínez',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            rating: 3.8,
            carType: 'Pickup',
            startPoint: 'Fontibón',
            endPoint: 'Soacha',
            time: '14:30',
            date: '2024-11-17',
            price: '6.500 COP',
            status: 'Pasado',
            statusColor: 'bg-yellow-100 text-yellow-700'
        },
        {
            id: 6,
            passenger: 'Patricia Silva',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
            rating: 5.0,
            carType: 'Sedan',
            startPoint: 'Usaquén',
            endPoint: 'La Calera',
            time: '16:00',
            date: '2024-12-16',
            price: '9.000 COP',
            status: 'Programado',
            statusColor: 'bg-green-100 text-green-700'
        }
    ];*/

    // Notificaciones
    const notifications = [
        {
            id: 1,
            icon: CheckCircle,
            iconColor: 'text-green-600',
            message: 'Tu viaje ha sido reservado con éxito.',
            time: 'Hace 3 min'
        },
        {
            id: 2,
            icon: AlertTriangle,
            iconColor: 'text-orange-400',
            message: 'Te han generado un nuevo reporte.',
            time: 'Hace 8 min'
        },
        {
            id: 3,
            icon: HandCoins,
            iconColor: 'text-blue-600',
            message: 'Tu viaje ha finalizado. Es momento de pagar.',
            time: 'Hace 10 min'
        }
    ];

    const handleOffer = () => {
        // Navegar a la página de creación de viajes
        navigate('/app/travel', {
            state: {
                prefilledData: {
                    origin: origin || '',
                    destination: destination || '',
                    departureDateAndTime: departureDateAndTime || '',
                    estimatedCost: estimatedCost || ''
                }
            }
        });
    };

    const handleCostChange = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        setEstimatedCost(formatted);
    };

    const formatDisplayDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="flex-1 min-h-screen bg-white">
            <div className="p-6 md:p-8">
                {/* Oferta un viaje */}
                <div className="mb-12">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
                        {/* Form Section */}
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">Oferta un viaje</h2>
                                <p className="text-base text-gray-600">
                                    Ofrece tus servicios a la comunidad
                                </p>
                            </div>

                            {/* Origin Input */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                    style={{backgroundColor: '#E8F4FF'}}
                                >
                                    <MapPin className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <Input
                                        type="text"
                                        placeholder="Punto de partida"
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-600 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Destination Input */}
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

                            {/* Fecha de Salida Input */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                    style={{backgroundColor: '#E8F4FF'}}
                                >
                                    <Calendar className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <Input
                                        type="datetime-local"
                                        placeholder="Fecha de Salida"
                                        value={departureDateAndTime}
                                        onChange={(e) => setDepartureDateAndTime(e.target.value)}
                                        className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-600 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Costo Estimado Input */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                    style={{backgroundColor: '#E8F4FF'}}
                                >
                                    <CircleDollarSign className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <Input
                                        type="text"
                                        placeholder="Costo Estimado (COP)"
                                        value={estimatedCost}
                                        onChange={(e) => handleCostChange(e.target.value)}
                                        className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-600 text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Ofertar Button */}
                            <Button
                                onClick={handleOffer}
                                className="w-full text-white font-semibold shadow-lg hover:opacity-90 h-12"
                                style={{
                                    backgroundColor: '#0B8EF5',
                                    borderRadius: '15px'
                                }}
                            >
                                Ofertar
                            </Button>
                        </div>

                        {/* Image Section */}
                        <div className="hidden lg:block">
                            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=500&fit=crop"
                                    alt="Conductor ofreciendo viaje"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mis viajes */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">Mis viajes</h2>
                            <p className="text-base text-gray-600">
                                Para que recuerdes los viajes que tienes programados
                            </p>
                            {loadingTravels && <p className="text-sm text-blue-600 mt-2">Cargando viajes...</p>}
                            {errorTravels && <p className="text-sm text-red-600 mt-2">Error: {errorTravels}</p>}
                        </div>
                        <Button
                            onClick={() => navigate('/app/sectionTravel')}
                            className="text-white font-semibold shadow-lg hover:opacity-90 px-6 py-3"
                            style={{
                                backgroundColor: '#0B8EF5',
                                borderRadius: '8px'
                            }}
                        >
                            Ver mis viajes
                        </Button>
                    </div>

                    {/* Trip Cards Grid */}
                    {displayedTrips.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg mb-2">No tienes viajes programados</p>
                            <p className="text-gray-400 text-sm">Crea tu primer viaje usando el formulario arriba</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayedTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                style={{backgroundColor: '#E8F4FF'}}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                        <img
                                            src={trip.image}
                                            alt={trip.passenger}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-semibold text-sm text-gray-900 truncate">
                                                {trip.passenger}
                                            </h3>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <span className="text-xs text-gray-600">{trip.rating}</span>
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"/>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">{trip.carType}</p>
                                    </div>
                                    <button
                                        className="shrink-0 -mt-1 -mr-1 p-1 hover:bg-blue-200 rounded-lg transition-colors">
                                        <ArrowRight className="w-5 h-5 text-gray-900"/>
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                                        <span className="truncate">{trip.startPoint}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Navigation className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                                        <span className="truncate">{trip.endPoint}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5"/>
                                        <span>{trip.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5"/>
                                        <span>{formatDisplayDate(trip.date)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold" style={{color: '#0B8EF5'}}>
                                        {trip.price}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${trip.statusColor}`}>
                                        {trip.status}
                                    </span>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
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
                            className="text-white font-semibold shadow-lg hover:opacity-90 px-6 py-3"
                            style={{
                                backgroundColor: '#0B8EF5',
                                borderRadius: '8px'
                            }}
                        >
                            Ver mis Notificaciones
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