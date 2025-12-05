export async function deleteProfileHook(profileId: string): Promise<void> {
    try {
        const response = await fetch(
            `https://troyareputationbackend-production.up.railway.app/profiles/${profileId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Error al eliminar perfil: ${response.statusText}`);
        }

        return;
    } catch (err) {
        console.error('Error en deleteProfileHook:', err);
        throw err;
    }
}