import { cn } from "@/lib/utils"
import type { QuickAction } from "@/types/dashboard"

interface QuickActionsProps {
  actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {actions.map((action, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-green-100 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 animate-in slide-in-from-bottom-4 duration-1000 hover:border-green-200"
          style={{ animationDelay: `${index * 100 + 600}ms` }}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div
              className={cn(
                "w-14 h-14 bg-gradient-to-r rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg",
                action.gradient,
              )}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
            </div>

            <div className="group-hover:translate-y-[-2px] transition-transform duration-300">
              <div className="text-lg font-bold text-gray-900 mb-1">{action.title}</div>
              <div className="text-sm text-gray-600 font-medium">{action.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
