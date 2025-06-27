import { cn } from "@/lib/utils"
import { useForgotPassword } from "../hooks/useForgotPassword"

interface ForgotPasswordFormProps {
  onSuccess: () => void
  onBack: () => void
}

export const ForgotPasswordForm = ({ onSuccess, onBack }: ForgotPasswordFormProps) => {
  const {
    forgotEmail,
    errors,
    isLoading,
    handleForgotEmailChange,
    handleForgotPassword,
  } = useForgotPassword()

  const onSubmit = (e: React.FormEvent) => {
    handleForgotPassword(e, onSuccess)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 mb-6">
      <div className="space-y-2">
        <label htmlFor="forgot-username" className="text-sm font-bold text-gray-700">
          Nombre de Usuario
        </label>
        <input
          id="forgot-username"
          type="text"
          value={forgotEmail}
          onChange={handleForgotEmailChange}
          placeholder="Ingresa tu nombre de usuario"
          required
          className={cn(
            "w-full py-3 px-4 border-2 border-gray-200 rounded-2xl text-sm bg-white transition-all duration-300 text-gray-900 font-medium focus:outline-none focus:border-green-400 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.12)] hover:border-green-300",
            errors.forgotUsername &&
              "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]",
          )}
        />
        {errors.forgotUsername && (
          <span className="text-red-500 text-sm font-semibold animate-in slide-in-from-left-2 duration-300">
            {errors.forgotUsername}
          </span>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-green-600 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-green-800 font-semibold text-sm mb-1">Instrucciones de recuperación</h4>
            <p className="text-green-700 text-sm">
              Te enviaremos un enlace seguro a tu correo electrónico para que puedas crear una nueva
              contraseña.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-2xl text-sm font-bold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5"
        >
          Volver al Login
        </button>
        <button
          type="submit"
          className={cn(
            "flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white border-none py-3 px-4 rounded-2xl text-sm font-extrabold cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg",
            "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,197,94,0.4)] hover:from-green-500 hover:to-green-600",
            isLoading && "opacity-70 cursor-not-allowed transform-none",
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm">Enviando...</span>
            </div>
          ) : (
            <span>Enviar Enlace</span>
          )}
        </button>
      </div>
    </form>
  )
} 