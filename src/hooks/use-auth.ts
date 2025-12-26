import { useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { useCurrentUser } from '@/lib/queries'
import { auth } from '@/lib/api'
import type { AuthState, User } from '@/lib/types'

export function useAuth() {
  const [authState, setAuthState] = useKV<AuthState>('auth-state', {
    user: null,
    isAuthenticated: false,
    rememberMe: false,
  })
  
  // Fetch current user from API if token exists
  const { data: currentUser, isLoading, refetch } = useCurrentUser()
  
  // Sync API user data with local auth state
  useEffect(() => {
    if (currentUser && auth.hasToken()) {
      setAuthState({
        user: currentUser,
        isAuthenticated: true,
        rememberMe: authState?.rememberMe ?? false,
      })
    } else if (!auth.hasToken()) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        rememberMe: false,
      })
    }
  }, [currentUser])
  
  // Listen for auth:logout event (triggered by 401 response interceptor)
  useEffect(() => {
    const handleLogout = () => {
      logout()
    }
    
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  const login = (user: User, rememberMe: boolean = false) => {
    // Called after successful API login (token already saved by mutation)
    setAuthState({
      user,
      isAuthenticated: true,
      rememberMe,
    })
    refetch() // Refresh user data
  }

  const logout = () => {
    auth.removeToken()
    setAuthState({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
    })
  }

  const updateProfile = (updates: Partial<User>) => {
    setAuthState((current) => {
      if (!current) {
        return {
          user: null,
          isAuthenticated: false,
          rememberMe: false,
        }
      }
      return {
        ...current,
        user: current.user ? { ...current.user, ...updates } : null,
      }
    })
  }

  return {
    user: authState?.user ?? null,
    isAuthenticated: auth.hasToken() && (authState?.isAuthenticated ?? false),
    rememberMe: authState?.rememberMe ?? false,
    isLoading,
    login,
    logout,
    updateProfile,
    refetch,
  }
}
