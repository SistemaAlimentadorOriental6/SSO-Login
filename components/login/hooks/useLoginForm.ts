import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LoginForm, FormErrors } from "../types"
import { LOGIN_MUTATION, LoginResponse, LoginInput } from "@/lib/graphql/queries"

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loadingStep, setLoadingStep] = useState("")
  
  // GraphQL mutation para login
  const [loginMutation] = useMutation<LoginResponse, { input: LoginInput }>(LOGIN_MUTATION)

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {}

    if (!form.username) {
      newErrors.username = "El nombre de usuario es requerido"
    } else if (form.username.length < 3) {
      newErrors.username = "El usuario debe tener al menos 3 caracteres"
    }

    if (!form.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (form.password.length < 4) {
      newErrors.password = "La contraseña debe tener al menos 4 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: "username" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleLogin = async (e: React.FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    if (!validateForm()) {
      return false
    }

    setIsLoading(true)

    try {
      setLoadingStep("Verificando credenciales...")
      
      // Ejecutar la mutation de login
      const { data } = await loginMutation({
        variables: {
          input: {
            username: form.username,
            password: form.password,
          },
        },
      })

      if (data?.login) {
        setLoadingStep("Configurando sesión...")
        
        // Guardar token y datos del usuario
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', data.login.token)
          localStorage.setItem('user-data', JSON.stringify(data.login.user))
          
          if (rememberMe) {
            localStorage.setItem('remember-user', form.username)
          }
        }

        setLoadingStep("¡Acceso autorizado!")
        setIsLoading(false)
        setLoadingStep("")
        onSuccess()

        // Redirigir al dashboard
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)

        return true
      }
    } catch (error: any) {
      setIsLoading(false)
      setLoadingStep("")
      
      // Manejar errores específicos
      const errorMessage = error.message || 'Error de conexión'
      
      if (errorMessage.includes('Credenciales inválidas')) {
        setErrors({
          username: 'Usuario o contraseña incorrectos',
          password: 'Usuario o contraseña incorrectos'
        })
      } else {
        setErrors({
          username: 'Error al conectar con el servidor. Intenta de nuevo.'
        })
      }
      
      console.error('Error en login:', error)
      return false
    }

    return false
  }

  return {
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
  }
} 