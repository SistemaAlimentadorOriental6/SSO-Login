export interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info" | "warning"
}

export type ViewState = "login" | "forgot-password"

export interface LoginForm {
  username: string
  password: string
}

export interface FormErrors {
  username?: string
  password?: string
  forgotUsername?: string
} 