"use client"

import { cn } from "@/lib/utils"
import type { Toast } from "@/types/dashboard"

interface ToastContainerProps {
  toasts: Toast[]
  onRemoveToast: (id: number) => void
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 space-y-3 sm:space-y-4">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={cn(
            "px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl border animate-in slide-in-from-right-full duration-700 transform-gpu max-w-xs sm:max-w-sm",
            "hover:scale-105 transition-all duration-300 cursor-pointer",
            {
              "bg-green-50/95 border-green-200/50 text-green-800 shadow-green-500/20": toast.type === "success",
              "bg-red-50/95 border-red-200/50 text-red-800 shadow-red-500/20": toast.type === "error",
              "bg-green-50/95 border-green-200/50 text-green-800 shadow-green-500/20": toast.type === "info",
              "bg-yellow-50/95 border-yellow-200/50 text-yellow-800 shadow-yellow-500/20": toast.type === "warning",
            },
          )}
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => onRemoveToast(toast.id)}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            {toast.type === "success" && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {toast.type === "error" && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {toast.type === "warning" && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <span className="font-semibold text-sm sm:text-base leading-relaxed">{toast.message}</span>
              <div className="text-xs opacity-70 mt-1">Toca para cerrar</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
