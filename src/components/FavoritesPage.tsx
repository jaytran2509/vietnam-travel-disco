import { useKV } from '@github/spark/hooks'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/contexts/ToastContext'
import { VenueCard } from '@/components/VenueCard'
import { venues } from '@/lib/venues-data'
import { Heart } from '@phosphor-icons/react'

interface FavoritesPageProps {
  onVenueClick: (venueId: string) => void
}

export function FavoritesPage({ onVenueClick }: FavoritesPageProps) {
  const { t } = useLanguage()
  const toast = useToast()
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">{t.favorites.title}</h1>
          <p className="text-text-body text-sm">
            {favoriteVenues.length} {favoriteVenues.length === 1 ? t.results.place : t.results.places} {t.favorites.saved}
          </p>
        </div>

        {favoriteVenues.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-5">
              <Heart size={64} className="mx-auto text-text-light/30" />
            </div>
            <h3 className="text-xl font-semibold text-text-dark mb-2">No favorites yet</h3>
            <p className="text-sm text-text-body max-w-md mx-auto">
              {t.favorites.noFavorites}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
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
