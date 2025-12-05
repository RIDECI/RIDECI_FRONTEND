import React, { useState } from 'react';
import { Calendar, MapPin, Navigation, Star, ArrowRight, CheckCircle, AlertTriangle, UserPlus, Clock, Bike, Footprints, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const HomeCompanion: React.FC = () => {
    const [meetingPoint, setMeetingPoint] = useState('');
    const [destination, setDestination] = useState('');

    // Grupos disponibles para unirse
    const mockGroups = [
        {
            id: 1,
            leader: 'Carlos Santana',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            rating: 4.5,
            startPoint: 'Universidad Nacional',
            endPoint: 'Portal 80',
            date: 'Hoy',
            time: '18:30',
            price: '6.000 COP',
            members: 3,
            maxMembers: 4,
            transportType: 'transmilenio',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: 2,
            leader: 'María González',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            rating: 4.8,
            startPoint: 'Centro',
            endPoint: 'Aeropuerto',
            date: 'Mañana',
            time: '15:45',
            price: '8.500 COP',
            members: 2,
            maxMembers: 5,
            transportType: 'bicicleta',
            statusColor: 'bg-blue-100 text-blue-700'
        },
        {
            id: 3,
            leader: 'Juan Pérez',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            rating: 4.2,
            startPoint: 'Portal Norte',
            endPoint: 'Universidad',
            date: '20 Nov',
            time: '07:00',
            price: '5.500 COP',
            members: 4,
            maxMembers: 4,
            transportType: 'caminando',
            statusColor: 'bg-yellow-100 text-yellow-700'
        }
    ];

    // Notificaciones
    const notifications = [
        {
            id: 1,
            icon: CheckCircle,
            iconColor: 'text-green-600',
            message: 'Has creado un grupo con éxito.',
            time: 'Hace 3 min'
        },
        {
            id: 2,
            icon: AlertTriangle,
            iconColor: 'text-red-600',
            message: 'Tienes un nuevo reporte.',
            time: 'Hace 9 hrs'
        },
        {
            id: 3,
            icon: UserPlus,
            iconColor: 'text-blue-600',
            message: 'Alguien se ha unido al grupo.',
            time: 'Hace 10 hrs'
        }
    ];

    const handleCreateGroup = () => {
        console.log('Creando grupo:', {
            meetingPoint,
            destination
        });
    };

    const getTransportIcon = (type: string) => {
        switch(type) {
            case 'transmilenio':
                return <Bus className="w-3.5 h-3.5" />;
            case 'bicicleta':
                return <Bike className="w-3.5 h-3.5" />;
            case 'caminando':
                return <Footprints className="w-3.5 h-3.5" />;
            default:
                return <Bus className="w-3.5 h-3.5" />;
        }
    };

    const getTransportLabel = (type: string) => {
        switch(type) {
            case 'transmilenio':
                return 'Transmilenio';
            case 'bicicleta':
                return 'Bicicleta';
            case 'caminando':
                return 'Caminando';
            default:
                return type;
        }
    };

    return (
        <div className="flex-1 min-h-screen bg-white">
            <div className="p-6 md:p-8">
                {/* Crear grupo */}
                <div className="mb-12">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
                        {/* Form Section */}
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">Crea tu grupo</h2>
                                <p className="text-base text-gray-600">
                                    Encuentra pasajeros y viaja acompañado
                                </p>
                            </div>

                            {/* Fecha y Hora del encuentro */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Fecha */}
                                <div className="relative">
                                    <div
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                        style={{backgroundColor: '#E8F4FF'}}
                                    >
                                        <Calendar className="w-5 h-5 text-gray-700 shrink-0"/>
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-600 mb-1 font-medium">
                                                Escoge la fecha
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full bg-transparent border-0 p-0 text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 cursor-pointer"
                                                style={{
                                                    colorScheme: 'light'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Hora */}
                                <div className="relative">
                                    <div
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                        style={{backgroundColor: '#E8F4FF'}}
                                    >
                                        <Clock className="w-5 h-5 text-gray-700 shrink-0"/>
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-600 mb-1 font-medium">
                                                Hora del encuentro
                                            </div>
                                            <input
                                                type="time"
                                                className="w-full bg-transparent border-0 p-0 text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 cursor-pointer"
                                                style={{
                                                    colorScheme: 'light'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Punto de encuentro Input */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent"
                                    style={{backgroundColor: '#E8F4FF'}}
                                >
                                    <MapPin className="w-5 h-5 text-gray-700 shrink-0"/>
                                    <Input
                                        type="text"
                                        placeholder="Punto de encuentro"
                                        value={meetingPoint}
                                        onChange={(e) => setMeetingPoint(e.target.value)}
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

                            {/* Crear Button */}
                            <Button
                                onClick={handleCreateGroup}
                                className="w-full text-white font-semibold shadow-lg hover:opacity-90 h-12"
                                style={{
                                    backgroundColor: '#0B8EF5',
                                    borderRadius: '15px'
                                }}
                            >
                                Crear
                            </Button>
                        </div>

                        {/* Image Section */}
                        <div className="hidden lg:block">
                            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop"
                                    alt="Grupo de personas viajando juntas"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Únete a un grupo */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">Únete a un grupo</h2>
                            <p className="text-base text-gray-600">
                                Escoge un grupo y únete a ellos
                            </p>
                        </div>
                        <Button
                            className="text-white font-semibold shadow-lg hover:opacity-90 px-6 py-3"
                            style={{
                                backgroundColor: '#0B8EF5',
                                borderRadius: '8px'
                            }}
                        >
                            Ver más grupos
                        </Button>
                    </div>

                    {/* Group Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockGroups.map((group) => (
                            <div
                                key={group.id}
                                className="rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                style={{backgroundColor: '#CAE8FF'}}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                        <img
                                            src={group.image}
                                            alt={group.leader}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-semibold text-sm text-gray-900 truncate">
                                                {group.leader}
                                            </h3>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <span className="text-xs text-gray-600">{group.rating}</span>
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"/>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">Líder del grupo</p>
                                    </div>
                                    <button
                                        className="shrink-0 -mt-1 -mr-1 p-1 hover:bg-blue-200 rounded-lg transition-colors">
                                        <ArrowRight className="w-5 h-5 text-gray-900"/>
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                                        <span className="truncate">{group.startPoint}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Navigation className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                                        <span className="truncate">{group.endPoint}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5"/>
                                        <span>{group.time}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold" style={{color: '#0B8EF5'}}>
                                        {group.price}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${group.statusColor}`}>
                                        {getTransportIcon(group.transportType)}
                                        {getTransportLabel(group.transportType)}
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