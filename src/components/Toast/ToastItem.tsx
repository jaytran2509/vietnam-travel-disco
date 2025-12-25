import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
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
    accentColor: 'rgb(34 197 94)',
    accentLight: 'rgb(220 252 231)',
    iconBg: 'rgb(220 252 231)',
    iconColor: 'rgb(22 163 74)',
  },
  error: {
    icon: XCircle,
    accentColor: 'rgb(239 68 68)',
    accentLight: 'rgb(254 226 226)',
    iconBg: 'rgb(254 226 226)',
    iconColor: 'rgb(220 38 38)',
  },
  warning: {
    icon: Warning,
    accentColor: 'rgb(245 158 11)',
    accentLight: 'rgb(254 243 199)',
    iconBg: 'rgb(254 243 199)',
    iconColor: 'rgb(217 119 6)',
  },
  info: {
    icon: Info,
    accentColor: 'rgb(59 130 246)',
    accentLight: 'rgb(219 234 254)',
    iconBg: 'rgb(219 234 254)',
    iconColor: 'rgb(37 99 235)',
  },
}

export function ToastItem({ toast, onRemove, index }: ToastItemProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100)
  const controls = useAnimation()
  const progressRef = useRef<number>(100)
  const startTimeRef = useRef<number>(Date.now())
  const remainingTimeRef = useRef<number>(toast.duration || 0)

  const config = toastConfig[toast.type]
  const Icon = config.icon

  const duration = toast.type === 'warning' ? Infinity : (toast.duration || (toast.type === 'error' ? 6000 : toast.type === 'info' ? 5000 : 4000))

  useEffect(() => {
    controls.start({ 
      x: 0, 
      opacity: 1, 
      scale: isPaused ? 1.02 : 1,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    })
  }, [isPaused, controls])

  useEffect(() => {
    if (duration === Infinity || isPaused) return

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
    if (duration !== Infinity) {
      setIsPaused(true)
      remainingTimeRef.current = (progressRef.current / 100) * duration
    }
  }

  const handleMouseLeave = () => {
    if (duration !== Infinity) {
      setIsPaused(false)
      startTimeRef.current = Date.now()
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } })
      setTimeout(() => onRemove(toast.id), 200)
    } else {
      controls.start({ x: 0 })
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
      initial={{ x: 400, opacity: 0 }}
      animate={controls}
      exit={{ x: 400, opacity: 0, scale: 0.95 }}
      transition={{ 
        type: 'spring',
        damping: 25,
        stiffness: 300,
        opacity: { duration: 0.2 }
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
        "relative w-full rounded-2xl overflow-hidden",
        "bg-white/90 backdrop-blur-lg",
        "shadow-2xl transition-all duration-200",
        isPaused && "scale-[1.02] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)]"
      )}
      style={{
        maxWidth: '420px',
        borderLeftWidth: '4px',
        borderLeftColor: config.accentColor,
      }}
      role="alert"
      aria-live={toast.type === 'error' || toast.type === 'warning' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <div className="flex items-start gap-3 p-3.5">
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.iconBg }}
        >
          <Icon size={20} weight="fill" style={{ color: config.iconColor }} />
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">
            {toast.title}
          </h3>
          {toast.description && (
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              {toast.description}
            </p>
          )}

          {toast.actions && toast.actions.length > 0 && (
            <div className="flex items-center gap-2 mt-2.5">
              {toast.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleActionClick(action)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-1",
                    action.variant === 'primary' 
                      ? "text-white hover:opacity-90"
                      : "hover:opacity-90"
                  )}
                  style={{
                    backgroundColor: action.variant === 'primary' ? config.accentColor : config.accentLight,
                    color: action.variant === 'primary' ? 'white' : config.iconColor,
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
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            "transition-colors duration-200",
            "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          )}
          aria-label="Close notification"
        >
          <X size={14} weight="bold" className="text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {duration !== Infinity && (
        <motion.div
          className="absolute bottom-0 left-0"
          style={{
            backgroundColor: config.accentColor,
            height: '2px',
            width: `${progress}%`,
            transition: isPaused ? 'none' : 'width 16ms linear'
          }}
          initial={{ width: '100%' }}
        />
      )}
    </motion.div>
  )
}
