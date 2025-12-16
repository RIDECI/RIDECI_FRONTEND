import type { Report, StateReport } from '@/modules/security/types/Report'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface ReportCardProps {
  report: Report
  onVerDetalles?: (report: Report) => void
}

const getEstadoStyles = (state: StateReport) => {
  switch (state) {
    case 'Aprobado':
      return {
        text: 'text-green-700',
        icon: <CheckCircle className="w-5 h-5 text-green-600" />
      }
    case 'Pendiente':
      return {
        text: 'text-yellow-700',
        icon: <AlertCircle className="w-5 h-5 text-yellow-600" />
      }
    case 'Rechazado':
      return {
        text: 'text-red-700',
        icon: <XCircle className="w-5 h-5 text-red-600" />
      }
  }
}

function ReportCard({ report, onVerDetalles }: ReportCardProps) {
  const styles = getEstadoStyles(report.state)

  return (
    <Card className="gap-4 bg-[#CAE8FF]/35">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {report.senderId ? (
              <AlertCircle className="w-5 h-5 text-orange-600" />
            ) : (
              styles.icon
            )}
            <span className="text-lg">IDReporte {report.id}</span>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full bg-[#CAE8FF]/35 ${styles.text} flex items-center gap-1`}
          >
            {styles.icon}
            {report.state}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-gray-600">
        {report.senderId && (
          <p className="font-semibold">
            <span className="text-gray-600">Remitente:</span>{' '}
            {report.senderId}
          </p>
        )}

        <p>
          <span className="font-semibold text-gray-600">
            Usuario reportado:
          </span>{' '}
          {report.userReport}
        </p>

        <p>
          <span className="font-semibold text-gray-600">Tipo:</span>{' '}
          {report.type}
        </p>

        <p>
          <span className="font-semibold text-gray-600">Fecha:</span>{' '}
          {report.date}
        </p>
      </CardContent>

      <CardFooter>
        {onVerDetalles && (
          <Button
            className="w-full bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg"
            onClick={() => onVerDetalles(report)}
          >
            Ver detalles
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ReportCard
