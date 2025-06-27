import type React from "react"

export interface Application {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  gradient: string
  stats: Record<string, number>
  status: "active" | "maintenance"
  pulse: boolean
}

export interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info" | "warning"
}

export interface Notification {
  id: number
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  time: string
  read: boolean
}

export interface NavigationItem {
  name: string
  icon: React.ReactNode
  onClick: () => void
  active: boolean
}

export interface QuickAction {
  title: string
  subtitle: string
  icon: string
  gradient: string
}
