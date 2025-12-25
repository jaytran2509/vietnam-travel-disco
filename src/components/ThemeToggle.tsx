import { Moon, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full hover:bg-muted transition-all duration-300"
        aria-label="Toggle theme"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-foreground" weight="fill" />
          ) : (
            <Sun className="h-5 w-5 text-foreground" weight="fill" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  )
}
