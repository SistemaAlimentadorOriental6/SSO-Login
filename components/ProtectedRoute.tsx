"use client"

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ME } from '@/lib/graphql/queries'
import { getCurrentUser } from '@/lib/apollo'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const [isClient, setIsClient] = useState(false)
  const currentUser = getCurrentUser()
  
  const { data, loading, error } = useQuery(GET_ME, {
    skip: !currentUser || !requireAuth,
    errorPolicy: 'all'
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // En el servidor, no hacer nada
  if (!isClient) {
    return null
  }

  // Si no requiere autenticación, mostrar contenido
  if (!requireAuth) {
    return <>{children}</>
  }

  // Si está cargando los datos del usuario
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no hay token o hay error de autenticación
  if (!currentUser || error) {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
    return null
  }

  // Si hay datos del usuario, mostrar contenido
  if (data?.me || currentUser) {
    return <>{children}</>
  }

  // Por defecto, redirigir al login
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
  return null
} 