import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { ToastContainer } from '@/components/Toast'
import { LandingPage } from '@/components/LandingPage'
import { AuthDialog } from '@/components/AuthDialog'
import { BrowsePage } from '@/components/BrowsePage'
import { FavoritesPage } from '@/components/FavoritesPage'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { Heart, User } from '@phosphor-icons/react'
import { useToast } from '@/contexts/ToastContext'
import { motion } from 'framer-motion'
import type { User as UserType } from '@/lib/types'

function AppContent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { t } = useLanguage()
  const toast = useToast()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'browse' | 'favorites'>('browse')

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true)
    }
  }

  const handleLogin = (userData: UserType, rememberMe: boolean) => {
    login(userData, rememberMe)
  }

  const handleLoginRequired = () => {
    setAuthDialogOpen(true)
  }

  const handleVenueClick = (venueId: string) => {
    toast.info(t.common.comingSoon)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sticky top-0 z-50 bg-white border-b border-border"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <motion.button 
                onClick={() => setCurrentView('browse')}
                className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors tracking-tight"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.nav.appTitle}
              </motion.button>
              
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView('favorites')}
                    className="gap-1.5 text-foreground hover:bg-muted rounded-lg h-9 px-3 transition-all duration-300"
                  >
                    <Heart size={18} weight={currentView === 'favorites' ? 'fill' : 'regular'} className={currentView === 'favorites' ? 'text-accent' : ''} />
                    <span className="hidden sm:inline text-sm font-medium">{t.nav.favorites}</span>
                  </Button>
                </motion.div>

                <div className="flex items-center gap-2 pl-3 border-l border-border">
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ring-2 ring-primary/20">
                      <User size={16} className="text-muted-foreground" weight="bold" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{user?.name}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={logout}
                      variant="outline"
                      size="sm"
                      className="rounded-lg h-9 px-3 text-sm font-medium transition-all duration-300"
                    >
                      {t.nav.logout}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>

        {currentView === 'browse' ? (
          <BrowsePage 
            isAuthenticated={isAuthenticated}
            onLoginRequired={handleLoginRequired}
          />
        ) : (
          <FavoritesPage onVenueClick={handleVenueClick} />
        )}

        <ToastContainer />
      </div>
    )
  }

  return (
    <>
      <LandingPage onGetStarted={handleGetStarted} />
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        onLogin={handleLogin} 
      />
      <ToastContainer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </LanguageProvider>
  )
}
