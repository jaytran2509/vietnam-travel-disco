import type { Coordinates, Venue, SearchFilters, SortOption, OpeningHours } from './types'

export function calculateDistance(
  from: Coordinates,
  to: Coordinates
): number {
  const R = 6371
  const dLat = toRad(to.lat - from.lat)
  const dLon = toRad(to.lng - from.lng)
  const lat1 = toRad(from.lat)
  const lat2 = toRad(to.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  }
  return `${km.toFixed(1)}km`
}

export function formatPrice(vnd: number): string {
  if (vnd >= 1000000) {
    return `${(vnd / 1000000).toFixed(1)}M VND`
  }
  if (vnd >= 1000) {
    return `${Math.round(vnd / 1000)}K VND`
  }
  return `${vnd} VND`
}

export function isVenueOpen(openingHours: OpeningHours, isOpen24Hours: boolean): boolean {
  if (isOpen24Hours) return true

  const now = new Date()
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const currentDay = dayNames[now.getDay()] as keyof OpeningHours
  const hours = openingHours[currentDay]

  if (hours === 'Closed') return false

  const [open, close] = hours.split(' - ')
  const [openHour, openMin] = open.split(':').map(Number)
  const [closeHour, closeMin] = close.split(':').map(Number)

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = openHour * 60 + openMin
  const closeMinutes = closeHour * 60 + closeMin

  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes
}

export function filterVenues(
  venues: Venue[],
  filters: SearchFilters,
  userLocation?: Coordinates
): Venue[] {
  return venues.filter((venue) => {
    if (filters.query) {
      const query = filters.query.toLowerCase()
      const matchesSearch =
        venue.name.toLowerCase().includes(query) ||
        venue.description.toLowerCase().includes(query) ||
        venue.address.toLowerCase().includes(query) ||
        venue.cuisineType?.toLowerCase().includes(query)

      if (!matchesSearch) return false
    }

    if (filters.categories.length > 0 && !filters.categories.includes(venue.category)) {
      return false
    }

    const priceMap: Record<string, number> = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
    const venuePrice = priceMap[venue.priceLevel]
    if (venuePrice < filters.priceRange[0] || venuePrice > filters.priceRange[1]) {
      return false
    }

    if (venue.rating < filters.minRating) {
      return false
    }

    if (userLocation) {
      const distance = calculateDistance(userLocation, venue.coordinates)
      if (distance > filters.maxDistance) {
        return false
      }
    }

    if (filters.openNow && !isVenueOpen(venue.openingHours, venue.isOpen24Hours)) {
      return false
    }

    if (filters.open24Hours && !venue.isOpen24Hours) {
      return false
    }

    if (filters.dietary.length > 0) {
      const hasMatchingDietary = filters.dietary.some((diet) =>
        venue.dietaryOptions.includes(diet)
      )
      if (!hasMatchingDietary) return false
    }

    return true
  })
}

export function sortVenues(
  venues: Venue[],
  sortBy: SortOption,
  userLocation?: Coordinates
): Venue[] {
  const sorted = [...venues]

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    
    case 'rating':
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        return b.reviewCount - a.reviewCount
      })
    
    case 'distance':
      if (!userLocation) return sorted
      return sorted.sort((a, b) => {
        const distA = calculateDistance(userLocation, a.coordinates)
        const distB = calculateDistance(userLocation, b.coordinates)
        return distA - distB
      })
    
    case 'price-low':
      return sorted.sort((a, b) => a.avgCostPerPerson - b.avgCostPerPerson)
    
    case 'price-high':
      return sorted.sort((a, b) => b.avgCostPerPerson - a.avgCostPerPerson)
    
    default:
      return sorted
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function getCurrentDayHours(openingHours: OpeningHours): string {
  const now = new Date()
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const currentDay = dayNames[now.getDay()] as keyof OpeningHours
  return openingHours[currentDay]
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
