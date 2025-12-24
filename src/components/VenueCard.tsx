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
        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
        onClick={() => onCardClick(venue.id)}
              alt={venue.name}
        <div className="flex flex-col md:flex-row">scale-105 transition-transform duration-300"
          <div className="relative w-full md:w-48 h-40 md:h-auto overflow-hidden shrink-0">
            <imgrom-black/40 to-transparent" />
              src={venue.coverImage}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            w-8 bg-white/90 hover:bg-white shadow-md transition-colors',
            <Buttonaccent/90'
              size="icon"
              variant="ghost"
              className={cn(
                'absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white shadow-md transition-colors',
                isFavorite && 'bg-accent text-accent-foreground hover:bg-accent/90'
              )}
              onClick={handleFavoriteClick}
            >
              <Heart 
                weight={isFavorite ? 'fill' : 'regular'} 
                className="h-4 w-4" 
              />
            </Button>
          </div>ing text-base font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
me}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-heading text-base font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  {venue.name}5"
                </h3>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge 
                    variant="secondary" 
                    className="capitalize text-xs px-2 py-0.5"
                  >penNow}
                    {venue.category}
                  </Badge>
                  {isOpen && (
                    <Badge className="bg-accent text-accent-foreground text-xs px-2 py-0.5">
                      {t.filters.openNow}
                <span className="text-xs">·</span>
                  )}sineType || venue.category}</span>
                  <span className="text-xs">{formatDistance(distance)}</span>
                </div>
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {venue.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star weight="fill" className="h-4 w-4 text-accent" />
                <span className="font-medium text-foreground">{venue.rating}</span>
                <span className="text-muted-foreground text-xs">({venue.reviewCount})</span>
              </div> onCardClick(venue.id)}

              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium text-foreground">{venue.priceLevel}</span>
                <span className="text-xs">·</span>
                <span className="text-xs">{venue.cuisineType || venue.category}</span>
              </div>"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"

              {distance !== null && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" weight="fill" />
                  <span className="text-xs">{formatDistance(distance)}</span>
                </div>
              )}
            'absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white shadow-md transition-colors',
            isFavorite && 'bg-accent text-accent-foreground hover:bg-accent/90'
        </div>
      </Card>eClick}
        >
          <Heart
            weight={isFavorite ? 'fill' : 'regular'}
            className="h-4 w-4"
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => onCardClick(venue.id)}

      <div className="relative h-44 overflow-hidden">
        <img
          src={venue.coverImage}
          alt={venue.name} text-xs px-2 py-0.5 bg-white/90"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <Button
          size="icon"
          variant="ghost"
          className={cn(text-sm font-semibold mb-1 line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            'absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white shadow-md transition-colors',
            isFavorite && 'bg-accent text-accent-foreground hover:bg-accent/90'
          )}
          onClick={handleFavoriteClick}
        >
          <Heartt-accent" />
            weight={isFavorite ? 'fill' : 'regular'}
            className="h-4 w-4"
          />
        </Button>

        {isOpen && (round">·</span>
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 shadow-md">
            {t.filters.openNow}
          </Badge>
        )}
flex items-center gap-1 text-muted-foreground text-xs">
        <div className="absolute bottom-2 left-2">
          <Badge 
            variant="secondary" 
            className="capitalize text-xs px-2 py-0.5 bg-white/90"
    </Card>
            {venue.category}
          </Badge>
        </div>      </div>      <div className="p-3">        <h3 className="font-heading text-sm font-semibold mb-1 line-clamp-1 text-foreground group-hover:text-primary transition-colors">          {venue.name}        </h3>        <div className="flex items-center gap-2 mb-1.5 flex-wrap text-xs">          <div className="flex items-center gap-0.5">            <Star weight="fill" className="h-3.5 w-3.5 text-accent" />            <span className="font-medium text-foreground">{venue.rating}</span>          </div>          <span className="text-muted-foreground">            ({venue.reviewCount})          </span>          <span className="text-muted-foreground">·</span>          <span className="font-medium text-foreground">{venue.priceLevel}</span>        {distance !== null && (          <div className="flex items-center gap-1 text-muted-foreground text-xs">            <MapPin className="h-3 w-3" weight="fill" />            <span>{formatDistance(distance)}</span>        )}      </div>    </Card>