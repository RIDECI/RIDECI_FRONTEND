// src/modules/administration/components/ActOnReportModal.tsx

import React from 'react';
import type { Report, UserCard } from '../types';
import { avatar1, avatar2 } from '../utils/mockData';
import { getUserStatusColor } from '../utils/helpers';

interface ActOnReportModalProps {
  open: boolean;
  report: Report | null;
  reporterUser: UserCard | null;
  offenderUser: UserCard | null;
  onClose: () => void;
  onSuspendAccount: (user: UserCard) => void;
  onSuspendProfile: (user: UserCard) => void;
  onActivateAccount: (user: UserCard) => void;
}

export const ActOnReportModal: React.FC<ActOnReportModalProps> = ({
  open,
  report,
  reporterUser,
  offenderUser,
  onClose,
  onSuspendAccount,
  onSuspendProfile,
  onActivateAccount,
}) => {
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Actuar sobre reporte #{report.id}
            </h2>
            <p className="text-sm text-slate-500">
              Revisa la información del reportante y del presunto infractor antes de decidir.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 ml-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel del reportante - CON BORDE AZUL COMPLETO */}
          <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-400 shadow-md">
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-3">
                <img 
                  src={reporterUser?.profilePictureUrl || avatar1} 
                  alt={report.reporter} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-lg" 
                />
              </div>
              
              {/* Badge centralizado debajo del avatar */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Reportante
              </span>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{report.reporter}</h3>
              <div className="text-sm text-slate-600 mt-2">{reporterUser?.email ?? "—"}</div>
              <div className="text-sm text-slate-600">{reporterUser?.phone ?? "—"}</div>
              <div className="mt-3">
                <div className="text-xs text-slate-500">Perfil activo</div>
                <div className="text-base font-semibold text-gray-800 mt-1">{reporterUser?.activeProfile?.role ?? "—"}</div>
              </div>
            </div>

            {reporterUser ? (
              <div className="space-y-4 text-sm bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-slate-600">Estado</div>
                  <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${getUserStatusColor(reporterUser.status)}`}>
                    {reporterUser.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Tipo ID</div>
                    <div className="text-sm font-medium text-gray-800">{reporterUser.identificationType ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Número ID</div>
                    <div className="text-sm font-mono font-medium text-gray-800">{reporterUser.identificationNumber ?? "—"}</div>
                  </div>
                </div>

                {reporterUser.birthDate && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Fecha de nacimiento</div>
                    <div className="text-sm font-medium text-gray-800">
                      {new Date(reporterUser.birthDate).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-xs text-slate-500 mb-2">Perfiles</div>
                  <div className="flex gap-2 flex-wrap">
                    {reporterUser.profiles.map(p => (
                      <div key={p.role} className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-xs font-medium">
                        {p.role} ★ {p.rating.toFixed(1)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-600 bg-white rounded-lg p-4 border border-blue-200">
                No se encontró el usuario reportante en la lista local.
              </div>
            )}
          </div>

          {/* Panel del presunto infractor - CON BORDE ROJO COMPLETO */}
          <div className="bg-red-50 rounded-xl p-5 border-2 border-red-400 shadow-md">
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-3">
                <img 
                  src={offenderUser?.profilePictureUrl || avatar2} 
                  alt={report.conductor} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-red-200 shadow-lg" 
                />
              </div>
              
              {/* Badge centralizado debajo del avatar */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-red-600 text-white shadow-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                Presunto infractor
              </span>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{report.conductor}</h3>
              <div className="text-sm text-slate-600 mt-2">{offenderUser?.email ?? "—"}</div>
              <div className="text-sm text-slate-600">{offenderUser?.phone ?? "—"}</div>
              <div className="mt-3">
                <div className="text-xs text-slate-500">Perfil activo</div>
                <div className="text-base font-semibold text-gray-800 mt-1">{offenderUser?.activeProfile?.role ?? "—"}</div>
              </div>
            </div>

            {offenderUser ? (
              <>
                <div className="space-y-4 text-sm bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-slate-600">Estado</div>
                    <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${getUserStatusColor(offenderUser.status)}`}>
                      {offenderUser.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Tipo ID</div>
                      <div className="text-sm font-medium text-gray-800">{offenderUser.identificationType ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Número ID</div>
                      <div className="text-sm font-mono font-medium text-gray-800">{offenderUser.identificationNumber ?? "—"}</div>
                    </div>
                  </div>

                  {offenderUser.birthDate && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Fecha de nacimiento</div>
                      <div className="text-sm font-medium text-gray-800">
                        {new Date(offenderUser.birthDate).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Perfiles</div>
                    <div className="flex gap-2 flex-wrap">
                      {offenderUser.profiles.map(p => (
                        <div key={p.role} className="px-3 py-1.5 rounded-full bg-red-100 text-red-800 border border-red-300 text-xs font-medium">
                          {p.role} ★ {p.rating.toFixed(1)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Información adicional del vehículo si es conductor */}
                  {offenderUser.activeProfile?.plate && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-red-100">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Placa</div>
                        <div className="text-sm font-mono font-medium text-gray-800">{offenderUser.activeProfile.plate}</div>
                      </div>
                      {offenderUser.activeProfile.vehicle && (
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Vehículo</div>
                          <div className="text-sm font-medium text-gray-800">{offenderUser.activeProfile.vehicle}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* BOTONES DE ACCIÓN - SIN "ARCHIVAR REPORTE" */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(offenderUser.status === "Suspendido" || offenderUser.status === "Bloqueado") ? (
                    <button 
                      onClick={() => onActivateAccount(offenderUser)} 
                      className="w-full py-3 rounded-lg border-2 border-green-500 bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-all shadow-sm hover:shadow-md"
                    >
                      Activar cuenta
                    </button>
                  ) : (
                    <button 
                      onClick={() => onSuspendAccount(offenderUser)} 
                      className="w-full py-3 rounded-lg border-2 border-red-500 bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-all shadow-sm hover:shadow-md"
                    >
                      Suspender cuenta
                    </button>
                  )}

                  <button 
                    onClick={() => onSuspendProfile(offenderUser)} 
                    className="w-full py-3 rounded-lg border-2 border-orange-500 bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100 transition-all shadow-sm hover:shadow-md"
                  >
                    Suspender perfil(es)
                  </button>
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-600 bg-white rounded-lg p-4 border border-red-200">
                No se encontró el usuario presunto infractor en la lista local. Puedes verificar manualmente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};