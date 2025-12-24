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
import { ThemeToggle } from '@/components/ThemeToggle'
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 glass-strong border-b border-white/20 shadow-xl"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <motion.h1 
                className="font-heading text-lg md:text-xl font-bold text-gradient-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {t.nav.appTitle}
              </motion.h1>
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFavoritesOnly(false)}
                  className={`transition-all duration-300 font-semibold hover:scale-105 ${
                    !showFavoritesOnly 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t.nav.explore}
                </Button>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFavoritesOnly(true)}
                    className={`transition-all duration-300 font-semibold hover:scale-105 ${
                      showFavoritesOnly 
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Heart className="h-4 w-4 mr-2" weight={showFavoritesOnly ? 'fill' : 'regular'} />
                    {t.nav.favorites}
                    {(favoriteIds ?? []).length > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs px-2 py-0.5 gradient-accent text-white border-0 font-bold">
                        {(favoriteIds ?? []).length}
                      </Badge>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full glass hover:bg-white/80 transition-all duration-300">
                        <User className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-slideInUp glass-strong border-white/20">
                    <div className="px-3 py-2">
                      <p className="font-bold text-sm text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                      <SignOut className="h-4 w-4 mr-2" />
                      {t.nav.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => setAuthDialogOpen(true)} 
                    className="hidden md:flex h-10 px-6 gradient-primary text-white border-0 font-semibold shadow-lg btn-ripple"
                  >
                    {t.nav.login}
                  </Button>
                </motion.div>
              )}

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-full">
                    <List className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="glass-strong border-l border-white/20">
                  <div className="flex flex-col gap-3 mt-8">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowFavoritesOnly(false)
                        setMobileMenuOpen(false)
                      }}
                      className="justify-start font-semibold text-base"
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
                          className="justify-start font-semibold text-base"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          {t.nav.favorites}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="justify-start font-semibold text-base"
                        >
                          <SignOut className="h-4 w-4 mr-2" />
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
                        className="gradient-primary text-white border-0 font-semibold"
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

      <div className="container mx-auto px-4 py-8">
        {showFavoritesOnly && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-accent" weight="fill" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t.favorites.title}</h2>
            </div>
            <p className="text-base text-muted-foreground">
              {(favoriteIds ?? []).length === 0
                ? t.favorites.noFavorites
                : `${(favoriteIds ?? []).length} ${(favoriteIds ?? []).length === 1 ? t.results.place : t.results.places} ${t.favorites.saved}`}
            </p>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 glass-strong rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          <main className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-strong p-4 rounded-xl border border-white/20"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm text-foreground font-bold">
                  {filteredVenues.length} {filteredVenues.length === 1 ? t.results.place : t.results.places} {t.results.placesFound}
                </p>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters} 
                      className="h-8 text-sm text-foreground hover:text-primary font-semibold hover:scale-105 transition-all"
                    >
                      <X className="h-4 w-4 mr-1.5" />
                      {t.results.clearFilters}
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden h-9 text-sm font-semibold glass border-white/30 hover:bg-white/50">
                      <Funnel className="h-4 w-4 mr-2" />
                      {t.filters.title}
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2 text-xs px-2 py-0.5 gradient-accent text-white border-0 font-bold">
                          {t.results.filtersActive}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 glass-strong border-r border-white/20">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClearFilters={clearFilters}
                    />
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[160px] h-9 text-sm font-semibold glass border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border-white/20">
                    <SelectItem value="popular" className="text-sm font-medium">{t.sort.mostPopular}</SelectItem>
                    <SelectItem value="rating" className="text-sm font-medium">{t.sort.highestRated}</SelectItem>
                    <SelectItem value="distance" className="text-sm font-medium">{t.sort.nearest}</SelectItem>
                    <SelectItem value="price-low" className="text-sm font-medium">{t.sort.priceLowToHigh}</SelectItem>
                    <SelectItem value="price-high" className="text-sm font-medium">{t.sort.priceHighToLow}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 glass rounded-lg p-1 border border-white/30">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className={`h-7 w-7 transition-all duration-300 ${viewMode === 'grid' ? 'gradient-primary text-white' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <GridFour className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className={`h-7 w-7 transition-all duration-300 ${viewMode === 'list' ? 'gradient-primary text-white' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {filteredVenues.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="mb-6 text-muted-foreground"
                >
                  <MagnifyingGlass className="h-16 w-16 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">{t.results.noResults}</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  {t.results.tryAdjusting}
                </p>
                {hasActiveFilters && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={clearFilters} size="lg" className="gradient-primary text-white border-0 font-semibold shadow-lg btn-ripple">
                      {t.results.clearAllFilters}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredVenues.map((venue, index) => (
                    <motion.div
                      key={venue.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: Math.min(index * 0.08, 0.8),
                        ease: "easeOut"
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
        className="glass-strong"
        toastOptions={{
          className: 'glass-strong border border-white/20 shadow-2xl',
        }}
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