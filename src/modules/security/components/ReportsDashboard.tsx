import { useState, useMemo } from 'react'
import type { Report, StateReport } from '../types/Report'
import ReportCard from './ReportCard'
import ReportDetail from './ReportDetail'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Shield, Calendar, FileText, AlertCircle, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DUMMY_REPORTS: Report[] = [
  {
    id: '12345_1',
    type: 'Robo',
    date: '17/11/2025',
    state: 'Aprobado',
    userReport: 'idUser1234',
    senderId: 'idUdl234',
    evidence: './',
    comment: 'Son unas ratas, deje el celular y no me lo devolvieron'
  },
  {
    id: '12345_2',
    type: 'Agresión Física',
    date: '17/11/2025',
    state: 'Pendiente',
    userReport: 'idUser1234',
    senderId: 'idUdl234',
    evidence: 'evidencia2.jpg',
    comment: 'Comentario 2'
  },
  {
    id: '12345_3',
    type: 'Acoso',
    date: '17/11/2025',
    state: 'Rechazado',
    userReport: 'idUser1234',
    senderId: 'idUdl234',
    comment: 'Comentario 3'
  },
  {
    id: '12345_4',
    type: 'Agresión Verbal',
    date: '17/11/2025',
    state: 'Rechazado',
    userReport: 'idUser1234',
    senderId: 'idUdl234'
  },
  {
    id: '12345_5',
    type: 'Robo',
    date: '17/11/2025',
    state: 'Pendiente',
    userReport: 'idUser1234',
    senderId: 'idUdl234'
  },
  {
    id: '12345_6',
    type: 'Acoso',
    date: '17/11/2025',
    state: 'Aprobado',
    userReport: 'idUser1234',
    senderId: 'idUdl234'
  }
]

function ReportsDashboard() {
  const navigate = useNavigate()

  const [tipoFiltro, setTipoFiltro] = useState('')
  const [fechaFiltro, setFechaFiltro] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState<StateReport | 'Todos'>('Todos')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const reportesFiltrados = useMemo(() => {
    return DUMMY_REPORTS.filter((report) => {
      const tipoMatch =
        tipoFiltro === '' ||
        report.type.toLowerCase().includes(tipoFiltro.toLowerCase())
      const fechaMatch = fechaFiltro === '' || report.date === fechaFiltro
      const estadoMatch =
        estadoFiltro === 'Todos' || report.state === estadoFiltro

      return tipoMatch && fechaMatch && estadoMatch
    })
  }, [tipoFiltro, fechaFiltro, estadoFiltro])

  if (selectedReport) {
    return (
      <ReportDetail
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-black" />
          <h1 className="text-3xl font-bold">Mis Reportes</h1>
        </div>

      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Tipo */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Tipo
          </label>
          <Input
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            placeholder="Especifica el tipo"
            className="h-10"
          />
        </div>

        {/* Fecha */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha
          </label>
          <Input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="h-10"
          />
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Estado
          </label>
          <select
            value={estadoFiltro}
            onChange={(e) =>
              setEstadoFiltro(e.target.value as StateReport | 'Todos')
            }
            className="w-full h-10 px-3 rounded-md border border-input bg-transparent"
          >
            <option value="Todos">Todos</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {reportesFiltrados.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
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
  )
}

export default ReportsDashboard
