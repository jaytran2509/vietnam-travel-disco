import { useState, useEffect, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { X, CheckCircle, XCircle, Warning, Info } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { Toast, ToastAction } from '@/contexts/ToastContext'

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
  index: number
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    progressColor: 'rgb(34, 197, 94)',
    circleBg: 'rgb(34, 197, 94)',
    iconColor: 'white',
  },
  error: {
    icon: XCircle,
    progressColor: 'rgb(239, 68, 68)',
    circleBg: 'rgb(239, 68, 68)',
    iconColor: 'white',
  },
  warning: {
    icon: Warning,
    progressColor: 'rgb(249, 115, 22)',
    circleBg: 'rgb(249, 115, 22)',
    iconColor: 'white',
  },
  info: {
    icon: Info,
    progressColor: 'rgb(59, 130, 246)',
    circleBg: 'rgb(59, 130, 246)',
    iconColor: 'white',
  },
}

export function ToastItem({ toast, onRemove, index }: ToastItemProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100)
  const progressRef = useRef<number>(100)
  const startTimeRef = useRef<number>(Date.now())

  const config = toastConfig[toast.type]
  const Icon = config.icon

  const duration = toast.duration || (toast.type === 'error' ? 6000 : toast.type === 'info' ? 5000 : 4000)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100)
      progressRef.current = newProgress
      setProgress(newProgress)

      if (newProgress <= 0) {
        clearInterval(interval)
        onRemove(toast.id)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [duration, isPaused, toast.id, onRemove])

  const handleMouseEnter = () => {
    setIsPaused(true)
    const elapsed = Date.now() - startTimeRef.current
    progressRef.current = Math.max(0, 100 - (elapsed / duration) * 100)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    startTimeRef.current = Date.now() - ((100 - progressRef.current) / 100) * duration
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onRemove(toast.id)
    }
  }

  const handleActionClick = (action: ToastAction) => {
    action.onClick()
    onRemove(toast.id)
  }

  return (
    <motion.div
      data-toast-item
      layout
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scale: isPaused ? 1.02 : 1,
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        transition: { duration: 0.25 }
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      className={cn(
        "relative w-full rounded-xl overflow-hidden bg-white",
        "shadow-lg transition-shadow duration-200",
        isPaused && "shadow-xl"
      )}
      style={{
        width: '380px',
      }}
      role={toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' || toast.type === 'warning' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <div className="flex items-start gap-3 p-4">
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.circleBg }}
        >
          <Icon size={24} weight="bold" style={{ color: config.iconColor }} />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
            {toast.title}
          </h3>
          {toast.description && (
            <p className="mt-1 text-[13px] text-gray-500 leading-snug">
              {toast.description}
            </p>
          )}

          {toast.actions && toast.actions.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {toast.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleActionClick(action)}
                  className={cn(
                    "text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus:underline",
                    "hover:underline"
                  )}
                  style={{
                    color: config.progressColor,
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onRemove(toast.id)}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center",
            "transition-colors duration-200",
            "text-gray-400 hover:text-gray-600",
            "focus:outline-none focus:text-gray-600"
          )}
          aria-label="Close notification"
        >
          <X size={16} weight="bold" />
        </button>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{
          backgroundColor: config.progressColor,
          width: `${progress}%`,
          transition: isPaused ? 'none' : 'width 16ms linear'
        }}
        initial={{ width: '100%' }}
      />
    </motion.div>
  )
}
