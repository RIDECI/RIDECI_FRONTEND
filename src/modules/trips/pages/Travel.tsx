import react from "react"
import  MapComponent  from "../components/MapComponent"
import ButtonCancel from "../components/ButtonCancel"
import ButtonCreate from "../components/ButtonCreate"
import { MapIcon } from "lucide-react"

export function Travel(){

    return (
        <div className="flex flex-col">
            <div className="pl-1 py-3 flex items-center gap-3">
                <MapIcon className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Crear nuevo viaje</h1>
            </div>
            <MapComponent />
            <div className="px-6 py-4 flex justify-between">
                <ButtonCancel title="Cancelar" />
                <ButtonCreate title="Crear Viaje"/>
            </div>
        </div>
    )

}