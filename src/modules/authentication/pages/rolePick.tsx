import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileSelector } from '../components/ProfileSelector';
import type {ProfileType} from '../types/user.d.ts';

import RideciLogo from "../../../assets/RIDECI Logo (Blanco).png";
import { Header } from '../components/header.tsx';

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
            className="h-screen overflow-hidden flex flex-col relative"
            style={{
                backgroundImage: 'url(/background-1920x1080.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >

            <Header />

            <div className="flex flex-col items-center">
                <h2 className="text-white text-5xl font-semibold text-center mt-22 mb-22">
                      ¿Qué rol deseas para tu registro?
                </h2>    
            </div>

            <div className="relative flex items-center justify-center">
                <ProfileSelector onProfileSelect={handleProfileSelect} />
            </div>
        </div>
    );
};
