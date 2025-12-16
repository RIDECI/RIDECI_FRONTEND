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
 * 🗺️ MAPA DE TRADUCCIÓN (Backend ID -> Frontend Mock ID)
 * Aquí convertimos los IDs extraños del backend a los IDs de tus usuarios reales.
 */
const BACKEND_USER_MAP: Record<string, string> = {
  // IDs del Backend   ->  IDs de tus usuarios (mockData)
  '42': '1005',         // Tulio
  '9999': '9999',       // Sistema (si existe) o déjalo pasar
  '4001': '4001',       // Carlos Mendoza
  '1200': '1200',       // Pedro Sánchez
  '8888': '1008',       // Juan Pablo
  'trip-555': '1012',   // Juan Sebastian (Usuario relacionado al viaje)
  '1002': '1002',       // Raquel
  '1003': '1003',       // Néstor
  '1004': '1004',       // Deisy
  '1010': '1010',       // Juan Carlos
  '1011': '1011',       // Valeria
};

function findUserSmart(
  userId: string | number | undefined,
  users: UserCard[]
): UserCard | null {
  if (!userId) return null;
  
  let idStr = String(userId).trim();

  // 1️⃣ PRIMER INTENTO: Usar el Mapa de Traducción
  // Si llega "42", lo convertimos a "1005" automáticamente
  if (BACKEND_USER_MAP[idStr]) {
    const mappedId = BACKEND_USER_MAP[idStr];
    const found = users.find(u => u.id === mappedId);
    if (found) return found;
  }

  // 2️⃣ SEGUNDO INTENTO: Búsqueda directa
  let found = users.find(u => u.id === idStr);
  if (found) return found;
  
  // 3️⃣ TERCER INTENTO: Limpiar prefijos (U1005 -> 1005)
  const numericId = idStr.replace(/^U/, '').replace(/^user/, '').replace(/^#/, '');
  found = users.find(u => 
    u.id === numericId || 
    u.id === `U${numericId}` || 
    u.id === `user${numericId}` ||
    u.id.replace(/^U/, '') === numericId
  );
  if (found) return found;
  
  // 4️⃣ CUARTO INTENTO: Email
  if (idStr.includes('@')) {
    found = users.find(u => u.email.toLowerCase() === idStr.toLowerCase());
    if (found) return found;
  }
  
  // 5️⃣ QUINTO INTENTO: Nombre
  found = users.find(u => u.name.toLowerCase() === idStr.toLowerCase());
  if (found) return found;
  
  return null;
}

function findOffender(
  report: SecurityReport,
  users: UserCard[]
): UserCard | null {

  // A. Buscar por relatedId (con traducción inteligente)
  if (report.relatedId) {
    const found = findUserSmart(report.relatedId, users);
    if (found) {
      console.log(`✅ Offender encontrado por relatedId (${report.relatedId}):`, found.name);
      return found;
    }
  }
  
  // B. Buscar en descripción: "Usuario #1003"
  const descMatch = report.description?.match(/(Usuario|User|trip)[#\s-]+(\d+)/i);
  if (descMatch) {
    const found = findUserSmart(descMatch[2], users);
    if (found) {
      console.log('✅ Offender encontrado en descripción:', found.name);
      return found;
    }
  }
  
  return null;
}

/**
 * Función auxiliar para limpiar descripciones sucias del backend
 */
function parseBackendDescription(description: string) {
  if (!description) return { text: '', location: 'Ubicación no especificada' };

  // Ejemplo backend: "El cliente me pidio plata | location=4.7,-74.0 - Cl 100 #10-10"
  const parts = description.split('|');
  const cleanText = parts[0].trim();
  
  // Buscar ubicación
  let location = 'Ubicación no especificada';
  const locPart = parts.find(p => p.includes('location='));
  
  if (locPart) {
    // Extraer lo que está después de un guión si existe, o las coordenadas
    const afterLoc = locPart.replace('location=', '').trim();
    if (afterLoc.includes('-')) {
        location = afterLoc.split('-').pop()?.trim() || location;
    } else {
        location = afterLoc;
    }
  }

  return { text: cleanText, location };
}

export function enrichReport(
  report: SecurityReport,
  users: UserCard[]
): EnrichedReport {
  
  // 1. Normalizar ID (backend a veces manda _id)
  const reportId = report.id || (report as any)._id;

  // 2. Encontrar personas usando la búsqueda inteligente
  const reporter = findUserSmart(report.createdBy, users);
  const offender = findOffender(report, users);

  // 3. Procesar descripción y ubicación
  const { text: cleanDescription, location } = parseBackendDescription(report.description);
  
  // 4. Generar Ruta simulada si no hay una clara
  const route = location.includes('→') 
    ? location 
    : `${location} → Destino sin especificar`;

  // 5. Preparar datos del reportante
  const reporterName = reporter?.name || `Usuario #${report.createdBy}`;
  const reporterEmail = reporter?.email || `user${report.createdBy}@mail.escuelaing.edu.co`;
  
  // 6. Preparar datos del infractor
  const offenderName = offender?.name || (report.relatedId ? `Usuario #${report.relatedId}` : 'Desconocido');
  const offenderEmail = offender?.email || (report.relatedId ? `user${report.relatedId}@mail.escuelaing.edu.co` : undefined);
  
  // Datos del vehículo si es conductor
  const conductorProfile = offender?.profiles.find(p => p.role === "Conductor");
  
  const offenderProfiles = offender?.profiles.map(p => ({
    role: p.role,
    status: p.status || 'Activo',
    rating: p.rating
  }));

  return {
    ...report,
    id: reportId, // Asegurar que el ID esté presente
    description: cleanDescription,
    location,
    route,
    severity: report.severity || 'MEDIUM',
    
    // Datos Reportante
    reporterName,
    reporterEmail,
    reporterPhone: reporter?.phone,
    reporterProfilePicture: reporter?.profilePictureUrl,
    reporterUserData: reporter || undefined,

    // Datos Infractor
    offenderName,
    offenderEmail,
    offenderPhone: offender?.phone,
    offenderProfilePicture: offender?.profilePictureUrl,
    offenderVehicle: conductorProfile?.vehicle,
    offenderPlate: conductorProfile?.plate,
    offenderRating: conductorProfile?.rating,
    offenderStatus: offender?.status,
    offenderProfiles,
    offenderUserData: offender || undefined,
  };
}

export function enrichReports(
  reports: SecurityReport[],
  users: UserCard[]
): EnrichedReport[] {
  console.log('🔍 Enriqueciendo', reports.length, 'reportes...');
  const enriched = reports.map(report => enrichReport(report, users));
  return enriched;
}

// ... (Mantén tu clase ReportTracker igual, esa está bien)
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
    this.openedReports.size;
    return this.openedReports.size;
  }

  getOpenedIds(): string[] {
    return Array.from(this.openedReports);
  }

  clear(): void {
    this.openedReports.clear();
  }
}