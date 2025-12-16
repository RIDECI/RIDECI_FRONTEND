import bob from '../../../../assets/bob.jpeg';
import { useEffect, useState } from 'react';
import type { Profile } from '@/modules/reputation&profiles/hooks/GetProfile/getProfileHook';

interface ProfileHeaderProps {
  readonly profile: Profile | null;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [profileData, setProfileData] = useState({
    name: '',
    roles: '',
    photo: bob
  });

  useEffect(() => {
    // Primero usar los datos del profile del hook si están disponibles
    if (profile) {
      setProfileData({
        name: profile.name || 'Usuario',
        roles: profile.profileType || 'No definido',
        photo: profile.profilePictureUrl || bob
      });
      return;
    }

    // Fallback: intentar obtener datos del localStorage
    const currentProfile = localStorage.getItem('currentProfile');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (currentProfile) {
      try {
        const storedProfile = JSON.parse(currentProfile);
        setProfileData({
          name: storedProfile.name || userName || userEmail || 'Usuario',
          roles: storedProfile.profileType || 'No definido',
          photo: storedProfile.profilePictureUrl || bob
        });
      } catch (error) {
        console.log('Error parsing profile:', error);
        setProfileData({
          name: userName || userEmail || 'Usuario',
          roles: 'No definido',
          photo: bob
        });
      }
    } else {
      // No hay perfil, usar datos básicos del usuario autenticado
      setProfileData({
        name: userName || userEmail || 'Usuario',
        roles: 'No definido',
        photo: bob
      });
    }
  }, [profile]);

  return (
    <div className="flex items-center gap-6">
      <img
        src={profileData.photo}
        alt="profile"
        className="w-24 h-24 rounded-full object-cover"
        loading="lazy"
      />

      <div>
        <h2 className="text-2xl font-bold">{profileData.name}</h2>
        <p className="text-gray-500 text-lg">
          Estudiante — Roles: <span className="font-semibold">{profileData.roles}</span>
        </p>
      </div>
    </div>
  );
}