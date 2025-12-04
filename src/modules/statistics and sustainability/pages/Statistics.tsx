import React from 'react';
import {
  Zap,
  Compass,
  TrendingDown,
  Leaf,
} from 'lucide-react';

// --- MOCK COMPONENTS PARA GRÁFICOS (SIMULACIÓN DE RECHARTS) ---
// Se incluyen para mantener el componente autocontenido y funcional sin dependencias externas
const ResponsiveContainer = ({ children, width = '100%', height = 200 }: { children: React.ReactNode, width?: string | number, height?: number }) => (
  <div style={{ width, height, position: 'relative' }}>{children}</div>
);
const PieChart = ({ children, width = 250, height = 250 }: { children: React.ReactNode, width?: number, height?: number }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    {children}
  </svg>
);
// Mock Pie component para simular las porciones del gráfico.
const Pie = ({ data, dataKey, outerRadius, fill, cx, cy }: any) => {
  const total = data.reduce((sum: number, item: any) => sum + item[dataKey], 0);
  let currentAngle = 0;

  const getPath = (startAngle: number, endAngle: number, outerRadius: number) => {
    // Cálculo simplificado de puntos para un arco
    const startX = cx + outerRadius * Math.cos((-startAngle + 90) * Math.PI / 180);
    const startY = cy + outerRadius * Math.sin((-startAngle + 90) * Math.PI / 180);
    const endX = cx + outerRadius * Math.cos((-endAngle + 90) * Math.PI / 180);
    const endY = cy + outerRadius * Math.sin((-endAngle + 90) * Math.PI / 180);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    // Mover al centro (M cx cy), línea hasta el borde (L startX startY),
    // arco (A r r 0 largeArcFlag sweepFlag endX endY), y cerrar al centro (Z).
    return `M ${cx} ${cy}
            L ${startX} ${startY}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${endX} ${endY}
            L ${cx} ${cy}
            Z`;
  };

  return (
    <>
      {data.map((entry: any, index: number) => {
        const startAngle = currentAngle;
        const value = entry[dataKey];
        const endAngle = currentAngle + (value / total) * 360;
        currentAngle = endAngle;
        const color = entry.fill || fill;
        
        return (
          <path
            key={`slice-${index}`}
            d={getPath(startAngle, endAngle, outerRadius)}
            fill={color}
          />
        );
      })}
    </>
  );
};
const Cell = ({ fill }: any) => null; // Mock Cell component

// --- DEFINICIONES DE TIPOS (TYPESCRIPT INTERFACES) ---

interface KpiData {
  value: string;
  unit: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface Destination {
  name: string;
  value: number;
  fill: string;
}

interface Schedule {
  time: string;
  count: number;
  fill: string;
}

interface ImpactMetric {
  label: string;
  value: string;
  unit: string;
}

interface Distribution {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

// --- MOCK DATA ---

const kpiData: KpiData[] = [
  { value: '48', unit: 'VIAJES', description: 'MES', icon: Zap, color: 'text-blue-500' },
  { value: '8,234', unit: 'km', description: 'DISTANCIA PROMEDIO EN UN VIAJE', icon: Compass, color: 'text-green-500' },
  { value: '$287,350', unit: '', description: 'DINERO GASTADO MES', icon: TrendingDown, color: 'text-red-500' },
  { value: '45.2T', unit: '', description: 'CO₂ REDUCIDO', icon: Leaf, color: 'text-cyan-500' },
];

const destinationData: Destination[] = [
  { name: '1. Escuela Colombiana de Ingeniería', value: 300, fill: '#3B82F6' },
  { name: '2. Zona Rosa', value: 250, fill: '#2563EB' },
  { name: '3. Usaquén', value: 180, fill: '#1D4ED8' },
  { name: '4. La Candelaria', value: 120, fill: '#1E40AF' },
  { name: '5. Chapinero', value: 100, fill: '#1E3A8A' },
];

const scheduleData: Schedule[] = [
  { time: '08:00 - 09:30', count: 20, fill: '#3B82F6' },
  { time: '12:00 - 13:30', count: 20, fill: '#3B82F6' },
  { time: '17:00 - 19:00', count: 5, fill: '#60A5FA' },
  { time: '19:00 - 21:00', count: 3, fill: '#93C5FD' },
];

const impactMetrics: ImpactMetric[] = [
  { label: 'CO₂ Reducción (Mes)', value: '45.2T', unit: '' },
  { label: 'Equivalente a', value: '2,847', unit: 'árboles' },
  { label: 'Km Compartidos', value: '34,867', unit: 'km' },
  { label: 'Pasajeros Compartidos', value: '5,234', unit: 'personas' },
  { label: 'Emisiones Evitadas', value: '88.4T', unit: 'CO₂' },
];

const tripDistribution: Distribution[] = [
  { label: 'Viajes Individuales', count: 7456, percentage: 59, color: '#3B82F6' },
  { label: 'Viajes Compartidos', count: 5091, percentage: 41, color: '#2563EB' },
];

// --- COMPONENTES INTERNOS ---

const KpiCard: React.FC<{ data: KpiData }> = ({ data }) => (
  <div className="flex-1 min-w-[200px] p-4 bg-white rounded-xl shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <div className='flex flex-col'>
        <div className={`text-3xl font-bold ${data.color}`}>{data.value}</div>
        <div className="text-sm font-semibold text-gray-500 uppercase">{data.unit}</div>
      </div>
      <data.icon size={30} className={data.color} />
    </div>
    <p className="text-xs text-gray-400 mt-1 h-8 flex items-end">{data.description}</p>
  </div>
);

const DestinationRanking: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="w-full lg:w-1/2">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Ranking de Destinos
        </h3>
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-full max-w-[250px] flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={250} height={250}>
                <Pie
                  data={destinationData}
                  cx={125}
                  cy={125}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {destinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 w-full md:w-auto md:mt-0">
            <h4 className="text-base font-semibold text-gray-700 mb-2">Top 5 Destinos Más Populares Este Mes</h4>
            <ul className="text-sm space-y-2">
              {destinationData.map((dest, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dest.fill }}
                  ></span>
                  <span className="text-gray-700">{dest.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8 lg:border-l border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Ranking de Horarios de Salida
        </h3>
        <div className="space-y-4">
          {scheduleData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{item.time}</span>
                <span>{item.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full shadow-md"
                  style={{
                    width: `${(item.count / 20) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImpactSection: React.FC = () => {
  const totalTrips = tripDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Metricas de Impacto */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Impacto Ambiental y Sostenibilidad
          </h2>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Métricas de Impacto
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-xs text-gray-500 uppercase leading-tight mb-1">
                  {metric.label}
                </p>
                <p className="text-xl font-bold text-blue-900">
                  {metric.value}{' '}
                  <span className="text-sm font-normal">{metric.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Distribucion Viajes */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8 md:border-l border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Distribución Viajes
          </h3>
          <div className="space-y-4">
            {tripDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold text-blue-900">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(item.count / totalTrips) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 flex justify-between pt-4 border-t border-gray-100">
            <span className="font-medium">Reducción Promedio</span>
            <span className="font-bold text-blue-900">3.8 kg CO₂/viaje</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (Solo el Contenido Interior) ---

const App: React.FC = () => {
  return (
    // Contenedor raíz que incluye el título y el contenido. 
    // Se elimina el wrapper de la tarjeta blanca y el fondo, manteniendo solo la estructura interna.
    <div className="w-full font-sans">
      
      {/* Título Principal y Separador */}
      {/* Mantenemos el estilo para que se asemeje a la imagen original, con una línea inferior. */}
      <div className="p-4 md:p-8 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Estadísticas y Sostenibilidad
        </h1>
      </div>
        
      {/* Contenido principal (KPIs, Rankings, Impacto) */}
      <div className="p-4 md:p-8 pt-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {kpiData.map((data, index) => (
            <KpiCard key={index} data={data} />
          ))}
        </div>

        {/* Ranking Section */}
        <DestinationRanking />

        {/* Impact Section */}
        <ImpactSection />

        {/* Footer Buttons */}
        <div className="flex flex-col md:flex-row justify-start space-y-4 md:space-y-0 md:space-x-4 mt-10">
          <button className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-[1.03]">
            Estadísticas Generales
          </button>
          <button className="px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition duration-150 transform hover:scale-[1.03]">
            Generar Reporte
          </button>
          <button className="px-6 py-3 text-sm font-semibold text-blue-700 bg-white border border-blue-700 rounded-lg shadow-md hover:bg-gray-50 transition duration-150 transform hover:scale-[1.03]">
            Filtrado de Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
};

export const Statistics = App;