export type VenueCategory = 'restaurant' | 'cafe' | 'attraction'

export type DietaryPreference = 'vegetarian' | 'vegan' | 'halal'

export type PriceLevel = '$' | '$$' | '$$$' | '$$$$'

export interface Coordinates {
  lat: number
  lng: number
}

export interface OpeningHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export interface Venue {
  id: string
  name: string
  category: VenueCategory
  images: string[]
  coverImage: string
  rating: number
  reviewCount: number
  priceLevel: PriceLevel
  avgCostPerPerson: number
  description: string
  address: string
  coordinates: Coordinates
  phone: string
  website?: string
  openingHours: OpeningHours
  isOpen24Hours: boolean
  dietaryOptions: DietaryPreference[]
  cuisineType?: string
  features: string[]
}

export interface Review {
  id: string
  venueId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  text: string
  images: string[]
  visitDate: string
  createdAt: string
  helpfulCount: number
  helpfulVotes: string[]
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: {
    dietary?: DietaryPreference[]
    favoriteCategories?: VenueCategory[]
  }
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  rememberMe: boolean
}

export interface Collection {
  id: string
  userId: string
  name: string
  venueIds: string[]
  createdAt: string
  isPublic: boolean
}

export interface SearchFilters {
  query: string
  categories: VenueCategory[]
  priceRange: [number, number]
  minRating: number
  maxDistance: number
  openNow: boolean
  open24Hours: boolean
  dietary: DietaryPreference[]
}

export type SortOption = 'popular' | 'rating' | 'distance' | 'price-low' | 'price-high'

export type ViewMode = 'grid' | 'list' | 'map'
