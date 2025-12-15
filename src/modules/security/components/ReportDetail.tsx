import React from 'react'
import type { Report } from '../types/Report'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import './ReportDetail.css'

interface ReportDetailProps {
  report: Report
  onClose: () => void
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onClose }) => {
  const getEstadoBadgeClass = (state: Report['state']) => {
    switch (state) {
      case 'Aprobado':
        return 'estado-aprobado'
      case 'Pendiente':
        return 'estado-pendiente'
      case 'Rechazado':
        return 'estado-rechazado'
      default:
        return 'estado-pendiente'
    }
  }

  const getEstadoIcon = (state: Report['state']) => {
    switch (state) {
      case 'Aprobado':
        return <CheckCircle className="w-4 h-4" />
      case 'Pendiente':
        return <AlertCircle className="w-4 h-4" />
      case 'Rechazado':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="detalle-screen-wrapper">
      <div className="detalle-screen-card">
        {/* Título */}
        <h1 className="detalle-title">Detalle del reporte</h1>

        {/* Grid de 2 columnas */}
        <div className="detalle-content-grid">
          {/* COLUMNA IZQUIERDA */}
          <div className="detalle-left-column">
            {/* Card azul con info */}
            <div className="info-card">
              <div className="info-item">
                <strong>Id del Reporte:</strong> {report.id}
              </div>
              <div className="info-item">
                <strong>Remitente:</strong> {report.senderId}
              </div>
              <div className="info-item">
                <strong>Tipo de incidente:</strong> {report.type}
              </div>
              <div className="info-item">
                <strong>Fecha:</strong> {report.date}
              </div>
            </div>

            {/* Comentario */}
            <div className="comentario-wrapper">
              <label className="comentario-label">
                Comentario de la situación:
              </label>
              <div className="comentario-text">
                {report.comment || 'Sin comentario disponible'}
              </div>
              <p className="comentario-hint">
                Recuerda ser respetuoso siempre en tus comentarios (250 carácteres max).
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="detalle-right-column">
            {/* Badge de estado */}
            <div
              className={`estado-badge ${getEstadoBadgeClass(report.state)}`}
            >
              {getEstadoIcon(report.state)}
              <span>{report.state}</span>
            </div>

            {/* Evidencia */}
            <div className="imagen-placeholder">
              {report.evidence ? (
                <img src={report.evidence} alt="Evidencia del reporte" />
              ) : (
                <span className="no-imagen-text">Sin imagen</span>
              )}
            </div>
          </div>
        </div>

        {/* Botón cerrar */}
        <button className="btn-cerrar-detalles" onClick={onClose}>
          Cerrar detalles
        </button>
      </div>
    </div>
  )
}

export default ReportDetail
