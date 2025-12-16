import React from "react";

interface Props { 
  className?: string; 
  property1?: string; 
}

export const Statistics: React.FC<Props> = ({ className }) => {
  return (
    <button className={`p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all ${className ?? ""}`}>
      <div className="flex flex-col items-center gap-2">
        <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <div className="text-xs font-medium text-blue-700">Estadísticas</div>
      </div>
    </button>
  );
};

export default Statistics;