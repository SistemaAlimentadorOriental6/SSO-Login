import { useState, useEffect } from "react"
import { Toast, Notification } from "./types"
import { initialNotifications } from "./data"

export function useDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const handleAppClick = (appName: string) => {
    setActiveApp(appName)
    addToast(`Iniciando ${appName}...`, "info")
    setMobileMenuOpen(false)

    // Simulate loading sequence
    setTimeout(() => {
      addToast(`Conectando con ${appName}...`, "info")
    }, 1000)

    setTimeout(() => {
      addToast(`${appName} cargado exitosamente`, "success")
    }, 2500)
  }

  const handleLogout = () => {
    addToast("Cerrando sesión...", "info")
    setTimeout(() => {
      addToast("Guardando configuración...", "info")
    }, 1000)
    setTimeout(() => {
      addToast("Sesión cerrada exitosamente", "success")
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    }, 2000)
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    addToast("Notificación marcada como leída", "success")
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeApp,
    toasts,
    notifications,
    showNotifications,
    setShowNotifications,
    currentTime,
    unreadCount,
    addToast,
    removeToast,
    handleAppClick,
    handleLogout,
    markNotificationAsRead,
  }
} 