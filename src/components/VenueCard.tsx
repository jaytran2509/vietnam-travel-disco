import { Heart, Star, MapPin } from '@phosphor-icons/react'
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
      <div
        className="bg-white border border-border-light rounded-xl overflow-hidden hover:border-text-dark hover:shadow-lg transition-all duration-200 cursor-pointer group"
        onClick={() => onCardClick(venue.id)}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-48 sm:h-56 overflow-hidden shrink-0">
            <img
              src={venue.coverImage}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <button
              className={cn(
                'absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200',
                isFavorite && 'text-accent'
              )}
              onClick={handleFavoriteClick}
            >
              <Heart 
                weight={isFavorite ? 'fill' : 'regular'} 
                className="h-4 w-4" 
              />
            </button>
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-body capitalize">{t.categories[venue.category] || venue.category}</span>
                  {isOpen && (
                    <>
                      <span className="text-xs text-text-light">·</span>
                      <span className="text-xs text-success font-medium">{t.filters.openNow}</span>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-base text-text-dark group-hover:text-primary transition-colors line-clamp-1">
                  {venue.name}
                </h3>
              </div>
            </div>

            <p className="text-text-body text-sm mb-3 line-clamp-2">
              {venue.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <div className="flex items-center gap-1">
                <Star weight="fill" className="h-4 w-4 text-text-dark" />
                <span className="font-semibold text-text-dark">{venue.rating.toFixed(1)}</span>
                <span className="text-text-body">({venue.reviewCount})</span>
              </div>
              <span className="text-text-light">·</span>
              <span className="text-text-dark font-medium">{venue.priceLevel}</span>
              <span className="text-text-light">·</span>
              <span className="text-text-body">{venue.cuisineType || t.categories[venue.category]}</span>
              {distance !== null && (
                <>
                  <span className="text-text-light">·</span>
                  <span className="text-text-body">{formatDistance(distance)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="cursor-pointer group"
      onClick={() => onCardClick(venue.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3">
        <img
          src={venue.coverImage}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <button
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200',
            isFavorite && 'text-accent'
          )}
          onClick={handleFavoriteClick}
        >
          <Heart
            weight={isFavorite ? 'fill' : 'regular'}
            className="h-4 w-4"
          />
        </button>
      </div>

      <div>
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="font-semibold text-sm text-text-dark line-clamp-1 flex-1">
            {venue.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-sm text-text-body mb-1">
          <span className="capitalize text-xs">{t.categories[venue.category] || venue.category}</span>
          {isOpen && (
            <>
              <span className="text-text-light">·</span>
              <span className="text-success font-medium text-xs">{t.filters.openNow}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Star weight="fill" className="h-3.5 w-3.5 text-text-dark flex-shrink-0" />
          <span className="font-semibold text-text-dark">{venue.rating.toFixed(1)}</span>
          <span className="text-text-body">({venue.reviewCount})</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-text-body mt-1">
          <span className="font-medium text-text-dark">{venue.priceLevel}</span>
          {distance !== null && (
            <>
              <span className="text-text-light">·</span>
              <span>{formatDistance(distance)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
