import { AnimatePresence } from 'framer-motion'
import { useToast } from '@/contexts/ToastContext'
import { ToastItem } from './ToastItem'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const visibleToasts = toasts.slice(-4)

  return (
    <>
      <div 
        className="fixed z-[9999] pointer-events-none hidden md:block"
        style={{ top: '24px', right: '24px' }}
        aria-live="polite"
        aria-label="Notifications"
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {visibleToasts.map((toast, index) => (
              <div key={toast.id} className="pointer-events-auto">
                <ToastItem 
                  toast={toast} 
                  onRemove={removeToast}
                  index={index}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div 
        className="fixed z-[9999] pointer-events-none md:hidden"
        style={{ top: '24px', left: '16px', right: '16px' }}
        aria-live="polite"
        aria-label="Notifications"
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {visibleToasts.map((toast, index) => (
              <div key={toast.id} className="pointer-events-auto w-full">
                <ToastItem 
                  toast={toast} 
                  onRemove={removeToast}
                  index={index}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-toast-item] * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}
