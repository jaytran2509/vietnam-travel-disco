import { Heart, Star, MapPin } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Venue, Coordinates } from '@/lib/types'
import { calculateDistance, formatDistance, isVenueOpen } from '@/lib/helpers'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

interface VenueCardProps {
  venue: Venue
  isFavorite: boolean
  onToggleFavorite: (venueId: string) => void
  onCardClick: (venueId: string) => void
  userLocation?: Coordinates
  viewMode?: 'grid' | 'list'
}

export function VenueCard({
  venue,
  isFavorite,
  onToggleFavorite,
  onCardClick,
  userLocation,
  viewMode = 'grid',
}: VenueCardProps) {
  const { t } = useLanguage()
  
  const distance = userLocation
    ? calculateDistance(userLocation, venue.coordinates)
    : null

  const isOpen = isVenueOpen(venue.openingHours, venue.isOpen24Hours)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(venue.id)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer group"
        onClick={() => onCardClick(venue.id)}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-72 h-48 sm:h-56 overflow-hidden shrink-0">
            <motion.img
              src={venue.coverImage}
              alt={venue.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'absolute top-3 right-3 p-2.5 rounded-full glassmorphism hover:bg-white transition-all duration-300 shadow-lg',
                isFavorite && 'text-accent'
              )}
              onClick={handleFavoriteClick}
            >
              <Heart 
                weight={isFavorite ? 'fill' : 'regular'} 
                className="h-5 w-5" 
              />
            </motion.button>
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground capitalize font-medium">{t.categories[venue.category] || venue.category}</span>
                  {isOpen && (
                    <>
                      <span className="text-sm text-muted-foreground/50">·</span>
                      <span className="inline-flex items-center gap-1 text-sm text-success font-semibold">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                        {t.filters.openNow}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
                  {venue.name}
                </h3>
              </div>
            </div>

            <p className="text-muted-foreground text-[15px] mb-4 line-clamp-2 leading-relaxed">
              {venue.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
              <div className="flex items-center gap-1.5">
                <Star weight="fill" className="h-4 w-4 text-accent" />
                <span className="font-semibold text-foreground">{venue.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({venue.reviewCount})</span>
              </div>
              <span className="text-muted-foreground/50">·</span>
              <span className="text-foreground font-semibold">{venue.priceLevel}</span>
              <span className="text-muted-foreground/50">·</span>
              <span className="text-muted-foreground">{venue.cuisineType || t.categories[venue.category]}</span>
              {distance !== null && (
                <>
                  <span className="text-muted-foreground/50">·</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" weight="fill" />
                    <span>{formatDistance(distance)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="cursor-pointer group"
      onClick={() => onCardClick(venue.id)}
    >
      <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 card-hover-lift">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={venue.coverImage}
            alt={venue.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              'absolute top-3 right-3 p-2.5 rounded-full glassmorphism hover:bg-white transition-all duration-300 shadow-lg',
              isFavorite && 'text-accent'
            )}
            onClick={handleFavoriteClick}
          >
            <motion.div
              initial={false}
              animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                weight={isFavorite ? 'fill' : 'regular'}
                className="h-5 w-5"
              />
            </motion.div>
          </motion.button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-1 mb-2">
            <h3 className="font-semibold text-base text-foreground line-clamp-1 flex-1 tracking-tight group-hover:text-primary transition-colors">
              {venue.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
            <span className="capitalize font-medium">{t.categories[venue.category] || venue.category}</span>
            {isOpen && (
              <>
                <span className="text-muted-foreground/50">·</span>
                <span className="inline-flex items-center gap-1 text-success font-semibold">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  {t.filters.openNow}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[15px] mb-2">
            <Star weight="fill" className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="font-semibold text-foreground">{venue.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({venue.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 text-[15px] text-muted-foreground">
            <span className="font-semibold text-foreground">{venue.priceLevel}</span>
            {distance !== null && (
              <>
                <span className="text-muted-foreground/50">·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" weight="fill" />
                  <span>{formatDistance(distance)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
