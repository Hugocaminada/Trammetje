import { Location, Stop } from '../@types/types'
import { GeolocationData } from './app/hooks/useGeolocation'

const Deg2Rad = (deg: number) => deg * Math.PI / 180

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  lat1 = Deg2Rad(lat1)
  lat2 = Deg2Rad(lat2)
  lon1 = Deg2Rad(lon1)
  lon2 = Deg2Rad(lon2)
  var R = 6371 // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2)
  var y = (lat2 - lat1)
  var d = Math.sqrt(x * x + y * y) * R
  return d
}

export const sortLocationsByDistance = <T extends Location>(currentPos: GeolocationData, locations: T[]) => {
  for (let i = 0; i < locations.length; i++) {
    locations[i].distance = calculateDistance(currentPos.latitude, currentPos.longitude, locations[i].coordinates.lat, locations[i].coordinates.lon)
  }
  return locations.sort((a, b) => a.distance - b.distance)
}


export const determainStopsAhead = (closestStop: Stop, stopsList: Stop[]): Stop[] => {
  let stopsAhead: Stop[] = []
  stopsList.map((stop, index) => {
    if (stop.slug.current === closestStop.slug.current) {
      stopsAhead = stopsList?.slice(index + 1)
    }
  })
  return stopsAhead
}
