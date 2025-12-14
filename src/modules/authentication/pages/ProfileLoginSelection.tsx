import React from 'react';
import { ProfileSelector } from '../components/ProfileSelector';
import type {ProfileType} from '../types/profile.types';
import { Header } from '../components/header';

export const ProfileSelectionPage: React.FC = () => {

    const handleProfileSelect = (profileId: ProfileType) => {
        console.log('Perfil seleccionado:', profileId);
        localStorage.setItem('selectedProfile', profileId);
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
                      Escoge tu rol de hoy
                </h2>    
            </div>

            <div className="relative flex items-center justify-center">
                <ProfileSelector onProfileSelect={handleProfileSelect} />
            </div>
        </div>
    );
};