import { cn } from "@/lib/utils"
import { Toast } from "../types"

interface ToastContainerProps {
  toasts: Toast[]
}

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border animate-in slide-in-from-right-full duration-500 transform-gpu",
            {
              "bg-green-50/95 border-green-200 text-green-800": toast.type === "success",
              "bg-red-50/95 border-red-200 text-red-800": toast.type === "error",
              "bg-blue-50/95 border-blue-200 text-blue-800": toast.type === "info",
              "bg-yellow-50/95 border-yellow-200 text-yellow-800": toast.type === "warning",
            },
          )}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {toast.type === "error" && (
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <span className="font-semibold text-sm">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
} 