# 🏢 Enterprise Login - Portal SSO Empresarial

<div align="center">

![Enterprise Login](./public/LOGO.webp)

**Portal de autenticación empresarial con Single Sign-On (SSO)**  
*Sistema completo de autenticación, autorización y gestión de aplicaciones empresariales*

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16.x-E10098?logo=graphql)](https://graphql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#caracteristicas)
- [📸 Galería de Screenshots](#galeria)
- [👥 Para Usuarios](#para-usuarios)
- [🔧 Tecnologías](#tecnologias)
- [⚙️ Instalación](#instalacion)
- [🚀 Uso](#uso)
- [📊 Arquitectura](#arquitectura)
- [🛠️ Desarrollo](#desarrollo)
- [📱 Componentes](#componentes)
- [🔄 Sistema SSO y Trazabilidad](#sso-trazabilidad)
- [🔐 Seguridad](#seguridad)
- [📈 Monitoreo y Observabilidad](#monitoreo)
- [⚙️ Configuración Avanzada](#configuracion-avanzada)

## 🎯 Características Principales {#caracteristicas}

### ✨ **Para Usuarios**
- 🔐 **Autenticación Unificada**: Un solo login para acceder a todas las aplicaciones empresariales
- 📱 **Dashboard Moderno**: Interfaz intuitiva y responsive para gestionar aplicaciones
- ⭐ **Aplicaciones Favoritas**: Acceso rápido a las herramientas más utilizadas
- 🔍 **Búsqueda Inteligente**: Encuentra aplicaciones por nombre o categoría
- 📊 **Estadísticas Personales**: Seguimiento de uso y accesos
- 🌙 **Tema Adaptativo**: Soporte para modo claro/oscuro
- 📲 **Experiencia Móvil**: Optimizado para dispositivos móviles

### 🛠️ **Para Administradores**
- 👥 **Gestión de Usuarios**: Control completo de usuarios y permisos
- 🏢 **Gestión de Aplicaciones**: Administración centralizada de aplicaciones empresariales
- 📈 **Dashboard Analítico**: Métricas y estadísticas de uso en tiempo real
- 🔒 **Control de Acceso**: Sistema granular de permisos y roles
- 🔍 **Auditoría**: Registro completo de intentos de acceso y actividad
- 🔧 **Configuración Flexible**: Personalización de políticas de seguridad

## 📸 Galería de Screenshots {#galeria}

### 🔐 **Pantalla de Login**

<div align="center">

![Login](./docs/screenshots/login.png)
*Pantalla de login empresarial del sistema SAO6*

</div>

---

### 📊 **Dashboard Principal**

<div align="center">

![Dashboard](./docs/screenshots/dashboard.png)
*Dashboard principal con aplicaciones empresariales integradas*

</div>

#### 🎯 **Características Principales**
- **Búsqueda Inteligente**: Encuentra aplicaciones rápidamente
- **Aplicaciones Favoritas**: Acceso rápido a herramientas más utilizadas
- **Estadísticas en Tiempo Real**: Métricas de uso y actividad del sistema
- **Interfaz Moderna**: Diseño limpio y profesional

---

### 🚀 **Aplicaciones Empresariales Integradas**

#### 🏢 **Suite de Aplicaciones SAO6**

<table align="center">
<tr>
<td align="center" width="33%">
<strong>🚗 Carrotaller</strong>
<br/>
<em>Gestión integral de talleres automotrices y servicios de mantenimiento vehicular</em>
</td>
<td align="center" width="33%">
<strong>🔍 Inspecciones</strong>
<br/>
<em>Sistema avanzado de inspecciones técnicas y control de calidad</em>
</td>
<td align="center" width="33%">
<strong>📊 Control de Activos</strong>
<br/>
<em>Administración y seguimiento completo de activos empresariales</em>
</td>
</tr>
</table>

---

### 🔄 **Flujo SSO Simplificado**

#### 🔄 **Proceso de Acceso Único**
1. **Login Corporativo**: Credenciales empresariales unificadas
2. **Dashboard Centralizado**: Todas las aplicaciones disponibles en un lugar
3. **Acceso Directo**: Un clic para acceder a cualquier aplicación
4. **Sesión Persistente**: Sin necesidad de re-autenticación

---

### 🎯 **Estados del Sistema**

#### 🔧 **Indicadores de Estado**
- 🟢 **Sistema Activo**: Aplicación funcionando correctamente
- 🟡 **Mantenimiento**: Actualizaciones o mantenimiento programado
- ⭐ **Favoritas**: Aplicaciones marcadas para acceso rápido

---

### 💡 **Información Técnica**

> **📁 Screenshots**: Las imágenes se encuentran en `./docs/screenshots/`
> 
> **🔄 Actualización**: Capturas actualizadas con cada versión
> 
> **🎨 Diseño**: Interfaz optimizada para uso empresarial

## 👥 Para Usuarios {#para-usuarios}

### 🚀 **Acceso Simple**
1. **Inicia Sesión**: Usa tus credenciales corporativas
2. **Explora**: Navega por todas las aplicaciones disponibles
3. **Accede**: Haz clic en cualquier aplicación para abrirla automáticamente
4. **Personaliza**: Marca tus aplicaciones favoritas para acceso rápido

### 📱 **Funcionalidades Principales**
- **Dashboard Personalizado**: Vista general de todas tus aplicaciones
- **Acceso Rápido**: Aplicaciones favoritas siempre visibles
- **Búsqueda Inteligente**: Encuentra aplicaciones por nombre o descripción
- **Historial de Uso**: Ve tus aplicaciones más utilizadas
- **Notificaciones**: Recibe alertas importantes del sistema
- **Perfil de Usuario**: Gestiona tu información personal

## 🔧 Tecnologías {#tecnologias}

### 🎨 **Frontend**
```typescript
// Stack Principal
Next.js 15.2          // Framework React con SSR/SSG
React 19              // Biblioteca de interfaz de usuario
TypeScript 5.x        // Lenguaje tipado
Tailwind CSS 3.x      // Framework CSS utility-first
```

### 🚀 **UI/UX**
```typescript
// Componentes y Diseño
Radix UI              // Componentes accesibles
Shadcn/ui             // Sistema de diseño moderno
Lucide React          // Iconografía
Framer Motion         // Animaciones (opcional)
React Hook Form       // Gestión de formularios
```

### ⚙️ **Backend**
```typescript
// Servidor y API
Node.js               // Runtime de JavaScript
Express.js            // Framework web
Apollo Server         // Servidor GraphQL
Prisma ORM            // Object-Relational Mapping
MySQL                 // Base de datos
```

### 🔐 **Autenticación & Seguridad**
```typescript
// Seguridad
JWT                   // JSON Web Tokens
bcryptjs              // Hash de contraseñas
CORS                  // Cross-Origin Resource Sharing
Helmet                // Seguridad HTTP
```

### 📊 **Monitoreo**
```typescript
// Observabilidad
Sentry                // Monitoreo de errores
Winston               // Logging
Prometheus            // Métricas (opcional)
```

## ⚙️ Instalación {#instalacion}

### 📋 **Requisitos Previos**
```bash
Node.js >= 18.0.0
npm >= 8.0.0
MySQL >= 8.0
Git
```

### 🛠️ **Instalación Completa**

1. **Clonar el Repositorio**
```bash
git clone https://github.com/tu-empresa/enterprise-login.git
cd enterprise-login
```

2. **Instalar Dependencias Frontend**
```bash
npm install
```

3. **Configurar Backend**
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tu configuración
```

4. **Configurar Base de Datos**
```bash
# En el directorio backend
npx prisma migrate dev
npx prisma generate
```

5. **Crear Usuario Administrador**
```bash
npm run create-admin
```

6. **Iniciar Servicios**
```bash
# Backend (puerto 4000)
cd backend
npm run dev

# Frontend (puerto 3000)
cd ..
npm run dev
```

### 🌐 **Acceso**
- **Frontend**: http://localhost:3000
- **Backend GraphQL**: http://localhost:4000/graphql
- **Prisma Studio**: http://localhost:5555

## 🚀 Uso {#uso}

### 👤 **Para Usuarios Finales**

1. **Acceder al Portal**
   - Navega a la URL del portal
   - Usa tus credenciales corporativas
   - Accede automáticamente al dashboard

2. **Usar el Dashboard**
   - Ve todas las aplicaciones disponibles
   - Busca aplicaciones específicas
   - Marca favoritas para acceso rápido
   - Haz clic para abrir aplicaciones

### 👨‍💼 **Para Administradores**

1. **Gestión de Usuarios**
```bash
# Crear usuario administrador
npm run create-admin

# Verificar sincronización de usuarios
npm run verify-user
```

2. **Gestión de Aplicaciones**
   - Accede al panel de administración
   - Agrega nuevas aplicaciones
   - Configura permisos y accesos
   - Monitorea el uso

## 📊 Arquitectura {#arquitectura}

### 🏗️ **Arquitectura General**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (GraphQL)     │◄──►│   (MySQL)       │
│                 │    │                 │    │                 │
│ • Dashboard     │    │ • Authentication│    │ • Users         │
│ • Login         │    │ • Authorization │    │ • Applications  │
│ • Components    │    │ • API Resolvers │    │ • Sessions      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🔄 **Flujo de Autenticación SSO**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend GraphQL
    participant SSO as Base SSO
    participant EXT as Base Externa
    participant APP as App Externa

    Note over U,APP: FASE 1: Autenticación Inicial
    U->>F: Credenciales (username/password)
    F->>B: Mutation login
    B->>EXT: Validar credenciales (Django auth)
    EXT-->>B: Usuario externo válido
    B->>SSO: Verificar usuario en SSO
    SSO-->>B: Usuario SSO (debe existir)
    B->>B: Sincronizar datos entre bases
    B->>SSO: Crear sesión JWT
    B-->>F: Token JWT + Datos usuario
    F->>F: Almacenar token en localStorage

    Note over U,APP: FASE 2: Acceso a Aplicación
    U->>F: Clic en aplicación
    F->>F: Verificar token válido
    F->>B: Mutation authenticateExternal
    B->>B: Crear token SSO específico
    B->>B: Generar URL con token
    B-->>F: URL de redirección SSO
    F->>APP: Redirección automática
    APP->>APP: Validar token SSO
    APP-->>U: Acceso autorizado sin re-login
```

### 🔐 **Arquitectura de Autenticación Dual**

```mermaid
graph TB
    U[👤 Usuario] --> F[🖥️ Frontend Next.js]
    F --> B[🔌 Backend GraphQL]
    B --> SSO[(🔑 Base SSO<br/>MySQL)]
    B --> EXT[(🗄️ Base Externa<br/>Django MySQL)]
    
    subgraph "Aplicaciones Externas"
        A1[🚗 Carrotaller]
        A2[🔍 Inspecciones]
        A3[📊 Control Activos]
    end
    
    B --> A1
    B --> A2
    B --> A3
    
    style SSO fill:#e1f5fe
    style EXT fill:#f3e5f5
    style B fill:#e8f5e8
    style F fill:#fff3e0
```

### 📋 **Estados de Trazabilidad**

```mermaid
stateDiagram-v2
    [*] --> NoAutenticado
    NoAutenticado --> Autenticando: Login
    Autenticando --> ValidandoExterno: Verificar Django
    ValidandoExterno --> ValidandoSSO: Credenciales OK
    ValidandoSSO --> Sincronizando: Usuario existe
    Sincronizando --> Autenticado: Sesión creada
    ValidandoExterno --> Error: Credenciales inválidas
    ValidandoSSO --> Error: Usuario no en SSO
    
    Autenticado --> AccediendoApp: Clic aplicación
    AccediendoApp --> GenerandoTokenSSO: Crear token específico
    GenerandoTokenSSO --> RedireccionandoSSO: URL con token
    RedireccionandoSSO --> AppExterna: Acceso automático
    AppExterna --> [*]: Logout
    
    Error --> NoAutenticado: Reintentar
```

### 📁 **Estructura del Proyecto**

```
enterprise-login/
├── app/                    # Páginas de Next.js
│   ├── login/             # Página de login
│   ├── dashboard/         # Dashboard principal
│   └── api/               # Rutas API
├── backend/               # Servidor GraphQL
│   ├── src/
│   │   ├── graphql/       # Resolvers y esquemas
│   │   ├── services/      # Lógica de negocio
│   │   ├── middleware/    # Middleware de autenticación
│   │   └── utils/         # Utilidades
│   └── prisma/            # Esquemas de base de datos
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── login/            # Componentes de login
│   └── dashboard/        # Componentes del dashboard
├── lib/                  # Librerías y utilidades
├── hooks/                # Hooks personalizados
└── types/                # Tipos TypeScript
```

## 🛠️ Desarrollo {#desarrollo}

### 🔧 **Scripts Disponibles**

```bash
# Frontend
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run start           # Servidor de producción
npm run lint            # Análisis de código

# Backend
cd backend
npm run dev             # Servidor de desarrollo
npm run build          # Compilar TypeScript
npm run start          # Servidor de producción
npm run prisma:generate # Generar cliente Prisma
npm run prisma:migrate  # Ejecutar migraciones
npm run prisma:studio   # Abrir Prisma Studio
```

### 🎨 **Guía de Estilos**

```typescript
// Convenciones de código
- PascalCase para componentes
- camelCase para funciones y variables
- kebab-case para archivos
- UPPER_CASE para constantes

// Estructura de componentes
export default function ComponentName() {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
}
```

### 🧪 **Testing**

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests E2E
npm run test:e2e
```

## 📱 Componentes {#componentes}

### 🎨 **Componentes UI**

```typescript
// Componentes base disponibles
Button, Input, Card, Modal, Dropdown, Tabs,
Table, Form, Alert, Toast, Spinner, Avatar,
Badge, Tooltip, Popover, Accordion, etc.
```

### 🏗️ **Componentes de Negocio**

```typescript
// Login
EnterpriseLogin         // Componente principal de login
LoginForm              // Formulario de autenticación
ForgotPasswordForm     // Recuperación de contraseña

// Dashboard
Dashboard              // Dashboard principal
ApplicationCard        // Tarjeta de aplicación
FavoriteApps          // Aplicaciones favoritas
SearchBar             // Barra de búsqueda
WelcomeSection        // Sección de bienvenida

// Layout
ProtectedRoute        // Rutas protegidas
MobileSidebar        // Sidebar móvil
DesktopSidebar       // Sidebar desktop
```

### 🔗 **Hooks Personalizados**

```typescript
// Autenticación
useAuth()             // Gestión de autenticación
useLoginForm()        // Lógica de formulario de login

// Aplicaciones
useApplications()     // Gestión de aplicaciones
useDashboard()        // Lógica del dashboard

// UI
useToast()            // Notificaciones toast
useMobile()           // Detección de dispositivo móvil
```

## 🔄 Sistema SSO y Trazabilidad {#sso-trazabilidad}

### 🏗️ **Arquitectura SSO Empresarial**

El sistema implementa una **arquitectura de autenticación dual** que garantiza seguridad y trazabilidad completa:

#### 📊 **Bases de Datos Sincronizadas**

```typescript
// Base de Datos SSO (Prisma + MySQL)
Usuario SSO {
  id: UUID
  username: string
  externalId: number  // 🔗 Vincula con base externa
  password: hash      // 🔐 bcrypt para SSO
  sesiones: Session[]
  aplicaciones: UserApplication[]
  permisos: UserPermission[]
}

// Base de Datos Externa (Django + MySQL)
Usuario Django {
  id: number
  username: string
  password: string    // 🔐 PBKDF2-SHA256 Django
  first_name: string
  last_name: string
  is_active: boolean
}
```

#### 🔑 **Flujo de Tokens SSO**

```typescript
// Token JWT Principal (Login)
{
  userId: "uuid",
  username: "usuario",
  sessionId: "session-uuid",
  exp: timestamp + 24h
}

// Token SSO Específico (Por Aplicación)
{
  userId: "uuid",
  username: "usuario", 
  application: "carrotaller",
  firstName: "Nombre",
  lastName: "Apellido",
  email: "email@empresa.com",
  iat: timestamp,
  exp: timestamp + 1h  // ⏰ Expira en 1 hora
}
```

### 🔍 **Trazabilidad Completa**

#### 📝 **Registro de Eventos**

```typescript
// Intentos de Login
LoginAttempt {
  username: string
  success: boolean
  reason?: string      // Motivo del fallo
  ipAddress: string
  userAgent: string
  timestamp: DateTime
}

// Sesiones Activas  
Session {
  token: string
  userId: string
  ipAddress: string
  userAgent: string
  isActive: boolean
  lastActivity: DateTime
  expiresAt: DateTime
}

// Accesos a Aplicaciones
UserApplication {
  userId: string
  applicationId: string
  lastAccessed: DateTime
  accessCount: number   // 📊 Contador de accesos
  isFavorite: boolean
}
```

#### 🔄 **Sincronización de Usuarios**

```bash
# Crear usuario en ambas bases
npm run create-admin
# Inputs: username, password, firstName, lastName, email

# Verificar sincronización
npm run verify-user
# Output: Estado de sincronización entre bases

# Proceso automático:
# 1. Hash Django (PBKDF2-SHA256) para base externa
# 2. Hash bcrypt para base SSO
# 3. Vincular con externalId
# 4. Asignar aplicaciones por defecto
```

### 🚀 **Flujo de Aplicaciones Externas**

#### 🎯 **Configuración de Aplicaciones**

```typescript
// Aplicaciones Configuradas
const EXTERNAL_APPS = {
  carrotaller: {
    name: 'Carrotaller',
    authUrl: 'https://carrotaller.sao6.com.co/auth/',
    appUrl: 'https://carrotaller.sao6.com.co/dashboard',
    method: 'POST'
  },
  inspecciones: {
    name: 'Inspecciones', 
    authUrl: 'https://inspecciones.sao6.com.co/auth/',
    appUrl: 'https://inspecciones.sao6.com.co/formulario',
    method: 'POST'
  },
  activos: {
    name: 'Control de Activos',
    authUrl: 'https://activos.sao6.com.co/auth/',
    appUrl: 'https://activos.sao6.com.co/dashboard', 
    method: 'POST'
  }
}
```

#### 🔗 **Proceso SSO Step-by-Step**

```typescript
// 1. Usuario hace clic en aplicación
onClick(applicationId) {
  trackApplicationAccess(applicationId)  // 📊 Registrar acceso
  
  // 2. Frontend solicita autenticación externa
  fetch('/api/external-auth', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${jwt_token}` },
    body: { application: 'carrotaller' }
  })
  
  // 3. Backend genera token SSO específico
  const ssoToken = jwt.sign({
    userId, username, email, firstName, lastName,
    application: 'carrotaller',
    exp: Date.now() + 3600000  // 1 hora
  }, SSO_SECRET)
  
  // 4. URL de redirección con token
  const redirectUrl = `${appUrl}?sso_token=${ssoToken}`
  
  // 5. Aplicación externa valida token y autentica
  window.open(redirectUrl, '_blank')
}
```

### 📊 **Dashboard de Trazabilidad**

#### 🔍 **Métricas en Tiempo Real**

```typescript
// Consultas GraphQL para Trazabilidad
query DashboardStats {
  dashboardStats {
    totalUsers
    activeUsers        // 👥 Usuarios con sesiones activas
    totalApplications
    totalSessions      // 🔗 Sesiones concurrentes
  }
  
  loginAttempts(take: 10) {
    username
    success
    reason           // 📝 Motivo de fallo
    ipAddress
    createdAt
  }
  
  activeSessions {
    user { username }
    ipAddress
    userAgent
    lastActivity     // ⏰ Última actividad
    expiresAt
  }
}
```

#### 📈 **Auditoría de Usuarios**

```typescript
// Resolver para auditoría detallada
user(id: "user-uuid") {
  username
  isActive
  lastLogin: sessions(orderBy: { createdAt: desc }, take: 1) {
    createdAt
    ipAddress
  }
  
  applications {
    application { name }
    lastAccessed     // 🕐 Último acceso
    accessCount      // 📊 Total de accesos
    isFavorite
  }
  
  loginAttempts(take: 5) {
    success
    reason
    createdAt
    ipAddress
  }
}
```

### 🛡️ **Validaciones de Seguridad**

#### ✅ **Checkpoints de Autenticación**

1. **Validación Dual**: Usuario debe existir en ambas bases
2. **Sincronización ID**: `externalId` debe coincidir
3. **Estado Activo**: Usuario activo en ambos sistemas
4. **Token Válido**: JWT no expirado y firmado correctamente
5. **Sesión Activa**: Sesión no expirada en base SSO

#### 🔒 **Medidas de Protección**

```typescript
// Validación estricta en login
if (!externalUser) {
  throw new Error('Credenciales inválidas')
}

if (!ssoUser) {
  throw new Error('Usuario no registrado en SSO')
}

if (ssoUser.externalId !== externalUser.id) {
  throw new Error('Error de sincronización')
}

// Token SSO con expiración corta
const ssoToken = jwt.sign(payload, secret, {
  algorithm: 'HS256',
  expiresIn: '1h'  // ⏰ Expira en 1 hora
})
```

## 🔐 Seguridad {#seguridad}

### 🛡️ **Medidas de Seguridad**

```typescript
// Autenticación
✅ JWT con expiración
✅ Hash de contraseñas con bcrypt
✅ Validación de tokens
✅ Sesiones seguras

// Autorización
✅ Control de acceso basado en roles
✅ Permisos granulares
✅ Validación de recursos

// Protección
✅ CORS configurado
✅ Helmet para headers de seguridad
✅ Validación de entrada
✅ Sanitización de datos
```

### 🔒 **Roles y Permisos**

```typescript
// Roles disponibles
USER          // Usuario estándar
ADMIN         // Administrador
SUPER_ADMIN   // Súper administrador

// Permisos
- Acceso a aplicaciones
- Gestión de usuarios
- Configuración del sistema
- Auditoría y logs
```

## 📈 Monitoreo y Observabilidad {#monitoreo}

### 📊 **Dashboard de Métricas**

#### 🎯 **KPIs Empresariales**

```typescript
// Métricas de Negocio
interface BusinessMetrics {
  usuariosActivos: number        // 👥 Usuarios únicos por día
  sesionesSimultaneas: number    // 🔗 Sesiones concurrentes
  aplicacionesPopulares: {       // 📈 Top aplicaciones
    nombre: string
    accesos: number
    usuariosUnicos: number
  }[]
  tiempoPromedioBusqueda: number // ⏱️ Tiempo en encontrar apps
  tasaExitoSSO: number          // ✅ % éxito autenticación SSO
}

// Métricas de Rendimiento  
interface PerformanceMetrics {
  tiempoRespuestaLogin: number   // ⚡ Tiempo autenticación
  tiempoGeneracionToken: number  // 🔑 Tiempo crear token SSO
  errorRate: number             // ❌ Tasa de errores
  disponibilidadSistema: number // 🟢 Uptime %
}
```

#### 🔍 **Sistema de Alertas**

```typescript
// Alertas Configuradas
const ALERTAS = {
  autenticacion: {
    fallosConsecutivos: 5,      // 🚨 5+ fallos seguidos
    tiempoRespuesta: 3000,      // ⏰ >3s login
    sesionesExpiradas: 100      // 💾 Muchas sesiones exp.
  },
  sistema: {
    errorRate: 0.05,           // 🔴 >5% errores
    memoryUsage: 0.85,         // 💾 >85% memoria
    diskSpace: 0.90            // 💿 >90% disco
  }
}

// Notificaciones
- 📧 Email para administradores
- 💬 Slack/Teams integración  
- 📱 Push notifications
- 🔔 Dashboard visual alerts
```

### 🔍 **Logging Estructurado**

#### 📝 **Eventos de Auditoría**

```typescript
// Login Events
{
  eventType: 'LOGIN_ATTEMPT',
  timestamp: '2024-01-15T10:30:00Z',
  userId: 'user-uuid', 
  username: 'juan.perez',
  success: true,
  ip: '192.168.1.100',
  userAgent: 'Mozilla/5.0...',
  location: 'Bogotá, Colombia',
  authMethod: 'SSO_DUAL'
}

// Application Access
{
  eventType: 'APP_ACCESS',
  timestamp: '2024-01-15T10:35:00Z',
  userId: 'user-uuid',
  applicationId: 'carrotaller-id',
  applicationName: 'Carrotaller',
  accessMethod: 'SSO_TOKEN',
  tokenExpiry: '2024-01-15T11:35:00Z',
  redirectUrl: 'https://carrotaller.sao6.com.co/...'
}

// System Events  
{
  eventType: 'TOKEN_GENERATED',
  timestamp: '2024-01-15T10:35:00Z',
  tokenType: 'SSO_SPECIFIC',
  application: 'carrotaller',
  userId: 'user-uuid',
  expiresIn: 3600,
  generationTime: 45 // ms
}
```

#### 🔄 **Trazabilidad de Flujos**

```typescript
// Seguimiento completo por transacción
interface TransactionTrace {
  traceId: string              // 🆔 ID único de transacción
  events: [
    {
      timestamp: DateTime
      service: 'frontend' | 'graphql' | 'database'
      operation: string
      duration: number         // ⏱️ Tiempo en ms
      status: 'success' | 'error'
      metadata: object
    }
  ]
}

// Ejemplo de trace completo
{
  traceId: 'trace-12345',
  userId: 'user-uuid',
  events: [
    { service: 'frontend', operation: 'login_submit', duration: 5 },
    { service: 'graphql', operation: 'validate_credentials', duration: 250 },
    { service: 'database', operation: 'query_external_user', duration: 45 },
    { service: 'database', operation: 'query_sso_user', duration: 30 },
    { service: 'graphql', operation: 'generate_jwt', duration: 15 },
    { service: 'frontend', operation: 'redirect_dashboard', duration: 10 }
  ],
  totalDuration: 355,
  status: 'success'
}
```

### 🚨 **Troubleshooting y Diagnóstico**

#### 🔧 **Comandos de Diagnóstico**

```bash
# Verificar estado del sistema
npm run health-check

# Verificar usuario específico
npm run verify-user -- --username juan.perez
# Output: Estado sync, última actividad, aplicaciones

# Verificar conectividad aplicaciones externas
npm run test-external-apps
# Output: Estado de cada aplicación externa

# Limpiar sesiones expiradas
npm run cleanup-sessions

# Generar reporte de actividad
npm run activity-report -- --days 7
# Output: Reporte de 7 días de actividad
```

#### 🔍 **Dashboard de Troubleshooting**

```typescript
// Consultas de diagnóstico
query TroubleshootUser($username: String!) {
  user: userByUsername(username: $username) {
    id
    isActive
    externalId
    
    # Última actividad
    sessions(orderBy: { lastActivity: desc }, take: 1) {
      lastActivity
      isActive
      expiresAt
      ipAddress
    }
    
    # Intentos recientes
    loginAttempts(take: 10, orderBy: { createdAt: desc }) {
      success
      reason
      createdAt
      ipAddress
      userAgent
    }
    
    # Aplicaciones y accesos
    applications {
      application { name, isActive }
      lastAccessed
      accessCount
    }
  }
  
  # Verificar sincronización
  externalUserSync: verifyUserSync(username: $username) {
    inSync
    ssoExists
    externalExists
    details
  }
}
```

#### 🛠️ **Herramientas de Monitoreo**

```typescript
// Sentry - Monitoreo de Errores
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Filtrar información sensible
    if (event.request?.data?.password) {
      event.request.data.password = '[Filtered]'
    }
    return event
  }
})

// Métricas personalizadas
const metrics = {
  ssoTokenGenerated: () => {
    // Incrementar contador
    prometheus.ssoTokensTotal.inc()
  },
  
  loginAttempt: (success: boolean) => {
    prometheus.loginAttemptsTotal.labels({ 
      success: success.toString() 
    }).inc()
  },
  
  appAccess: (appName: string) => {
    prometheus.appAccessTotal.labels({ 
      application: appName 
    }).inc()
  }
}
```

### 📊 **Dashboards Grafana**

#### 📈 **Panel Principal**

```yaml
# Grafana Dashboard Config
panels:
  - title: "Usuarios Activos"
    query: "user_sessions_active"
    chart: "stat"
    
  - title: "Autenticaciones por Hora"  
    query: "rate(login_attempts_total[1h])"
    chart: "graph"
    
  - title: "Aplicaciones Más Usadas"
    query: "topk(5, app_access_total)"
    chart: "table"
    
  - title: "Tiempo Respuesta Login"
    query: "histogram_quantile(0.95, login_duration_seconds_bucket)"
    chart: "gauge"
    
  - title: "Errores por Minuto"
    query: "rate(errors_total[1m])"
    chart: "alert_graph"
```

#### 🔍 **Panel de Auditoría**

```yaml
# Panel específico para auditoría
panels:
  - title: "Intentos de Login Fallidos"
    query: "login_attempts_total{success='false'}"
    alert_threshold: 10
    
  - title: "Sesiones Simultáneas"
    query: "active_sessions_total"
    alert_threshold: 1000
    
  - title: "Aplicaciones Sin Acceso"
    query: "apps_zero_access_24h"
    chart: "table"
```

## ⚙️ Configuración Avanzada {#configuracion-avanzada}

### 🔧 **Variables de Entorno**

#### 🎯 **Frontend (.env.local)**

```bash
# NextJS Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

# Sentry Monitoring
SENTRY_DSN=https://your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=https://your-public-sentry-dsn

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=GA-XXXX-XXXX
```

#### 🛠️ **Backend (.env)**

```bash
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/sso_db"
EXTERNAL_DATABASE_URL="mysql://username:password@localhost:3306/external_db"

# JWT & Security
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
SSO_SECRET=your-sso-secret-for-external-apps

# Server Configuration
PORT=4000
NODE_ENV=production

# External Services
SENTRY_DSN=https://your-sentry-dsn

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=your-app-password
```

### 🔐 **Configuración de Seguridad**

#### 🛡️ **SSL/TLS Production**

```nginx
# Nginx Configuration
server {
    listen 443 ssl http2;
    server_name sso.tuempresa.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /graphql {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 🔑 **Gestión de Secretos**

```bash
# Using Docker Secrets
docker secret create jwt_secret jwt_secret.txt
docker secret create sso_secret sso_secret.txt

# Docker Compose with Secrets
version: '3.8'
services:
  backend:
    image: enterprise-sso-backend
    secrets:
      - jwt_secret
      - sso_secret
    environment:
      JWT_SECRET_FILE: /run/secrets/jwt_secret
      SSO_SECRET_FILE: /run/secrets/sso_secret

secrets:
  jwt_secret:
    external: true
  sso_secret:
    external: true
```

### 🐳 **Docker Deployment**

#### 📦 **Docker Compose Completo**

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # Database
  mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: sso_db
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "3306:3306"

  # Backend GraphQL
  backend:
    build: ./backend
    restart: always
    environment:
      DATABASE_URL: mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@mysql:3306/sso_db
      JWT_SECRET: ${JWT_SECRET}
      SSO_SECRET: ${SSO_SECRET}
      NODE_ENV: production
    depends_on:
      - mysql
    ports:
      - "4000:4000"

  # Frontend NextJS
  frontend:
    build: .
    restart: always
    environment:
      NEXT_PUBLIC_BACKEND_URL: http://backend:4000
      NEXT_PUBLIC_GRAPHQL_ENDPOINT: http://backend:4000/graphql
    depends_on:
      - backend
    ports:
      - "3000:3000"

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    restart: always
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - frontend
      - backend

volumes:
  mysql_data:
```

### 📊 **Configuración de Cache**

#### ⚡ **Redis para Sessions**

```typescript
// backend/src/config/redis.ts
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
})

// Cache para sesiones
export const cacheSession = async (sessionId: string, data: any) => {
  await redis.setex(
    `session:${sessionId}`, 
    86400, // 24 horas
    JSON.stringify(data)
  )
}

export const getSession = async (sessionId: string) => {
  const data = await redis.get(`session:${sessionId}`)
  return data ? JSON.parse(data) : null
}
```

#### 🔄 **NextJS Static Generation**

```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  
  // ISR para páginas estáticas
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: `${process.env.BACKEND_URL}/graphql`,
      },
    ]
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### 🧪 **Testing Avanzado**

#### 🔍 **Tests de Integración**

```typescript
// tests/integration/auth-flow.test.ts
import { test, expect } from '@playwright/test'

test.describe('SSO Authentication Flow', () => {
  test('complete login to external app flow', async ({ page }) => {
    // 1. Login al portal SSO
    await page.goto('http://localhost:3000/login')
    await page.fill('[name="username"]', 'testuser')
    await page.fill('[name="password"]', 'testpass')
    await page.click('button[type="submit"]')
    
    // 2. Verificar dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
    
    // 3. Hacer clic en aplicación externa
    await page.click('[data-testid="app-carrotaller"]')
    
    // 4. Verificar redirección SSO
    await expect(page).toHaveURL(/carrotaller\.sao6\.com\.co/)
    
    // 5. Verificar que no pide login nuevamente
    await expect(page.locator('body')).not.toContainText('Login')
  })
})
```

#### 🚀 **Performance Testing**

```typescript
// tests/load/auth-load.test.ts
import { check } from 'k6'
import http from 'k6/http'

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Subir a 100 usuarios
    { duration: '5m', target: 100 }, // Mantener 100 usuarios
    { duration: '2m', target: 200 }, // Subir a 200 usuarios
    { duration: '5m', target: 200 }, // Mantener 200 usuarios
    { duration: '2m', target: 0 },   // Bajar a 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% under 2s
    http_req_failed: ['rate<0.1'],     // Error rate under 10%
  },
}

const BASE_URL = 'http://localhost:4000'

export default function () {
  // Test login endpoint
  const loginResponse = http.post(`${BASE_URL}/graphql`, 
    JSON.stringify({
      query: `
        mutation {
          login(input: { username: "testuser", password: "testpass" }) {
            token
            user { id username }
          }
        }
      `
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
  
  check(loginResponse, {
    'login status is 200': (r) => r.status === 200,
    'login response time < 1s': (r) => r.timings.duration < 1000,
    'token received': (r) => JSON.parse(r.body).data.login.token.length > 0,
  })
}
```

## 🤝 Contribución

### 📝 **Guía de Contribución**

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📋 **Estándares de Código**

- Seguir las convenciones de TypeScript
- Documentar funciones complejas
- Escribir tests para nuevas funcionalidades
- Mantener consistencia en el estilo

### 🎯 **Mejores Prácticas**

#### 🔐 **Seguridad**
- Nunca hardcodear secretos en el código
- Validar todas las entradas de usuario
- Usar HTTPS en producción
- Implementar rate limiting
- Auditar dependencias regularmente

#### 🚀 **Performance**
- Optimizar consultas de base de datos
- Implementar caching estratégico
- Minimizar bundle size del frontend
- Usar CDN para assets estáticos
- Monitorear métricas de performance

#### 📊 **Monitoreo**
- Implementar logging estructurado
- Configurar alertas proactivas
- Mantener dashboards actualizados
- Realizar backups regulares
- Documentar incidentes y resoluciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@tuempresa.com
- 📱 Teléfono: +1 (555) 123-4567
- 🌐 Documentación: https://docs.tuempresa.com

---

<div align="center">

**Desarrollado con ❤️ para empresas modernas**

🔐 **Seguro** • 🚀 **Rápido** • 📱 **Responsive** • 🌟 **Moderno**

</div> 