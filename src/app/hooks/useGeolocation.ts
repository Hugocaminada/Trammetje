import { useState, useEffect } from 'react'
import Geolocation, {GeolocationError} from '@react-native-community/geolocation'

interface GeolocationData {
  latitude: number;
  longitude: number;
}

export const useGeolocation = (): [GeolocationError | null, GeolocationData] => {
  const [error, setError] = useState<GeolocationError | null>(null)
  const [position, setPosition] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setError(null)
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      },
      e => setError(e),
      {
        enableHighAccuracy: true,
      }
    )
    return () => Geolocation.clearWatch(watchId)
  }, [])

  return [error, position]
}
