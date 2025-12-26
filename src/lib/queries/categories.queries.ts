import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import type { Category } from '@/lib/types'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      return await apiClient.get('/categories')
    },
    staleTime: 10 * 60 * 1000,
  })
}
