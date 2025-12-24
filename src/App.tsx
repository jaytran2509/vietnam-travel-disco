import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { LandingPage } from '@/components/LandingPage'
import { AuthDialog } from '@/components/AuthDialog'
import { Toaster } from '@/components/ui/sonner'
import type { User } from '@/lib/types'

function AppContent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true)
    }
  }

  const handleLogin = (userData: User, rememberMe: boolean) => {
    login(userData, rememberMe)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 bg-white border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-lg font-bold text-foreground">VietnamTravel</h1>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-body">Welcome, {user?.name}</span>
                <button 
                  onClick={logout}
                  className="text-xs text-text-body hover:text-foreground"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-10">
          <h2 className="mb-5 text-2xl">Browse Page Coming Soon</h2>
          <p className="text-text-body text-sm">The full browse experience is being built with Airbnb design.</p>
        </div>
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
