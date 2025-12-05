export interface DeleteProfileResponse {
    success: boolean;
    error?: string;
}

export async function deleteProfileHook(profileId: string): Promise<DeleteProfileResponse> {
    try {
        const response = await fetch(
            `https://troyareputationbackend-production-e75f.up.railway.app/profiles/${profileId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error al eliminar perfil: ${response.statusText}`);
        }

        return {
            success: true
        };
    } catch (err) {
        console.error('Error en deleteProfileHook:', err);
        const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el perfil';
        return {
            success: false,
            error: errorMessage
        };
    }
}