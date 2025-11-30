import { MapPin, LocateFixed, Clock, CircleDollarSign} from "lucide-react"

interface CardMapComponentProps {
  origin: string;
  destination: string;
  departureDateAndTime: string;
  estimatedCost: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCostChange: (value: string) => void;
}

const CardMapComponent = ({
  origin,
  destination,
  departureDateAndTime,
  estimatedCost,
  onOriginChange,
  onDestinationChange,
  onDateChange,
  onCostChange
}: CardMapComponentProps) => {
  
  const handleCostChange = (value: string) => {
    const numericValue = value.replaceAll(/\D/g, '');
    const formatted = numericValue.replaceAll(/\B(?=(\d{3})+(?!\d))/g, '.');
    onCostChange(formatted);
  };

  const fields = [
    {
      id: 'origin',
      placeholder: 'Punto de Origen',
      type: 'text',
      icon: MapPin,
      value: origin,
      onChange: onOriginChange
    },
    {
      id: 'destination',
      placeholder: 'Punto de destino',
      type: 'text',
      icon: LocateFixed,
      value: destination,
      onChange: onDestinationChange
    },
    {
      id: 'date',
      placeholder: 'Fecha y Hora de Salida',
      type: 'datetime-local',
      icon: Clock,
      value: departureDateAndTime,
      onChange: onDateChange
    },
    {
      id: 'cost',
      placeholder: 'Costo Estimado (COP)',
      type: 'text',
      icon: CircleDollarSign,
      value: estimatedCost,
      onChange: handleCostChange
    }
  ];

  return (
    <div className="absolute top-6 left-6 bg-white rounded-3xl shadow-xl p-4 w-80 z-10 border border-gray-100">
      <div className="space-y-3">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div 
              key={field.id} 
              className="flex items-center gap-3 bg-sky-50 rounded-full px-4 py-3 transition-colors hover:bg-sky-100"
            >
              <div className="shrink-0 text-gray-700">
                <Icon className="w-5 h-5" />
              </div>
              <input
                type={field.type}
                name={field.id}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm font-medium [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardMapComponent;