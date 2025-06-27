"use client"

import { useState } from "react"
import { ViewState } from "./types"
import { useToast } from "./hooks/useToast"
import { ToastContainer } from "./components/ToastContainer"
import { MobileLayout } from "./components/MobileLayout"
import { DesktopLayout } from "./components/DesktopLayout"

export default function EnterpriseLogin() {
  const [currentView, setCurrentView] = useState<ViewState>("login")
  const { toasts, addToast } = useToast()

  const handleLoginSuccess = () => {
    addToast(`¡Bienvenido de vuelta! Acceso autorizado`, "success")
  }

  const handleForgotSuccess = () => {
    addToast(`Enlace de recuperación enviado`, "success")
  }

  const switchToForgotPassword = () => {
    setCurrentView("forgot-password")
  }

  const switchToLogin = () => {
    setCurrentView("login")
  }

  const showPrivacy = () => {
    addToast("Abriendo Política de Privacidad...", "info")
  }

  const showTerms = () => {
    addToast("Abriendo Términos de Servicio...", "info")
  }

  const showSecurity = () => {
    addToast("Accediendo al Centro de Seguridad...", "info")
  }

  const showCookies = () => {
    addToast("Consultando Política de Cookies...", "info")
  }

  return (
    <>
      <ToastContainer toasts={toasts} />
      
      <MobileLayout
        currentView={currentView}
        onLoginSuccess={handleLoginSuccess}
        onForgotSuccess={handleForgotSuccess}
        onSwitchToForgot={switchToForgotPassword}
        onSwitchToLogin={switchToLogin}
        onPrivacy={showPrivacy}
        onTerms={showTerms}
        onSecurity={showSecurity}
        onCookies={showCookies}
      />

      <DesktopLayout
        currentView={currentView}
        onLoginSuccess={handleLoginSuccess}
        onForgotSuccess={handleForgotSuccess}
        onSwitchToForgot={switchToForgotPassword}
        onSwitchToLogin={switchToLogin}
        onPrivacy={showPrivacy}
        onTerms={showTerms}
        onSecurity={showSecurity}
        onCookies={showCookies}
      />
    </>
  )
} 