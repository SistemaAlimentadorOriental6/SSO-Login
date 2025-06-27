import { cn } from "@/lib/utils"
import { ViewState } from "../types"
import { LoginForm } from "./LoginForm"
import { ForgotPasswordForm } from "./ForgotPasswordForm"

interface FormContainerProps {
  currentView: ViewState
  onLoginSuccess: () => void
  onForgotSuccess: () => void
  onSwitchToForgot: () => void
  onSwitchToLogin: () => void
}

export const FormContainer = ({
  currentView,
  onLoginSuccess,
  onForgotSuccess,
  onSwitchToForgot,
  onSwitchToLogin,
}: FormContainerProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Login Form */}
      <div
        className={cn(
          "transition-all duration-700 ease-in-out",
          currentView === "login"
            ? "transform translate-x-0 opacity-100"
            : "transform -translate-x-full opacity-0 absolute inset-0 pointer-events-none",
        )}
      >
        <LoginForm 
          onSuccess={onLoginSuccess} 
          onForgotPassword={onSwitchToForgot}
        />
      </div>

      {/* Forgot Password Form */}
      <div
        className={cn(
          "transition-all duration-700 ease-in-out",
          currentView === "forgot-password"
            ? "transform translate-x-0 opacity-100"
            : "transform translate-x-full opacity-0 absolute inset-0 pointer-events-none",
        )}
      >
        <ForgotPasswordForm onSuccess={onForgotSuccess} onBack={onSwitchToLogin} />
      </div>
    </div>
  )
} 