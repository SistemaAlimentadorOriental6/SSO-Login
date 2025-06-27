import { ViewState } from "../types"
import { FormHeader } from "./FormHeader"
import { FormContainer } from "./FormContainer"
import Image from "next/image"

interface MobileLayoutProps {
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

export const MobileLayout = ({
  currentView,
  onLoginSuccess,
  onForgotSuccess,
  onSwitchToForgot,
  onSwitchToLogin,
  onPrivacy,
  onTerms,
  onSecurity,
  onCookies,
}: MobileLayoutProps) => {
  return (
    <div className="lg:hidden min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-500 flex flex-col justify-center relative overflow-hidden">
      {/* Contenedor principal centrado */}
      <div className="flex flex-col justify-center items-center min-h-screen py-8 px-4">
        
        {/* Header móvil compacto */}
        <div className="text-white text-center mb-6 flex-shrink-0">
          {/* Logo y marca */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Image 
              src="/LOGO.webp" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="drop-shadow-lg"
            />
            <div className="text-xl font-black text-white tracking-wider drop-shadow-lg">
              SAO6
            </div>
          </div>

          {/* Título compacto */}
          <div>
            <h1 className="text-xl font-black mb-1 leading-tight text-white drop-shadow-lg">
              Bienvenido de Vuelta
            </h1>
            <p className="text-xs font-medium opacity-90 text-green-100 drop-shadow-md">
              Accede a tu panel de control
            </p>
          </div>
        </div>

        {/* Contenedor del formulario centrado */}
        <div className="w-full max-w-sm mx-auto flex-shrink-0">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-2xl"></div>

            {/* Contenido del formulario */}
            <div className="relative z-10 p-6">
              {/* Formulario principal */}
              <div className="flex-shrink-0">
                <FormHeader currentView={currentView} />
                <FormContainer
                  currentView={currentView}
                  onLoginSuccess={onLoginSuccess}
                  onForgotSuccess={onForgotSuccess}
                  onSwitchToForgot={onSwitchToForgot}
                  onSwitchToLogin={onSwitchToLogin}
                />
              </div>
              
              {/* Footer interno - solo copyright */}
              <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-100/50">
                <p className="text-xs text-gray-400 font-medium text-center">
                  © 2025 SAO6. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-6 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-24 left-6 w-24 h-24 bg-emerald-200/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
} 