// src/modules/administration/utils/mockData.ts

import type { Report, UserCard } from '../types';

// Avatares
export const avatar1 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop";
export const avatar2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop";
export const avatar3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop";
export const avatar4 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop";
export const avatar5 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
export const avatar6 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop";
export const avatar7 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop";
export const avatar8 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop";
export const avatar9 = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop";
export const avatar10 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop";
export const avatar11 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop";
export const avatar12 = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop";

// Mock de reportes
export const mockReports: Report[] = [
  {
    id: "REP001",
    title: "Comportamiento Agresivo",
    reporter: "David Palacios",
    conductor: "Carlos Mendoza",
    severity: "CRÍTICA",
    status: "ABIERTO",
    date: "14/11/2024",
    time: "18:45",
    route: "Centro — Chapinero",
    details: "El conductor insultó y manejó de forma agresiva durante el trayecto."
  },
  {
    id: "REP002",
    title: "Ruta Sospechosa",
    reporter: "Raquel Iveth Selma Ayala",
    conductor: "Juan Pablo Caballero Castellanos",
    severity: "ALTA",
    status: "EN INVESTIGACIÓN",
    date: "13/11/2024",
    time: "22:15",
    route: "Usaquén — Zona Franca",
    details: "El conductor tomó una ruta diferente sin previo aviso."
  },
  {
    id: "REP003",
    title: "Pago Incorrecto",
    reporter: "Néstor David Lopez Castellañeda",
    conductor: "Andrés Martin Cantor Urrego",
    severity: "MEDIA",
    status: "RESUELTO",
    date: "12/11/2024",
    time: "14:30",
    route: "Chapín — Centro",
    amount: "$5,200",
    details: "Discrepancia en el monto cobrado versus el acordado."
  },
  {
    id: "REP004",
    title: "Vehículo Sucio",
    reporter: "Deisy Lorena Guzmán Cabrales",
    conductor: "Tulio Riaño Sanchez",
    severity: "BAJA",
    status: "RESUELTO",
    date: "11/11/2024",
    time: "09:20",
    route: "Centro — Teusaquillo",
    details: "El vehículo presentaba condiciones de limpieza inadecuadas."
  }
];

// Mock de usuarios - 4 conductores pendientes con 5 estrellas, otros con múltiples roles
export const mockUsers = (): UserCard[] => {
  const users: UserCard[] = [
    // 4 conductores pendientes con rating 5.0 (nuevos, sin experiencia previa)
    {
      id: "U001",
      name: "David Palacios",
      email: "david.palacios-p@mail.escuelaing.edu.co",
      profilePictureUrl: avatar1,
      phone: "+57 320 7654321",
      identificationNumber: "1000100282",
      identificationType: "CC",
      birthDate: "1998-05-15",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "ABC-123", vehicle: "Toyota Prius 2022" }
      ]
    },
    {
      id: "U006",
      name: "Daniel Patiño Mejia",
      email: "daniel.patino-m@mail.escuelaing.edu.co",
      profilePictureUrl: avatar6,
      phone: "+57 318 7777777",
      identificationNumber: "1000099097",
      identificationType: "TI",
      birthDate: "2002-07-25",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "JKL-444", vehicle: "Chevrolet Spark 2020" },
        { role: "Pasajero", rating: 4.7 }
      ]
    },
    {
      id: "U007",
      name: "Robinson Steven Nuñez Portela",
      email: "robinson.nunez-p@mail.escuelaing.edu.co",
      profilePictureUrl: avatar7,
      phone: "+57 312 8888888",
      identificationNumber: "1000100575",
      identificationType: "CC",
      birthDate: "1999-03-12",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "MNO-555", vehicle: "Kia Picanto 2021" },
        { role: "Pasajero", rating: 4.8 },
        { role: "Acompañante", rating: 4.6, plate: "MNO-555", vehicle: "Kia Picanto 2021" }
      ]
    },
    {
      id: "U013",
      name: "María Fernanda Castro López",
      email: "maria.castro@mail.escuelaing.edu.co",
      profilePictureUrl: avatar11,
      phone: "+57 319 5555555",
      identificationNumber: "1000100888",
      identificationType: "CC",
      birthDate: "2000-02-14",
      status: "Pendiente",
      profiles: [
        { role: "Conductor", rating: 5.0, plate: "DEF-222", vehicle: "Mazda 2 2023" },
        { role: "Pasajero", rating: 4.9 }
      ]
    },
    
    // Usuarios verificados con múltiples roles
    {
      id: "U002",
      name: "Raquel Iveth Selma Ayala",
      email: "raquel.selma-a@mail.escuelaing.edu.co",
      profilePictureUrl: avatar2,
      phone: "+57 310 1234567",
      identificationNumber: "1000093654",
      identificationType: "CC",
      birthDate: "1999-08-22",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.5, plate: "XYZ-789", vehicle: "Hyundai Accent 2023" },
        { role: "Pasajero", rating: 4.8 },
        { role: "Conductor", rating: 4.6, plate: "XYZ-789", vehicle: "Hyundai Accent 2023" }
      ]
    },
    {
      id: "U003",
      name: "Néstor David Lopez Castellañeda",
      email: "nestor.lopez-c@mail.escuelaing.edu.co",
      profilePictureUrl: avatar3,
      phone: "+57 300 9876543",
      identificationNumber: "1000100422",
      identificationType: "CC",
      birthDate: "1997-11-03",
      status: "Bloqueado",
      profiles: [
        { role: "Conductor", rating: 1.8, plate: "LMN-456", vehicle: "Renault Logan 2021" },
        { role: "Pasajero", rating: 4.2 }
      ]
    },
    {
      id: "U004",
      name: "Deisy Lorena Guzmán Cabrales",
      email: "deisy.guzman-c@mail.escuelaing.edu.co",
      profilePictureUrl: avatar4,
      phone: "+57 315 5555555",
      identificationNumber: "1000093799",
      identificationType: "CE",
      birthDate: "1995-03-10",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 3.2 }
      ]
    },
    {
      id: "U005",
      name: "Tulio Riaño Sanchez",
      email: "tulio.riano-s@mail.escuelaing.edu.co",
      profilePictureUrl: avatar5,
      phone: "+57 321 4444444",
      identificationNumber: "1000099099",
      identificationType: "CC",
      birthDate: "2000-01-18",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 5.0 },
        { role: "Conductor", rating: 4.6, plate: "GHI-333", vehicle: "Mazda 3 2023" },
        { role: "Acompañante", rating: 4.7, plate: "GHI-333", vehicle: "Mazda 3 2023" }
      ]
    },
    {
      id: "U008",
      name: "Juan Pablo Caballero Castellanos",
      email: "juan.ccastellanos@mail.escuelaing.edu.co",
      profilePictureUrl: avatar8,
      phone: "+57 314 9999999",
      identificationNumber: "1000100516",
      identificationType: "CC",
      birthDate: "1998-09-20",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.2, plate: "PQR-666", vehicle: "Nissan March 2022" },
        { role: "Pasajero", rating: 4.7 }
      ]
    },
    {
      id: "U009",
      name: "Andrés Martin Cantor Urrego",
      email: "andres.cantor-u@escuelaing.edu.co",
      profilePictureUrl: avatar9,
      phone: "+57 316 1111111",
      identificationNumber: "1000004955",
      identificationType: "CC",
      birthDate: "1996-06-08",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.9, plate: "STU-777", vehicle: "Honda City 2023" }
      ]
    },
    {
      id: "U010",
      name: "Juan Carlos Leal Cruz",
      email: "juan.lcruz@mail.escuelaing.edu.co",
      profilePictureUrl: avatar10,
      phone: "+57 317 2222222",
      identificationNumber: "1000100326",
      identificationType: "CC",
      birthDate: "1997-04-14",
      status: "Verificado",
      profiles: [
        { role: "Conductor", rating: 4.4, plate: "VWX-888", vehicle: "Ford Fiesta 2021" },
        { role: "Pasajero", rating: 4.6 },
        { role: "Acompañante", rating: 4.3, plate: "VWX-888", vehicle: "Ford Fiesta 2021" }
      ]
    },
    {
      id: "U011",
      name: "Valeria Bermudez Aguilar",
      email: "valeria.bermudez-a@mail.escuelaing.edu.co",
      profilePictureUrl: avatar11,
      phone: "+57 319 3333333",
      identificationNumber: "1000100774",
      identificationType: "CC",
      birthDate: "2000-11-28",
      status: "Verificado",
      profiles: [
        { role: "Pasajero", rating: 4.8 },
        { role: "Conductor", rating: 4.5, plate: "YZA-999", vehicle: "Volkswagen Gol 2022" }
      ]
    },
    {
      id: "U012",
      name: "Juan Sebastian Puentes Julio",
      email: "juan.puentes@mail.escuelaing.edu.co",
      profilePictureUrl: avatar12,
      phone: "+57 320 4444444",
      identificationNumber: "1000100444",
      identificationType: "CC",
      birthDate: "1999-07-19",
      status: "Verificado",
      profiles: [
        { role: "Acompañante", rating: 4.7, plate: "BCD-101", vehicle: "Suzuki Swift 2021" },
        { role: "Pasajero", rating: 4.5 }
      ]
    }
  ];

  return users.map(u => ({ ...u, activeProfile: u.profiles[0] }));
};