import bob from '../../../../assets/bob.jpeg';
import { useEffect, useState } from 'react';
import type { Profile } from '@/modules/reputation&profiles/hooks/GetProfile/getProfileHook';

interface ProfileHeaderProps {
  readonly profile: Profile | null;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [profileData, setProfileData] = useState({
    name: '',
    roles: [] as string[],
    photo: bob
  });

  const mapRoleToLabel = (role: string) => {
    const r = String(role).toLowerCase();
    if (r.includes('driver') || r.includes('conductor') || r === 'conductor') return 'Conductor';
    if (r.includes('passenger') || r.includes('pasajero') || r === 'pasajero') return 'Pasajero';
    if (r.includes('companion') || r.includes('acompanante') || r.includes('companiant') || r === 'acompanante') return 'Acompañante';
    if (r === 'driver' || r === 'DRIVER') return 'Conductor';
    if (r === 'passenger' || r === 'PASSENGER') return 'Pasajero';
    if (r === 'companion' || r === 'COMPANION') return 'Acompañante';
    return role;
  };

  useEffect(() => {
    // Primero usar los datos del profile del hook si están disponibles
    if (profile) {
      // Collect roles from fetched profile and from local stored profiles
      const rolesSet = new Set<string>();
      if (profile.profileType) rolesSet.add(String(profile.profileType));

      // Also inspect localStorage 'profiles' for other registered roles for this user
      try {
        const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        const userEmail = localStorage.getItem('userEmail');
        const userIdStr = localStorage.getItem('userId');
        const identificationNumberLS = localStorage.getItem('identificationNumber') || localStorage.getItem('institutionalId');

        if (Array.isArray(storedProfiles)) {
          for (const p of storedProfiles) {
            if (!p) continue;
            const matchesEmail = userEmail && p.email && String(p.email) === userEmail;
            const matchesIdNumber = identificationNumberLS && p.identificationNumber && String(p.identificationNumber) === identificationNumberLS;
            // If profile matches current user by email or identification, include its type
            if (matchesEmail || matchesIdNumber) {
              if (p.profileType) rolesSet.add(String(p.profileType));
            }
          }
        }
      } catch (e) {
        // ignore parse errors
      }

      setProfileData({
        name: profile.name || 'Usuario',
        roles: Array.from(rolesSet),
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
        // gather roles from storedProfile and other stored profiles
        const rolesSet = new Set<string>();
        if (storedProfile.profileType) rolesSet.add(storedProfile.profileType);
        try {
          const allProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
          const identificationNumberLS = localStorage.getItem('identificationNumber') || localStorage.getItem('institutionalId');
          if (Array.isArray(allProfiles)) {
            for (const p of allProfiles) {
              const matchesEmail = userEmail && p.email && String(p.email) === userEmail;
              const matchesIdNumber = identificationNumberLS && p.identificationNumber && String(p.identificationNumber) === identificationNumberLS;
              if (matchesEmail || matchesIdNumber) {
                if (p.profileType) rolesSet.add(p.profileType);
              }
            }
          }
        } catch (e) {}

        setProfileData({
          name: storedProfile.name || userName || userEmail || 'Usuario',
          roles: Array.from(rolesSet),
          photo: storedProfile.profilePictureUrl || bob
        });
      } catch (error) {
        console.log('Error parsing profile:', error);
        setProfileData({
          name: userName || userEmail || 'Usuario',
          roles: [],
          photo: bob
        });
      }
    } else {
      // No hay perfil, usar datos básicos del usuario autenticado
      setProfileData({
        name: userName || userEmail || 'Usuario',
        roles: [],
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
          Estudiante — Roles:{' '}
          {(() => {
            // determine display roles: map to labels, include localStorage fallback
            const rawRoles = profileData.roles && profileData.roles.length > 0
              ? profileData.roles
              : (localStorage.getItem('userProfileType') ? [localStorage.getItem('userProfileType') as string] : []);

            if (!rawRoles || rawRoles.length === 0) {
              return <span className="font-semibold">No definido</span>;
            }

            const labels = Array.from(new Set(rawRoles.map(mapRoleToLabel)));

            return (
              <span className="font-semibold">
                {labels.map((r) => (
                  <span key={r} className="inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-full mr-2 text-sm">
                    {r}
                  </span>
                ))}
              </span>
            );
          })()}
        </p>
      </div>
    </div>
  );
}