export async function deleteProfileHook(profileId: string): Promise<void> {
    // SIMULACIÓN SIN BACKEND - Solo datos locales
    try {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));

        // Eliminar de localStorage
        const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        const filteredProfiles = existingProfiles.filter((p: any) => p.id !== parseInt(profileId));
        localStorage.setItem('profiles', JSON.stringify(filteredProfiles));
        
        // Si es el perfil actual, eliminarlo también
        const currentProfile = JSON.parse(localStorage.getItem('currentProfile') || '{}');
        if (currentProfile.id === parseInt(profileId)) {
            localStorage.removeItem('currentProfile');
        }

        console.log('Perfil eliminado (simulado):', profileId);
        return;
    } catch (err) {
        console.error('Error en deleteProfileHook:', err);
        throw err;
    }
}