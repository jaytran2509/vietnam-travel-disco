import { Heart, Star, MapPin } from '@phosphor-icons/react'
import type { Venue, Coordinates } from '@/lib/types'
import { calculateDistance, formatDistance, isVenueOpen } from '@/lib/helpers'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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
  const [heartAnimation, setHeartAnimation] = useState(false)
  
  const distance = userLocation
    ? calculateDistance(userLocation, venue.coordinates)
    : null

  const isOpen = isVenueOpen(venue.openingHours, venue.isOpen24Hours)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setHeartAnimation(true)
    setTimeout(() => setHeartAnimation(false), 500)
    onToggleFavorite(venue.id)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card
          className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-border"
          onClick={() => onCardClick(venue.id)}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 h-36 md:h-auto overflow-hidden">
              <motion.img
                src={venue.coverImage}
                alt={venue.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  'absolute top-2 right-2 h-8 w-8 bg-white backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300',
                  isFavorite && 'text-accent',
                  heartAnimation && 'animate-heartBeat'
                )}
                onClick={handleFavoriteClick}
              >
                <Heart weight={isFavorite ? 'fill' : 'regular'} className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold mb-1 group-hover:text-primary transition-colors duration-300 text-foreground">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Badge variant="secondary" className="capitalize text-xs px-2 py-0.5 bg-secondary text-secondary-foreground font-medium">
                      {venue.category}
                    </Badge>
                    {isOpen && (
                      <Badge className="bg-accent text-accent-foreground text-xs px-2 py-0.5 font-medium">{t.filters.openNow}</Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                {venue.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Star weight="fill" className="h-3.5 w-3.5 text-accent" />
                  <span className="font-semibold text-foreground">{venue.rating}</span>
                  <span className="text-muted-foreground">({venue.reviewCount})</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="font-semibold text-foreground">{venue.priceLevel}</span>
                  <span>·</span>
                  <span>{venue.cuisineType || venue.category}</span>
                </div>

                {distance !== null && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{formatDistance(distance)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Card
        className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-border"
        onClick={() => onCardClick(venue.id)}
      >
        <div className="relative h-40 overflow-hidden">
          <motion.img
            src={venue.coverImage}
            alt={venue.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'absolute top-2 right-2 h-8 w-8 bg-white backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 hover:scale-110',
              isFavorite && 'text-accent',
              heartAnimation && 'animate-heartBeat'
            )}
            onClick={handleFavoriteClick}
          >
            <Heart
              weight={isFavorite ? 'fill' : 'regular'}
              className="h-4 w-4"
            />
          </Button>

          {isOpen && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 font-medium shadow-lg">
              {t.filters.openNow}
            </Badge>
          )}

          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="capitalize backdrop-blur-sm bg-white/95 text-foreground text-xs px-2 py-0.5 font-medium shadow-lg">
              {venue.category}
            </Badge>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-heading text-sm font-semibold mb-1.5 line-clamp-1 group-hover:text-primary transition-colors duration-300 text-foreground">
            {venue.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center gap-0.5">
              <Star weight="fill" className="h-3.5 w-3.5 text-accent" />
              <span className="font-semibold text-xs text-foreground">{venue.rating}</span>
            </div>
            <span className="text-muted-foreground text-[10px]">
              ({venue.reviewCount})
            </span>
            <span className="text-muted-foreground text-[10px]">·</span>
            <span className="font-semibold text-xs text-foreground">{venue.priceLevel}</span>
          </div>

          {distance !== null && (
            <div className="flex items-center gap-0.5 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              <span>{formatDistance(distance)}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
