"use client"
import { useState } from "react"

export function HelpSection() {
  const [activeTab, setActiveTab] = useState("request")
  const [requestForm, setRequestForm] = useState({
    type: "access",
    application: "",
    description: "",
    priority: "medium"
  })
  const [caseForm, setCaseForm] = useState({
    title: "",
    description: "",
    category: "access",
    priority: "medium"
  })

  const applications = [
    "Carrotaller",
    "Inspecciones", 
    "Control de Activos",
    "Panel de Reportes",
    "Configuración Avanzada"
  ]

  const supportContacts = [
    {
      name: "Soporte Técnico",
      role: "Problemas técnicos y errores",
      email: "soporte@empresa.com",
      phone: "+1 (555) 123-4567",
      hours: "Lun-Vie 8:00-18:00"
    },
    {
      name: "Administrador de Sistema",
      role: "Permisos y accesos",
      email: "admin@empresa.com", 
      phone: "+1 (555) 123-4568",
      hours: "Lun-Vie 9:00-17:00"
    }
  ]

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la solicitud
    alert("Solicitud enviada correctamente")
    setRequestForm({ type: "access", application: "", description: "", priority: "medium" })
  }

  const handleCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para registrar el caso
    alert("Caso registrado correctamente")
    setCaseForm({ title: "", description: "", category: "access", priority: "medium" })
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Centro de Ayuda</h1>
              <p className="text-gray-600 font-medium">Solicita soporte y registra casos de problemas</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-lg border border-green-100">
            <button
              onClick={() => setActiveTab("request")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "request"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              Solicitar Acceso
            </button>
            <button
              onClick={() => setActiveTab("case")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "case"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              Registrar Caso
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "contact"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              Contacto
            </button>
          </div>
        </header>

        {/* Request Access Tab */}
        {activeTab === "request" && (
          <section className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Habilitación</h2>
              <p className="text-gray-600 mb-8">Solicita acceso a aplicaciones o ventanas que necesites</p>
              
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Solicitud</label>
                    <select
                      value={requestForm.type}
                      onChange={(e) => setRequestForm({...requestForm, type: e.target.value})}
                      className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="access">Acceso a Aplicación</option>
                      <option value="permission">Permisos Adicionales</option>
                      <option value="feature">Nueva Funcionalidad</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aplicación</label>
                    <select
                      value={requestForm.application}
                      onChange={(e) => setRequestForm({...requestForm, application: e.target.value})}
                      className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar aplicación</option>
                      {applications.map(app => (
                        <option key={app} value={app}>{app}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={requestForm.description}
                    onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Describe detalladamente lo que necesitas..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                  <div className="flex gap-4">
                    {[
                      { value: "low", label: "Baja", color: "bg-blue-100 text-blue-800" },
                      { value: "medium", label: "Media", color: "bg-yellow-100 text-yellow-800" },
                      { value: "high", label: "Alta", color: "bg-red-100 text-red-800" }
                    ].map(priority => (
                      <label key={priority.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={requestForm.priority === priority.value}
                          onChange={(e) => setRequestForm({...requestForm, priority: e.target.value})}
                          className="sr-only"
                        />
                        <div className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 ${
                          requestForm.priority === priority.value 
                            ? priority.color + " border-current" 
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}>
                          {priority.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Register Case Tab */}
        {activeTab === "case" && (
          <section className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Registrar Caso</h2>
              <p className="text-gray-600 mb-8">Reporta problemas de acceso o funcionamiento</p>
              
              <form onSubmit={handleCaseSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título del Caso</label>
                  <input
                    type="text"
                    value={caseForm.title}
                    onChange={(e) => setCaseForm({...caseForm, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Resumen breve del problema"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <select
                      value={caseForm.category}
                      onChange={(e) => setCaseForm({...caseForm, category: e.target.value})}
                      className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="access">Problema de Acceso</option>
                      <option value="functionality">Error de Funcionalidad</option>
                      <option value="performance">Problema de Rendimiento</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                    <select
                      value={caseForm.priority}
                      onChange={(e) => setCaseForm({...caseForm, priority: e.target.value})}
                      className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="critical">Crítica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción Detallada</label>
                  <textarea
                    value={caseForm.description}
                    onChange={(e) => setCaseForm({...caseForm, description: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-green-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Describe el problema paso a paso, incluyendo mensajes de error si los hay..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Registrar Caso
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {supportContacts.map((contact, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-green-100 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                      <p className="text-gray-600">{contact.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{contact.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">{contact.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{contact.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
