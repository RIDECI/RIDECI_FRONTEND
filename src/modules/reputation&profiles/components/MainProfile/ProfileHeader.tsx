import bob from '../../../../assets/bob.jpeg';
import { useEffect, useState } from 'react';

export default function ProfileHeader() {
  const [profileData, setProfileData] = useState({
    name: '',
    roles: '',
    photo: bob
  });

  useEffect(() => {
    // Primero intentar obtener datos del perfil actual guardado
    const currentProfile = localStorage.getItem('currentProfile');
    
    // Si no hay perfil, usar datos del usuario autenticado
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (currentProfile) {
      try {
        const profile = JSON.parse(currentProfile);
        setProfileData({
          name: profile.name || userName || userEmail || 'Usuario',
          roles: profile.profileType || 'No definido',
          photo: profile.profilePictureUrl || bob
        });
      } catch (error) {
        console.log('Error parsing profile:', error);
        // Fallback a datos del usuario autenticado
        setProfileData({
          name: userName || userEmail || 'Usuario',
          roles: 'No definido',
          photo: bob
        });
      }
    } else {
      // No hay perfil creado, usar datos del usuario autenticado
      setProfileData({
        name: userName || userEmail || 'Usuario',
        roles: 'No definido',
        photo: bob
      });
    }
  }, []);

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