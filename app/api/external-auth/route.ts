import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { application } = await request.json()

    // Validar datos requeridos
    if (!application) {
      return NextResponse.json({
        success: false,
        error: 'Falta el parámetro application'
      }, { status: 400 })
    }

    // Obtener token de autorización
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        error: 'Token de autorización requerido'
      }, { status: 401 })
    }

    // Llamar al GraphQL del backend usando el resolver authenticateExternal
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000'
    
    const graphqlQuery = `
      mutation AuthenticateExternal($application: String!) {
        authenticateExternal(application: $application) {
          success
          message
          token
          sessionId
          applicationUrl
          userData {
            username
            firstName
            lastName
            email
          }
        }
      }
    `

    const response = await fetch(`${backendUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { application }
      })
    })

    const result = await response.json()

    if (result.errors) {
      return NextResponse.json({
        success: false,
        error: result.errors[0]?.message || 'Error en autenticación externa'
      }, { status: 400 })
    }

    return NextResponse.json(result.data.authenticateExternal)

  } catch (error) {
    console.error('Error en API external-auth:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
} 