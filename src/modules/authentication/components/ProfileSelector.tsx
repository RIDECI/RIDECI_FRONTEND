import React, { useState, useEffect } from 'react';
import { Car, UserCircle, Users } from 'lucide-react';
import type { Profile, ProfileType } from '../types/user.d.ts';

import ImgConductor from "../../../assets/Conductor.jpeg";
import { useNavigate } from 'react-router-dom';
import { useGetUserProfiles } from '@/modules/reputation&profiles/hooks/useGetUserProfiles';

interface ProfileSelectorProps {
    onProfileSelect?: (profileId: ProfileType) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onProfileSelect }) => {
    const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
    const navigate = useNavigate();
    const { profiles: userProfiles, loading } = useGetUserProfiles();
    
    const allProfiles: Profile[] = [
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

    // Mapear los tipos de perfil del backend a los títulos locales
    const mapProfileTypeToTitle = (profileType: string): string => {
        const type = String(profileType).toLowerCase();
        if (type === 'driver' || type === 'conductor') return 'Conductor';
        if (type === 'passenger' || type === 'pasajero') return 'Pasajero';
        if (type === 'companiant' || type === 'acompanante' || type === 'companion') return 'Acompañante';
        return profileType;
    };

    // Obtener los títulos de los perfiles del usuario
    const userProfileTitles = userProfiles.map(p => mapProfileTypeToTitle(p.profileType));

    // Filtrar para mostrar solo los perfiles creados por el usuario
    const profiles = userProfileTitles.length > 0
        ? allProfiles.filter(p => userProfileTitles.includes(p.title))
        : allProfiles;

    const handleProfileSelect = (profileId: ProfileType) => {
        setSelectedProfile(profileId);

        if (onProfileSelect) {
            onProfileSelect(profileId);
        }

        // Navegar inmediatamente según perfil
        switch (profileId) {
            case 'conductor':
                navigate('/app/homeDriver');
                break;
            case 'pasajero':
                navigate('/app/homePassenger');
                break;
            case 'acompanante':
                navigate('/app/homeCompanion');
                break;
            default:
                break;
        }
    };
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-12">
                <div className="text-white text-xl">Cargando perfiles...</div>
            </div>
        );
    }
    return (
        <div className="w-full">
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
        </div>
    );
};
