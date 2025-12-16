import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calendar, MapPin, Navigation, Star, ArrowRight, CheckCircle, AlertTriangle, HandCoins, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useGetAllTravels } from '@/modules/trips';
import type { User } from '@/modules/authentication/types/user';
import { useGlobalNotifications } from '@/context/GlobalNotificationContext';

export const HomePassenger: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [driversInfo, setDriversInfo] = useState<Record<number, User>>({});
    const fetchedDriverIds = useRef<Set<number>>(new Set());
    
    // Obtener todos los viajes desde el API
    const { travels, loading: loadingTravels, error: errorTravels, refetch: refetchTravels } = useGetAllTravels();

    const { addNotification } = useGlobalNotifications();

    // Refrescar viajes cuando el componente se monta o cuando se vuelve de otra página
    useEffect(() => {
        refetchTravels();
        console.log('🔄 Refrescando lista de viajes...');

        // Notificación de bienvenida (solo una vez por sesión)
        const hasWelcomeNotification = sessionStorage.getItem('welcome_notification_shown');
        if (!hasWelcomeNotification) {
            addNotification({
                title: '¡Bienvenido a RideCity! Nos alegra verte de nuevo.',
                type: 'success',
            });
            sessionStorage.setItem('welcome_notification_shown', 'true');
        }
    }, []);

    // Obtener información de conductores
    useEffect(() => {
        const fetchDriversInfo = async () => {
            if (!travels || travels.length === 0) return;

            const driverIds = new Set<number>();
            travels.forEach(travel => {
                const id = travel.driverId || travel.organizerId;
                if (id && !fetchedDriverIds.current.has(id)) {
                    driverIds.add(id);
                }
            });

            if (driverIds.size === 0) return;

            const driversData: Record<number, User> = { ...driversInfo };
            
            await Promise.all(
                Array.from(driverIds).map(async (driverId) => {
                    try {
                        const response = await fetch(
                            `https://kratosuser-managementbackend-production.up.railway.app/users/${driverId}`,
                            {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                            }
                        );
                        
                        if (response.ok) {
                            const user: User = await response.json();
                            driversData[driverId] = user;
                            fetchedDriverIds.current.add(driverId);
                        }
                    } catch (err) {
                        console.error(`Error fetching driver ${driverId}:`, err);
                    }
                })
            );

            setDriversInfo(driversData);
        };

        fetchDriversInfo();
    }, [travels?.length]);

    const mockDriverImages = [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    ];

    // Filtrar viajes por destino
    const filteredTravels = useMemo(() => {
        if (!travels || travels.length === 0) return [];
        
        const activeTravels = travels.filter(travel => travel.status === 'ACTIVE');
        
        // Si no hay destino escrito, devolver todos
        if (!destination.trim()) return activeTravels;
        
        // Filtrar por destino
        const searchTerm = destination.toLowerCase().trim();
        return activeTravels.filter(travel => 
            travel.destiny.direction.toLowerCase().includes(searchTerm)
        );
    }, [travels, destination]);

    const travelOffers = useMemo(() => {
        if (!filteredTravels || filteredTravels.length === 0) return [];

        return filteredTravels
            .map((travel, index) => {
                // Formatear fecha y hora
                const departureDate = new Date(travel.departureDateAndTime);
                const time = departureDate.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });

                // Determinar color según disponibilidad
                let statusColor = 'bg-green-100 text-green-700';
                if (travel.availableSlots <= 1) {
                    statusColor = 'bg-red-100 text-red-700';
                } else if (travel.availableSlots <= 2) {
                    statusColor = 'bg-yellow-100 text-yellow-700';
                }

                // Obtener información del conductor
                const driverId = travel.driverId || travel.organizerId || 0;
                const driverInfo = driversInfo[driverId];
                
                // Si es el conductor actual y no se pudo cargar desde el API, usar datos del localStorage
                const currentUserId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                const userEmail = localStorage.getItem('userEmail');
                let driverName = driverInfo?.name || `Conductor ${driverId}`;
                
                if (driverId.toString() === currentUserId && !driverInfo) {
                    // Priorizar nombre del JWT, luego email
                    if (userName) {
                        driverName = userName;
                    } else if (userEmail) {
                        driverName = userEmail.split('@')[0];
                    }
                }
                
                // Debug log
                console.log(`Travel ${travel.id} - driverId: ${driverId}, driverInfo:`, driverInfo, 'name:', driverName);

                return {
                    id: travel.id,
                    driverId: driverId,
                    driver: driverName,
                    image: mockDriverImages[index % mockDriverImages.length],
                    rating: (4.0 + Math.random() * 1.0).toFixed(1), // Rating mock entre 4.0 y 5.0
                    carType: 'Vehículo particular',
                    startPoint: travel.origin.direction,
                    endPoint: travel.destiny.direction,
                    time: time,
                    price: `${travel.estimatedCost.toLocaleString('es-CO')} COP`,
                    availableSeats: travel.availableSlots,
                    statusColor: statusColor,
                    fullDate: departureDate
                };
            })
            .sort((a, b) => a.availableSeats - b.availableSeats); // Ordenar por urgencia
    }, [filteredTravels, driversInfo]);

    // Usar ofertas reales o mostrar mensaje de carga
    const sortedOffers = travelOffers.length > 0 ? travelOffers.slice(0, 6) : [];
    
    // Determinar si mostrar mensaje de recomendación
    const showRecommendationMessage = destination.trim() && filteredTravels.length === 0 && travels.length > 0;
    
    // Si hay búsqueda pero no resultados, mostrar todos los viajes disponibles
    const displayOffers = showRecommendationMessage 
        ? travels
            .filter(travel => travel.status === 'ACTIVE')
            .slice(0, 6)
            .map((travel, index) => {
                const departureDate = new Date(travel.departureDateAndTime);
                const time = departureDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                let statusColor = 'bg-green-100 text-green-700';
                if (travel.availableSlots <= 1) statusColor = 'bg-red-100 text-red-700';
                else if (travel.availableSlots <= 2) statusColor = 'bg-yellow-100 text-yellow-700';
                const driverId = travel.driverId || travel.organizerId || 0;
                const driverInfo = driversInfo[driverId];
                let driverName = driverInfo?.name || `Conductor ${driverId}`;
                return {
                    id: travel.id,
                    driverId: driverId,
                    driver: driverName,
                    image: mockDriverImages[index % mockDriverImages.length],
                    rating: (4.0 + Math.random() * 1.0).toFixed(1),
                    carType: 'Vehículo particular',
                    startPoint: travel.origin.direction,
                    endPoint: travel.destiny.direction,
                    time: time,
                    price: `${travel.estimatedCost.toLocaleString('es-CO')} COP`,
                    availableSeats: travel.availableSlots,
                    statusColor: statusColor,
                    fullDate: departureDate
                };
            })
        : sortedOffers;

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
                                    onClick={() => (document.getElementById('date-input-passenger') as HTMLInputElement)?.showPicker()}
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                {showRecommendationMessage 
                                    ? `No hay viajes disponibles para "${destination}"`
                                    : destination.trim() && filteredTravels.length > 0
                                        ? `Viajes hacia ${destination}`
                                        : 'Ofertas de viaje'
                                }
                            </h2>
                            <p className="text-base text-gray-600">
                                {showRecommendationMessage
                                    ? 'Pero te recomendamos estos viajes disponibles'
                                    : 'Mira los viajes que tenemos en este momento'
                                }
                            </p>
                        </div>
                        <div className="flex gap-3">
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
                    </div>

                    {/* Loading State */}
                    {loadingTravels && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
                            <p className="mt-4 text-gray-600">Cargando ofertas de viaje...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {errorTravels && !loadingTravels && (
                        <div className="text-center py-12 text-red-600">
                            <p>Error al cargar los viajes: {errorTravels}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                className="mt-4"
                                style={{ backgroundColor: '#0B8EF5' }}
                            >
                                Reintentar
                            </Button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loadingTravels && !errorTravels && displayOffers.length === 0 && !showRecommendationMessage && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No hay ofertas de viaje disponibles en este momento</p>
                            <p className="text-gray-500 text-sm mt-2">Vuelve más tarde para ver nuevas opciones</p>
                        </div>
                    )}

                    {/* Offer Cards Grid */}
                    {!loadingTravels && !errorTravels && displayOffers.length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayOffers.map((offer) => {
                                const hasAvailableSeats = offer.availableSeats > 0;
                                return (
                            <div
                                key={offer.id}
                                className={`rounded-2xl p-4 transition-shadow ${
                                    hasAvailableSeats 
                                        ? 'hover:shadow-lg cursor-pointer' 
                                        : 'opacity-60 cursor-not-allowed'
                                }`}
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
                                        onClick={() => hasAvailableSeats && navigate(`/app/tripDetails/${offer.id}`)}
                                        disabled={!hasAvailableSeats}
                                        className={`shrink-0 -mt-1 -mr-1 p-1 rounded-lg transition-colors ${
                                            hasAvailableSeats 
                                                ? 'hover:bg-blue-200 cursor-pointer' 
                                                : 'cursor-not-allowed opacity-50'
                                        }`}>
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
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                                        offer.availableSeats === 0 
                                            ? 'bg-red-100 text-red-600'
                                            : offer.statusColor
                                    }`}>
                                        <Users className="w-3.5 h-3.5"/>
                                        {offer.availableSeats === 0 
                                            ? 'Sin cupos' 
                                            : `${offer.availableSeats} ${offer.availableSeats === 1 ? 'cupo' : 'cupos'}`
                                        }
                                    </span>
                                </div>
                                {!hasAvailableSeats && (
                                    <div className="mt-3 text-center">
                                        <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                                            ❌ Viaje completo - No disponible
                                        </span>
                                    </div>
                                )}
                            </div>
                            );
                            })}
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