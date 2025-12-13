// src/components/ChartWrapper.tsx
import React from "react";

interface Props {
  children: React.ReactNode;
  /** altura mínima en px (Tailwind arbitrary, e.g. 224 -> min-h-[224px]) */
  minHeight?: number;
  className?: string;
}

/**
 * Wrapper para charts (Recharts / Chart.js) que:
 * - asegura min-width 0 en parents flex (evita colapsos)
 * - da un min-height para que ResponsiveContainer pueda medir
 */
export default function ChartWrapper({ children, minHeight = 224, className = "" }: Props) {
  return (
    <div className={`w-full min-w-0 ${className}`}>
      {/* contenedor con altura fija/minima para que ResponsiveContainer calcule tamaño */}
      <div style={{ minHeight: `${minHeight}px`, height: "100%" }} className="w-full">
        {children}
      </div>
    </div>
  );
}
