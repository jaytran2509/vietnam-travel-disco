import { Heart, Star, MapPin } from '@phosphor-icons/react'
import type { Venue, Coordinates } from '@/lib/types'
import { calculateDistance, formatDistance, isVenueOpen } from '@/lib/helpers'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
          onClick={() => onCardClick(venue.id)}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
              <img
                src={venue.coverImage}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  'absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white',
                  isFavorite && 'text-accent'
                )}
                onClick={handleFavoriteClick}
              >
                <Heart weight={isFavorite ? 'fill' : 'regular'} className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="capitalize">
                      {venue.category}
                    </Badge>
                    {isOpen && (
                      <Badge className="bg-accent text-accent-foreground">Open Now</Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {venue.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star weight="fill" className="h-4 w-4 text-accent" />
                  <span className="font-semibold">{venue.rating}</span>
                  <span className="text-muted-foreground">({venue.reviewCount})</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="font-semibold text-foreground">{venue.priceLevel}</span>
                  <span>·</span>
                  <span>{venue.cuisineType || venue.category}</span>
                </div>

                {distance !== null && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
        onClick={() => onCardClick(venue.id)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={venue.coverImage}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white',
              isFavorite && 'text-accent'
            )}
            onClick={handleFavoriteClick}
          >
            <Heart
              weight={isFavorite ? 'fill' : 'regular'}
              className="h-5 w-5 transition-transform group-hover:scale-110"
            />
          </Button>

          {isOpen && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              Open Now
            </Badge>
          )}

          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="capitalize backdrop-blur-sm bg-white/90">
              {venue.category}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {venue.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star weight="fill" className="h-4 w-4 text-accent" />
              <span className="font-semibold text-sm">{venue.rating}</span>
            </div>
            <span className="text-muted-foreground text-xs">
              ({venue.reviewCount})
            </span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="font-semibold text-sm">{venue.priceLevel}</span>
          </div>

          {distance !== null && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>{formatDistance(distance)}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
