import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const TOKEN_KEY = 'auth-token'

interface RequestConfig {
  method?: string
  headers?: Record<string, string>
  body?: any
}

async function fetchWithAuth(url: string, config: RequestConfig = {}) {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`

  try {
    const response = await fetch(fullUrl, {
      ...config,
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    })

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      toast.error('Session expired. Please login again.')
      window.dispatchEvent(new CustomEvent('auth:logout'))
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'An unexpected error occurred')
    }

    const data = await response.json()
    
    if (data && 'data' in data) {
      return data.data
    }
    
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', {
        url: fullUrl,
        message: error.message,
      })
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}

export const apiClient = {
  get: (url: string) => fetchWithAuth(url, { method: 'GET' }),
  post: (url: string, body?: any) => fetchWithAuth(url, { method: 'POST', body }),
  put: (url: string, body?: any) => fetchWithAuth(url, { method: 'PUT', body }),
  delete: (url: string) => fetchWithAuth(url, { method: 'DELETE' }),
  patch: (url: string, body?: any) => fetchWithAuth(url, { method: 'PATCH', body }),
}

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  hasToken: () => !!localStorage.getItem(TOKEN_KEY),
}
