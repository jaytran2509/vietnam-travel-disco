import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, auth } from '@/lib/api'
import type { ApiResponse, LoginResponse, User } from '@/lib/types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

// Login mutation
export function useAuthLogin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      // apiClient interceptor returns response.data.data directly (unwraps ApiResponse)
      // So the return type is LoginResponse directly
      return await apiClient.post('/auth/login', credentials)
    },
    onSuccess: (loginResponse) => {
      // Save token to localStorage
      auth.setToken(loginResponse.token)
      
      // Set user data in query cache
      queryClient.setQueryData(['currentUser'], loginResponse.user)
    },
  })
}

// Register mutation
export function useAuthRegister() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials): Promise<LoginResponse> => {
      // apiClient interceptor returns response.data.data directly
      return await apiClient.post('/auth/register', credentials)
    },
    onSuccess: (loginResponse) => {
      // Save token to localStorage
      auth.setToken(loginResponse.token)
      
      // Set user data in query cache
      queryClient.setQueryData(['currentUser'], loginResponse.user)
    },
  })
}

// Get current user query
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<User> => {
      // apiClient interceptor unwraps ApiResponse, so we get User directly
      return await apiClient.get('/auth/me')
    },
    enabled: auth.hasToken(),
    retry: false, // Don't retry on 401
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
