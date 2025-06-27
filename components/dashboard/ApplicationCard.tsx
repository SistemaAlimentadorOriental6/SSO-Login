"use client"

import { cn } from "@/lib/utils"
import type { Application } from "@/types/dashboard"

interface ApplicationCardProps {
  app: Application
  onClick: (appName: string) => void
  index: number
  isFavorite: boolean
  onToggleFavorite: (appId: string) => void
}

export function ApplicationCard({ app, onClick, index, isFavorite, onToggleFavorite }: ApplicationCardProps) {
  return (
    <div
      className="group relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden animate-in slide-in-from-bottom-4 duration-1000"
      onClick={() => onClick(app.name)}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500",
        `bg-gradient-to-br ${app.gradient}`
      )}></div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl"></div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon and Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* App Icon */}
            <div className={cn(
              "relative w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500",
              `bg-gradient-to-br ${app.gradient}`
            )}>
              <div className="w-8 h-8">
                {app.icon}
              </div>
              {app.pulse && (
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
              )}
              {/* Glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-md",
                `bg-gradient-to-br ${app.gradient}`
              )}></div>
            </div>

            {/* App Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors duration-300">
                {app.name}
              </h3>
              <div className="flex items-center gap-2">
                {/* Status Badge */}
                {app.status === "maintenance" ? (
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                    Mantenimiento
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Activo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(app.id)
            }}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300 ${
              isFavorite
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow-500/30"
                : "bg-white/80 text-gray-400 hover:text-yellow-500 border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {app.description}
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600 font-semibold group-hover:gap-3 transition-all duration-300">
            <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
              Abrir Aplicación
            </span>
            <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:translate-x-2 group-hover:scale-110 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    </div>
  )
}
