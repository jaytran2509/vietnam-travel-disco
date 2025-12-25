import { AnimatePresence } from 'framer-motion'
import { useToast } from '@/contexts/ToastContext'
import { ToastItem } from './ToastItem'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <>
      <div 
        className="fixed z-[9999] pointer-events-none top-20 right-5 hidden md:block"
        style={{ maxWidth: '420px' }}
        aria-live="polite"
        aria-label="Notifications"
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast, index) => (
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
        className="fixed z-[9999] pointer-events-none top-20 left-4 right-4 md:hidden"
        aria-live="polite"
        aria-label="Notifications"
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast, index) => (
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
