export interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info" | "warning"
}

export interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  time: string
  read: boolean
}

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

export interface NavigationItem {
  name: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}

export interface QuickAction {
  icon: string
  title: string
  subtitle: string
  gradient: string
} 