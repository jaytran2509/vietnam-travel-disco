import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import type { ApiResponse, PaginatedResponse, Place } from '@/lib/types'

interface PlacesQueryParams {
  search?: string
  category?: string
  province?: string
  city?: string
  page?: number
  limit?: number
  sort?: string
  featured?: boolean
}

// Get places with filters and pagination
export function usePlaces(params: PlacesQueryParams = {}) {
  return useQuery({
    queryKey: ['places', params],
    queryFn: async (): Promise<PaginatedResponse<Place>> => {
      // apiClient interceptor unwraps response.data.data
      return await apiClient.get('/places', { params })
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
  })
}

// Get featured places for landing page
export function useFeaturedPlaces() {
  return useQuery({
    queryKey: ['places', 'featured'],
    queryFn: async (): Promise<Place[]> => {
      return await apiClient.get('/places/featured')
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get place by slug (for detail page)
export function usePlaceBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['place', slug],
    queryFn: async (): Promise<Place> => {
      return await apiClient.get(`/places/${slug}`)
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get similar places
export function useSimilarPlaces(placeId: string | undefined) {
  return useQuery({
    queryKey: ['places', 'similar', placeId],
    queryFn: async (): Promise<Place[]> => {
      return await apiClient.get(`/places/similar/${placeId}`)
    },
    enabled: !!placeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
