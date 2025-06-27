"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { NavigationItem } from "@/types/dashboard"

interface DesktopSidebarProps {
  navigationItems: NavigationItem[]
  onLogout: () => void
  onConfiguration?: () => void
  onHelp?: () => void
}

export function DesktopSidebar({ navigationItems, onLogout, onConfiguration, onHelp }: DesktopSidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Configuración y Ayuda como elementos adicionales
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
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:flex lg:flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50 backdrop-blur-xl border-r border-green-100 shadow-2xl z-40 relative overflow-hidden w-80">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl -translate-x-32 -translate-y-32 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl translate-x-24 translate-y-24 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-green-100/15 to-emerald-100/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Sidebar Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* === HEADER SECTION === */}
        <header className="p-8 border-b border-green-100">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <img
                src="/LOGO.webp"
                alt="Logo SAO6"
                className="w-20 h-20 object-contain rounded-2xl shadow-2xl border border-green-100 mx-auto"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #10b981 80%)' }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">SAO6</h1>
            </div>
          </div>
        </header>

        {/* === NAVIGATION SECTION === */}
        <nav className="flex-1 p-8 overflow-y-auto">
          {/* Navigation Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h3 className="text-lg font-bold text-gray-900">Panel Principal</h3>
        </div>

          {/* Navigation Items */}
          <div className="space-y-4 mb-8">
        {navigationItems.map((item, index) => (
          <button
            key={item.name}
            onClick={item.onClick}
                onMouseEnter={() => setActiveSection(item.name)}
                onMouseLeave={() => setActiveSection(null)}
            className={cn(
                  "flex items-center w-full px-6 py-5 rounded-3xl font-semibold transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden animate-in slide-in-from-left-4 duration-1000 group",
              item.active
                    ? "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white shadow-2xl shadow-green-500/20"
                    : "bg-white/80 backdrop-blur-xl border border-green-100 shadow-xl text-gray-700 hover:shadow-2xl hover:border-green-200",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Floating decorative elements */}
                {!item.active && (
                  <>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 rounded-xl opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-emerald-100 rounded-lg opacity-30 group-hover:opacity-70 group-hover:-rotate-12 transition-all duration-500"></div>
                  </>
                )}

                <div className="group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <span className="ml-4 group-hover:translate-x-1 transition-transform duration-300 flex-1 text-left">
              {item.name}
            </span>

            {item.active && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="text-xs bg-white/20 px-2 py-1 rounded-lg font-medium">Activo</div>
                  </div>
                )}

                {activeSection === item.name && !item.active && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
        </div>

          {/* === SYSTEM TOOLS SECTION === */}
          <div className="border-t border-green-100 pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-900">Herramientas</h3>
            </div>

            <div className="space-y-4">
              {systemItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  onMouseEnter={() => setActiveSection(item.name)}
                  onMouseLeave={() => setActiveSection(null)}
                  className="flex items-center w-full px-4 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] text-gray-700 relative overflow-hidden group"
                  style={{ animationDelay: `${(index + navigationItems.length) * 100}ms` }}
                >
                  {/* Floating decorative elements - más pequeños */}
                  <div className="absolute top-1 right-1 w-3 h-3 bg-green-100 rounded-lg opacity-40 group-hover:opacity-80 group-hover:rotate-6 transition-all duration-300"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-emerald-100 rounded opacity-20 group-hover:opacity-50 group-hover:-rotate-6 transition-all duration-300"></div>

                  {/* Icon - más compacto */}
                  <div className="relative w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content - mejor espaciado */}
                  <div className="flex-1 ml-3 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5 leading-tight">{item.description}</div>
                  </div>

                  {activeSection === item.name && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* === LOGOUT SECTION === */}
        <footer className="p-8 border-t border-green-100">
          <button
            onClick={onLogout}
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
        </footer>
        </div>
    </aside>
  )
} 
