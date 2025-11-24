# RIDECI_FRONTEND

## Desarrolladores


Todo el equipo de CVDS/DOSW 1


Equipos: 
TROYA
POSEIDON
NEMESIS
ATENEA
KRATOS
HADES

---

## Descripción


RidECI es una plataforma web de movilidad compartida diseñada para estudiantes, profesores y personal administrativo de la Escuela Colombiana de Ingeniería.
El frontend permite:

- Autenticarse con credenciales institucionales.

- Consultar, crear y reservar viajes.

- Ver rutas en tiempo real mediante geolocalización.

- Calificar la experiencia en la plataforma y ver las reputaciones de otros usuarios.

- Usar funcionalidades de seguridad y comunicación como chats y alertas.

- Acceder a paneles administrativos y estadísticas.

##  Estrategia de Versionamiento y Branching

Se implementa una estrategia de versionamiento basada en **GitFlow**, garantizando un flujo de desarrollo **colaborativo, trazable y controlado**.

| Rama          | Propósito                                                            |
| ------------- | -------------------------------------------------------------------- |
| **main**      | Versión estable lista para despliegue en producción.                 |
| **develop**   | Rama base donde se integran todas las funcionalidades en desarrollo. |
| **feature/*** | Desarrollo de nuevas pantallas, componentes o funcionalidades UI.    |
| **bugfix/***  | Corrección de errores.                                               |
| **release/*** | Preparación de versiones antes del despliegue.                       |

### Convención de Branches

feature/[nombre-componente]

feature/[nombre-funcionalidad]-frontend_[jira]

bugfix/[descripcion-error]

release/[version]



---

### Convenciones y Tipos de Commit

Formato: (tipo): (descripción breve)


| Tipo       | Descripción                                            |
| ---------- | ------------------------------------------------------ |
| `feat`     | Nueva funcionalidad o pantalla en el frontend.         |
| `fix`      | Corrección de errores visuales o funcionales en UI.    |
| `style`    | Cambios de estilos, CSS, shadcn/ui, Tailwind.          |
| `refactor` | Mejoras internas sin cambiar el comportamiento visual. |
| `docs`     | Actualización de documentación.                        |
| `chore`    | Configurations, scripts, o mantenimiento del proyecto. |

---

## Tecnologías Utilizadas

| Categoría                           | Tecnologías                                         |
| ----------------------------------- | --------------------------------------------------- |
| **Framework Frontend**              | React 18 + Vite                                     |
| **UI Frameworks**                   | shadcn/ui y Supabase                                |
| **Routing**                         | React Router DOM                                    |
| **Geolocalización**                 | Google Maps API                                     |
| **Autenticación**                   | JWT                                                 |
| **Integración Continua**            | GitHub Actions                                      |
| **Despliegue**                      | Vercel                                              |

---

## Módulos del Backend Utilizados

| Funcionalidad Frontend | Módulo Backend                          |
| ---------------------- | --------------------------------------- |
| Login / Verificación   | KRATOS_AUTHENTICATION_BACKEND           |
| Gestión de viajes      | NEMESIS_TRAVEL_MANAGEMENT_BACKEND       |
| Reservas               | POSEIDON_SEARCH_AND_BOOKING             |
| Alertas                | ATENEA_NOTIFICATIONS_BACKEND            |
| Reputación             | TROYA_REPUTATION_BACKEND                |
| Geolocalización        | NEMESIS_ROUTES_AND_TRACKING_BACKEND     |
| Pagos                  | POSEIDON_PAYMENTS                       |
| Estadisticas           | TROYA_STATISTICS_SUSTAINABILITY_BACKEND |
| Seguridad              | HADES_COMMUNICATION_SECURITY_BACKEND    |

---

## Estructura Documentación

/**
 * Componente: LoginPage
 * Descripción: Renderiza el formulario de autenticación de RidECI.
 * Autor: Equipo RidECI
   
 */

---