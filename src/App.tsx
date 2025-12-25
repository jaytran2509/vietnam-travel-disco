import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext'
import { LandingPage } from '@/components/LandingPage'
import { AuthDialog } from '@/components/AuthDialog'
import { BrowsePage } from '@/components/BrowsePage'
import { FavoritesPage } from '@/components/FavoritesPage'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Heart, User } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import type { User as UserType } from '@/lib/types'

function AppContent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { t } = useLanguage()
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
            <div className="flex items-center justify-between h-16">
              <motion.button 
                onClick={() => setCurrentView('browse')}
                className="text-xl font-bold text-primary hover:text-primary-hover transition-colors tracking-tight"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.nav.appTitle}
              </motion.button>
              
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView('favorites')}
                    className="gap-2 text-foreground hover:bg-muted rounded-xl h-10 px-4 transition-all duration-300"
                  >
                    <Heart size={20} weight={currentView === 'favorites' ? 'fill' : 'regular'} className={currentView === 'favorites' ? 'text-accent' : ''} />
                    <span className="hidden sm:inline text-[15px] font-medium">{t.nav.favorites}</span>
                  </Button>
                </motion.div>

                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <div className="hidden sm:flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center ring-2 ring-primary/20">
                      <User size={18} className="text-muted-foreground" weight="bold" />
                    </div>
                    <span className="text-[15px] font-semibold text-foreground">{user?.name}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={logout}
                      variant="outline"
                      size="sm"
                      className="rounded-xl h-10 px-4 text-[15px] font-medium transition-all duration-300"
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

        <Toaster 
          position="top-right"
          duration={3000}
          closeButton
        />
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
      <Toaster 
        position="top-right"
        duration={3000}
        closeButton
      />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
