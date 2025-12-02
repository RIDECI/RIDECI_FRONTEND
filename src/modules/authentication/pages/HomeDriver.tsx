import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Star, Car, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const HomeDriver: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    // Datos de ejemplo de viajes
    const mockTrips = [
        {
            id: 1,
            passenger: 'Carlos Santana',
            rating: 5,
            carType: 'Sedan',
            university: 'Universidad',
            startPoint: 'Portal 80',
            time: '18:30',
            date: 'Nov 25',
            price: '6.000 COP',
            status: 'Hoy',
            statusColor: 'bg-red-100 text-red-700'
        },
        {
            id: 2,
            passenger: 'Carlos Santana',
            rating: 5,
            carType: 'Sedan',
            university: 'Universidad',
            startPoint: 'Portal 80',
            time: '18:30',
            date: 'Nov 22',
            price: '6.000 COP',
            status: 'Pasado',
            statusColor: 'bg-yellow-100 text-yellow-700'
        },
        {
            id: 3,
            passenger: 'Carlos Santana',
            rating: 5,
            carType: 'Sedan',
            university: 'Universidad',
            startPoint: 'Portal 80',
            time: '18:30',
            date: 'Nov 19',
            price: '6.000 COP',
            status: 'Programado',
            statusColor: 'bg-green-100 text-green-700'
        }
    ];

    const handleOffer = () => {
        console.log('Ofreciendo viaje:', { selectedDate, selectedTime, origin, destination });
    };

    return (
        <div className="flex-1 min-h-screen" style={{ backgroundColor: '#CAE8FF' }}>
            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    {/* Logo en la izquierda */}
                    <div>
                        <img
                            src="/RIDECI_Logo.png"
                            alt="Rideci"
                            className="h-10 w-auto object-contain"
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
                        />
                    </div>

                    {/* Usuario en la derecha */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 hidden sm:inline">Bienvenida Usuario</span>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-lg">👤</span>
                        </div>
                    </div>
                </div>

                {/* Oferta un viaje Card */}
                <Card className="mb-6 border-0 shadow-md rounded-3xl">
                    <CardContent className="p-6 md:p-8">
                        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
                            {/* Form Section */}
                            <div className="space-y-5">
                                <div>
                                    <CardTitle className="text-2xl mb-1 text-gray-900">Oferta un viaje</CardTitle>
                                    <CardDescription className="text-base text-gray-600">
                                        Ofrece tus servicios a la comunidad
                                    </CardDescription>
                                </div>

                                {/* Date and Time Selectors */}
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {/* Fecha */}
                                    <label
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                                        style={{ backgroundColor: '#E8F4FF' }}
                                    >
                                        <Calendar className="w-5 h-5 shrink-0" style={{ color: '#0B8EF5' }} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-600 mb-0.5">
                                                Escoge la fecha
                                            </div>
                                            <Input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="h-auto p-0 border-0 shadow-none bg-transparent text-sm font-medium focus-visible:ring-0"
                                            />
                                        </div>
                                    </label>

                                    {/* Hora */}
                                    <label
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                                        style={{ backgroundColor: '#E8F4FF' }}
                                    >
                                        <Clock className="w-5 h-5 shrink-0" style={{ color: '#0B8EF5' }} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-600 mb-0.5">
                                                Escoge la hora
                                            </div>
                                            <Input
                                                type="time"
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                className="h-auto p-0 border-0 shadow-none bg-transparent text-sm font-medium focus-visible:ring-0"
                                            />
                                        </div>
                                    </label>
                                </div>

                                {/* Origin Input */}
                                <div className="relative">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                                        <Input
                                            type="text"
                                            placeholder="Punto de partida"
                                            value={origin}
                                            onChange={(e) => setOrigin(e.target.value)}
                                            className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Destination Input */}
                                <div className="relative">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <Navigation className="w-5 h-5 text-gray-500 shrink-0" />
                                        <Input
                                            type="text"
                                            placeholder="Destino"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            className="h-auto p-0 border-0 shadow-none bg-transparent focus-visible:ring-0 placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        className="gap-2 rounded-full border-2 bg-white hover:bg-gray-50"
                                        style={{ borderColor: '#0B8EF5', color: '#0B8EF5' }}
                                    >
                                        <Car className="w-4 h-4" />
                                        Escoger vehiculo
                                    </Button>
                                    <Button
                                        onClick={handleOffer}
                                        className="flex-1 min-w-[180px] rounded-full text-white font-semibold shadow-lg hover:opacity-90"
                                        style={{ backgroundColor: '#0B8EF5' }}
                                    >
                                        Ofertar
                                    </Button>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="hidden lg:block">
                                <div className="relative h-[320px] rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop"
                                        alt="Conductor ofreciendo viaje"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mis viajes Section */}
                <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Mis viajes</h2>
                            <p className="text-base text-gray-600">
                                Para que recuerdes los viajes que tienes programados
                            </p>
                        </div>
                        <Button
                            className="rounded-full text-white font-semibold shadow-lg hover:opacity-90"
                            style={{ backgroundColor: '#0B8EF5' }}
                        >
                            Ver mis viajes
                        </Button>
                    </div>

                    {/* Trip Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                            >
                                {/* Passenger Info */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                        CS
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <h3 className="font-semibold text-sm text-gray-900">
                                                {trip.passenger}
                                            </h3>
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs text-gray-600">{trip.rating}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">{trip.carType}</p>
                                    </div>
                                    <button className="shrink-0 -mt-1 -mr-1 p-1 hover:bg-gray-200 rounded-lg transition-colors">
                                        <ArrowRight className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>

                                {/* Route Info */}
                                <div className="space-y-1 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <span>{trip.university}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Navigation className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <span>{trip.startPoint}</span>
                                    </div>
                                </div>

                                {/* Time and Date */}
                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{trip.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{trip.date}</span>
                                    </div>
                                </div>

                                {/* Price and Status */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">
                    {trip.price}
                  </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${trip.statusColor}`}>
                    {trip.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};