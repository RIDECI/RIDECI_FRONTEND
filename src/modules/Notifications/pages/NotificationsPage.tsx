import { useState } from "react";
import { Funnel } from "lucide-react";
import { motion } from "framer-motion";
import NotificationCard from "../components/NotificationCard";
import { mockNotifications } from "../utils/mockNotifications";

const filters = ["Todas", "Importante", "Viajes", "Alerta"];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const filteredNotifications = mockNotifications.filter((n) => {
    if (activeFilter === "Todas") return true;
    if (activeFilter === "Importante") return n.type === "info";
    if (activeFilter === "Viajes") return n.type === "trip";
    if (activeFilter === "Alerta") return n.type === "success";
    return true;
  });

  return (
    <div className="p-10 w-full h-full">

      {/* Título */}
      <h1 className="text-3xl font-bold mb-6">Notificaciones</h1>

      {/* Contenedor de Tabs */}
    <div className="relative flex items-center p-2 rounded-2xl mb-6 w-full shadow-sm 
                bg-white border border-gray-200">
      {filters.map((f) => {
      const isActive = activeFilter === f;

      return (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          className="relative z-10 px-5 py-2 text-lg font-medium text-blue-600"
        >
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-blue-600 rounded-xl shadow"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}

        <span className={`relative z-20 ${isActive ? "text-white" : "text-blue-600"}`}>
          {f}
        </span>
      </button>
    );
    })}

    {/* Botón filtro */}
    <button className="ml-auto p-2 rounded-lg hover:bg-blue-100 transition">
    <Funnel className="w-6 h-6 text-blue-600" />
    </button>
    </div>


      {/* Panel blanco */}
      <div className="bg-white rounded-2xl shadow-xl p-6 h-full">

        {/* Caso vacío */}
        {filteredNotifications.length === 0 && (
          <div className="flex items-center justify-center h-[300px] text-gray-500 text-xl font-medium">
            Al parecer aún no tienes notificaciones.
          </div>
        )}

        {/* Lista de notificaciones */}
        {filteredNotifications.length > 0 &&
          filteredNotifications.map((n) => (
            <NotificationCard key={n.id} notification={n} />
          ))
        }
      </div>
    </div>
  );
}
