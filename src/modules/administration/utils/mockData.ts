// src/modules/administration/utils/mockData.ts
/**
 * Datos mock actualizados con avatares únicos para cada usuario
 * TODOS los usuarios ahora tienen imágenes diferentes
 */

import type { UserCard } from '../types';
import {
  avatar1, avatar2, avatar3, avatar4, avatar5,
  avatar6, avatar7, avatar8, avatar9, avatar10,
  avatar11, avatar12, avatar13, avatar14, avatar15,
  avatar16, avatar17, avatar18, avatar19, avatar20,
} from './avatars';

export {
  avatar1, avatar2, avatar3, avatar4, avatar5,
  avatar6, avatar7, avatar8, avatar9, avatar10,
  avatar11, avatar12, avatar13, avatar14, avatar15,
  avatar16, avatar17, avatar18, avatar19, avatar20,
};

export const mockUsers = (): UserCard[] => {
  const users: UserCard[] = [
    // CONDUCTORES PENDIENTES (1998-2005)
    {
      id: "1001",
      name: "David Palacios",
      email: "david.palacios-p@mail.escuelaing.edu.co",
      profilePictureUrl: avatar1,
      phone: "+57 320 7654321",
      identificationNumber: "1000100282",
      identificationType: "CC",
      birthDate: "2001-05-15",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "ABC-123", vehicle: "Toyota Prius 2022", status: "Activo" }
      ]
    },
    {
      id: "1006",
      name: "Daniel Patiño Mejia",
      email: "daniel.patino-m@mail.escuelaing.edu.co",
      profilePictureUrl: avatar6,
      phone: "+57 318 7777777",
      identificationNumber: "1000099097",
      identificationType: "TI",
      birthDate: "2003-07-25",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "JKL-444", vehicle: "Chevrolet Spark 2020", status: "Activo" },
        { role: "Pasajero", rating: 4.7, status: "Activo" }
      ]
    },
    {
      id: "1007",
      name: "Robinson Steven Nuñez Portela",
      email: "robinson.nunez-p@mail.escuelaing.edu.co",
      profilePictureUrl: avatar7,
      phone: "+57 312 8888888",
      identificationNumber: "1000100575",
      identificationType: "CC",
      birthDate: "2000-03-12",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "MNO-555", vehicle: "Kia Picanto 2021", status: "Activo" },
        { role: "Pasajero", rating: 4.8, status: "Activo" },
        { role: "Acompañante", rating: 4.6, plate: "MNO-555", vehicle: "Kia Picanto 2021", status: "Activo" }
      ]
    },
    {
      id: "1013",
      name: "María Fernanda Castro López",
      email: "maria.castro@mail.escuelaing.edu.co",
      profilePictureUrl: avatar13,
      phone: "+57 319 5555555",
      identificationNumber: "1000100888",
      identificationType: "CC",
      birthDate: "2002-02-14",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "DEF-222", vehicle: "Mazda 2 2023", status: "Activo" },
        { role: "Pasajero", rating: 4.9, status: "Activo" }
      ]
    },
    
    // USUARIOS VERIFICADOS
    {
      id: "1002",
      name: "Raquel Iveth Selma Ayala",
      email: "raquel.selma-a@mail.escuelaing.edu.co",
      profilePictureUrl: avatar2,
      phone: "+57 310 1234567",
      identificationNumber: "1000093654",
      identificationType: "CC",
      birthDate: "2001-08-22",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.5, plate: "XYZ-789", vehicle: "Hyundai Accent 2023", status: "Activo" },
        { role: "Pasajero", rating: 4.8, status: "Activo" },
        { role: "Conductor", rating: 4.6, plate: "XYZ-789", vehicle: "Hyundai Accent 2023", status: "Activo" }
      ]
    },
    {
      id: "1003",
      name: "Néstor David Lopez Castellañeda",
      email: "nestor.lopez-c@mail.escuelaing.edu.co",
      profilePictureUrl: avatar3,
      phone: "+57 300 9876543",
      identificationNumber: "1000100422",
      identificationType: "CC",
      birthDate: "1999-11-03",
      status: "Bloqueado",
      profiles: [
        { role: "Conductor", rating: 1.8, plate: "LMN-456", vehicle: "Renault Logan 2021", status: "Suspendido" },
        { role: "Pasajero", rating: 4.2, status: "Activo" }
      ]
    },
    {
      id: "1004",
      name: "Deisy Lorena Guzmán Cabrales",
      email: "deisy.guzman-c@mail.escuelaing.edu.co",
      profilePictureUrl: avatar4,
      phone: "+57 315 5555555",
      identificationNumber: "1000093799",
      identificationType: "CE",
      birthDate: "2000-03-10",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 3.2, status: "Activo" }
      ]
    },
    {
      id: "1005",
      name: "Tulio Riaño Sanchez",
      email: "tulio.riano-s@mail.escuelaing.edu.co",
      profilePictureUrl: avatar5,
      phone: "+57 321 4444444",
      identificationNumber: "1000099099",
      identificationType: "CC",
      birthDate: "2002-01-18",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 5.0, status: "Activo" },
        { role: "Conductor", rating: 4.6, plate: "GHI-333", vehicle: "Mazda 3 2023", status: "Activo" },
        { role: "Acompañante", rating: 4.7, plate: "GHI-333", vehicle: "Mazda 3 2023", status: "Activo" }
      ]
    },
    {
      id: "1008",
      name: "Juan Pablo Caballero Castellanos",
      email: "juan.ccastellanos@mail.escuelaing.edu.co",
      profilePictureUrl: avatar8,
      phone: "+57 314 9999999",
      identificationNumber: "1000100516",
      identificationType: "CC",
      birthDate: "2000-09-20",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.2, plate: "PQR-666", vehicle: "Nissan March 2022", status: "Activo" },
        { role: "Pasajero", rating: 4.7, status: "Activo" }
      ]
    },
    {
      id: "1009",
      name: "Andrés Martin Cantor Urrego",
      email: "andres.cantor-u@escuelaing.edu.co",
      profilePictureUrl: avatar9,
      phone: "+57 316 1111111",
      identificationNumber: "1000004955",
      identificationType: "CC",
      birthDate: "1999-06-08",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.9, plate: "STU-777", vehicle: "Honda City 2023", status: "Activo" }
      ]
    },
    {
      id: "1010",
      name: "Juan Carlos Leal Cruz",
      email: "juan.lcruz@mail.escuelaing.edu.co",
      profilePictureUrl: avatar10,
      phone: "+57 317 2222222",
      identificationNumber: "1000100326",
      identificationType: "CC",
      birthDate: "1999-04-14",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.4, plate: "VWX-888", vehicle: "Ford Fiesta 2021", status: "Activo" },
        { role: "Pasajero", rating: 4.6, status: "Activo" },
        { role: "Acompañante", rating: 4.3, plate: "VWX-888", vehicle: "Ford Fiesta 2021", status: "Activo" }
      ]
    },
    {
      id: "1011",
      name: "Valeria Bermudez Aguilar",
      email: "valeria.bermudez-a@mail.escuelaing.edu.co",
      profilePictureUrl: avatar11,
      phone: "+57 319 3333333",
      identificationNumber: "1000100774",
      identificationType: "CC",
      birthDate: "2002-11-28",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 4.8, status: "Activo" },
        { role: "Conductor", rating: 4.5, plate: "YZA-999", vehicle: "Volkswagen Gol 2022", status: "Activo" }
      ]
    },
    {
      id: "1012",
      name: "Juan Sebastian Puentes Julio",
      email: "juan.puentes@mail.escuelaing.edu.co",
      profilePictureUrl: avatar12,
      phone: "+57 320 4444444",
      identificationNumber: "1000100444",
      identificationType: "CC",
      birthDate: "2001-07-19",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.7, plate: "BCD-101", vehicle: "Suzuki Swift 2021", status: "Activo" },
        { role: "Pasajero", rating: 4.5, status: "Activo" }
      ]
    },
    
    // USUARIOS PARA REPORTES
    {
      id: "9999",
      name: "Sistema de Seguridad",
      email: "sistema.seguridad@escuelaing.edu.co",
      profilePictureUrl: avatar14,
      phone: "+57 300 0000000",
      identificationNumber: "9999999999",
      identificationType: "CC",
      birthDate: "1990-01-01", // Admin
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 5.0, status: "Activo" }
      ]
    },
    {
      id: "4001",
      name: "Carlos Mendoza Rivera",
      email: "carlos.mendoza@mail.escuelaing.edu.co",
      profilePictureUrl: avatar15,
      phone: "+57 320 1234567",
      identificationNumber: "1000200100",
      identificationType: "CC",
      birthDate: "2000-03-15",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 4.2, status: "Activo" }
      ]
    },
    {
      id: "1200",
      name: "Pedro Sánchez Gómez",
      email: "pedro.sanchez@mail.escuelaing.edu.co",
      profilePictureUrl: avatar16,
      phone: "+57 315 6789012",
      identificationNumber: "1000200101",
      identificationType: "CC",
      birthDate: "1999-11-20",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 3.8, plate: "TUV-890", vehicle: "Chevrolet Onix 2021", status: "Activo" },
        { role: "Pasajero", rating: 4.1, status: "Activo" }
      ]
    },
    {
      id: "4002",
      name: "Ana García Ruiz",
      email: "ana.garcia@mail.escuelaing.edu.co",
      profilePictureUrl: avatar17,
      phone: "+57 310 9876543",
      identificationNumber: "1000200102",
      identificationType: "CC",
      birthDate: "2001-07-08",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.7, status: "Activo" }
      ]
    },
    {
      id: "4003",
      name: "Luis Martínez Pérez",
      email: "luis.martinez@mail.escuelaing.edu.co",
      profilePictureUrl: avatar18,
      phone: "+57 315 5551234",
      identificationNumber: "1000200103",
      identificationType: "CC",
      birthDate: "1998-12-03",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 3.9, status: "Activo" }
      ]
    },
    {
      id: "1014",
      name: "Carolina Morales Díaz",
      email: "carolina.morales@mail.escuelaing.edu.co",
      profilePictureUrl: avatar19,
      phone: "+57 318 6666666",
      identificationNumber: "1000200104",
      identificationType: "CC",
      birthDate: "2000-05-22",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 4.6, status: "Activo" },
        { role: "Conductor", rating: 4.3, plate: "QWE-111", vehicle: "Renault Sandero 2022", status: "Activo" }
      ]
    },
    {
      id: "1015",
      name: "Santiago Ramírez Torres",
      email: "santiago.ramirez@mail.escuelaing.edu.co",
      profilePictureUrl: avatar20,
      phone: "+57 319 7777777",
      identificationNumber: "1000200105",
      identificationType: "CC",
      birthDate: "2001-09-14",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.7, plate: "RTY-222", vehicle: "Chevrolet Sail 2021", status: "Activo" },
        { role: "Pasajero", rating: 4.8, status: "Activo" }
      ]
    },
  ];

  return users.map(u => ({ 
    ...u, 
    activeProfile: u.profiles.find(p => p.status === "Activo") || u.profiles[0] 
  }));
};
