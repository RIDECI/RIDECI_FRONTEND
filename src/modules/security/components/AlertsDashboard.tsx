import { useState, useMemo } from 'react';
import type { Alert, StateAlert } from '../types/Alert';
import AlertCard from './AlertCard';
import AlertDetail from './AlertDetail';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, FileText, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const DUMMY_REPORTS: Alert[] = [
  { id: '12345_1', type: 'Robo', date: '17/11/2025', state: 'Aprobado', userReport: 'idUser1234', senderId: 'idUdl234', evidence: './', comment: 'Son unas ratas, deje el celular y no me lo devolvieron' },
  { id: '12345_2', type: 'Agresión Física', date: '17/11/2025', state: 'Pendiente', userReport: 'idUser1234', senderId: 'idUdl234', evidence: 'evidencia2.jpg', comment: 'Comentario 2' },
  { id: '12345_3', type: 'Acoso', date: '17/11/2025', state: 'Rechazado', userReport: 'idUser1234', senderId: 'idUdl234', comment: 'Comentario 3' },
  { id: '12345_4', type: 'Agresión Verbal', date: '17/11/2025', state: 'Rechazado', userReport: 'idUser1234', senderId: 'idUdl234' },
  { id: '12345_5', type: 'Robo', date: '17/11/2025', state: 'Pendiente', userReport: 'idUser1234', senderId: 'idUdl234' },
  { id: '12345_6', type: 'Acoso', date: '17/11/2025', state: 'Aprobado', userReport: 'idUser1234', senderId: 'idUdl234' },
];

function AlertsDashboard() {


  const navigate = useNavigate();

  const handleCreateReport = () => {
    navigate("/reportes/nuevo");  // Ruta hacia tu ReportForm
  };

  const [tipoFiltro, setTipoFiltro] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<StateAlert | 'Todos'>('Todos');
  const [selectedReport, setSelectedReport] = useState<Alert | null>(null);

  const reportesFiltrados = useMemo(() => {
    return DUMMY_REPORTS.filter(alert => {
      const tipoMatch = tipoFiltro === '' || alert.type.toLowerCase().includes(tipoFiltro.toLowerCase());
      const fechaMatch = fechaFiltro === '' || alert.date === fechaFiltro;
      const estadoMatch = estadoFiltro === 'Todos' || alert.state === estadoFiltro;
      return tipoMatch && fechaMatch && estadoMatch;
    });
  }, [tipoFiltro, fechaFiltro, estadoFiltro]);

  if (selectedReport) {
    return (
        <AlertDetail
            alert={selectedReport}
            onClose={() => setSelectedReport(null)}
        />
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
    <AlertCircle className="w-6 h-6 text-black" /> {/* Icono negro al lado del título */}
    <h1 className="text-3xl font-bold">Mis Reportes</h1>
  </div>

  <Button
    onClick={handleCreateReport}
    className="bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg px-6 py-6 flex items-center gap-2"
  >
    <Plus className="w-5 h-5" />
    Crear Nuevo Reporte
  </Button>
</div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Filtro Tipo */}
          <div className="space-y-2">
            <label htmlFor="tipo" className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Tipo
            </label>
            <Input
                id="tipo"
                type="text"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                placeholder="Especifica el tipo"
                className="h-10"
            />
          </div>

          {/* Filtro Fecha */}
          <div className="space-y-2">
            <label htmlFor="fecha" className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha
            </label>
            <Input
                id="fecha"
                type="date"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
                className="h-10"
            />
          </div>

          {/* Filtro Estado */}
          <div className="space-y-2">
            <label htmlFor="estado" className="text-sm font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Estado
            </label>
            <select
                id="estado"
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value as StateAlert | 'Todos')}
                className="w-full h-10 px-3 rounded-md border border-input bg-transparent shadow-xs focus:border-ring focus:ring-ring/50 focus:ring-[3px] outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>

        {/* Lista de Reportes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {reportesFiltrados.map((alert) => (
              <AlertCard
                  key={alert.id}
                  alert={alert}
                  onVerDetalles={(r) => setSelectedReport(r)}
              />
          ))}
        </div>

        {reportesFiltrados.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No se encontraron reportes con los filtros seleccionados
            </div>
        )}

        <div className="flex justify-center">
          <Button
              variant="outline"
              className="px-8 bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg"
          >
            Cerrar
          </Button>
        </div>
      </div>
  );
}

export default AlertsDashboard;