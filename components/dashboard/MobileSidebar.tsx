"use client"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import type { Application, NavigationItem, Notification } from "@/types/dashboard"

interface MobileSidebarProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  currentTime: Date
  notifications: Notification[]
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
  unreadCount: number
  onMarkNotificationAsRead: (id: number) => void
  navigationItems: NavigationItem[]
  applications: Application[]
  onAppClick: (appName: string) => void
  onLogout: () => void
  onConfiguration?: () => void
  onHelp?: () => void
}

export function MobileSidebar({
  mobileMenuOpen,
  setMobileMenuOpen,
  currentTime,
  notifications,
  showNotifications,
  setShowNotifications,
  unreadCount,
  onMarkNotificationAsRead,
  navigationItems,
  applications,
  onAppClick,
  onLogout,
  onConfiguration,
  onHelp,
}: MobileSidebarProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMobileMenuOpen(false)
      setIsClosing(false)
    }, 300)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  // System tools items
  const systemItems = [
    {
      name: "Configuración",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: onConfiguration,
      description: "Validaciones y permisos",
    },
    {
      name: "Ayuda",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"
          />
        </svg>
      ),
      onClick: onHelp,
      description: "Soporte y casos",
    },
  ]

  return (
    <>
      {/* Enhanced Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 shadow-2xl sticky top-0 z-50 relative overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-36 translate-x-36 animate-pulse"></div>
          <div
            className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-28 -translate-x-28 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Enhanced Logo Section */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                <div className="w-6 h-6 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"></div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel de Control</h1>
              <p className="text-green-100 text-sm font-medium">Gestión Empresarial</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Enhanced Time Display */}
            <div className="hidden sm:flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/30">
              <div className="relative">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-30"></div>
              </div>
              <div className="text-sm font-bold text-white tabular-nums">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            {/* Enhanced Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
              >
                <div className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5"
                    />
                  </svg>
                </div>
              </button>
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                  <span className="text-xs font-bold text-white">{unreadCount}</span>
                </div>
              )}
            </div>

            {/* Enhanced Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
            >
              <div className="relative w-5 h-5">
                <span
                  className={cn(
                    "absolute block h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out rounded-full",
                    mobileMenuOpen ? "rotate-45 translate-y-2" : "translate-y-0.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute block h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out top-2 rounded-full",
                    mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute block h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out top-4 rounded-full",
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : "translate-y-0.5",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Notifications Panel */}
      {showNotifications && (
        <div className="lg:hidden fixed top-20 right-4 left-4 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-green-100 shadow-2xl p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Notificaciones</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification, index) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer",
                    notification.read
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
                  )}
                  onClick={() => onMarkNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        notification.read ? "bg-gray-400" : "bg-green-500 animate-pulse",
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{notification.title}</div>
                      <div className="text-gray-600 text-xs mt-1">{notification.message}</div>
                      <div className="text-gray-500 text-xs mt-2">{notification.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out",
          mobileMenuOpen && !isClosing ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {/* Enhanced Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

        {/* Enhanced Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-green-50 via-white to-emerald-50 backdrop-blur-2xl shadow-2xl transform transition-all duration-500 ease-in-out overflow-hidden",
            mobileMenuOpen && !isClosing ? "translate-x-0" : "translate-x-full",
            isClosing && "translate-x-full",
          )}
        >
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl -translate-x-32 -translate-y-32 animate-pulse"></div>
            <div
              className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl translate-x-24 translate-y-24 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          {/* Scrollable Content */}
          <div className="relative z-10 h-full overflow-y-auto">
            <div className="p-6">
              {/* Enhanced Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <div className="w-6 h-6 bg-white rounded-xl flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Menú Principal</h2>
                    <p className="text-gray-600 font-medium">Navegación</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-green-100 hover:shadow-xl hover:scale-110 transition-all duration-300 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Enhanced System Status */}
              <div className="mb-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900">Sistema Operativo</div>
                      <div className="text-sm text-gray-600 font-medium">Todos los servicios en línea</div>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl px-3 py-1.5 border border-green-200">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30"></div>
                      </div>
                      <span className="text-sm font-bold text-green-700">98.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation Items */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Panel Principal
                </h3>
                <div className="space-y-3">
                  {navigationItems.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.onClick()
                        handleClose()
                      }}
                      onMouseEnter={() => setActiveSection(item.name)}
                      onMouseLeave={() => setActiveSection(null)}
                      className={cn(
                        "flex items-center gap-4 w-full px-6 py-4 rounded-3xl font-semibold transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] animate-in slide-in-from-right-4 duration-1000 group relative overflow-hidden",
                        item.active
                          ? "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white shadow-2xl shadow-green-500/30"
                          : "bg-white/80 backdrop-blur-xl border border-green-100 shadow-xl text-gray-700 hover:shadow-2xl hover:border-green-200",
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Enhanced floating elements */}
                      {!item.active && (
                        <>
                          <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 rounded-xl opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 bg-emerald-100 rounded-lg opacity-30 group-hover:opacity-70 group-hover:-rotate-12 transition-all duration-500"></div>
                        </>
                      )}

                      <div className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {item.icon}
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-1 text-left">
                        {item.name}
                      </span>
                      {item.active && (
                        <div className="flex items-center gap-2 relative z-10">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <div className="text-xs bg-white/20 px-2 py-1 rounded-lg font-medium">Activo</div>
                        </div>
                      )}
                      {activeSection === item.name && !item.active && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced System Tools */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Herramientas
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    Sistema
                  </div>
                </h3>
                <div className="space-y-3">
                  {systemItems.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.onClick?.()
                        handleClose()
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] text-gray-700 relative overflow-hidden group"
                      style={{ animationDelay: `${(index + navigationItems.length) * 100}ms` }}
                    >
                      {/* Enhanced floating elements - más pequeños */}
                      <div className="absolute top-1 right-1 w-3 h-3 bg-green-100 rounded-lg opacity-40 group-hover:opacity-80 group-hover:rotate-6 transition-all duration-300"></div>
                      <div className="absolute bottom-1 left-1 w-2 h-2 bg-emerald-100 rounded opacity-20 group-hover:opacity-50 group-hover:-rotate-6 transition-all duration-300"></div>

                      <div className="relative w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</div>
                        <div className="text-xs text-gray-600 mt-0.5 leading-tight">{item.description}</div>
                      </div>

                      {/* Enhanced status indicators - más compacto */}
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2.5 py-1 rounded-xl text-xs font-medium border border-green-200 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        Disponible
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Applications */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Aplicaciones
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    {applications.length}
                  </div>
                </h3>
                <div className="space-y-3">
                  {applications.map((app, index) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        onAppClick(app.name)
                        handleClose()
                      }}
                      className="flex items-center gap-4 w-full px-6 py-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] text-gray-700 animate-in slide-in-from-right-4 duration-1000 group relative overflow-hidden"
                      style={{ animationDelay: `${(index + navigationItems.length + systemItems.length) * 100}ms` }}
                    >
                      {/* Enhanced floating elements */}
                      <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 rounded-xl opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 bg-emerald-100 rounded-lg opacity-30 group-hover:opacity-70 group-hover:-rotate-12 transition-all duration-500"></div>

                      <div
                        className={cn(
                          "relative w-12 h-12 bg-gradient-to-r rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center",
                          app.gradient,
                        )}
                      >
                        <div className="w-6 h-6">{app.icon}</div>
                        {app.pulse && <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping"></div>}
                      </div>
                      <div className="flex-1 text-left group-hover:translate-x-1 transition-transform duration-300">
                        <div className="font-bold text-gray-900">{app.name}</div>
                        <div className="text-sm text-gray-600 font-medium">
                          {app.status === "active" ? "Sistema Activo" : "En Mantenimiento"}
                        </div>
                      </div>

                      {/* Enhanced status indicators */}
                      <div className="flex flex-col items-end gap-2">
                        {app.status === "maintenance" ? (
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-2xl text-xs font-bold border border-yellow-200">
                            <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
                            Mantenimiento
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-2xl text-xs font-bold border border-green-200">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                            Activo
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Logout */}
              <div className="border-t border-green-100 pt-6 pb-6">
                <button
                  onClick={() => {
                    onLogout()
                    handleClose()
                  }}
                  className="flex items-center justify-between w-full px-6 py-4 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-2xl border border-red-200 hover:border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] text-red-600 font-semibold relative overflow-hidden group"
                >
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900 group-hover:text-red-700 transition-colors duration-300">
                        Cerrar Sesión
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-red-500 transition-colors duration-300">
                        Finalizar sesión actual
                      </div>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
