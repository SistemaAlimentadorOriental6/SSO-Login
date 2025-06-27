interface LegalLinksProps {
  isMobile?: boolean
  onPrivacy: () => void
  onTerms: () => void
  onSecurity: () => void
  onCookies: () => void
}

export const LegalLinks = ({ isMobile = false, onPrivacy, onTerms, onSecurity, onCookies }: LegalLinksProps) => {
  // Solo se usa en desktop ahora
  return (
    <div className="text-center pt-4 mt-4 border-t border-gray-100/50">
      <div className="flex justify-center items-center gap-4 flex-wrap text-sm mb-3">
        <button
          onClick={onPrivacy}
          className="text-gray-500 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-gray-50"
        >
          Política de Privacidad
        </button>
        <span className="text-gray-300">•</span>
        <button
          onClick={onTerms}
          className="text-gray-500 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-gray-50"
        >
          Términos de Servicio
        </button>
        <span className="text-gray-300">•</span>
        <button
          onClick={onSecurity}
          className="text-gray-500 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-gray-50"
        >
          Centro de Seguridad
        </button>
        <span className="text-gray-300">•</span>
        <button
          onClick={onCookies}
          className="text-gray-500 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-gray-50"
        >
          Cookies
        </button>
      </div>
    </div>
  )
} 