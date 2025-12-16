import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

interface LocationState {
  passengerId?: string;
  passengerName?: string;
}

function ReportForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportId, setReportId] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passengerName = state?.passengerName || 'Pasajero #1';
  const passengerId = state?.passengerId || '';

  const incidentTypes = [
    { value: '', label: 'Selecciona un tipo de incidente' },
    { value: 'robo', label: 'Robo' },
    { value: 'acoso', label: 'Acoso' },
    { value: 'agresion_fisica', label: 'Agresión Física' },
    { value: 'agresion_verbal', label: 'Agresión Verbal' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isPDF = file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024;
      return (isImage || isVideo || isPDF) && isValidSize;
    });

    if (validFiles.length !== files.length) {
      alert('Algunos archivos fueron omitidos. Solo se aceptan imágenes, videos y PDFs menores a 10MB.');
    }

    setEvidenceFiles(prev => [...prev, ...validFiles]);
  };

  const handleSubmitReport = async () => {
    if (!incidentType) {
      alert('Por favor selecciona un tipo de incidente');
      return;
    }

    setIsSubmitting(true);

    try {
      // ==========================================
      // VERSIÓN SIN BACKEND (TEMPORAL)
      // ==========================================

      // Generar ID de reporte
      const newReportId = `RPT${Date.now()}`;

      // Crear objeto con los datos del reporte
      const reportData = {
        reportId: newReportId,
        passengerId,
        passengerName,
        incidentType,
        description: reportDescription,
        evidenceCount: evidenceFiles.length,
        evidenceFiles: evidenceFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type
        })),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      // Guardar en localStorage
      const existingReports = JSON.parse(localStorage.getItem('incident_reports') || '[]');
      existingReports.push(reportData);
      localStorage.setItem('incident_reports', JSON.stringify(existingReports));

      console.log('📋 Reporte guardado localmente:', reportData);
      console.log('📊 Total de reportes:', existingReports.length);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      setReportId(newReportId);
      setIsModalOpen(true);

      // ==========================================
      // VERSIÓN CON BACKEND (COMENTADA)
      // Descomentamos este código cuando tengamos el backend listo
      // ==========================================

      /*
      // Crear FormData para enviar archivos
      const formData = new FormData();
      formData.append('passengerId', passengerId);
      formData.append('passengerName', passengerName);
      formData.append('incidentType', incidentType);
      formData.append('description', reportDescription);
      formData.append('timestamp', new Date().toISOString());

      evidenceFiles.forEach((file, index) => {
        formData.append(`evidence_${index}`, file);
      });

      // Llamada al backend para crear el reporte
      const response = await fetch('/api/security/incidents/report', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al enviar el reporte');
      }

      const reportData = await response.json();
      const newReportId = reportData.id || `RPT${Date.now()}`;

      // Actualizar el historial de reportes
      await fetch('/api/security/incidents/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: newReportId,
          passengerId,
          incidentType,
          status: 'pending',
          createdAt: new Date().toISOString()
        })
      });

      setReportId(newReportId);
      setIsModalOpen(true);
      */

    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      alert('Hubo un error al enviar el reporte. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReportDescription('');
    setIncidentType('');
    setEvidenceFiles([]);
    navigate(-1);
  };

  return (
      <div className="min-h-screen bg-white">
        {/* Contenedor principal */}
        <div className="max-w-3xl mx-auto px-6 py-8">

          {/* Título */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Reporte de un incidente
            </h1>
            <p className="text-gray-600 text-sm">
              Estamos aquí para ayudarte, cuéntanos qué sucedió.
            </p>
          </div>

          {/* Card principal */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">

            {/* Pasajero reportado */}
            <div className="mb-6">
              <p className="text-gray-900 font-medium">
                Estás reportando a: <span className="font-bold">{passengerName}</span>
              </p>
            </div>

            {/* Tipo de incidente */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2">
                Tipo <span className="text-red-500">*</span>
              </label>
              <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {incidentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                ))}
              </select>
            </div>

            {/* Comentario */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2">
                Comentario de la situación (opcional)
              </label>
              <Textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Cuéntanos qué pasó..."
                  className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-md text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
              />
            </div>

            {/* Evidencia */}
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2">
                Evidencia de la situación (opcional)
              </label>

              {/* Botón de upload */}
              <label className="block">
                <input
                    type="file"
                    multiple
                    accept="image/*,video/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Puedes adjuntar un archivo aquí
                  </p>
                </div>
              </label>

              {/* Lista de archivos subidos */}
              {evidenceFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {evidenceFiles.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                        >
                    <span className="text-sm text-gray-700 truncate">
                      {file.name}
                    </span>
                          <button
                              type="button"
                              onClick={() => setEvidenceFiles(prev => prev.filter((_, i) => i !== index))}
                              className="text-red-500 text-sm hover:text-red-700"
                          >
                            Eliminar
                          </button>
                        </div>
                    ))}
                  </div>
              )}
            </div>

            {/* Botón enviar */}
            <Button
                onClick={handleSubmitReport}
                disabled={isSubmitting}
                className="w-full bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg py-6 text-base font-semibold"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
            </Button>

          </div>
        </div>

        {/* Modal de éxito */}
        <SuccessModal
            isVisible={isModalOpen}
            onClose={handleCloseModal}
            reportId={reportId}
        />
      </div>
  );
}

export default ReportForm;
