# Dashboard Components

Esta carpeta contiene todos los componentes modulares del dashboard empresarial, organizados de manera que sean fáciles de mantener y reutilizar.

## Estructura de Archivos

### Tipos y Datos
- `types.ts` - Interfaces y tipos TypeScript para todos los componentes
- `data.tsx` - Datos estáticos (aplicaciones, notificaciones, acciones rápidas)

### Hooks
- `useDashboard.ts` - Hook personalizado que maneja toda la lógica del estado del dashboard

### Componentes Principales
- `ToastContainer.tsx` - Contenedor de notificaciones toast
- `NotificationDropdown.tsx` - Dropdown de notificaciones (móvil y escritorio)
- `Logo.tsx` - Componente del logo con diferentes tamaños
- `ApplicationCard.tsx` - Tarjeta individual de aplicación
- `QuickActions.tsx` - Grid de acciones rápidas
- `WelcomeSection.tsx` - Sección de bienvenida con estadísticas

### Componentes de Layout
- `MobileSidebar.tsx` - Sidebar para dispositivos móviles
- `DesktopSidebar.tsx` - Sidebar para escritorio
- `DesktopTopBar.tsx` - Barra superior para escritorio

### Archivos de Exportación
- `index.ts` - Exporta todos los componentes y utilidades

## Uso

```tsx
import {
  useDashboard,
  ToastContainer,
  MobileSidebar,
  DesktopSidebar,
  DesktopTopBar,
  WelcomeSection,
  ApplicationCard,
  QuickActions,
  applications,
  quickActions,
} from "@/components/dashboard"

export default function Dashboard() {
  const dashboardLogic = useDashboard()
  
  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <MobileSidebar {...mobileProps} />
      <DesktopSidebar {...desktopProps} />
      <main>
        <DesktopTopBar {...topBarProps} />
        <WelcomeSection />
        <ApplicationCard app={app} onClick={handleClick} />
        <QuickActions actions={quickActions} />
      </main>
    </>
  )
}
```

## Beneficios de la Refactorización

1. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras partes de la aplicación
3. **Mantenibilidad**: Es más fácil mantener y actualizar componentes pequeños
4. **Testabilidad**: Los componentes individuales son más fáciles de probar
5. **Legibilidad**: El código es más fácil de leer y entender
6. **Escalabilidad**: Es más fácil agregar nuevas funcionalidades

## Tipos Principales

```tsx
interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info" | "warning"
}

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  time: string
  read: boolean
}

interface Application {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  gradient: string
  stats: Record<string, number>
  status: "active" | "maintenance"
  pulse: boolean
}
```

## Hook useDashboard

El hook `useDashboard` centraliza toda la lógica del estado:

- Gestión de toasts
- Gestión de notificaciones
- Estado del menú móvil
- Manejo de aplicaciones
- Funciones de logout
- Reloj en tiempo real 