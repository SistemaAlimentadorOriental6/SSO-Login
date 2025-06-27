import React from "react"
import { Application, NavigationItem, QuickAction } from "./types"

export const initialNotifications = [
  {
    id: 1,
    title: "Sistema Actualizado",
    message: "Nueva versión disponible con mejoras de seguridad",
    type: "success" as const,
    time: "Hace 5 min",
    read: false,
  },
  {
    id: 2,
    title: "Mantenimiento Programado",
    message: "El sistema estará en mantenimiento el domingo de 2-4 AM",
    type: "warning" as const,
    time: "Hace 1 hora",
    read: false,
  },
  {
    id: 3,
    title: "Backup Completado",
    message: "Respaldo de datos completado exitosamente",
    type: "info" as const,
    time: "Hace 2 horas",
    read: true,
  },
]

export const applications: Application[] = [
  {
    id: "carrotaller",
    name: "Carrotaller",
    description: "Gestión integral de talleres automotrices y servicios de mantenimiento vehicular.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    gradient: "from-orange-400 via-red-400 to-pink-500",
    stats: { vehicles: 24, services: 156 },
    status: "active",
    pulse: true,
  },
  {
    id: "inspecciones",
    name: "Inspecciones",
    description: "Sistema de inspecciones técnicas y control de calidad para vehículos y equipos.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-blue-400 via-indigo-400 to-purple-500",
    stats: { completed: 89, pending: 12 },
    status: "active",
    pulse: false,
  },
  {
    id: "activos",
    name: "Control de Activos",
    description: "Administración y seguimiento completo de activos empresariales y recursos.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    gradient: "from-green-400 via-emerald-400 to-teal-500",
    stats: { total: 342, active: 298 },
    status: "maintenance",
    pulse: false,
  },
]

export const quickActions: QuickAction[] = [
  {
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    title: "Nuevo",
    subtitle: "Registro",
    gradient: "from-blue-400 to-blue-500",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Reportes",
    subtitle: "Estadísticas",
    gradient: "from-purple-400 to-purple-500",
  },
  {
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    title: "Config",
    subtitle: "Sistema",
    gradient: "from-green-400 to-green-500",
  },
  {
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Soporte",
    subtitle: "Ayuda",
    gradient: "from-red-400 to-red-500",
  },
] 