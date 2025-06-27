import React from "react"
import { NotificationDropdown } from "./NotificationDropdown"
import { Notification } from "./types"

interface DesktopTopBarProps {
  currentTime: Date
  notifications: Notification[]
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
  unreadCount: number
  onMarkNotificationAsRead: (id: number) => void
}

export function DesktopTopBar({
  currentTime,
  notifications,
  showNotifications,
  setShowNotifications,
  unreadCount,
  onMarkNotificationAsRead,
}: DesktopTopBarProps) {
  return (
    <div className="hidden lg:block bg-white/20 backdrop-blur-3xl border-b border-white/30 px-8 py-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-white/30"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Panel de Control
          </h1>
          <p className="text-gray-600 font-medium mt-2 flex items-center gap-2">
            <span>Gestiona tus aplicaciones empresariales</span>
            <span className="text-gray-400">•</span>
            <span className="tabular-nums">{currentTime.toLocaleDateString()}</span>
            <span className="tabular-nums font-bold text-green-600">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Enhanced Search */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Buscar aplicaciones y funciones..."
              className="w-80 pl-12 pr-6 py-4 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all duration-300 text-gray-700 placeholder-gray-500 group-hover:bg-white/40"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Enhanced Notifications */}
          <NotificationDropdown
            notifications={notifications}
            showNotifications={showNotifications}
            unreadCount={unreadCount}
            onToggleNotifications={() => setShowNotifications(!showNotifications)}
            onMarkAsRead={onMarkNotificationAsRead}
            isMobile={false}
          />

          {/* Enhanced User Profile */}
          <div className="flex items-center gap-4 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 px-5 py-3 hover:bg-white/40 transition-all duration-300 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <div className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                Administrador
              </div>
              <div className="text-sm text-gray-600 font-medium">Sistema en línea</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 