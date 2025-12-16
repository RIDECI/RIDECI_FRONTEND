// src/modules/administration/utils/avatars.ts
/**
 * Colección de 30 avatares únicos de Unsplash
 */


export const avatar1 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"; // Hombre joven
export const avatar2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"; // Mujer joven
export const avatar3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"; // Hombre formal
export const avatar4 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"; // Mujer casual
export const avatar5 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"; // Hombre con barba
export const avatar6 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"; // Mujer sonriente
export const avatar7 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"; // Hombre casual
export const avatar8 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"; // Hombre joven 2
export const avatar9 = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop"; // Hombre con gafas
export const avatar10 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"; // Mujer con cabello largo

// ========================================
// NUEVOS AVATARES (10 adicionales para variedad)
// ========================================

export const avatar11 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"; // Mujer profesional
export const avatar12 = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop"; // Mujer sonriente 2
export const avatar13 = "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop"; // Mujer con gafas
export const avatar14 = "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop"; // Hombre con chaqueta
export const avatar15 = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop"; // Hombre sonriente
export const avatar16 = "https://images.unsplash.com/photo-1546539782-6fc531453083?w=100&h=100&fit=crop"; // Mujer elegante
export const avatar17 = "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop"; // Hombre de negocios
export const avatar18 = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"; // Mujer casual 2
export const avatar19 = "https://images.unsplash.com/photo-1574701148212-8518049c7b2c?w=100&h=100&fit=crop"; // Mujer con sombrero
export const avatar20 = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop"; // Hombre maduro


export const avatarReport1 = "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=100&h=100&fit=crop"; // Persona con hoodie
export const avatarReport2 = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop"; // Hombre con lentes
export const avatarReport3 = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop"; // Mujer profesional 2
export const avatarReport4 = "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"; // Hombre afroamericano
export const avatarReport5 = "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=100&h=100&fit=crop"; // Mujer latina
export const avatarReport6 = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop"; // Hombre asiático
export const avatarReport7 = "https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?w=100&h=100&fit=crop"; // Mujer rubia
export const avatarReport8 = "https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop"; // Hombre con sombrero
export const avatarReport9 = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop"; // Mujer sonriente 3
export const avatarReport10 = "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop"; // Hombre con sweater


export const allAvatars = [
  avatar1, avatar2, avatar3, avatar4, avatar5,
  avatar6, avatar7, avatar8, avatar9, avatar10,
  avatar11, avatar12, avatar13, avatar14, avatar15,
  avatar16, avatar17, avatar18, avatar19, avatar20,
];

export const reportAvatars = [
  avatarReport1, avatarReport2, avatarReport3, avatarReport4, avatarReport5,
  avatarReport6, avatarReport7, avatarReport8, avatarReport9, avatarReport10,
];

// Función helper para obtener un avatar aleatorio de reportes
export const getRandomReportAvatar = () => {
  return reportAvatars[Math.floor(Math.random() * reportAvatars.length)];
};