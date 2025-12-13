import type { Alert, StateAlert } from '@/modules/security/types/Alert';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onVerDetalles?: (alert: Alert) => void; 
}

const getEstadoStyles = (state: StateAlert) => {
  switch (state) {
    case 'Aprobado':
      return {
        text: 'text-green-700',
        icon: <CheckCircle className="w-5 h-5 text-green-600" />
      };
    case 'Pendiente':
      return {
        text: 'text-yellow-700',
        icon: <AlertCircle className="w-5 h-5 text-yellow-600" />
      };
    case 'Rechazado':
      return {
        text: 'text-red-700',
        icon: <XCircle className="w-5 h-5 text-red-600" />
      };
  }
};

function AlertCard({ alert, onVerDetalles }: AlertCardProps) {
  const styles = getEstadoStyles(alert.state);
  
  return (
    <Card className="gap-4 bg-[#CAE8FF]/35">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {alert.senderId ? (
              <AlertCircle className="w-5 h-5 text-orange-600" />
            ) : (
              styles.icon
            )}
            <span className="text-lg">IDReporte {alert.id}</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full bg-[#CAE8FF]/35 ${styles.text} flex items-center gap-1`}>
            {styles.icon}
            {alert.state}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2 text-sm text-gray-600">
        {alert.senderId && (
          <p className="font-semibold">
            <span className="text-gray-600">Remitente:</span> {alert.senderId}
          </p>
        )}
        <p>
          <span className="font-semibold text-gray-600">Usuario reportado:</span> {alert.userReport}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Tipo:</span> {alert.type}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Fecha:</span> {alert.date}
        </p>
      </CardContent>
      
      <CardFooter>
        {onVerDetalles && (
          <Button 
            className="w-full bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white rounded-lg"
            onClick={() => onVerDetalles(alert)}
          >
            Ver detalles
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default AlertCard;
