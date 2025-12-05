import React, { useState } from 'react';
import { Car, UserCircle, Users } from 'lucide-react';
import type {Profile, ProfileType} from '../types/user.d.ts';

import ImgConductor from "../../../assets/Conductor.jpeg";

interface ProfileSelectorProps {
    onProfileSelect?: (profileId: ProfileType) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({
                                                                    onProfileSelect
                                                                }) => {
    const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);

    const profiles: Profile[] = [
        {
            id: 'conductor',
            title: 'Conductor',
            icon: Car,
            image: ImgConductor,
        },
        {
            id: 'pasajero',
            title: 'Pasajero',
            icon: UserCircle,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop'
        },
        {
            id: 'acompanante',
            title: 'Acompañante',
            icon: Users,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop'
        }
    ];

    const handleProfileSelect = (profileId: ProfileType) => {
        setSelectedProfile(profileId);
        if (onProfileSelect) {
            onProfileSelect(profileId);
        }
    };

    return (
        <div className="w-full">
            {/* Title*/}
            <h2 className="text-white text-5xl font-semibold text-center mb-16 drop-shadow-lg">
                ¿Qué rol deseas hoy?
            </h2>

            {/* Profile Cards */}
            <div className="flex justify-center items-center gap-8 px-4">
                {profiles.map((profile) => {
                    const Icon = profile.icon;
                    return (
                        <button
                            key={profile.id}
                            onClick={() => handleProfileSelect(profile.id)}
                            className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-72 ${
                                selectedProfile === profile.id
                                    ? 'ring-4 ring-white ring-opacity-80 scale-105'
                                    : ''
                            }`}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={profile.image}
                                    alt={profile.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <div className="p-5 text-center bg-white">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {profile.title}
                                </h3>
                            </div>

                            {selectedProfile === profile.id && (
                                <div className="absolute top-3 left-3 bg-blue-600 rounded-full p-1">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {selectedProfile && (
                <div className="mt-12 text-center">
                    <button
                        onClick={() => console.log('Continuar con:', selectedProfile)}
                        className="bg-white text-blue-600 px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
};