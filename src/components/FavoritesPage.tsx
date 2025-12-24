import { useKV } from '@github/spark/hooks'
import { useLanguage } from '@/contexts/LanguageContext'
import { VenueCard } from '@/components/VenueCard'
import { venues } from '@/lib/venues-data'
import { toast } from 'sonner'
import { Heart } from '@phosphor-icons/react'

interface FavoritesPageProps {
  onVenueClick: (venueId: string) => void
}

export function FavoritesPage({ onVenueClick }: FavoritesPageProps) {
  const { t } = useLanguage()
  const [favorites, setFavorites] = useKV<string[]>('user-favorites', [])

  const favoriteVenues = venues.filter(venue => favorites?.includes(venue.id))

  const handleToggleFavorite = (venueId: string) => {
    setFavorites((currentFavorites) => {
      const isFavorited = currentFavorites?.includes(venueId)
      if (isFavorited) {
        toast.success(t.favorites.removedFromFavorites)
        return currentFavorites?.filter(id => id !== venueId) || []
      } else {
        toast.success(t.favorites.addedToFavorites)
        return [...(currentFavorites || []), venueId]
      }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-3">{t.favorites.title}</h1>
          <p className="text-text-body text-base">
            {favoriteVenues.length} {favoriteVenues.length === 1 ? t.results.place : t.results.places} {t.favorites.saved}
          </p>
        </div>

        {favoriteVenues.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <Heart size={80} className="mx-auto text-text-light/30" />
            </div>
            <h3 className="text-2xl font-semibold text-text-dark mb-3">No favorites yet</h3>
            <p className="text-base text-text-body max-w-md mx-auto">
              {t.favorites.noFavorites}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {favoriteVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                isFavorite={true}
                onToggleFavorite={() => handleToggleFavorite(venue.id)}
                onCardClick={onVenueClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
