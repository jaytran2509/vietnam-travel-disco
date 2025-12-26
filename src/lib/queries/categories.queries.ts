import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import type { ApiResponse, Category } from '@/lib/types'

// Get all categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Category[]>>('/categories')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - categories rarely change
  })
}
