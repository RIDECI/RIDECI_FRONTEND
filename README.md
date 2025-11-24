# 🚗✨ RIDECI_FRONTEND

## 🧑‍💻👩‍💻 Desarrolladores
Todo el equipo de **CVDS / DOSW 1**

**Equipos participantes:**  
- 🏛️ TROYA
- 🌊 POSEIDON
- ⚔️ NEMESIS
- 🧠 ATENEA
- 💪 KRATOS
- 🔱 HADES

---

## 🌐 Descripción

**RidECI** es la plataforma web oficial de movilidad compartida de la  
**Escuela Colombiana de Ingeniería Julio Garavito**.

El frontend permite a estudiantes, profesores y administrativos:

- 🔐 **Autenticarse** con credenciales institucionales.  
- 🚘 **Consultar, crear y reservar viajes**.  
- 🗺️ **Visualizar rutas en tiempo real** mediante geolocalización.  
- ⭐ **Calificar viajes** y conocer reputaciones de otros usuarios.  
- 🚨 **Reportar alertas, usar chats y herramientas de seguridad**.  
- 📊 **Acceder a paneles administrativos y estadísticas avanzadas**.

---

## 🔀 Estrategia de Versionamiento y Branching (GitFlow)

Se utiliza una estrategia basada en **GitFlow** para garantizar un desarrollo colaborativo, ordenado y trazable.

| Rama            | Propósito |
|-----------------|-----------|
| **main**        | 🟢 Versión estable para producción. |
| **develop**     | 🧪 Integración de funcionalidades en desarrollo. |
| **feature/***   | ✨ Nuevas pantallas, componentes o funcionalidades del frontend. |
| **bugfix/***    | 🐞 Corrección de errores. |
| **release/***   | 🚀 Preparación de versiones para despliegue. |

### 🧩 Convención de nombres

- `feature/[nombre-equipo-modulo]`   
- `bugfix/[descripcion-error]`  
- `release/[version]

---

## 📝 Convenciones y Tipos de Commit

Formato:  
`tipo: descripción breve`

| Tipo        | Uso |
|-------------|-----|
| ✨ `feat`     | Nueva funcionalidad o pantalla. |
| 🐞 `fix`      | Corrección de errores funcionales o visuales. |
| 🎨 `style`    | Cambios de estilos, CSS, shadcn/ui, Tailwind. |
| 🔧 `refactor` | Mejora interna sin cambiar comportamiento. |
| 📚 `docs`     | Documentación. |
| 🧹 `chore`    | Scripts, configuración o mantenimiento. |

---

## 🛠️ Tecnologías Utilizadas

| Categoría                | Tecnologías |
|--------------------------|-------------|
| ⚛️ **Framework Frontend** | React 18 + Vite |
| 🎨 **UI Frameworks**     | shadcn/ui, Supabase |
| 🧭 **Routing**           | React Router DOM |
| 📍 **Geolocalización**   | Google Maps API |
| 🔐 **Autenticación**     | JWT |
| 🤖 **CI/CD**             | GitHub Actions |
| ☁️ **Despliegue**        | Vercel |

---

## 🔌 Módulos del Backend Utilizados

| Funcionalidad | Módulo Backend |
|---------------|----------------|
| 🔐 Login / Verificación          | KRATOS_AUTHENTICATION_BACKEND |
| 🚘 Gestión de viajes             | NEMESIS_TRAVEL_MANAGEMENT_BACKEND |
| 📅 Reservas                      | POSEIDON_SEARCH_AND_BOOKING |
| 🚨 Alertas                       | ATENEA_NOTIFICATIONS_BACKEND |
| ⭐ Reputación                    | TROYA_REPUTATION_BACKEND |
| 📍 Geolocalización               | NEMESIS_ROUTES_AND_TRACKING_BACKEND |
| 💳 Pagos                         | POSEIDON_PAYMENTS |
| 📊 Estadísticas                  | TROYA_STATISTICS_SUSTAINABILITY_BACKEND |
| 🔱 Seguridad y comunicación      | HADES_COMMUNICATION_SECURITY_BACKEND |

---

# 📱 Flujo de Pantallas
