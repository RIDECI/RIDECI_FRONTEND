import {
  ArrowLeft,
  MapPin,
  LocateFixed,
  Clock,
  Car,
  User,
  Navigation,
  Users,
  DollarSign,
  Route,
  MessageSquare,
  MapPinned,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import type { TravelBackendResponse } from "../hooks/createTravelHook";
import { deleteTravelHook } from "../hooks/deleteTravelHook";
import { useGetTravelById } from "../hooks/getTravelByIdHook";

// Helper functions for status styling
const getStatusCardClasses = (status?: string): string => {
  if (status === "ACTIVE")
    return "from-yellow-50 to-yellow-100 border-yellow-200/50";
  if (status === "IN_COURSE")
    return "from-green-50 to-green-100 border-green-200/50";
  if (status === "COMPLETED")
    return "from-blue-50 to-blue-100 border-blue-200/50";
  return "from-red-50 to-red-100 border-red-200/50";
};

const getStatusIconClasses = (status?: string): string => {
  if (status === "ACTIVE") return "bg-yellow-500";
  if (status === "IN_COURSE") return "bg-green-500";
  if (status === "COMPLETED") return "bg-[#0B8EF5]";
  return "bg-red-500";
};

const getStatusLabelClasses = (status?: string): string => {
  if (status === "ACTIVE") return "text-yellow-700";
  if (status === "IN_COURSE") return "text-green-700";
  if (status === "COMPLETED") return "text-[#0B8EF5]";
  return "text-red-700";
};

const getStatusTextClasses = (status?: string): string => {
  if (status === "ACTIVE") return "text-yellow-900";
  if (status === "IN_COURSE") return "text-green-900";
  if (status === "COMPLETED") return "text-blue-900";
  return "text-red-900";
};

const getStatusText = (status?: string): string => {
  if (status === "ACTIVE") return "Activo";
  if (status === "IN_COURSE") return "En curso";
  if (status === "COMPLETED") return "Completado";
  return "Cancelado";
};

const getStatusSubtextClasses = (status?: string): string => {
  if (status === "ACTIVE") return "text-yellow-600";
  if (status === "IN_COURSE") return "text-green-600";
  if (status === "COMPLETED") return "text-blue-600";
  return "text-red-600";
};

const mockTripDetails = {
  origin: "Portal Norte",
  destination: "Portal 80",
  departureDate: "7 de Septiembre 18:30 PM",
  passengers: [
    {
      id: 1,
      name: "Jorge rodriguez",
      avatar: "/placeholder-avatar.jpg",
      price: "5,000 COP",
    },
    {
      id: 2,
      name: "Jorge rodriguez",
      avatar: "/placeholder-avatar.jpg",
      price: "7,000 COP",
    },
    {
      id: 3,
      name: "Jorge rodriguez",
      avatar: "/placeholder-avatar.jpg",
      price: "8,000 COP",
    },
  ],
  vehicle: {
    brand: "Renault Duster",
    plate: "FVK 46B",
    color: "Negro",
  },
};

function DetailsOfTravelComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addNotification } = useGlobalNotifications();

  // Obtener travelId desde query params o desde location.state
  const travelIdFromParams = searchParams.get("travelId");
  const travelFromState = location.state?.travel as
    | TravelBackendResponse
    | undefined;

  // Si viene de state, usar ese, si no, hacer fetch con el ID
  const {
    travel: travelFromApi,
    loading,
    error,
  } = useGetTravelById(travelFromState ? null : travelIdFromParams);

  // Usar el travel que esté disponible
  const travel = travelFromState || travelFromApi;

  console.log("Travel data in details:", travel);

  const handleConfirmDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas cancelar este viaje?")) {
      return;
    }

    try {
      await deleteTravelHook(id);
      alert("Viaje cancelado exitosamente");
      navigate("/app/sectionTravel");
    } catch (error) {
      console.error("Error al eliminar viaje:", error);
      alert("Error al cancelar el viaje. Por favor intenta de nuevo.");
    }
  };

  let availableSlotsText = "Viaje completo";
  if (travel?.availableSlots && travel.availableSlots > 0) {
    const plural = travel.availableSlots > 1;
    availableSlotsText = `${travel.availableSlots} cupo${
      plural ? "s" : ""
    } disponible${plural ? "s" : ""}`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B8EF5] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles del viaje...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">
            Error al cargar el viaje
          </h3>
          <p className="text-red-700 mb-6">{error}</p>
          <Button
            onClick={() => navigate("/app/sectionTravel")}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Volver a viajes
          </Button>
        </div>
      </div>
    );
  }

  if (!travel) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-md text-center">
          <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-yellow-900 mb-2">
            Viaje no encontrado
          </h3>
          <p className="text-yellow-700 mb-6">
            No se encontró información de este viaje.
          </p>
          <Button
            onClick={() => navigate("/app/sectionTravel")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Volver a viajes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/app/sectionTravel")}
          className="hover:bg-gray-100 hover:scale-110 transition-all duration-200 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </Button>
        <div className="flex items-center gap-3">
          <MapPinned className="w-8 h-8 text-black" />
          <h1 className="text-3xl font-bold text-black">Detalles de viaje</h1>
        </div>
        <div className="ml-auto flex gap-3">
          <Button
            onClick={() => {
              console.log("Navigating to edit with travel:", travel);
              navigate("/app/travels", { state: { travel } });
            }}
            className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0B8EF5]/50"
          >
            Editar Viaje
          </Button>
          <Button
            variant="outline"
            className="border-2 border-red-300 text-red-500 hover:bg-red-50 rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              if (travel?.id) {
                handleConfirmDelete(travel.id);
              } else {
                console.error("No travel id to delete", travel);
                alert("No se encontró el id del viaje para eliminar");
              }
            }}
          >
            Cancelar viaje
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-4 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#0B8EF5] rounded-full p-2">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase">
              Costo
            </span>
          </div>
          <p className="text-2xl font-bold text-[#0B8EF5]">
            ${travel?.estimatedCost?.toLocaleString("es-CO") || "0"}
          </p>
          <p className="text-xs text-gray-500 mt-1">COP</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-4 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#0B8EF5] rounded-full p-2">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase">
              Cupos
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {travel?.availableSlots || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">Disponibles</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-4 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#0B8EF5] rounded-full p-2">
              <Route className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase">
              Tipo
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {travel?.travelType || "TRIP"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Viaje</p>
        </div>

        <div
          className={`bg-gradient-to-br rounded-2xl p-4 border shadow-md hover:shadow-lg transition-all duration-300 ${getStatusCardClasses(
            travel?.status
          )}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`rounded-full p-2 ${getStatusIconClasses(
                travel?.status
              )}`}
            >
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xs font-semibold uppercase ${getStatusLabelClasses(
                travel?.status
              )}`}
            >
              Estado
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${getStatusTextClasses(
              travel?.status
            )}`}
          >
            {getStatusText(travel?.status)}
          </p>
          <p
            className={`text-xs mt-1 ${getStatusSubtextClasses(
              travel?.status
            )}`}
          >
            Estado actual
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#0B8EF5] rounded-full p-3 shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Origen
              </p>
              <div className="h-1 w-12 bg-[#0B8EF5] rounded-full mt-1"></div>
            </div>
          </div>
          <p className="text-gray-800 font-medium leading-relaxed">
            {travel?.origin.direction || "No especificado"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#0B8EF5] rounded-full p-3 shadow-md">
              <LocateFixed className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Destino
              </p>
              <div className="h-1 w-12 bg-[#0B8EF5] rounded-full mt-1"></div>
            </div>
          </div>
          <p className="text-gray-800 font-medium leading-relaxed">
            {travel?.destiny.direction || "No especificado"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-6 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#0B8EF5] rounded-full p-3 shadow-md">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Salida
              </p>
              <div className="h-1 w-12 bg-[#0B8EF5] rounded-full mt-1"></div>
            </div>
          </div>
          <p className="text-gray-800 font-medium leading-relaxed">
            {travel?.departureDateAndTime
              ? new Date(travel.departureDateAndTime).toLocaleString("es-CO", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : mockTripDetails.departureDate}
          </p>
        </div>
      </div>
      <div
        className={`grid ${
          travel?.passengersId && travel.passengersId.length > 0
            ? "grid-cols-2"
            : "grid-cols-1"
        } gap-6`}
      >
        {travel?.passengersId && travel.passengersId.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
              <Users className="w-7 h-7 text-[#0B8EF5]" />
              <span className="text-gray-800">Pasajeros confirmados</span>
            </h2>
            <div className="space-y-4">
              {travel.passengersId.map((passengerId, index) => (
                <div
                  key={passengerId}
                  className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200/50 shadow-md hover:shadow-lg px-6 py-4 flex items-center gap-4 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[#0B8EF5] flex items-center justify-center overflow-hidden shadow-md">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0B8EF5] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-900">
                      Pasajero {index + 1}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      ID: {passengerId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200/50 p-4 shadow-md">
                <p className="text-lg font-bold text-gray-800">
                  {availableSlotsText}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
            <Car className="w-7 h-7 text-[#0B8EF5]" />
            <span className="text-gray-800">Información del vehículo</span>
          </h2>
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-3xl border border-gray-200/50 shadow-md p-8 transition-all duration-300">
            <div className="flex items-center justify-between pb-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#0B8EF5] rounded-2xl p-4 shadow-md">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    Marca y modelo
                  </p>
                  <p className="font-bold text-xl text-gray-900">
                    {mockTripDetails.vehicle.brand}
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 border-4 border-gray-900 rounded-lg px-6 py-3 shadow-xl transform hover:scale-110 transition-transform duration-200">
                  <div className="absolute top-1 left-1 right-1 h-1 bg-white/30 rounded"></div>
                  <p
                    className="font-black text-2xl text-gray-900 tracking-widest text-center"
                    style={{ fontFamily: "monospace" }}
                  >
                    {mockTripDetails.vehicle.plate}
                  </p>
                  <div className="absolute bottom-1 left-1 right-1 h-1 bg-black/20 rounded"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full border-2 border-gray-900"></div>
              </div>
            </div>
            <div className="border-t-2 border-gray-300 my-6"></div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-black shadow-2xl border-4 border-gray-300"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                  Color del vehículo
                </p>
                <p className="font-bold text-xl text-gray-900">
                  {mockTripDetails.vehicle.color}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t-2 border-gray-200">
        <div className="flex justify-between gap-6">
          <Button
            onClick={() => {
              navigate("/app/conversations");
            }}
            className="flex-1 bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0B8EF5]/50 flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-6 h-6" />
            Chat Con Pasajeros
          </Button>
          <Button
            onClick={() => {
              if (travel?.id) {
                navigate(`/app/geolocalization?travelId=${travel.id}`);
              } else {
                alert("No se encontró el ID del viaje");
              }
            }}
            className="flex-1 bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0B8EF5]/50 flex items-center justify-center gap-3"
          >
            <MapPinned className="w-6 h-6" />
            Seguimiento del Viaje
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsOfTravelComponent;
