import type { Metadata } from 'next'
import './globals.css'
import { ApolloWrapper } from '@/components/ApolloWrapper'

export const metadata: Metadata = {
  title: 'Sistema SSO Empresarial',
  description: 'Single Sign-On para aplicaciones empresariales',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
