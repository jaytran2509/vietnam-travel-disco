import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import type { ApiResponse } from '@/lib/types'

// Get all provinces (unique list)
export function useProvinces() {
  return useQuery({
    queryKey: ['locations', 'provinces'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<string[]>>('/locations/provinces')
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - provinces rarely change
  })
}
