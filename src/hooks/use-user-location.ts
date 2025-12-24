import { useState, useEffect } from 'react'
import type { Coordinates } from '@/lib/types'

export function useUserLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
        setLocation({ lat: 10.7769, lng: 106.7009 })
      }
    )
  }, [])

  return { location, loading, error }
}
