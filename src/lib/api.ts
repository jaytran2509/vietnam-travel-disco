import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Token storage key
const TOKEN_KEY = 'auth-token'

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor: Add Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor: Handle errors and extract data
apiClient.interceptors.response.use(
  (response) => {
    // Extract data field from standard API response format
    // Backend returns: { success: true, data: ..., message?: ... }
    // We want to return just the inner "data" field
    if (response.data && 'data' in response.data) {
      return response.data.data
    }
    // Fallback: return whole response data
    return response.data
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear token
      localStorage.removeItem(TOKEN_KEY)
      
      // Show error toast
      toast.error('Session expired. Please login again.')
      
      // Trigger logout by dispatching custom event
      window.dispatchEvent(new CustomEvent('auth:logout'))
    }
    
    // Handle other errors
    const errorMessage = 
      (error.response?.data as any)?.message || 
      error.message || 
      'An unexpected error occurred'
    
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: errorMessage,
    })
    
    return Promise.reject(new Error(errorMessage))
  }
)

// Token management helpers
export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  hasToken: () => !!localStorage.getItem(TOKEN_KEY),
}
