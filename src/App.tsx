import { useState, useMemo } from 'react'
import {
  MagnifyingGlass,
  Funnel,
  Heart,
  User,
  List,
  GridFour,
  MapPin,
  SignOut,
  X,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { HeroSection } from '@/components/HeroSection'
import { VenueCard } from '@/components/VenueCard'
import { FilterPanel } from '@/components/FilterPanel'
import { AuthDialog } from '@/components/AuthDialog'
import { useAuth } from '@/hooks/use-auth'
import { useFavorites } from '@/hooks/use-favorites'
import { useUserLocation } from '@/hooks/use-user-location'
import { venues } from '@/lib/venues-data'
import { filterVenues, sortVenues, debounce } from '@/lib/helpers'
import type { SearchFilters, SortOption, ViewMode, VenueCategory } from '@/lib/types'

function App() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const { location: userLocation } = useUserLocation()

  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    priceRange: [1, 4],
    minRating: 0,
    maxDistance: 50,
    openNow: false,
    open24Hours: false,
    dietary: [],
  })

  const debouncedSetFilters = useMemo(
    () =>
      debounce((query: string) => {
        setFilters((prev) => ({ ...prev, query }))
      }, 300),
    []
  )

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    debouncedSetFilters(query)
  }

  const handleCategoryClick = (category: VenueCategory) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
      return { ...prev, categories }
    })
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      categories: [],
      priceRange: [1, 4],
      minRating: 0,
      maxDistance: 50,
      openNow: false,
      open24Hours: false,
      dietary: [],
    })
    setSearchQuery('')
  }

  const handleToggleFavorite = (venueId: string) => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true)
      toast.info('Please login to save favorites')
      return
    }
    toggleFavorite(venueId)
    if (isFavorite(venueId)) {
      toast.success('Removed from favorites')
    } else {
      toast.success('Added to favorites')
    }
  }

  const handleCardClick = (venueId: string) => {
    toast.info('Venue detail view coming soon!')
  }

  const filteredVenues = useMemo(() => {
    let result = filterVenues(venues, filters, userLocation ?? undefined)
    
    if (showFavoritesOnly) {
      result = result.filter((venue) => (favoriteIds ?? []).includes(venue.id))
    }
    
    return sortVenues(result, sortBy, userLocation ?? undefined)
  }, [venues, filters, sortBy, userLocation, showFavoritesOnly, favoriteIds])

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 1 ||
    filters.priceRange[1] < 4 ||
    filters.minRating > 0 ||
    filters.maxDistance < 50 ||
    filters.openNow ||
    filters.open24Hours ||
    filters.dietary.length > 0

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="font-heading text-xl md:text-2xl font-bold text-primary">
                Vietnam Travel
              </h1>
              <div className="hidden md:flex items-center gap-6">
                <Button
                  variant="ghost"
                  onClick={() => setShowFavoritesOnly(false)}
                  className={!showFavoritesOnly ? 'text-primary' : ''}
                >
                  Explore
                </Button>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    onClick={() => setShowFavoritesOnly(true)}
                    className={showFavoritesOnly ? 'text-primary' : ''}
                  >
                    <Heart className="h-4 w-4 mr-2" weight={showFavoritesOnly ? 'fill' : 'regular'} />
                    Favorites
                    {(favoriteIds ?? []).length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {(favoriteIds ?? []).length}
                      </Badge>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <SignOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setAuthDialogOpen(true)} className="hidden md:flex">
                  Login / Sign Up
                </Button>
              )}

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <List className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-4 mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowFavoritesOnly(false)
                        setMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      Explore
                    </Button>
                    {isAuthenticated ? (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowFavoritesOnly(true)
                            setMobileMenuOpen(false)
                          }}
                          className="justify-start"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Favorites
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="justify-start"
                        >
                          <SignOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          setAuthDialogOpen(true)
                          setMobileMenuOpen(false)
                        }}
                      >
                        Login / Sign Up
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {!showFavoritesOnly && (
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategories={filters.categories}
          onCategoryClick={handleCategoryClick}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {showFavoritesOnly && (
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-bold mb-2">My Favorites</h2>
            <p className="text-muted-foreground">
              {(favoriteIds ?? []).length === 0
                ? 'No favorites yet. Start exploring and save your favorite places!'
                : `You have ${(favoriteIds ?? []).length} saved ${(favoriteIds ?? []).length === 1 ? 'place' : 'places'}`}
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 bg-card rounded-lg border shadow-sm">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          <main className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {filteredVenues.length} {filteredVenues.length === 1 ? 'place' : 'places'} found
                </p>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Funnel className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2">
                          Active
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClearFilters={clearFilters}
                    />
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 border rounded-md p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <GridFour className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {filteredVenues.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 text-muted-foreground">
                  <MagnifyingGlass className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No places found</h3>
                  <p className="text-sm max-w-md">
                    Try adjusting your filters or search terms to find more results
                  </p>
                </div>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} className="mt-4">
                    Clear all filters
                  </Button>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    isFavorite={isFavorite(venue.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onCardClick={handleCardClick}
                    userLocation={userLocation ?? undefined}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} onLogin={login} />

      <Toaster position="top-right" />
    </div>
  )
}

export default App