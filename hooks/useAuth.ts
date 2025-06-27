"use client"

import { useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from '@/lib/graphql/queries'
import { clearSession } from '@/lib/apollo'

export const useAuth = () => {
  const [logoutMutation] = useMutation(LOGOUT_MUTATION)

  const logout = async () => {
    try {
      // Intentar hacer logout en el servidor
      await logoutMutation()
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      // Limpiar sesión local independientemente del resultado
      clearSession()
      
      // Redirigir al login
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
  }

  return {
    logout,
  }
} 