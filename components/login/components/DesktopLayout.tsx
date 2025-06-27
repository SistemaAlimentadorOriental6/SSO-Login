import { ViewState } from "../types"
import { FormHeader } from "./FormHeader"
import { FormContainer } from "./FormContainer"
import Image from "next/image"

interface DesktopLayoutProps {
  currentView: ViewState
  onLoginSuccess: () => void
  onForgotSuccess: () => void
  onSwitchToForgot: () => void
  onSwitchToLogin: () => void
  onPrivacy: () => void
  onTerms: () => void
  onSecurity: () => void
  onCookies: () => void
}

export const DesktopLayout = ({
  currentView,
  onLoginSuccess,
  onForgotSuccess,
  onSwitchToForgot,
  onSwitchToLogin,
  onPrivacy,
  onTerms,
  onSecurity,
  onCookies,
}: DesktopLayoutProps) => {
  return (
    <div className="hidden lg:flex min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-500 font-sans relative">
      {/* Contenedor centrado único */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        
        {/* Logo y marca en la parte superior */}
        <div className="flex items-center gap-4 mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-center">
            <Image 
              src="/LOGO.webp" 
              alt="Logo" 
              width={72} 
              height={72} 
              className="drop-shadow-lg"
            />
          </div>
          <div className="text-5xl font-black text-white tracking-wider drop-shadow-lg">
            SAO6
          </div>
        </div>

        {/* Título principal */}
        <div className="text-center mb-12 text-white animate-in fade-in-0 slide-in-from-top-4 duration-1000 delay-200">
          <h1 className="text-6xl xl:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Bienvenido de Vuelta
          </h1>
          <p className="text-2xl xl:text-3xl font-medium opacity-95 text-green-100 drop-shadow-md">
            Accede a tu panel de control
          </p>
        </div>

        {/* Formulario centrado */}
        <div className="w-full max-w-xl xl:max-w-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-400">
          <div className="bg-white/95 backdrop-blur-3xl rounded-3xl p-10 xl:p-12 shadow-2xl border border-white/60 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-emerald-50/40 rounded-3xl"></div>
            
            {/* Efectos de bordes luminosos */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-200/20 via-transparent to-emerald-200/20 blur-xl"></div>

            <div className="relative z-10">
              <FormHeader currentView={currentView} />
              <FormContainer
                currentView={currentView}
                onLoginSuccess={onLoginSuccess}
                onForgotSuccess={onForgotSuccess}
                onSwitchToForgot={onSwitchToForgot}
                onSwitchToLogin={onSwitchToLogin}
              />
            </div>
          </div>
        </div>

        {/* Footer simplificado */}
        <div className="mt-12 text-center text-white/90 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-600 max-w-2xl">
          <p className="text-sm font-medium opacity-80">
            © 2025 SAO6. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-200/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
} 