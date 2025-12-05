import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileSelector } from '../components/ProfileSelector';
import type {ProfileType} from '../types/user.d.ts';

import RideciLogo from "../../../assets/RIDECI Logo (Blanco).png";

export const ProfileRegisterSelectionPage: React.FC = () => {
    const navigate = useNavigate();

    const handleProfileSelect = (profileId: ProfileType) => {
        console.log('Perfil seleccionado:', profileId);
        localStorage.setItem('selectedProfile', profileId);

        // Navegar según el perfil seleccionado
        navigate('/app');
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative"
            style={{
                backgroundImage: 'url(/background-1920x1080.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-600/40"></div>

            {/* Logo */}
            <div className="absolute top-2 right-2 z-20">
                <img
                    src={RideciLogo}
                    alt="Rideci Logo"
                    className="w-72 h-auto object-contain drop-shadow-2xl"
                />
            </div>

            <div className="relative w-full max-w-5xl z-10">
                <ProfileSelector onProfileSelect={handleProfileSelect} />
            </div>
        </div>
    );
};
