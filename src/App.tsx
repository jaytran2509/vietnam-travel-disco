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
import { motion, AnimatePresence } from 'framer-motion'
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
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/hooks/use-auth'
import { useFavorites } from '@/hooks/use-favorites'
import { useUserLocation } from '@/hooks/use-user-location'
import { venues } from '@/lib/venues-data'
import { filterVenues, sortVenues, debounce } from '@/lib/helpers'
import type { SearchFilters, SortOption, ViewMode, VenueCategory } from '@/lib/types'

function AppContent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const { location: userLocation } = useUserLocation()
  const { t } = useLanguage()

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
      toast.info(t.favorites.loginRequired)
      return
    }
    toggleFavorite(venueId)
    if (isFavorite(venueId)) {
      toast.success(t.favorites.removedFromFavorites)
    } else {
      toast.success(t.favorites.addedToFavorites)
    }
  }

  const handleCardClick = (venueId: string) => {
    toast.info(t.common.comingSoon)
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
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <h1 className="font-heading text-base md:text-lg font-bold text-primary">
                {t.nav.appTitle}
              </h1>
              <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFavoritesOnly(false)}
                  className={`transition-all duration-300 ${!showFavoritesOnly ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                >
                  {t.nav.explore}
                </Button>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFavoritesOnly(true)}
                    className={`transition-all duration-300 ${showFavoritesOnly ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                  >
                    <Heart className="h-3.5 w-3.5 mr-1.5" weight={showFavoritesOnly ? 'fill' : 'regular'} />
                    {t.nav.favorites}
                    {(favoriteIds ?? []).length > 0 && (
                      <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground font-medium">
                        {(favoriteIds ?? []).length}
                      </Badge>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary transition-colors duration-300">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-slideInRight">
                    <div className="px-2 py-1.5">
                      <p className="font-semibold text-sm text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-xs text-foreground hover:text-primary transition-colors">
                      <SignOut className="h-3.5 w-3.5 mr-2" />
                      {t.nav.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setAuthDialogOpen(true)} className="hidden md:flex h-8 text-xs">
                  {t.nav.login}
                </Button>
              )}

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-3 mt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowFavoritesOnly(false)
                        setMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      {t.nav.explore}
                    </Button>
                    {isAuthenticated ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowFavoritesOnly(true)
                            setMobileMenuOpen(false)
                          }}
                          className="justify-start"
                        >
                          <Heart className="h-3.5 w-3.5 mr-2" />
                          {t.nav.favorites}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="justify-start"
                        >
                          <SignOut className="h-3.5 w-3.5 mr-2" />
                          {t.nav.logout}
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => {
                          setAuthDialogOpen(true)
                          setMobileMenuOpen(false)
                        }}
                      >
                        {t.nav.login}
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      {!showFavoritesOnly && (
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategories={filters.categories}
          onCategoryClick={handleCategoryClick}
        />
      )}

      <div className="container mx-auto px-4 py-6">
        {showFavoritesOnly && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="font-heading text-2xl font-bold mb-1 text-foreground">{t.favorites.title}</h2>
            <p className="text-sm text-muted-foreground">
              {(favoriteIds ?? []).length === 0
                ? t.favorites.noFavorites
                : `${(favoriteIds ?? []).length} ${(favoriteIds ?? []).length === 1 ? t.results.place : t.results.places} ${t.favorites.saved}`}
            </p>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 bg-card rounded-lg border shadow-sm">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          <main className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs text-foreground font-medium">
                  {filteredVenues.length} {filteredVenues.length === 1 ? t.results.place : t.results.places} {t.results.placesFound}
                </p>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs text-foreground hover:text-primary">
                      <X className="h-3 w-3 mr-1" />
                      {t.results.clearFilters}
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden h-8 text-xs">
                      <Funnel className="h-3.5 w-3.5 mr-1.5" />
                      {t.filters.title}
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground font-medium">
                          {t.results.filtersActive}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-0">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClearFilters={clearFilters}
                    />
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular" className="text-xs">{t.sort.mostPopular}</SelectItem>
                    <SelectItem value="rating" className="text-xs">{t.sort.highestRated}</SelectItem>
                    <SelectItem value="distance" className="text-xs">{t.sort.nearest}</SelectItem>
                    <SelectItem value="price-low" className="text-xs">{t.sort.priceLowToHigh}</SelectItem>
                    <SelectItem value="price-high" className="text-xs">{t.sort.priceHighToLow}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 border rounded-md p-0.5 bg-muted/30">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7 transition-all duration-300"
                    onClick={() => setViewMode('grid')}
                  >
                    <GridFour className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7 transition-all duration-300"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {filteredVenues.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-4 text-muted-foreground">
                  <MagnifyingGlass className="h-12 w-12 mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-semibold mb-1 text-foreground">{t.results.noResults}</h3>
                  <p className="text-xs max-w-md">
                    {t.results.tryAdjusting}
                  </p>
                </div>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} size="sm" className="mt-3">
                    {t.results.clearAllFilters}
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                    : 'space-y-3'
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredVenues.map((venue, index) => (
                    <motion.div
                      key={venue.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: Math.min(index * 0.05, 0.6)
                      }}
                    >
                      <VenueCard
                        venue={venue}
                        isFavorite={isFavorite(venue.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onCardClick={handleCardClick}
                        userLocation={userLocation ?? undefined}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} onLogin={login} />

      <Toaster 
        position="top-right" 
        expand={true}
        richColors
        duration={3000}
        closeButton
      />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}