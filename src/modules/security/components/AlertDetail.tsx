import React from 'react';
import type { Alert } from '../types/Alert';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import './AlertDetail.css';

interface AlertDetailProps {
  alert: Alert;
  onClose: () => void;
}

const AlertDetail: React.FC<AlertDetailProps> = ({ alert, onClose }) => {
  const getEstadoBadgeClass = (state: Alert['state']) => {
    switch (state) {
      case 'Aprobado':
        return 'estado-aprobado';
      case 'Pendiente':
        return 'estado-pendiente';
      case 'Rechazado':
        return 'estado-rechazado';
      default:
        return 'estado-pendiente';
    }
  };

  const getEstadoIcon = (state: Alert['state']) => {
    switch (state) {
      case 'Aprobado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendiente':
        return <AlertCircle className="w-4 h-4" />;
      case 'Rechazado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

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
                  <strong>Id del Reporte:</strong> {alert.id}
                </div>
                <div className="info-item">
                  <strong>Remitente:</strong> {alert.senderId}
                </div>
                <div className="info-item">
                  <strong>Tipo de incidente:</strong> {alert.type}
                </div>
                <div className="info-item">
                  <strong>Fecha:</strong> {alert.date}
                </div>
              </div>

              {/* Comentario - ABAJO de la card azul */}
              <div className="comentario-wrapper">
                <label className="comentario-label">Comentario de la situación:</label>
                <div className="comentario-text">
                  {alert.comment || 'Sin comentario disponible'}
                </div>
                <p className="comentario-hint">
                  Recuerda ser respetuoso siempre en tus comentarios (250 carácteres max).
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="detalle-right-column">
              {/* Badge de estado */}
              <div className={`estado-badge ${getEstadoBadgeClass(alert.state)}`}>
                {getEstadoIcon(alert.state)}
                <span>{alert.state}</span>
              </div>

              {/* Placeholder de imagen */}
              <div className="imagen-placeholder">
                {alert.evidence ? (
                    <img src={alert.evidence} alt="Evidencia del reporte" />
                ) : (
                    <span className="no-imagen-text">Sin imagen</span>
                )}
              </div>
            </div>
          </div>

          {/* Botón cerrar detalles */}
          <button className="btn-cerrar-detalles" onClick={onClose}>
            Cerrar detalles
          </button>
        </div>
      </div>
  );
};

export default AlertDetail;
