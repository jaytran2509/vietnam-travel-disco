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
        className="bg-white border border-border-light rounded-2xl overflow-hidden hover:border-text-dark hover:shadow-lg transition-all duration-200 cursor-pointer group"
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
                'absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200',
                isFavorite && 'text-accent'
              )}
              onClick={handleFavoriteClick}
            >
              <Heart 
                weight={isFavorite ? 'fill' : 'regular'} 
                className="h-5 w-5" 
              />
            </button>
          </div>

          <div className="flex-1 p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm text-text-body capitalize font-medium">{t.categories[venue.category] || venue.category}</span>
                  {isOpen && (
                    <>
                      <span className="text-sm text-text-light">·</span>
                      <span className="text-sm text-success font-semibold">{t.filters.openNow}</span>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-text-dark group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
                  {venue.name}
                </h3>
              </div>
            </div>

            <p className="text-text-body text-[15px] mb-4 line-clamp-2 leading-relaxed">
              {venue.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px]">
              <div className="flex items-center gap-1.5">
                <Star weight="fill" className="h-4 w-4 text-text-dark" />
                <span className="font-semibold text-text-dark">{venue.rating.toFixed(1)}</span>
                <span className="text-text-body">({venue.reviewCount})</span>
              </div>
              <span className="text-text-light">·</span>
              <span className="text-text-dark font-semibold">{venue.priceLevel}</span>
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
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-3">
        <img
          src={venue.coverImage}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <button
          className={cn(
            'absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200',
            isFavorite && 'text-accent'
          )}
          onClick={handleFavoriteClick}
        >
          <Heart
            weight={isFavorite ? 'fill' : 'regular'}
            className="h-5 w-5"
          />
        </button>
      </div>

      <div>
        <div className="flex items-start justify-between gap-1 mb-1.5">
          <h3 className="font-semibold text-base text-text-dark line-clamp-1 flex-1 tracking-tight">
            {venue.name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-text-body mb-1.5">
          <span className="capitalize font-medium">{t.categories[venue.category] || venue.category}</span>
          {isOpen && (
            <>
              <span className="text-text-light">·</span>
              <span className="text-success font-semibold">{t.filters.openNow}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[15px] mb-1">
          <Star weight="fill" className="h-4 w-4 text-text-dark flex-shrink-0" />
          <span className="font-semibold text-text-dark">{venue.rating.toFixed(1)}</span>
          <span className="text-text-body">({venue.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 text-[15px] text-text-body">
          <span className="font-semibold text-text-dark">{venue.priceLevel}</span>
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
