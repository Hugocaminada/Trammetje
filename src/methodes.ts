import { Location, Stop } from '../@types/types'
import { GeolocationData } from './app/hooks/useGeolocation'

const Deg2Rad = (deg: number) => deg * Math.PI / 180

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
  const tempLocations = locations
  for (let i = 0; i < tempLocations.length; i++) {
    tempLocations[i].distance = calculateDistance(currentPos.latitude, currentPos.longitude, tempLocations[i].coordinates.lat, tempLocations[i].coordinates.lon)
  }
  return tempLocations.sort((a, b) => a.distance - b.distance)
}

export const lookForStopIndex = (stops: Stop[] | undefined, stopToFindIndexFor: Stop | undefined) : number => {
  let DepartureStopIndex = 0
  stops?.map((stop, index) => {
    if (stop.slug.current === stopToFindIndexFor?.slug.current) {
      DepartureStopIndex = index
    }
  })
  return DepartureStopIndex
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
