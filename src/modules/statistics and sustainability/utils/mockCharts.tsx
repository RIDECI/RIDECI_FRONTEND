// src/modules/statistics and sustainability/utils/mockCharts.tsx

import React from 'react';

// Mock components para gráficos (simulación de Recharts)
export const ResponsiveContainer = ({ 
  children, 
  width = '100%', 
  height = 200 
}: { 
  children: React.ReactNode;
  width?: string | number;
  height?: number;
}) => (
  <div style={{ width, height, position: 'relative' }}>{children}</div>
);

export const PieChart = ({ 
  children, 
  width = 250, 
  height = 250 
}: { 
  children: React.ReactNode;
  width?: number;
  height?: number;
}) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    {children}
  </svg>
);

export const Pie = ({ data, dataKey, outerRadius, fill, cx, cy }: any) => {
  const total = data.reduce((sum: number, item: any) => sum + item[dataKey], 0);
  let currentAngle = 0;

  const getPath = (startAngle: number, endAngle: number, outerRadius: number) => {
    const startX = cx + outerRadius * Math.cos(-startAngle * Math.PI / 180);
    const startY = cy + outerRadius * Math.sin(-startAngle * Math.PI / 180);
    const endX = cx + outerRadius * Math.cos(-endAngle * Math.PI / 180);
    const endY = cy + outerRadius * Math.sin(-endAngle * Math.PI / 180);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return `M ${cx} ${cy}
            L ${startX} ${startY}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${endX} ${endY}
            Z`;
  };

  return (
    <>
      {data.map((entry: any, index: number) => {
        const startAngle = currentAngle;
        const endAngle = currentAngle + (entry[dataKey] / total) * 360;
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

export const Cell = ({ fill }: any) => null;