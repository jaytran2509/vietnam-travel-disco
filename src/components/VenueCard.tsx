import { Heart, Star, MapPin } from '@phosphor-icons/react'
import type { Venue, Coordinates } from '@/lib/types'
import { calculateDistance, formatDistance, isVenueOpen } from '@/lib/helpers'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
      <Card
        className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border border-border rounded-lg"
        onClick={() => onCardClick(venue.id)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-40 h-32 md:h-auto overflow-hidden shrink-0">
            <img
              src={venue.coverImage}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                'absolute top-2 right-2 h-7 w-7 bg-white/95 hover:bg-white shadow-sm transition-all',
                isFavorite && 'bg-accent text-accent-foreground hover:bg-accent/90'
              )}
              onClick={handleFavoriteClick}
            >
              <Heart 
                weight={isFavorite ? 'fill' : 'regular'} 
                className="h-3.5 w-3.5" 
              />
            </Button>
          </div>

          <div className="flex-1 p-3">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                  <Badge 
                    variant="secondary" 
                    className="capitalize text-xs px-1.5 py-0 h-5"
                  >
                    {venue.category}
                  </Badge>
                  {isOpen && (
                    <Badge className="bg-accent text-accent-foreground text-xs px-1.5 py-0 h-5">
                      {t.filters.openNow}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-xs mb-2 line-clamp-2 leading-relaxed">
              {venue.description}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center gap-0.5">
                <Star weight="fill" className="h-3.5 w-3.5 text-accent" />
                <span className="font-medium text-foreground">{venue.rating}</span>
                <span className="text-muted-foreground">({venue.reviewCount})</span>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="font-medium text-foreground">{venue.priceLevel}</span>
                <span>·</span>
                <span>{venue.cuisineType || venue.category}</span>
              </div>

              {distance !== null && (
                <div className="flex items-center gap-0.5 text-muted-foreground">
                  <MapPin className="h-3 w-3" weight="fill" />
                  <span>{formatDistance(distance)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border border-border rounded-lg"
      onClick={() => onCardClick(venue.id)}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={venue.coverImage}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'absolute top-2 right-2 h-7 w-7 bg-white/95 hover:bg-white shadow-sm transition-all',
            isFavorite && 'bg-accent text-accent-foreground hover:bg-accent/90'
          )}
          onClick={handleFavoriteClick}
        >
          <Heart
            weight={isFavorite ? 'fill' : 'regular'}
            className="h-3.5 w-3.5"
          />
        </Button>

        {isOpen && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-1.5 py-0 h-5 shadow-sm">
            {t.filters.openNow}
          </Badge>
        )}

        <div className="absolute bottom-2 left-2">
          <Badge 
            variant="secondary" 
            className="capitalize text-xs px-1.5 py-0 h-5 bg-white/95"
          >
            {venue.category}
          </Badge>
        </div>
      </div>

      <div className="p-2.5">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-foreground group-hover:text-primary transition-colors">
          {venue.name}
        </h3>

        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <div className="flex items-center gap-0.5">
            <Star weight="fill" className="h-3 w-3 text-accent flex-shrink-0" />
            <span className="font-medium text-foreground">{venue.rating}</span>
          </div>
          <span className="text-muted-foreground">
            ({venue.reviewCount})
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="font-medium text-foreground">{venue.priceLevel}</span>

          {distance !== null && (
            <>
              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-0.5 text-muted-foreground">
                <MapPin className="h-2.5 w-2.5 flex-shrink-0" weight="fill" />
                <span>{formatDistance(distance)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
