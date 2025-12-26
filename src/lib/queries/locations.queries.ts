import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export function useProvinces() {
  return useQuery({
    queryKey: ['locations', 'provinces'],
    queryFn: async (): Promise<string[]> => {
      return await apiClient.get('/locations/provinces')
    },
    staleTime: 15 * 60 * 1000,
  })
}
