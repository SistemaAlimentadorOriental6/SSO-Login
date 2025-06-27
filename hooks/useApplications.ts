"use client"

import { useQuery } from '@apollo/client'
import { GET_MY_APPLICATIONS, TRACK_APPLICATION_ACCESS } from '@/lib/graphql/queries'
import { useMutation } from '@apollo/client'

export const useApplications = () => {
  // Query para obtener las aplicaciones del usuario
  const { data, loading, error, refetch } = useQuery(GET_MY_APPLICATIONS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  })

  // Mutation para trackear acceso a aplicación
  const [trackAccess] = useMutation(TRACK_APPLICATION_ACCESS)

  // Función para trackear acceso a una aplicación
  const trackApplicationAccess = async (applicationId: string) => {
    try {
      await trackAccess({
        variables: { applicationId },
      })
    } catch (error) {
      console.error('Error tracking application access:', error)
    }
  }

  // Función para abrir una aplicación
  const openApplication = async (applicationId: string, url: string) => {
    // Trackear el acceso
    await trackApplicationAccess(applicationId)
    
    // Si es una URL relativa (como /inspecciones), realizar autenticación externa
    if (url.startsWith('/')) {
      const appName = url.substring(1) // Remover el '/' inicial
      await handleExternalAuth(appName)
    } else {
      // Si es una URL completa, abrirla directamente
      window.open(url, '_blank')
    }
  }

  // Función para manejar autenticación externa
  const handleExternalAuth = async (appName: string) => {
    try {
      // Obtener el token del usuario actual
      const token = localStorage.getItem('auth-token')
      
      if (!token) {
        console.error('No se encontró token de autenticación')
        return
      }

      // Realizar autenticación externa usando el token actual
      const response = await fetch('/api/external-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          application: appName
        })
      })

      const result = await response.json()

      if (result.success) {
        // Usar la URL de redirección que incluye el token SSO
        const redirectUrl = result.applicationUrl || getExternalUrl(appName)
        console.log('🔗 Abriendo URL SSO:', redirectUrl)
        console.log('📊 Datos del usuario:', result.userData)
        if (redirectUrl) {
          window.open(redirectUrl, '_blank')
        }
      } else {
        console.error('Error en autenticación externa:', result.error)
        // Mostrar mensaje de error al usuario
        alert(`Error abriendo ${appName}: ${result.error}`)
      }
    } catch (error) {
      console.error('Error procesando autenticación externa:', error)
      alert(`Error de conexión al abrir ${appName}`)
    }
  }

  // Función para obtener URL externa según la aplicación
  const getExternalUrl = (appName: string): string | null => {
    const urlMap: { [key: string]: string } = {
      'inspecciones': 'https://inspecciones.sao6.com.co/',
      'carrotaller': 'https://carrotaller.sao6.com.co/',
      'activos': 'https://activos.sao6.com.co/'
    }
    
    return urlMap[appName] || null
  }

  // Mapear los datos al formato esperado por el frontend
  const applications = data?.myApplications?.map((userApp: any) => ({
    id: userApp.application.id,
    name: userApp.application.name,
    description: userApp.application.description || '',
    url: userApp.application.url,
    icon: getApplicationIcon(userApp.application.name),
    gradient: getApplicationGradient(userApp.application.name),
    stats: getApplicationStats(userApp),
    status: 'active',
    pulse: userApp.isFavorite,
    category: userApp.application.category || 'general',
    isFavorite: userApp.isFavorite,
    lastAccessed: userApp.lastAccessed,
    accessCount: userApp.accessCount,
  })) || []

  return {
    applications,
    loading,
    error,
    refetch,
    openApplication,
    trackApplicationAccess,
  }
}

// Función para obtener el ícono de la aplicación
const getApplicationIcon = (appName: string) => {
  // Simplemente retornamos null por ahora y usaremos CSS para los íconos
  return null
}

// Función para obtener el gradiente de la aplicación
const getApplicationGradient = (appName: string) => {
  const gradientMap: { [key: string]: string } = {
    'Carrotaller': 'from-green-400 via-emerald-400 to-green-500',
    'Inspecciones': 'from-green-500 via-emerald-500 to-green-600',
    'Control de Activos': 'from-emerald-400 via-green-400 to-emerald-500',
  }

  return gradientMap[appName] || 'from-blue-400 via-indigo-400 to-blue-500'
}

// Función para obtener estadísticas de la aplicación
const getApplicationStats = (userApp: any) => {
  const appName = userApp.application.name
  
  if (appName === 'Carrotaller') {
    return { vehicles: Math.floor(Math.random() * 50) + 10, services: Math.floor(Math.random() * 200) + 50 }
  } else if (appName === 'Inspecciones') {
    return { completed: Math.floor(Math.random() * 100) + 50, pending: Math.floor(Math.random() * 20) + 5 }
  } else if (appName === 'Control de Activos') {
    return { total: Math.floor(Math.random() * 500) + 200, active: Math.floor(Math.random() * 400) + 150 }
  }
  
  return { accessed: userApp.accessCount, lastAccess: userApp.lastAccessed }
} 