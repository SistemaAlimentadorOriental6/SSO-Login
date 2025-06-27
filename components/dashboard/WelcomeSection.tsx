export function WelcomeSection() {
  return (
    <div className="mb-12 relative">
      <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-3xl p-8 lg:p-12 text-white overflow-hidden shadow-2xl">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0">
          {/* Glassmorphism circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Welcome Text */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-in slide-in-from-left-4 duration-1000">
                  ¡Bienvenido de vuelta! 👋
                </h1>
                <p className="text-green-100 text-xl lg:text-2xl font-medium animate-in slide-in-from-left-4 duration-1000 delay-200">
                  Gestiona tus operaciones empresariales desde un solo lugar
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-left-4 duration-1000 delay-400">
                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/25 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-green-100 font-medium">Última conexión</div>
                      <div className="text-lg font-bold">Hoy, 9:30 AM</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/25 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="text-sm text-green-100 font-medium">Estado del sistema</div>
                      <div className="text-lg font-bold">Operativo</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/25 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-green-100 font-medium">Aplicaciones</div>
                      <div className="text-lg font-bold">3 Activas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  )
}
