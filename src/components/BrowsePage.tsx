import { useState, useMemo, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { MagnifyingGlass, Funnel, X, MapPin, Star, Heart } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VenueCard } from '@/components/VenueCard'
import { FilterPanel } from '@/components/FilterPanel'
import { usePlaces } from '@/lib/queries'
import { placeToVenue } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/contexts/ToastContext'
import type { SearchFilters, SortOption, Venue } from '@/lib/types'

interface BrowsePageProps {
  isAuthenticated: boolean
  onLoginRequired: () => void
}

export function BrowsePage({ isAuthenticated, onLoginRequired }: BrowsePageProps) {
  const { t } = useLanguage()
  const toast = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [favorites, setFavorites] = useKV<string[]>('user-favorites', [])
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    priceRange: [0, 4],
    minRating: 0,
    maxDistance: 50,
    openNow: false,
    open24Hours: false,
    dietary: [],
  })
  
  // Fetch places from API
  const { data: placesData, isLoading, error } = usePlaces({
    search: debouncedQuery,
    // We'll do filtering and sorting client-side for now for better UX
    // Later can move to server-side if data set grows large
  })
  
  // Convert places to venues for component compatibility
  const apiVenues: Venue[] = useMemo(() => {
    if (!placesData?.data) return []
    return placesData.data.map(placeToVenue)
  }, [placesData])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredVenues = useMemo(() => {
    // Use API data if available, fallback to empty array while loading
    let results = apiVenues

    // Client-side filtering for better UX
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase()
      results = results.filter(venue =>
        venue.name.toLowerCase().includes(query) ||
        venue.description.toLowerCase().includes(query) ||
        venue.cuisineType?.toLowerCase().includes(query) ||
        venue.address.toLowerCase().includes(query)
      )
    }

    if (filters.categories.length > 0) {
      results = results.filter(venue => filters.categories.includes(venue.category))
    }

    const priceMap = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
    results = results.filter(venue => {
      const price = priceMap[venue.priceLevel] || 0
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    if (filters.minRating > 0) {
      results = results.filter(venue => venue.rating >= filters.minRating)
    }

    if (filters.open24Hours) {
      results = results.filter(venue => venue.isOpen24Hours)
    }

    if (filters.dietary.length > 0) {
      results = results.filter(venue =>
        filters.dietary.some(diet => venue.dietaryOptions.includes(diet))
      )
    }

    if (sortBy === 'rating') {
      results = [...results].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'popular') {
      results = [...results].sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sortBy === 'price-low') {
      results = [...results].sort((a, b) => {
        const priceA = priceMap[a.priceLevel] || 0
        const priceB = priceMap[b.priceLevel] || 0
        return priceA - priceB
      })
    } else if (sortBy === 'price-high') {
      results = [...results].sort((a, b) => {
        const priceA = priceMap[a.priceLevel] || 0
        const priceB = priceMap[b.priceLevel] || 0
        return priceB - priceA
      })
    }

    return results
  }, [apiVenues, debouncedQuery, filters, sortBy])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 4) count++
    if (filters.minRating > 0) count++
    if (filters.openNow) count++
    if (filters.open24Hours) count++
    if (filters.dietary.length > 0) count++
    return count
  }, [filters])

  const handleToggleFavorite = (venueId: string) => {
    if (!isAuthenticated) {
      onLoginRequired()
      toast.error(t.favorites.loginRequired)
      return
    }

    setFavorites((currentFavorites) => {
      const isFavorited = currentFavorites?.includes(venueId)
      if (isFavorited) {
        toast.success(t.favorites.removedFromFavorites)
        return currentFavorites?.filter(id => id !== venueId) || []
      } else {
        toast.success(t.favorites.addedToFavorites)
        return [...(currentFavorites || []), venueId]
      }
    })
  }

  const handleClearFilters = () => {
    setFilters({
      query: '',
      categories: [],
      priceRange: [0, 4],
      minRating: 0,
      maxDistance: 50,
      openNow: false,
      open24Hours: false,
      dietary: [],
    })
    setSearchQuery('')
  }

  const handleVenueClick = (venueId: string) => {
    toast.info(t.common.comingSoon)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 bg-white border-b border-border-light">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-text-body" size={18} />
                <Input
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-10 border-border-medium rounded-full text-sm focus-visible:ring-1 focus-visible:ring-text-dark focus-visible:border-text-dark transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-body hover:text-text-dark transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 px-4 rounded-full border-border-medium hover:border-text-dark transition-colors relative text-sm"
            >
              <Funnel size={18} className="mr-2" />
              <span className="hidden sm:inline">{t.filters.title}</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold bg-primary text-white rounded-full min-w-[18px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {showFilters && (
          <div className="hidden lg:block w-72 border-r border-border-light bg-white sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        <div className="flex-1">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-text-body">
                <span className="font-semibold text-text-dark">{filteredVenues.length}</span> {filteredVenues.length === 1 ? t.results.place : t.results.places} {t.results.placesFound}
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="ml-3 text-primary hover:text-primary-hover underline font-medium transition-colors text-sm"
                  >
                    {t.results.clearFilters}
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-9 px-3 text-sm border border-border-medium rounded-lg bg-white hover:border-text-dark transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-text-dark"
              >
                <option value="popular">{t.sort.mostPopular}</option>
                <option value="rating">{t.sort.highestRated}</option>
                <option value="price-low">{t.sort.priceLowToHigh}</option>
                <option value="price-high">{t.sort.priceHighToLow}</option>
              </select>
            </div>

            {error ? (
              <div className="text-center py-16">
                <div className="mb-4 text-5xl opacity-20">⚠️</div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Error loading places</h3>
                <p className="text-sm text-text-body mb-6 max-w-md mx-auto">
                  {error instanceof Error ? error.message : 'Failed to load places'}
                </p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-xl aspect-[4/3] mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredVenues.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4 text-5xl opacity-20">🔍</div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">{t.results.noResults}</h3>
                <p className="text-sm text-text-body mb-6 max-w-md mx-auto">
                  {t.results.tryAdjusting}
                </p>
                {(activeFilterCount > 0 || searchQuery) && (
                  <Button 
                    onClick={handleClearFilters} 
                    variant="outline"
                    className="border-2 border-text-dark hover:bg-bg-gray rounded-lg px-5 h-10 text-sm"
                  >
                    {t.results.clearAllFilters}
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
                {filteredVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    isFavorite={favorites?.includes(venue.id) || false}
                    onToggleFavorite={() => handleToggleFavorite(venue.id)}
                    onCardClick={handleVenueClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
