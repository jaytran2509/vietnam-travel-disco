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
  const [isHovered, setIsHovered] = useState(false)
  
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
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-white hover-lift"
          onClick={() => onCardClick(venue.id)}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-56 h-44 md:h-auto overflow-hidden">
              <motion.img
                src={venue.coverImage}
                alt={venue.name}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center"
              >
                <Badge className="glass-strong text-white border-white/30 px-4 py-2 text-sm font-semibold">
                  {t.venue.viewDetails}
                </Badge>
              </motion.div>

              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  'absolute top-3 right-3 h-10 w-10 glass-strong hover:bg-white/90 shadow-xl transition-all duration-300 hover:scale-110 border border-white/30',
                  isFavorite && 'gradient-accent border-0',
                  heartAnimation && 'animate-heartBeat'
                )}
                onClick={handleFavoriteClick}
              >
                <Heart 
                  weight={isFavorite ? 'fill' : 'regular'} 
                  className={cn("h-5 w-5", isFavorite ? "text-white" : "text-foreground")} 
                />
              </Button>
            </div>

            <div className="flex-1 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-gradient-primary transition-all duration-300 text-foreground">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge 
                      variant="secondary" 
                      className="capitalize text-xs px-3 py-1 gradient-primary text-white font-semibold border-0 shadow-sm"
                    >
                      {venue.category}
                    </Badge>
                    {isOpen && (
                      <Badge className="gradient-accent text-white text-xs px-3 py-1 font-semibold border-0 shadow-sm animate-pulse">
                        {t.filters.openNow}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                {venue.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star weight="fill" className="h-4 w-4 text-accent" />
                  <span className="font-bold text-foreground">{venue.rating}</span>
                  <span className="text-muted-foreground text-xs">({venue.reviewCount})</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-bold text-foreground">{venue.priceLevel}</span>
                  <span className="text-xs">·</span>
                  <span className="text-xs">{venue.cuisineType || venue.category}</span>
                </div>

                {distance !== null && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" weight="fill" />
                    <span className="text-xs font-medium">{formatDistance(distance)}</span>
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-white rounded-2xl"
        onClick={() => onCardClick(venue.id)}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={venue.coverImage}
            alt={venue.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center"
          >
            <Badge className="glass-strong text-white border-white/30 px-4 py-2 text-sm font-semibold shadow-xl">
              {t.venue.viewDetails}
            </Badge>
          </motion.div>
          
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'absolute top-3 right-3 h-10 w-10 glass-strong hover:bg-white/90 shadow-xl transition-all duration-300 hover:scale-110 border border-white/30',
              isFavorite && 'gradient-accent border-0',
              heartAnimation && 'animate-heartBeat'
            )}
            onClick={handleFavoriteClick}
          >
            <Heart
              weight={isFavorite ? 'fill' : 'regular'}
              className={cn("h-5 w-5", isFavorite ? "text-white" : "text-foreground")}
            />
          </Button>

          {isOpen && (
            <Badge className="absolute top-3 left-3 gradient-accent text-white text-xs px-3 py-1.5 font-semibold shadow-xl border-0 animate-pulse">
              {t.filters.openNow}
            </Badge>
          )}

          <div className="absolute bottom-3 left-3">
            <Badge 
              variant="secondary" 
              className="capitalize glass-strong text-white border-white/30 text-xs px-3 py-1.5 font-semibold shadow-xl backdrop-blur-xl"
            >
              {venue.category}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-heading text-base font-bold mb-2 line-clamp-1 group-hover:text-gradient-primary transition-all duration-300 text-foreground">
            {venue.name}
          </h3>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-1">
              <Star weight="fill" className="h-4 w-4 text-accent" />
              <span className="font-bold text-sm text-foreground">{venue.rating}</span>
            </div>
            <span className="text-muted-foreground text-xs">
              ({venue.reviewCount})
            </span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="font-bold text-sm text-foreground">{venue.priceLevel}</span>
          </div>

          {distance !== null && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5" weight="fill" />
              <span className="font-medium">{formatDistance(distance)}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
