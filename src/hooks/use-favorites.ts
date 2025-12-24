import { useKV } from '@github/spark/hooks'

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useKV<string[]>('favorite-venue-ids', [])

  const toggleFavorite = (venueId: string) => {
    setFavoriteIds((current) => {
      const currentIds = current ?? []
      if (currentIds.includes(venueId)) {
        return currentIds.filter((id) => id !== venueId)
      }
      return [...currentIds, venueId]
    })
  }

  const isFavorite = (venueId: string) => {
    return (favoriteIds ?? []).includes(venueId)
  }

  const addFavorite = (venueId: string) => {
    setFavoriteIds((current) => {
      const currentIds = current ?? []
      if (!currentIds.includes(venueId)) {
        return [...currentIds, venueId]
      }
      return currentIds
    })
  }

  const removeFavorite = (venueId: string) => {
    setFavoriteIds((current) => (current ?? []).filter((id) => id !== venueId))
  }

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  }
}
