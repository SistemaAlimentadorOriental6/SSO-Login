"use client"
import { useState } from "react"

export function ConfigurationSection() {
  const [activeTab, setActiveTab] = useState("validations")
  const [testResults, setTestResults] = useState<Record<string, "success" | "error" | "warning" | null>>({})

  const pages = [
    { id: "dashboard", name: "Panel Principal", url: "/dashboard" },
    { id: "carrotaller", name: "Carrotaller", url: "/carrotaller" },
    { id: "inspecciones", name: "Inspecciones", url: "/inspecciones" },
    { id: "activos", name: "Control de Activos", url: "/activos" },
  ]

  const permissions = [
    { id: "read", name: "Lectura", description: "Ver información y datos", status: "granted" },
    { id: "write", name: "Escritura", description: "Crear y modificar registros", status: "granted" },
    { id: "delete", name: "Eliminación", description: "Eliminar registros", status: "restricted" },
    { id: "admin", name: "Administración", description: "Configuración del sistema", status: "denied" },
  ]

  const runValidation = (pageId: string) => {
    setTestResults(prev => ({ ...prev, [pageId]: null }))
    
    // Simular validación
    setTimeout(() => {
      const results = ["success", "error", "warning"] as const
      const randomResult = results[Math.floor(Math.random() * results.length)]
      setTestResults(prev => ({ ...prev, [pageId]: randomResult }))
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "granted": return "bg-green-100 text-green-800 border-green-200"
      case "restricted": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "denied": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getResultIcon = (result: string | null) => {
    if (result === null) return null
    
    switch (result) {
      case "success":
        return (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case "error":
        return (
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case "warning":
        return (
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl -translate-x-96 -translate-y-96 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl translate-x-96 translate-y-96 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 lg:py-8 max-w-7xl lg:ml-80">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
              <p className="text-gray-600 font-medium">Validaciones, permisos y configuraciones avanzadas</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-lg border border-green-100">
            <button
              onClick={() => setActiveTab("validations")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "validations"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              Validaciones
            </button>
            <button
              onClick={() => setActiveTab("permissions")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "permissions"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              Permisos
            </button>
          </div>
        </header>

        {/* Content */}
        {activeTab === "validations" && (
          <section className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Validación de Páginas</h2>
              <p className="text-gray-600 mb-8">Prueba la accesibilidad y funcionalidad de las páginas del sistema</p>
              
              <div className="grid gap-6">
                {pages.map((page) => (
                  <div key={page.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{page.name}</h3>
                          <p className="text-sm text-gray-600">{page.url}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {testResults[page.id] !== undefined && getResultIcon(testResults[page.id])}
                        
                        <button
                          onClick={() => runValidation(page.id)}
                          disabled={testResults[page.id] === null}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {testResults[page.id] === null ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Validando...
                            </>
                          ) : (
                            "Validar"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "permissions" && (
          <section className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Control de Permisos</h2>
              <p className="text-gray-600 mb-8">Revisa tus permisos actuales en el sistema</p>
              
              <div className="grid gap-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{permission.name}</h3>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(permission.status)}`}>
                        {permission.status === "granted" && "Concedido"}
                        {permission.status === "restricted" && "Restringido"}
                        {permission.status === "denied" && "Denegado"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
