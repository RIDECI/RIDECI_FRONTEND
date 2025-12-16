// src/modules/administration/hooks/useReports.ts
/**
 * Hook centralizado para gestionar reportes de seguridad
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { reportService } from '../services/reportService';
import { enrichReports, type EnrichedReport } from '../services/reportEnrichmentService';
import { useAdminUsers } from './useAdminUsers';

export function useReports() {
  const { users } = useAdminUsers();
  const [reports, setReports] = useState<EnrichedReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedReportIds, setOpenedReportIds] = useState<Set<string>>(new Set());
  const [archivedReportIds, setArchivedReportIds] = useState<Set<string>>(new Set());

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const rawReports = await reportService.listReports();
      // Filtrar reportes archivados
      const activeReports = rawReports.filter(r => !archivedReportIds.has(r.id));
      const enriched = enrichReports(activeReports, users);
      setReports(enriched);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar reportes';
      setError(message);
      console.error('Error loading reports:', err);
    } finally {
      setLoading(false);
    }
  }, [users, archivedReportIds]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const markAsOpened = useCallback((reportId: string) => {
    setOpenedReportIds(prev => new Set(prev).add(reportId));
  }, []);

  const archiveReport = useCallback(async (reportId: string) => {
    try {
      // Marcar como archivado localmente
      setArchivedReportIds(prev => new Set(prev).add(reportId));
      
      // Intentar eliminar del servidor
      try {
        await reportService.deleteReport(reportId);
      } catch (err) {
        console.error('Error deleting report from server:', err);
        // Continuamos aunque falle el servidor
      }
      
      // Actualizar lista de reportes
      await loadReports();
      
      return true;
    } catch (err) {
      console.error('Error archiving report:', err);
      // Revertir cambio local si falla
      setArchivedReportIds(prev => {
        const next = new Set(prev);
        next.delete(reportId);
        return next;
      });
      return false;
    }
  }, [loadReports]);

  const statistics = useMemo(() => {
    const total = reports.length;
    const active = reports.filter(r => 
      r.status === 'OPEN' || r.status === 'PENDING'
    ).length;
    const critical = reports.filter(r => r.severity === 'HIGH').length;
    const opened = openedReportIds.size;

    return {
      total,
      active,
      critical,
      opened,
    };
  }, [reports, openedReportIds]);

  const exportReports = useCallback(async (
    format: 'pdf' | 'csv' | 'xlsx',
    reportIds?: string[]
  ) => {
    try {
      const blob = await reportService.exportReports({ format });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reportes_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting reports:', err);
      throw err;
    }
  }, []);

  const updateReportStatus = useCallback(async (
    reportId: string,
    status: string
  ) => {
    try {
      await reportService.updateReportStatus(reportId, status);
      await loadReports();
    } catch (err) {
      console.error('Error updating report status:', err);
      throw err;
    }
  }, [loadReports]);

  const refreshReports = useCallback(() => {
    loadReports();
  }, [loadReports]);

  return {
    reports,
    loading,
    error,
    statistics,
    exportReports,
    updateReportStatus,
    refreshReports,
    markAsOpened,
    archiveReport, // ✅ Nueva función
    isOpened: (id: string) => openedReportIds.has(id),
    isArchived: (id: string) => archivedReportIds.has(id),
    getOpenedCount: () => openedReportIds.size,
  };
}
