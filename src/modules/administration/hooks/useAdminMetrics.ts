// src/modules/administration/hooks/useAdminMetrics.ts
import { useMemo } from 'react';
import { useTrips } from './useTrips';

/**
 * Hook centralizado para calcular todas las métricas del admin
 * Asegura consistencia entre AdminHome y AdminStatistics
 */
export function useAdminMetrics() {
  const { trips } = useTrips();

  const metrics = useMemo(() => {
    // Datos base desde trips reales
    const totalTrips = trips.length;
    const completedTrips = trips.filter(t => t.status === "Finalizado").length;
    const inProgressTrips = trips.filter(t => t.status === "En progreso").length;
    const uniqueDrivers = new Set(trips.map(t => t.driverName)).size;

    // Fórmulas de cálculo de CO2 y sostenibilidad
    // Si hay viajes completados reales, calculamos; si no, usamos datos iniciales simulados
    const hasRealData = completedTrips > 0;
    
    // CO2 reducido: 2.5 kg por viaje completado
    // Si no hay datos reales, simulamos datos iniciales basados en el total de viajes
    let co2Saved: number;
    if (hasRealData) {
      co2Saved = Math.round(completedTrips * 2.5);
    } else {
      // Datos iniciales simulados: usamos el total de viajes * factor menor
      co2Saved = totalTrips > 0 ? Math.round(totalTrips * 12) : 96; // ~12kg promedio por viaje
    }

    // Árboles equivalentes: 1 árbol absorbe aproximadamente 20 kg de CO2 al año
    const treesEquivalent = Math.floor(co2Saved / 20);

    // Kilómetros compartidos estimados: ~15 km por viaje
    const kmShared = totalTrips * 15;

    // Pasajeros únicos estimados (simulado)
    const passengersCount = Math.floor(totalTrips * 2.5);

    // Usuarios activos (fijo según requerimiento)
    const activeUsers = 13;

    // Viajes completados para mostrar en las cards principales
    // Si no hay datos reales, usamos un número base realista
    const displayCompletedTrips = hasRealData ? completedTrips : (totalTrips > 0 ? totalTrips : 9);

    return {
      // Viajes
      totalTrips,
      completedTrips,
      inProgressTrips,
      displayCompletedTrips, // Para las cards principales
      
      // CO2 y sostenibilidad
      co2Saved,
      treesEquivalent,
      kmShared,
      passengersCount,
      
      // Usuarios
      activeUsers,
      uniqueDrivers,
      
      // Flags
      hasRealData,
    };
  }, [trips]);

  // Distribuir datos por mes (Oct, Nov, Dic)
  const monthlyDistribution = useMemo(() => {
    const { co2Saved, totalTrips } = metrics;
    
    // Distribuir de forma ACUMULATIVA (cada mes suma al anterior)
    // Oct: 20%, Nov: 55% (20+35), Dic: 100% (20+35+45)
    const octCo2 = Math.floor(co2Saved * 0.20);
    const novCo2 = Math.floor(co2Saved * 0.55);
    const dicCo2 = co2Saved;
    
    const octTrips = Math.floor(totalTrips * 0.20);
    const novTrips = Math.floor(totalTrips * 0.55);
    const dicTrips = totalTrips;
    
    const months = [
      { 
        name: "Octubre", 
        co2: octCo2,
        trips: octTrips,
      },
      { 
        name: "Noviembre", 
        co2: novCo2,
        trips: novTrips,
      },
      { 
        name: "Diciembre", 
        co2: dicCo2,
        trips: dicTrips,
      },
    ];

    return months;
  }, [metrics]);

  return {
    metrics,
    monthlyDistribution,
  };
}