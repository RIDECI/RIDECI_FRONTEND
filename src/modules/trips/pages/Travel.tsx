import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import MapComponent from "../components/MapComponent"
import ButtonCancel from "../components/ButtonCancel"
import ButtonCreate from "../components/ButtonCreate"
import { MapIcon } from "lucide-react"
import { useCreateTravel, type TravelRequest, type TravelBackendResponse } from "../hooks/createTravelHook"
import { useUpdateTravel, type UpdateTravelRequest } from "../hooks/updateTravelHook"
import { useGeocoding } from "../hooks/useGeocoding"
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal"

export function Travel() {
    const navigate = useNavigate();
    const location = useLocation();
    const travelToEdit = location.state?.travel as TravelBackendResponse | undefined;

    const { createTravel, loading: createLoading, error: createError } = useCreateTravel();
    const { updateTravel, loading: updateLoading, error: updateError } = useUpdateTravel();
    const { geocodeAddress, loading: geocodingLoading } = useGeocoding();

    const isProcessing = createLoading || updateLoading || geocodingLoading;
    const error = createError || updateError;

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDateAndTime, setDepartureDateAndTime] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (travelToEdit) {
            console.log('Travel to edit:', travelToEdit);
            setOrigin(travelToEdit.origin.direction);
            setDestination(travelToEdit.destiny.direction);

            // Convertir fecha ISO a formato datetime-local (YYYY-MM-DDTHH:mm)
            const dateStr = travelToEdit.departureDateAndTime;
            const formattedDate = dateStr.slice(0, 16); // Toma solo YYYY-MM-DDTHH:mm
            console.log('Formatted date:', formattedDate);
            setDepartureDateAndTime(formattedDate);

            const costFormatted = travelToEdit.estimatedCost.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, '.');
            console.log('Formatted cost:', costFormatted);
            setEstimatedCost(costFormatted);
        }
    }, [travelToEdit]);

    const handlePreSubmit = () => {
        if (!origin || !destination || !departureDateAndTime || !estimatedCost) {
            alert('Por favor completa todos los campos');
            return;
        }

        setShowConfirmModal(true);
    };

    const executeSubmit = async () => {
        setShowConfirmModal(false); // Close if open

        // Re-validate just in case
        if (!origin || !destination || !departureDateAndTime || !estimatedCost) return;

        const originResult = await geocodeAddress(origin);
        if (!originResult.success || !originResult.location) {
            alert(`Error al geocodificar origen: ${originResult.error}`);
            return;
        }

        const destinyResult = await geocodeAddress(destination);
        if (!destinyResult.success || !destinyResult.location) {
            alert(`Error al geocodificar destino: ${destinyResult.error}`);
            return;
        }

        const costWithoutDots = estimatedCost.replaceAll('.', '');

        if (travelToEdit) {
            const updateData: UpdateTravelRequest = {
                availableSlots: 4,
                estimatedCost: Number.parseFloat(costWithoutDots),
                departureDateAndTime: departureDateAndTime,
                conditions: '',
                origin: originResult.location,
                destiny: destinyResult.location,
                id: "",
                organizerId: 0,
                driverId: 0
            };

            const result = await updateTravel(travelToEdit.id, updateData);

            if (result.success && result.data) {
                navigate('/app/detailsOfTravel', {
                    state: { travel: result.data }
                });
            } else {
                alert(`Error al actualizar el viaje: ${result.error}`);
            }
        } else {
            const travelData: TravelRequest = {
                driverId: 1,
                availableSlots: 4,
                status: 'ACTIVE',
                travelType: 'TRIP',
                estimatedCost: Number.parseFloat(costWithoutDots),
                departureDateAndTime: departureDateAndTime,
                conditions: '',
                origin: originResult.location,
                destiny: destinyResult.location
            };

            const result = await createTravel(travelData);

            if (result.success && result.data) {
                navigate('/app/detailsOfTravel', {
                    state: { travel: result.data }
                });
            } else {
                alert(`Error al crear el viaje: ${result.error}`);
            }
        }
    };

    let buttonTitle = "Crear Viaje";
    if (isProcessing) {
        buttonTitle = "Procesando...";
    } else if (travelToEdit) {
        buttonTitle = "Actualizar Viaje";
    }

    return (
        <div className="flex flex-col">
            <div className="pl-1 py-3 flex items-center gap-3">
                <MapIcon className="w-8 h-8" />
                <h1 className="text-2xl font-bold">{travelToEdit ? "Editar viaje" : "Crear nuevo viaje"}</h1>
            </div>
            {error && (
                <div className="mx-6 my-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}
            <MapComponent
                origin={origin}
                destination={destination}
                departureDateAndTime={departureDateAndTime}
                estimatedCost={estimatedCost}
                onOriginChange={setOrigin}
                onDestinationChange={setDestination}
                onDateChange={setDepartureDateAndTime}
                onCostChange={setEstimatedCost}
            />
            <div className="px-6 pt-20 pb-8 flex justify-between gap-4">
                <ButtonCancel title="Cancelar" />
                <ButtonCreate
                    title={buttonTitle}
                    onClick={handlePreSubmit}
                    disabled={isProcessing}
                />
            </div>

            <ConfirmActionModal
                open={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={executeSubmit}
                title={travelToEdit ? "¿Actualizar viaje?" : "¿Crear nuevo viaje?"}
                description={travelToEdit
                    ? "Se actualizará la información del viaje con los nuevos datos. ¿Estás seguro?"
                    : "Se creará un nuevo viaje con la información proporcionada. ¿Estás seguro?"
                }
                confirmLabel={travelToEdit ? "Actualizar" : "Crear"}
                cancelLabel="Volver"
                variant="primary"
                loading={isProcessing}
            />
        </div>
    )

}