// src/modules/administration/components/EmergencyButton.tsx
/**
 * Botón de emergencia con simulación realista de llamada a autoridades
 * Incluye animaciones, feedback visual/auditivo y estados de llamada
 */

import React, { useState, useEffect } from 'react';

interface EmergencyButtonProps {
  onEmergencyCall?: () => void;
  className?: string;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  onEmergencyCall,
  className = '',
}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [callStage, setCallStage] = useState<'idle' | 'dialing' | 'connecting' | 'connected'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [showModal, setShowModal] = useState(false);

  // Manejo del countdown durante la marcación
  useEffect(() => {
    if (callStage === 'dialing' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (callStage === 'dialing' && countdown === 0) {
      setCallStage('connecting');
      setTimeout(() => setCallStage('connected'), 2000);
    }
  }, [callStage, countdown]);

  const handleEmergencyClick = () => {
    setShowModal(true);
  };

  const confirmEmergency = () => {
    setShowModal(false);
    setIsCalling(true);
    setCallStage('dialing');
    setCountdown(3);
    
    if (onEmergencyCall) {
      onEmergencyCall();
    }

    // Simular finalización de llamada después de 8 segundos
    setTimeout(() => {
      setIsCalling(false);
      setCallStage('idle');
      setCountdown(3);
    }, 8000);
  };

  const cancelEmergency = () => {
    setShowModal(false);
  };

  const hangUp = () => {
    setIsCalling(false);
    setCallStage('idle');
    setCountdown(3);
  };

  return (
    <>
      {/* Botón de Emergencia Principal */}
      <button
        onClick={handleEmergencyClick}
        disabled={isCalling}
        className={`flex items-center gap-4 px-8 py-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <div className="w-14 h-14 bg-red-200 rounded-xl flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xl font-bold text-red-600">Emergencia</span>
      </button>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={cancelEmergency} />
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800">¿Llamar a Emergencias?</h3>
              <p className="text-sm text-slate-600 text-center">
                Se contactará inmediatamente con las autoridades locales. 
                Solo usa esta función en caso de emergencia real.
              </p>

              <div className="mt-4 w-full flex gap-3">
                <button
                  onClick={cancelEmergency}
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-slate-700 hover:bg-gray-50 font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmEmergency}
                  className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Llamar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Llamada en Progreso */}
      {isCalling && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-2xl p-8">
            <div className="flex flex-col items-center gap-6 text-white">
              {/* Icono de Llamada Animado */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                {/* Ondas de Sonido Animadas */}
                {callStage !== 'idle' && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping" style={{ animationDelay: '0.3s' }} />
                  </>
                )}
              </div>

              {/* Información de Estado de Llamada */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {callStage === 'dialing' && `Llamando en ${countdown}...`}
                  {callStage === 'connecting' && 'Conectando...'}
                  {callStage === 'connected' && 'Línea de Emergencia 123'}
                </h3>
                <p className="text-white/80 text-sm">
                  {callStage === 'dialing' && 'Preparando conexión de emergencia'}
                  {callStage === 'connecting' && 'Estableciendo comunicación segura'}
                  {callStage === 'connected' && 'Comunicación establecida • Ayuda en camino'}
                </p>
              </div>

              {/* Barra de Progreso de Llamada */}
              <div className="w-full bg-white/20 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Estado:</span>
                  <span className="font-semibold">
                    {callStage === 'dialing' && 'Marcando...'}
                    {callStage === 'connecting' && 'Conectando...'}
                    {callStage === 'connected' && 'En Línea'}
                  </span>
                </div>
                <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000"
                    style={{
                      width: callStage === 'dialing' ? '33%' : 
                             callStage === 'connecting' ? '66%' : '100%'
                    }}
                  />
                </div>
              </div>

              {/* Botón para Colgar */}
              {callStage === 'connected' && (
                <div className="flex gap-3 w-full mt-2">
                  <button
                    onClick={hangUp}
                    className="flex-1 py-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors font-semibold text-lg cursor-pointer"
                  >
                    Colgar
                  </button>
                </div>
              )}

              {/* Aviso Legal */}
              <p className="text-xs text-white/60 text-center mt-2">
                Esta es una simulación. En una emergencia real, 
                llama al 123 (Colombia) o al número de emergencias de tu país.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};