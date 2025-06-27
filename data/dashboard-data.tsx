import type { Application, Notification } from "@/types/dashboard"

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Sistema Actualizado",
    message: "Nueva versión disponible con mejoras de seguridad",
    type: "success",
    time: "Hace 5 min",
    read: false,
  },
  {
    id: 2,
    title: "Mantenimiento Programado",
    message: "El sistema estará en mantenimiento el domingo de 2-4 AM",
    type: "warning",
    time: "Hace 1 hora",
    read: false,
  },
  {
    id: 3,
    title: "Backup Completado",
    message: "Respaldo de datos completado exitosamente",
    type: "info",
    time: "Hace 2 horas",
    read: true,
  },
]

export const applications: Application[] = [
  {
    id: "carrotaller",
    name: "Carrotaller",
    description:
      "Gestión integral de talleres automotrices y servicios de mantenimiento vehicular con control completo de inventarios y seguimiento de órdenes de trabajo.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    gradient: "from-green-400 via-emerald-400 to-green-500",
    stats: { vehicles: 24, services: 156 },
    status: "active",
    pulse: true,
  },
  {
    id: "inspecciones",
    name: "Inspecciones",
    description:
      "Sistema avanzado de inspecciones técnicas y control de calidad para vehículos y equipos industriales con reportes detallados y certificaciones.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-green-500 via-emerald-500 to-green-600",
    stats: { completed: 89, pending: 12 },
    status: "active",
    pulse: false,
  },
  {
    id: "activos",
    name: "Control de Activos",
    description:
      "Administración y seguimiento completo de activos empresariales, recursos y equipamiento con trazabilidad total, depreciación y mantenimiento preventivo.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    gradient: "from-emerald-400 via-green-400 to-emerald-500",
    stats: { total: 342, active: 298 },
    status: "maintenance",
    pulse: false,
  },
]
