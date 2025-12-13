import { MapPin, LocateFixed, Clock, CircleDollarSign, Calendar} from "lucide-react"

interface CardMapComponentProps {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  estimatedCost: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onCostChange: (value: string) => void;
}

const CardMapComponent = ({
  origin,
  destination,
  departureDate,
  departureTime,
  estimatedCost,
  onOriginChange,
  onDestinationChange,
  onDateChange,
  onTimeChange,
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
      placeholder: 'Fecha de Salida',
      type: 'date',
      icon: Calendar,
      value: departureDate,
      onChange: onDateChange
    },
    {
      id: 'time',
      placeholder: 'Hora de Salida',
      type: 'time',
      icon: Clock,
      value: departureTime,
      onChange: onTimeChange
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
    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-5 w-80 z-10 border-2 border-[#0B8EF5]/30 hover:border-[#0B8EF5]/50 hover:shadow-[0_20px_60px_-15px_rgba(11,142,245,0.4)] transition-all duration-300">
      <div className="space-y-3">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div 
              key={field.id} 
              className="flex items-center gap-3 bg-sky-50 rounded-full px-4 py-3 transition-all duration-200 hover:bg-sky-100 border border-sky-200/50 hover:border-sky-300 hover:shadow-md"
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