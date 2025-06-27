import { cn } from "@/lib/utils"
import { ViewState } from "../types"

interface FormHeaderProps {
  currentView: ViewState
}

export const FormHeader = ({ currentView }: FormHeaderProps) => {
  return (
    <div className="text-center mb-3 lg:mb-6">
      <div className="relative overflow-hidden">
        {/* Login Header */}
        <div
          className={cn(
            "transition-all duration-700 ease-in-out",
            currentView === "login"
              ? "transform translate-x-0 opacity-100"
              : "transform -translate-x-full opacity-0 absolute inset-0",
          )}
        >
          <h2 className="text-lg sm:text-xl lg:text-3xl font-black text-gray-900 mb-1 lg:mb-2 bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 bg-clip-text text-transparent">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium">
            Accede a tu panel de control
          </p>
        </div>

        {/* Forgot Password Header */}
        <div
          className={cn(
            "transition-all duration-700 ease-in-out",
            currentView === "forgot-password"
              ? "transform translate-x-0 opacity-100"
              : "transform translate-x-full opacity-0 absolute inset-0",
          )}
        >
          <h2 className="text-lg sm:text-xl lg:text-3xl font-black text-gray-900 mb-1 lg:mb-2 bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 bg-clip-text text-transparent">
            Recuperar Contraseña
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium">
            Te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>
      </div>
    </div>
  )
} 