import { useState, useEffect } from 'react';

export interface UserProfile {
    profileType: string;
    name: string;
    email: string;
    identificationNumber: string;
}

export function useGetUserProfiles() {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(false);

    const loadUserProfiles = () => {
        setLoading(true);
        try {
            // Obtener información del usuario actual
            const userEmail = localStorage.getItem('userEmail');
            const identificationNumber = localStorage.getItem('identificationNumber') || localStorage.getItem('institutionalId');
            
            // Obtener todos los perfiles guardados
            const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
            
            if (!Array.isArray(storedProfiles)) {
                setProfiles([]);
                return;
            }

            // Filtrar perfiles que pertenecen al usuario actual
            const userProfiles = storedProfiles.filter((p: any) => {
                if (!p) return false;
                const matchesEmail = userEmail && p.email && String(p.email) === userEmail;
                const matchesIdNumber = identificationNumber && p.identificationNumber && String(p.identificationNumber) === identificationNumber;
                return matchesEmail || matchesIdNumber;
            });

            // Extraer solo los tipos de perfil únicos
            const uniqueProfileTypes = new Set<string>();
            const uniqueProfiles: UserProfile[] = [];

            userProfiles.forEach((p: any) => {
                if (p.profileType && !uniqueProfileTypes.has(p.profileType)) {
                    uniqueProfileTypes.add(p.profileType);
                    uniqueProfiles.push({
                        profileType: p.profileType,
                        name: p.name || '',
                        email: p.email || '',
                        identificationNumber: p.identificationNumber || ''
                    });
                }
            });

            setProfiles(uniqueProfiles);
        } catch (error) {
            console.error('Error loading user profiles:', error);
            setProfiles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfiles();
    }, []);

    return {
        profiles,
        loading,
        reload: loadUserProfiles
    };
}
