import React from "react";

export const ReportsGrid: React.FC = () => {
  const reports = [
    { id: "REP001", title: "Comportamiento Agresivo", reporter: "Juan García", status: "crítica" },
    { id: "REP002", title: "Conducción temeraria", reporter: "Ana López", status: "alta" },
    { id: "REP003", title: "Incumplimiento de ruta", reporter: "Pedro Ruiz", status: "media" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <article key={report.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-blue-600">#{report.id}</div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              report.status === 'crítica' ? 'bg-red-100 text-red-600' :
              report.status === 'alta' ? 'bg-orange-100 text-orange-600' :
              'bg-yellow-100 text-yellow-600'
            }`}>
              {report.status.toUpperCase()}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-800 mb-2">{report.title}</h3>
          <p className="text-sm text-gray-500 mb-4">Reportado por: {report.reporter}</p>
          
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
              Ver
            </button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors">
              Actuar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ReportsGrid;