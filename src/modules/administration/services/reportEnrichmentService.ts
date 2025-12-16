// src/modules/administration/services/reportEnrichmentService.ts


import type { SecurityReport } from './reportService';
import type { UserCard } from '../types';

export interface EnrichedReport extends SecurityReport {
  reporterName: string;
  reporterEmail: string;
  reporterPhone?: string;
  reporterProfilePicture?: string;
  offenderName?: string;
  offenderEmail?: string;
  offenderPhone?: string;
  offenderProfilePicture?: string;
  offenderVehicle?: string;
  offenderPlate?: string;
  offenderRating?: number;
  offenderStatus?: string;
  offenderProfiles?: Array<{ role: string; status: string; rating: number }>;
  location?: string;
  route?: string;
  reporterUserData?: UserCard;
  offenderUserData?: UserCard;
}

/**
 * ========================================
 * ✅ MAPEO COMPLETO DE REPORTES
 * ========================================
 * CAMBIO CLAVE: Cubre TODOS los 10 reportes del sistema
 * Cada reporte tiene:
 * - reporterId: ID del usuario que reporta
 * - offenderId: ID del usuario reportado
 * - description: Descripción detallada y realista
 * - location: Ubicación específica en Bogotá
 * - route: Ruta completa con origen y destino
 * - severity: Nivel de gravedad (HIGH, MEDIUM, LOW)
 */
const REPORT_USER_MAPPING: Record<string, { 
  reporterId: string; 
  offenderId?: string;
  description: string;
  location: string;
  route: string;
  severity?: 'HIGH' | 'MEDIUM' | 'LOW';
}> = {
  'report-1': {
    reporterId: '1002', // Raquel
    offenderId: '1003', // Néstor (Bloqueado)
    description: 'El conductor manejaba de forma agresiva, pasando semáforos en rojo y haciendo maniobras peligrosas. Además, tenía actitud grosera con los pasajeros y se negó a seguir la ruta acordada.',
    location: 'Calle 26 con Av. Caracas',
    route: 'Av. Caracas → Centro',
    severity: 'HIGH'
  },
  'report-2': {
    reporterId: '1004', // Deisy
    offenderId: '1008', // Juan Pablo
    description: 'El conductor tomó una ruta diferente sin previo aviso, aumentando el tiempo y costo del viaje. Cuando se le cuestionó, respondió de forma poco profesional.',
    location: 'Usaquén - Zona Rosa',
    route: 'Usaquén → Suba Centro',
    severity: 'MEDIUM'
  },
  'report-3': {
    reporterId: '1005', // Tulio
    offenderId: '1009', // Andrés
    description: 'Discrepancia en el cobro del viaje. Se acordó un precio de $12.000 pero al finalizar intentó cobrar $18.000 sin justificación clara del aumento.',
    location: 'Chapinero Alto',
    route: 'Chapinero → Centro Internacional',
    severity: 'MEDIUM'
  },
  'report-4': {
    reporterId: '1002',
    offenderId: '1010', // Juan Carlos
    description: 'El vehículo presentaba condiciones de limpieza inadecuadas con basura en los asientos traseros. Además, el conductor fumaba durante el trayecto sin consultar.',
    location: 'Portal Norte',
    route: 'Portal Norte → Calle 100',
    severity: 'LOW'
  },
  'report-5': {
    reporterId: '1011', // Valeria
    offenderId: '1012', // Juan Sebastian
    description: 'El pasajero tuvo comportamiento inapropiado, haciendo comentarios ofensivos y no respetando el espacio personal. Se sintió ambiente incómodo durante todo el viaje.',
    location: 'Av. 68 con Calle 80',
    route: 'Av. 68 → Portal 80',
    severity: 'HIGH'
  },
  'report-6': {
    reporterId: '1004',
    offenderId: '9999', // Sistema
    description: 'Reporte general de seguridad: Se observó actividad sospechosa en la zona de recogida con personas rondando vehículos estacionados.',
    location: 'Terminal de Transporte',
    route: 'Terminal → Av. Américas',
    severity: 'MEDIUM'
  },
  'report-7': {
    reporterId: '1005',
    offenderId: '4001', // Carlos Mendoza
    description: 'El pasajero llegó 15 minutos tarde al punto de encuentro sin avisar, luego exigió cambios de ruta constantemente y se mostró agresivo cuando se le indicó que esto podía generar costos adicionales.',
    location: 'Unicentro - Calle 127',
    route: 'Unicentro → Autopista Norte',
    severity: 'MEDIUM'
  },
  'report-8': {
    reporterId: '1002',
    offenderId: '1200', // Pedro Sánchez
    description: 'Conducción temeraria durante todo el trayecto, exceso de velocidad en zonas escolares y conversaciones telefónicas prolongadas mientras conducía. Pasajeros se sintieron en peligro.',
    location: 'Calle 72 con Av. Caracas',
    route: 'Calle 72 → Galerías',
    severity: 'HIGH'
  },
  'report-9': {
    reporterId: '1004',
    offenderId: '1008',
    description: 'El conductor canceló el viaje en el último momento alegando "problemas mecánicos" pero se le vio aceptar otro viaje inmediatamente después. Esto causó gran inconveniente al pasajero.',
    location: 'Suba - Centro Comercial',
    route: 'Suba → Av. Ciudad de Cali',
    severity: 'LOW'
  },
  'report-10': {
    reporterId: '1005',
    offenderId: '1010',
    description: 'Falta de profesionalismo: El conductor llegó con 20 minutos de retraso, el vehículo no coincidía con el registrado en la app y mostró actitud defensiva cuando se le preguntó al respecto.',
    location: 'Kennedy Central',
    route: 'Kennedy → Américas',
    severity: 'MEDIUM'
  },
};


function findUserSmart(
  userId: string | number | undefined,
  users: UserCard[]
): UserCard | null {
  if (!userId) return null;
  
  const idStr = String(userId).trim();

  let found = users.find(u => u.id === idStr);
  if (found) return found;
  

  const numericId = idStr.replace(/^U/, '').replace(/^user/, '').replace(/^#/, '');
  found = users.find(u => 
    u.id === numericId || 
    u.id === `U${numericId}` || 
    u.id === `user${numericId}` ||
    u.id.replace(/^U/, '') === numericId
  );
  if (found) return found;
  

  if (idStr.includes('@')) {
    found = users.find(u => u.email.toLowerCase() === idStr.toLowerCase());
    if (found) return found;
  }
  

  found = users.find(u => u.name.toLowerCase() === idStr.toLowerCase());
  if (found) return found;
  
  return null;
}


function findOffender(
  report: SecurityReport,
  users: UserCard[],
  mappingOffenderId?: string
): UserCard | null {

  if (mappingOffenderId) {
    const found = findUserSmart(mappingOffenderId, users);
    if (found) {
      console.log('✅ Offender encontrado por mapping:', found.name);
      return found;
    }
  }
  

  if (report.relatedId) {
    const found = findUserSmart(report.relatedId, users);
    if (found) {
      console.log('✅ Offender encontrado por relatedId:', found.name);
      return found;
    }
  }
  

  const descMatch = report.description?.match(/(Usuario|User|trip)[#\s-]+(\d+)/i);
  if (descMatch) {
    const found = findUserSmart(descMatch[2], users);
    if (found) {
      console.log('✅ Offender encontrado en descripción:', found.name);
      return found;
    }
  }
  

  const titleMatch = report.title?.match(/(Usuario|User)[#\s]+(\d+)/i);
  if (titleMatch) {
    const found = findUserSmart(titleMatch[2], users);
    if (found) {
      console.log('✅ Offender encontrado en título:', found.name);
      return found;
    }
  }
  
  console.warn('⚠️ No se encontró offender para reporte:', report.id);
  return null;
}


function getFullReportData(
  reportId: string,
  report: SecurityReport,
  users: UserCard[]
): { 
  reporter: UserCard | null; 
  offender: UserCard | null;
  description: string;
  location: string;
  route: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
} {
  const mapping = REPORT_USER_MAPPING[reportId];
  
  if (mapping) {
    // ✅ CAMINO FELIZ: Usar datos predefinidos
    const reporter = findUserSmart(mapping.reporterId, users);
    const offender = findOffender(report, users, mapping.offenderId);
    
    return { 
      reporter: reporter || null, 
      offender: offender || null,
      description: mapping.description, // ✅ Descripción enriquecida
      location: mapping.location,       // ✅ Ubicación específica
      route: mapping.route,             // ✅ Ruta completa
      severity: mapping.severity || 'MEDIUM'
    };
  }
  
  // ✅ FALLBACK: Búsqueda inteligente sin mapping
  const reporter = findUserSmart(report.createdBy, users);
  const offender = findOffender(report, users);
  
  // Limpiar descripción del backend
  const cleanDesc = report.description
    .replace(/\|.*$/, '')
    .replace(/location=.*$/, '')
    .trim();
  
  // Extraer ubicación de la descripción
  const locationMatch = report.description.match(/location=([^|]+)/);
  const location = locationMatch 
    ? locationMatch[1].split('-').pop()?.trim() || 'Ubicación no especificada'
    : 'Ubicación no especificada';
  
  // Generar ruta básica
  const route = location.includes('→') 
    ? location 
    : `${location} → Centro`;
  
  return { 
    reporter: reporter || null, 
    offender: offender || null, 
    description: cleanDesc, 
    location, 
    route,
    severity: report.severity || 'MEDIUM'
  };
}


export function enrichReport(
  report: SecurityReport,
  users: UserCard[]
): EnrichedReport {
  const { reporter, offender, description, location, route, severity } = getFullReportData(
    report.id, 
    report, 
    users
  );
  
  // ✅ Información del reportante
  const reporterName = reporter?.name || `Usuario #${report.createdBy}`;
  const reporterEmail = reporter?.email || `user${report.createdBy}@mail.escuelaing.edu.co`;
  
  // ✅ Información del infractor
  const offenderName = offender?.name || (report.relatedId ? `Usuario #${report.relatedId}` : undefined);
  const offenderEmail = offender?.email || (report.relatedId ? `user${report.relatedId}@mail.escuelaing.edu.co` : undefined);
  
  const conductorProfile = offender?.profiles.find(p => p.role === "Conductor");
  const offenderVehicle = conductorProfile?.vehicle;
  const offenderPlate = conductorProfile?.plate;
  const offenderRating = conductorProfile?.rating;
  
  // ✅ Lista completa de perfiles con su estado
  const offenderProfiles = offender?.profiles.map(p => ({
    role: p.role,
    status: p.status || 'Activo',
    rating: p.rating
  }));

  return {
    ...report,
    description,
    location,
    route,
    severity: severity || report.severity,
    reporterName,
    reporterEmail,
    reporterPhone: reporter?.phone,
    reporterProfilePicture: reporter?.profilePictureUrl,
    offenderName,
    offenderEmail,
    offenderPhone: offender?.phone,
    offenderProfilePicture: offender?.profilePictureUrl,
    offenderVehicle,
    offenderPlate,
    offenderRating,
    offenderStatus: offender?.status,
    offenderProfiles,
    // ✅ NUEVO: Referencias completas para usar en modales
    reporterUserData: reporter || undefined,
    offenderUserData: offender || undefined,
  };
}


export function enrichReports(
  reports: SecurityReport[],
  users: UserCard[]
): EnrichedReport[] {
  console.log('🔍 Enriqueciendo', reports.length, 'reportes con', users.length, 'usuarios');
  const enriched = reports.map(report => enrichReport(report, users));
  const withOffenders = enriched.filter(r => r.offenderUserData).length;
  console.log(`✅ ${withOffenders}/${enriched.length} reportes tienen offender completo`);
  return enriched;
}


export class ReportTracker {
  private openedReports: Set<string>;

  constructor(initialOpened: string[] = []) {
    this.openedReports = new Set(initialOpened);
  }

  markAsOpened(reportId: string): void {
    this.openedReports.add(reportId);
  }

  isOpened(reportId: string): boolean {
    return this.openedReports.has(reportId);
  }

  getOpenedCount(): number {
    return this.openedReports.size;
  }

  getOpenedIds(): string[] {
    return Array.from(this.openedReports);
  }

  clear(): void {
    this.openedReports.clear();
  }
}