// URL del backend desplegado
const API_URL = 'https://poseidonsearchandbooking-production-98fe.up.railway.app';

export async function deleteTravelHook(travelId: string): Promise<void> {
    try {
        const response = await fetch(
            `${API_URL}/travels/${travelId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Error al eliminar el viaje: ${response.statusText}`);
        }

        return;
    } catch (err) {
        console.error('Error en deleteTravelHook:', err);
        throw err;
    }
}