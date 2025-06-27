"use client"

import { useState } from "react"
import { WelcomeSection } from "@/components/dashboard/WelcomeSection"
import { ApplicationCard } from "@/components/dashboard/ApplicationCard"
import { FavoriteApps } from "@/components/dashboard/favorite-apps"
import { ToastContainer } from "@/components/dashboard/ToastContainer"
import { SearchBar } from "@/components/dashboard/search-bar"
import { initialNotifications } from "@/data/dashboard-data"
import { useApplications } from "@/hooks/useApplications"
import { useAuth } from "@/hooks/useAuth"
import type { Toast } from "@/types/dashboard"
import { MobileSidebar } from "@/components/dashboard/MobileSidebar"
import { DesktopSidebar } from "@/components/dashboard/DesktopSidebar"
import { useRouter, useSearchParams } from "next/navigation"
import { ConfigurationSection } from "@/components/Configuracion/configuration-section"
import { HelpSection } from "@/components/Help/help-section"

export default function Dashboard() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [notifications] = useState(initialNotifications)
  const [favorites, setFavorites] = useState<string[]>(["carrotaller", "inspecciones"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") || "dashboard"
  const [activeTab, setActiveTab] = useState(tabParam)

  // Hook para obtener aplicaciones del backend
  const { applications, loading, error, openApplication } = useApplications()
  
  // Hook para autenticación
  const { logout } = useAuth()

  const handleAppClick = (appName: string) => {
    const app = applications.find((a: any) => a.name === appName)
    if (app) {
      openApplication(app.id, app.url)
    }
    
    const newToast: Toast = {
      id: Date.now(),
      message: `Abriendo ${appName}...`,
      type: "info",
    }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
    }, 3000)
  }

  const toggleFavorite = (appId: string) => {
    setFavorites((prev) => (prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]))
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const favoriteApps = applications.filter((app: any) => favorites.includes(app.id))

  const filteredApps = applications.filter((app: any) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "active" && app.status === "active") ||
      (selectedCategory === "maintenance" && app.status === "maintenance")
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "Todas", count: applications.length },
    { id: "active", name: "Activas", count: applications.filter((app: any) => app.status === "active").length },
    {
      id: "maintenance",
      name: "Mantenimiento",
      count: applications.filter((app: any) => app.status === "maintenance").length,
    },
  ]

  const setTab = (tab: string) => {
    setActiveTab(tab)
    const params = new URLSearchParams(window.location.search)
    params.set("tab", tab)
    router.push(`?${params.toString()}`)
  }

  const navigationItems = [
    {
      name: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
        </svg>
      ),
      active: activeTab === "dashboard",
      onClick: () => setTab("dashboard"),
    },
  ]

  // Mostrar loading mientras se cargan las aplicaciones
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-600 font-medium text-lg">Cargando aplicaciones...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si hay problemas de conexión
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Error de Conexión</h2>
          <p className="text-red-600 mb-4">No se pudieron cargar las aplicaciones. Verifica tu conexión.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/50 relative overflow-hidden">
      {/* Sidebars */}
        <MobileSidebar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        currentTime={new Date()}
          notifications={notifications}
        showNotifications={false}
        setShowNotifications={() => {}}
        unreadCount={notifications.filter((n) => !n.read).length}
        onMarkNotificationAsRead={() => {}}
          navigationItems={navigationItems}
          applications={applications}
          onAppClick={handleAppClick}
        onLogout={logout}
        onConfiguration={() => setTab("configuracion")}
        onHelp={() => setTab("ayuda")}
        />
        <DesktopSidebar
          navigationItems={navigationItems}
        onLogout={logout}
        onConfiguration={() => setTab("configuracion")}
        onHelp={() => setTab("ayuda")}
      />

      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl -translate-x-64 -translate-y-64 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl translate-x-64 translate-y-64 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-green-100/15 to-emerald-100/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        {/* Additional subtle patterns */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-emerald-300/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-6 lg:py-8 lg:ml-80">

        {/* Renderizado dinámico según el tab */}
        {activeTab === "dashboard" && (
          <>
            <WelcomeSection />
            {favoriteApps.length > 0 && (
              <FavoriteApps apps={favoriteApps} onAppClick={handleAppClick} onToggleFavorite={toggleFavorite} />
            )}
            <section className="mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 mb-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Aplicaciones</h2>
                  <p className="text-gray-600">Accede a todas tus herramientas empresariales</p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                  {/* Category Filter */}
                  <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-lg border border-green-100">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                            : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {category.name}
                        <span className="ml-2 text-xs opacity-75">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            {/* Applications Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredApps.map((app: any, index: number) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onClick={handleAppClick}
                  index={index}
                    isFavorite={favorites.includes(app.id)}
                    onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

              {filteredApps.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 text-gray-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron aplicaciones</h3>
                  <p className="text-gray-600">Intenta con otros términos de búsqueda o filtros</p>
          </div>
              )}
            </section>
          </>
        )}
        {activeTab === "configuracion" && <ConfigurationSection />}
        {activeTab === "ayuda" && <HelpSection />}
      </div>

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  )
}
