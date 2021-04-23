import { Stop } from '../@types/types'

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

export const sortStopsByDistance = (currentPos:{lat: number, lon: number}, stops: Stop[]) => {
  for (let i = 0; i < stops.length; i++) {
    stops[i].distance = calculateDistance(currentPos.lat, currentPos.lon, stops[i].coordinates.lat, stops[i].coordinates.lon)
  }

  return stops.sort((a, b) => a.distance - b.distance)
}
