import { useKV } from '@github/spark/hooks'
import type { AuthState, User } from '@/lib/types'

export function useAuth() {
  const [authState, setAuthState] = useKV<AuthState>('auth-state', {
    user: null,
    isAuthenticated: false,
    rememberMe: false,
  })

  const login = (user: User, rememberMe: boolean = false) => {
    setAuthState({
      user,
      isAuthenticated: true,
      rememberMe,
    })
  }

  const logout = () => {
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
    isAuthenticated: authState?.isAuthenticated ?? false,
    rememberMe: authState?.rememberMe ?? false,
    login,
    logout,
    updateProfile,
  }
}
