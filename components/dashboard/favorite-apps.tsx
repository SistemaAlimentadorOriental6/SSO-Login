"use client"

import type { Application } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface FavoriteAppsProps {
  apps: Application[]
  onAppClick: (appName: string) => void
  onToggleFavorite: (appId: string) => void
}

export function FavoriteApps({ apps, onAppClick, onToggleFavorite }: FavoriteAppsProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Aplicaciones Favoritas</h2>
          <p className="text-gray-600 text-sm">Acceso rápido a tus herramientas más utilizadas</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200">
          {apps.length} favorita{apps.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app, index) => (
          <div
            key={app.id}
            className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer overflow-hidden animate-in slide-in-from-left-4 duration-1000"
            onClick={() => onAppClick(app.name)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background */}
            <div className={cn(
              "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300",
              `bg-gradient-to-br ${app.gradient}`
            )}></div>

            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center gap-4">
              {/* App Icon */}
              <div className={cn(
                "relative w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-all duration-300",
                `bg-gradient-to-br ${app.gradient}`
              )}>
                <div className="w-6 h-6">
                  {app.icon}
                </div>
                {app.pulse && (
                  <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse"></div>
                )}
              </div>

              {/* App Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors duration-300 truncate">
                  {app.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {/* Status Badge */}
                  {app.status === "maintenance" ? (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
                      Mantenimiento
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                      Activo
                    </div>
                  )}
                </div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(app.id)
                }}
                className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300 text-white"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
          </div>
        ))}
      </div>
    </section>
  )
}
