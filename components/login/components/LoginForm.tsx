import { cn } from "@/lib/utils"
import { useLoginForm } from "../hooks/useLoginForm"

interface LoginFormProps {
  onSuccess: () => void
  onForgotPassword?: () => void
}

export const LoginForm = ({ onSuccess, onForgotPassword }: LoginFormProps) => {
  const {
    form,
    errors,
    showPassword,
    isLoading,
    rememberMe,
    loadingStep,
    setShowPassword,
    setRememberMe,
    handleInputChange,
    handleLogin,
  } = useLoginForm()

  const onSubmit = (e: React.FormEvent) => {
    handleLogin(e, onSuccess)
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <form onSubmit={onSubmit} className="space-y-4 lg:space-y-4">
        <div className="space-y-1 lg:space-y-2">
          <label htmlFor="username" className="text-xs lg:text-sm font-bold text-gray-700">
            Usuario del Sistema
          </label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={handleInputChange("username")}
            placeholder="Tu nombre de usuario"
            required
            className={cn(
              "w-full py-2.5 lg:py-3 px-3 lg:px-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl text-sm bg-white transition-all duration-300 text-gray-900 font-medium focus:outline-none focus:border-green-400 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.12)] hover:border-green-300",
              errors.username &&
                "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]",
            )}
          />
          {errors.username && (
            <span className="text-red-500 text-xs lg:text-sm font-semibold animate-in slide-in-from-left-2 duration-300">
              {errors.username}
            </span>
          )}
        </div>

        <div className="space-y-1 lg:space-y-2">
          <label htmlFor="password" className="text-xs lg:text-sm font-bold text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleInputChange("password")}
              placeholder="Ingresa tu contraseña segura"
              required
              className={cn(
                "w-full py-2.5 lg:py-3 px-3 lg:px-4 pr-10 lg:pr-12 border-2 border-gray-200 rounded-xl lg:rounded-2xl text-sm bg-white transition-all duration-300 text-gray-900 font-medium focus:outline-none focus:border-green-400 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.12)] hover:border-green-300",
                errors.password &&
                  "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]",
              )}
            />
            <button
              type="button"
              className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1 lg:p-2 rounded-lg transition-all duration-300 hover:text-gray-600 hover:bg-green-50 hover:scale-110"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 lg:w-[18px] lg:h-[18px]"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 lg:w-[18px] lg:h-[18px]"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs lg:text-sm font-semibold animate-in slide-in-from-left-2 duration-300">
              {errors.password}
            </span>
          )}
        </div>

        {/* Toggle switch mejorado - alineado a la izquierda */}
        <div className="py-2">
          <label className="flex items-start gap-3 text-xs lg:text-sm text-gray-700 cursor-pointer select-none group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              {/* Toggle Switch mejorado */}
              <div
                className={cn(
                  "w-10 h-5 lg:w-11 lg:h-6 rounded-full border-2 transition-all duration-300 relative shadow-sm",
                  rememberMe 
                    ? "bg-gradient-to-r from-green-400 to-green-500 border-green-500 shadow-green-200/50" 
                    : "bg-gray-100 border-gray-300 group-hover:bg-gray-200 group-hover:border-gray-400 shadow-gray-200/50"
                )}
              >
                {/* Switch Circle mejorado */}
                <div
                  className={cn(
                    "absolute top-0 w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full shadow-md transition-all duration-300 transform border border-gray-200",
                    rememberMe 
                      ? "translate-x-5 lg:translate-x-5 shadow-lg border-green-200" 
                      : "translate-x-0 shadow-sm border-gray-300"
                  )}
                >
                  {/* Icono dentro del círculo cuando está activo */}
                  {rememberMe && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-green-600 animate-in zoom-in-50 duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                Mantener sesión iniciada
              </span>
              <span className="text-xs text-gray-500 mt-0.5 font-normal">
                No cerrar sesión automáticamente
              </span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className={cn(
            "w-full bg-gradient-to-r from-green-400 to-green-500 text-white border-none py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl text-sm font-extrabold cursor-pointer transition-all duration-300 flex items-center justify-center min-h-[48px] lg:min-h-[56px] mt-4 lg:mt-6 shadow-lg",
            "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,197,94,0.4)] hover:from-green-500 hover:to-green-600",
            isLoading && "opacity-70 cursor-not-allowed transform-none",
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-xs lg:text-sm animate-pulse">{loadingStep}</span>
            </div>
          ) : (
            <span className="flex items-center gap-1 lg:gap-2">
              Acceder al Panel
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
        </button>
      </form>

      {/* Forgot Password Link */}
      {onForgotPassword && (
        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-green-600 hover:text-green-700 text-xs lg:text-sm font-bold transition-all duration-300 hover:scale-105"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      )}
    </div>
  )
} 