import React from "react"
import { cn } from "@/lib/utils"
import { Notification } from "./types"

interface NotificationDropdownProps {
  notifications: Notification[]
  showNotifications: boolean
  unreadCount: number
  onToggleNotifications: () => void
  onMarkAsRead: (id: number) => void
  isMobile?: boolean
}

export function NotificationDropdown({
  notifications,
  showNotifications,
  unreadCount,
  onToggleNotifications,
  onMarkAsRead,
  isMobile = false,
}: NotificationDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggleNotifications}
        className={cn(
          "relative p-3 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 hover:scale-110 group",
          isMobile ? "p-3" : "p-4"
        )}
      >
        <svg
          className={cn(
            "text-white group-hover:text-gray-900 transition-colors duration-300",
            isMobile ? "w-5 h-5" : "w-6 h-6 text-gray-700"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5"
          />
        </svg>
        {unreadCount > 0 && (
          <div className={cn(
            "absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce",
            isMobile ? "w-6 h-6" : "w-7 h-7"
          )}>
            <span className="text-xs text-white font-bold">{unreadCount}</span>
          </div>
        )}
      </button>

      {showNotifications && (
        <div className={cn(
          "absolute right-0 top-full mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 z-50 max-h-96 overflow-hidden animate-in slide-in-from-top-4 duration-500",
          isMobile ? "w-80" : "w-96"
        )}>
          <div className="p-6 border-b border-gray-100/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <h3 className={cn(
              "font-black text-gray-900",
              isMobile ? "text-lg" : "text-xl"
            )}>
              {isMobile ? "Notificaciones" : "Centro de Notificaciones"}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {unreadCount} mensajes {isMobile ? "sin leer" : "pendientes"}
            </p>
          </div>
          <div className="divide-y divide-gray-100/50 max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={cn(
                  "hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-blue-50/50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]",
                  !notification.read && "bg-gradient-to-r from-blue-50/30 to-indigo-50/30",
                  isMobile ? "p-5" : "p-6"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "rounded-full mt-2 shadow-lg relative",
                      notification.type === "success" && "bg-gradient-to-r from-green-500 to-emerald-500",
                      notification.type === "warning" && "bg-gradient-to-r from-yellow-500 to-orange-500",
                      notification.type === "error" && "bg-gradient-to-r from-red-500 to-pink-500",
                      notification.type === "info" && "bg-gradient-to-r from-blue-500 to-indigo-500",
                      isMobile ? "w-3 h-3" : "w-4 h-4"
                    )}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className={cn(
                      "font-bold text-gray-900",
                      isMobile ? "text-sm" : "text-base"
                    )}>
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className={cn(
                      "text-gray-400 font-medium mt-2",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 