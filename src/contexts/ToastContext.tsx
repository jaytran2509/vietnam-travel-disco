import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface ToastAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
  actions?: ToastAction[]
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  success: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => string
  error: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => string
  warning: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => string
  info: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => string
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast = { ...toast, id }
    
    setToasts((prev) => {
      const updated = [...prev, newToast]
      return updated.slice(-3)
    })

    if (toast.duration !== Infinity && toast.type !== 'warning') {
      const duration = toast.duration || (toast.type === 'error' ? 6000 : toast.type === 'info' ? 5000 : 4000)
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'success', title, description, ...options })
  }, [addToast])

  const error = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'error', title, description, ...options })
  }, [addToast])

  const warning = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'warning', title, description, duration: Infinity, ...options })
  }, [addToast])

  const info = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'info', title, description, ...options })
  }, [addToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
