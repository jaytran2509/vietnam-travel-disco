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
      <div className="min-h-screen bg-white">
        <nav className="sticky top-0 z-50 bg-white border-b border-border-light">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button 
                onClick={() => setCurrentView('browse')}
                className="text-base font-bold text-primary hover:text-primary-hover transition-colors"
              >
                {t.nav.appTitle}
              </button>
              
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('favorites')}
                  className="gap-2 text-text-dark hover:bg-bg-gray rounded-lg h-9 px-3"
                >
                  <Heart size={18} weight={currentView === 'favorites' ? 'fill' : 'regular'} className={currentView === 'favorites' ? 'text-accent' : ''} />
                  <span className="hidden sm:inline text-sm">{t.nav.favorites}</span>
                </Button>

                <div className="flex items-center gap-3 pl-3 border-l border-border-light">
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-bg-gray flex items-center justify-center">
                      <User size={16} className="text-text-body" weight="bold" />
                    </div>
                    <span className="text-sm font-medium text-text-dark">{user?.name}</span>
                  </div>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="border-border-medium hover:border-text-dark rounded-lg h-9 px-3 text-sm"
                  >
                    {t.nav.logout}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>

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
