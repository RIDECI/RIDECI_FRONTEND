import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import SuccessModal from './SuccessModal'

interface EmergencyModalProps {
  isVisible: boolean
  onClose: () => void
}

function EmergencyModal({ isVisible, onClose }: EmergencyModalProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [reportId, setReportId] = useState<string | null>(null)

  if (!isVisible && !showSuccess) return null

  const handleSafe = () => {
    onClose()
  }

  const handleEmergency = () => {
    setReportId('REPORTE-001')
    setShowSuccess(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setReportId(null)
    onClose()
  }

  return (
    <>
      {isVisible && !showSuccess && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div
            className="bg-white w-full max-w-xs rounded-xl p-6 shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="border-2 border-red-500 rounded-full p-3">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <h2 className="text-lg font-bold mb-1">¿Necesitas ayuda?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Indícanos tu situación
            </p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleEmergency}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Estoy en riesgo
              </Button>

              <Button
                onClick={handleSafe}
                className="bg-green-400 hover:bg-green-500 text-white"
              >
                Estoy bien
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && reportId && (
        <SuccessModal
          isVisible={showSuccess}
          onClose={handleCloseSuccess}
          reportId={reportId}
        />
      )}
    </>
  )
}

export default EmergencyModal
