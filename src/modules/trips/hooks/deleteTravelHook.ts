export async function deleteTravelHook(travelId: string): Promise<void> {
    try {
        const response = await fetch(
            `https://nemesistravelmanagementbackend-development.up.railway.app/travels/${travelId}`,
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