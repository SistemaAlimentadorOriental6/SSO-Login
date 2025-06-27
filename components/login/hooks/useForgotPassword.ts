import { useState } from "react"
import { FormErrors } from "../types"

export const useForgotPassword = () => {
  const [forgotEmail, setForgotEmail] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForgotEmail = () => {
    if (!forgotEmail) {
      setErrors({ forgotUsername: "El nombre de usuario es requerido" })
      return false
    } else if (forgotEmail.length < 3) {
      setErrors({ forgotUsername: "El usuario debe tener al menos 3 caracteres" })
      return false
    }
    setErrors({})
    return true
  }

  const handleForgotEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value)
    if (errors.forgotUsername) {
      setErrors((prev) => ({ ...prev, forgotUsername: undefined }))
    }
  }

  const handleForgotPassword = async (e: React.FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    if (!validateForgotEmail()) {
      return false
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    onSuccess()

    setTimeout(() => {
      setForgotEmail("")
    }, 1500)

    return true
  }

  const resetForm = () => {
    setForgotEmail("")
    setErrors({})
  }

  return {
    forgotEmail,
    errors,
    isLoading,
    handleForgotEmailChange,
    handleForgotPassword,
    resetForm,
  }
} 