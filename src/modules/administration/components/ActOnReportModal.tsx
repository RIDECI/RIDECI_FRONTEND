// src/modules/administration/components/ActOnReportModal.tsx
/**
 * Modal COMPACTO Y PROFESIONAL para actuar sobre reportes
 * ✅ Diseño más pequeño y eficiente
 * ✅ Mejor organización de información
 * ✅ Botones siempre visibles
 */

import React from 'react';
import { X, AlertTriangle, Ban, CheckCircle, User } from 'lucide-react';
import type { UserCard } from '../types';
import type { EnrichedReport } from '../services/reportEnrichmentService';

interface ActOnReportModalProps {
  open: boolean;
  report: EnrichedReport | null;
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

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // ✅ Usar datos enriquecidos del reporte
  const actualReporter = reporterUser || report.reporterUserData;
  const actualOffender = offenderUser || report.offenderUserData;

  const hasOffender = !!actualOffender;
  const isOffenderSuspended = actualOffender?.status === "Suspendido" || actualOffender?.status === "Bloqueado";
  const hasMultipleProfiles = actualOffender && actualOffender.profiles.length > 1;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header COMPACTO */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-1 truncate">{report.title}</h2>
                <div className="flex items-center gap-3 text-xs text-white/90 flex-wrap">
                  <span>📅 {formatDate(report.occurredAt)}</span>
                  {report.location && <span>📍 {report.location}</span>}
                  {report.severity && (
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${
                      report.severity === 'HIGH' ? 'bg-red-700' :
                      report.severity === 'MEDIUM' ? 'bg-orange-600' : 'bg-blue-600'
                    }`}>
                      {report.severity === 'HIGH' ? 'Crítico' :
                       report.severity === 'MEDIUM' ? 'Medio' : 'Bajo'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Descripción COMPACTA */}
          <div className="mt-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-xs text-white/95 leading-relaxed line-clamp-2">
              {report.description}
            </p>
            {report.route && (
              <div className="mt-1.5 text-xs text-white/80">
                🚗 <span className="font-semibold">{report.route}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contenido Principal COMPACTO */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 👤 REPORTANTE */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-200">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold text-blue-900 uppercase">Reportante</span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <img
                  src={actualReporter?.profilePictureUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'}
                  alt={report.reporterName}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 truncate">{report.reporterName}</h3>
                  <p className="text-xs text-blue-600 font-medium truncate">{report.reporterEmail}</p>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    actualReporter?.status === 'Verificado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {actualReporter?.status || 'Activo'}
                  </span>
                </div>
              </div>

              {actualReporter && (
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">ID</div>
                    <div className="text-xs font-medium text-gray-900">
                      {actualReporter.identificationType} {actualReporter.identificationNumber}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1.5">Perfiles</div>
                    <div className="flex flex-wrap gap-1.5">
                      {actualReporter.profiles.map((profile, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-md">
                          <span className="text-xs font-medium text-blue-900">{profile.role}</span>
                          {profile.rating && (
                            <span className="text-[10px] text-blue-600">⭐ {profile.rating.toFixed(1)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ⚠️ PRESUNTO INFRACTOR */}
            <div className={`rounded-xl p-4 border ${
              hasOffender ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b ${hasOffender ? 'border-red-200' : 'border-gray-200'}">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasOffender ? 'bg-red-600' : 'bg-gray-500'}`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                </div>
                <span className={`text-xs font-bold uppercase ${hasOffender ? 'text-red-900' : 'text-gray-700'}`}>Presunto Infractor</span>
              </div>

              {hasOffender ? (
                <>
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={actualOffender.profilePictureUrl || 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop'}
                      alt={report.offenderName || 'Usuario'}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 truncate">{report.offenderName}</h3>
                      <p className="text-xs text-red-600 font-medium truncate">{report.offenderEmail}</p>
                      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        actualOffender.status === 'Verificado' ? 'bg-green-100 text-green-700' :
                        actualOffender.status === 'Suspendido' ? 'bg-orange-100 text-orange-700' :
                        actualOffender.status === 'Bloqueado' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {actualOffender.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="bg-white rounded-lg p-2.5 shadow-sm">
                      <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1.5">Perfiles</div>
                      <div className="flex flex-wrap gap-1.5">
                        {actualOffender.profiles.map((profile, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-red-50 border border-red-200 rounded-md">
                            <span className="text-xs font-medium text-red-900">{profile.role}</span>
                            {profile.rating && (
                              <span className="text-[10px] text-red-600">⭐ {profile.rating.toFixed(1)}</span>
                            )}
                            {profile.status === 'Suspendido' && (
                              <span className="text-[10px] text-orange-600 font-semibold">(Susp.)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {report.offenderVehicle && (
                      <div className="bg-white rounded-lg p-2.5 shadow-sm">
                        <div className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Vehículo</div>
                        <div className="text-sm font-bold text-gray-900">{report.offenderPlate}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{report.offenderVehicle}</div>
                      </div>
                    )}
                  </div>

                  {/* Botones de Acción SIEMPRE VISIBLES */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-gray-600 font-semibold uppercase text-center mb-2">
                      Acciones Disponibles
                    </div>

                    {isOffenderSuspended ? (
                      <>
                        <button
                          onClick={() => onActivateAccount(actualOffender)}
                          className="w-full py-2 px-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Activar Cuenta
                        </button>
                        {hasMultipleProfiles && (
                          <button
                            onClick={() => onSuspendProfile(actualOffender)}
                            className="w-full py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Activar Perfiles
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => onSuspendAccount(actualOffender)}
                          className="w-full py-2 px-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <Ban className="w-4 h-4" />
                          Suspender Cuenta
                        </button>
                        {hasMultipleProfiles && (
                          <button
                            onClick={() => onSuspendProfile(actualOffender)}
                            className="w-full py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <AlertTriangle className="w-4 h-4" />
                            Suspender perfil(es)
                          </button>
                        )}
                      </>
                    )}

                    {!hasMultipleProfiles && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-yellow-800">⚠️ Usuario con un solo perfil</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {report.offenderName || 'Usuario no identificado'}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">{report.offenderEmail}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      ℹ️ No se encontró información completa del usuario en el sistema.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer COMPACTO */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 rounded-b-2xl flex justify-end sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};