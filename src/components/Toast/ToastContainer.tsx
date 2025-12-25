import { AnimatePresence } from 'framer-motion'
import { useToast } from '@/contexts/ToastContext'
import { ToastItem } from './ToastItem'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div 
      className="fixed z-[9999] pointer-events-none"
      style={{
        top: '5rem',
        right: '1.25rem',
        left: 'auto',
        maxWidth: '400px',
      }}
    >
      <div className="flex flex-col gap-3">
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

      <style>{`
        @media (max-width: 768px) {
          [class*="ToastContainer"] {
            top: 5rem !important;
            left: 1rem !important;
            right: 1rem !important;
            max-width: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="ToastItem"] * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
