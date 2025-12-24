import { useState, useMemo, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { MagnifyingGlass, Funnel, X, MapPin, Star, Heart } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VenueCard } from '@/components/VenueCard'
import { FilterPanel } from '@/components/FilterPanel'
import { venues } from '@/lib/venues-data'
import { useLanguage } from '@/contexts/LanguageContext'
import { toast } from 'sonner'
import type { SearchFilters, SortOption, Venue } from '@/lib/types'

interface BrowsePageProps {
  isAuthenticated: boolean
  onLoginRequired: () => void
}

export function BrowsePage({ isAuthenticated, onLoginRequired }: BrowsePageProps) {
  const { t } = useLanguage()
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredVenues = useMemo(() => {
    let results = venues

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
  }, [debouncedQuery, filters, sortBy])

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
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body" size={20} />
                <Input
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 border-border-medium rounded-full text-sm focus-visible:ring-1 focus-visible:ring-text-dark focus-visible:border-text-dark transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-body hover:text-text-dark transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-5 rounded-full border-border-medium hover:border-text-dark transition-colors relative"
            >
              <Funnel size={20} className="mr-2" />
              <span className="hidden sm:inline">{t.filters.title}</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary text-white rounded-full min-w-[20px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {showFilters && (
          <div className="hidden lg:block w-80 border-r border-border-light bg-white sticky top-[81px] h-[calc(100vh-81px)] overflow-y-auto">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        <div className="flex-1">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex items-center justify-between mb-8">
              <div className="text-sm text-text-body">
                <span className="font-semibold text-text-dark">{filteredVenues.length}</span> {filteredVenues.length === 1 ? t.results.place : t.results.places} {t.results.placesFound}
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="ml-4 text-primary hover:text-primary-hover underline font-medium transition-colors"
                  >
                    {t.results.clearFilters}
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 px-4 text-sm border border-border-medium rounded-lg bg-white hover:border-text-dark transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-text-dark"
              >
                <option value="popular">{t.sort.mostPopular}</option>
                <option value="rating">{t.sort.highestRated}</option>
                <option value="price-low">{t.sort.priceLowToHigh}</option>
                <option value="price-high">{t.sort.priceHighToLow}</option>
              </select>
            </div>

            {filteredVenues.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-6 text-6xl opacity-20">🔍</div>
                <h3 className="text-2xl font-semibold text-text-dark mb-3">{t.results.noResults}</h3>
                <p className="text-base text-text-body mb-8 max-w-md mx-auto">
                  {t.results.tryAdjusting}
                </p>
                {(activeFilterCount > 0 || searchQuery) && (
                  <Button 
                    onClick={handleClearFilters} 
                    variant="outline"
                    className="border-2 border-text-dark hover:bg-bg-gray rounded-lg px-6 h-12"
                  >
                    {t.results.clearAllFilters}
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
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
