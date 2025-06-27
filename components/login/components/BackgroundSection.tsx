import Image from "next/image"

interface BackgroundSectionProps {
  isMobile?: boolean
}

export const BackgroundSection = ({ isMobile = false }: BackgroundSectionProps) => {
  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          <>
            <div className="absolute w-24 h-24 top-[10%] right-[15%] bg-white/15 rounded-full animate-float backdrop-blur-sm"></div>
            <div className="absolute w-16 h-16 top-[30%] right-[35%] bg-white/15 rounded-full animate-float animation-delay-200 backdrop-blur-sm"></div>
            <div className="absolute w-20 h-20 top-[60%] right-[10%] bg-white/15 rounded-full animate-float animation-delay-400 backdrop-blur-sm"></div>
          </>
        ) : (
          <>
            <div className="absolute w-40 h-40 top-[10%] right-[15%] bg-white/15 rounded-full animate-float backdrop-blur-sm"></div>
            <div className="absolute w-24 h-24 top-[30%] right-[35%] bg-white/15 rounded-full animate-float animation-delay-200 backdrop-blur-sm"></div>
            <div className="absolute w-44 h-44 top-[60%] right-[10%] bg-white/15 rounded-full animate-float animation-delay-400 backdrop-blur-sm"></div>
            <div className="absolute w-32 h-32 top-[75%] right-[40%] bg-white/15 rounded-full animate-float animation-delay-600 backdrop-blur-sm"></div>
            <div className="absolute w-20 h-20 top-[45%] right-[5%] bg-white/15 rounded-full animate-float animation-delay-300 backdrop-blur-sm"></div>
            <div className="absolute w-28 h-28 top-[20%] right-[55%] bg-white/15 rounded-full animate-float animation-delay-500 backdrop-blur-sm"></div>
          </>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent"></div>

      {/* Content */}
      <div className={`relative z-10 text-white ${isMobile ? 'max-w-lg mx-auto px-6 py-12 text-center' : 'max-w-lg mx-auto px-6 py-12 text-left'}`}>
        {/* Logo and Brand */}
        <div className={`flex items-center gap-4 mb-8 animate-in fade-in-0 slide-in-from-left-4 duration-1000 ${isMobile ? 'justify-center' : ''}`}>
          <div className="flex items-center justify-center">
            <Image src="/LOGO.webp" alt="Logo" width={48} height={48} />
          </div>
          <div className="text-3xl font-black text-white tracking-wider drop-shadow-lg">SAO6</div>
        </div>

        {/* Main Heading */}
        <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl xl:text-6xl'} font-black mb-4 leading-tight bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent drop-shadow-lg animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-300`}>
          Bienvenido de Vuelta
        </h1>

        {/* Subtitle */}
        <p className={`${isMobile ? 'text-lg' : 'text-xl xl:text-2xl'} font-medium mb-6 opacity-95 text-green-100 drop-shadow-md animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-500`}>
          Accede a tu panel de control
        </p>

        {/* Footer - Only for desktop */}
        {!isMobile && (
          <div className="border-t border-white/30 pt-6 mt-8 animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-700">
            <p className="text-sm text-green-200/90 font-medium mb-4">
              &copy; 2025 SAO6. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3 flex-wrap text-sm">
              <button className="text-green-200 hover:text-white transition-all duration-300 font-medium hover:scale-105">
                Privacidad
              </button>
              <span className="text-white/40">•</span>
              <button className="text-green-200 hover:text-white transition-all duration-300 font-medium hover:scale-105">
                Términos
              </button>
              <span className="text-white/40">•</span>
              <button className="text-green-200 hover:text-white transition-all duration-300 font-medium hover:scale-105">
                Seguridad
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 