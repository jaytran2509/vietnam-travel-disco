import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useKV<Theme>('theme-preference', 'light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    const currentTheme = theme || 'light'
    root.classList.remove('light', 'dark')
    root.classList.add(currentTheme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme || 'light') === 'light' ? 'dark' : 'light')
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme: theme || 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
