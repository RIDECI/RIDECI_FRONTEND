import { useState } from "react";
import { useToast } from "../../../components/ToastContext";
import { useGlobalNotifications } from "../../../context/GlobalNotificationContext";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import NotificationCard from "../components/NotificationCard";
import DatePicker from "../components/DatePicker";

const filters = ["Todas", "Importante", "Viajes", "Alerta"];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { showToast } = useToast();
  const { notifications } = useGlobalNotifications();

  const filteredNotifications = notifications
    .filter((n) => {
      if (activeFilter === "Todas") return true;
      if (activeFilter === "Importante") return n.type === "info";
      if (activeFilter === "Viajes") return n.type === "trip";
      if (activeFilter === "Alerta") return n.type === "success";
      return true;
    })
    .filter((n) => {
      if (!selectedDate) return true;
      const notificationDate = new Date(n.timestamp).toDateString();
      const selectedDateStr = selectedDate.toDateString();
      return notificationDate === selectedDateStr;
    })
    .sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    showToast("", `Filtro cambiado a: ${f}`, "info");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    showToast("", `Notificaciones del ${date.toLocaleDateString("es-ES")}`, "info");
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
    showToast("", "Filtro de fecha eliminado", "info");
  };

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
              onClick={() => handleFilterChange(f)}
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
        <div className="ml-auto relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${selectedDate
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            <Calendar className="w-5 h-5" />
            {selectedDate ? selectedDate.toLocaleDateString("es-ES") : "Seleccionar fecha"}
          </button>

          {showDatePicker && (
            <DatePicker
              onDateSelect={handleDateSelect}
              onClose={() => setShowDatePicker(false)}
            />
          )}

          {selectedDate && (
            <button
              onClick={clearDateFilter}
              className="ml-2 px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-sm font-medium"
            >
              Limpiar
            </button>
          )}
        </div>
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
