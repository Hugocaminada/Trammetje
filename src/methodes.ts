const Deg2Rad = (deg) => deg * Math.PI / 180

const PythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
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

export const getClosedStops = (currentPos, stops) => {
    var minDif = 99999
    var closest

    for (let index = 0; index < stops.length; ++index) {
      var dif = PythagorasEquirectangular(currentPos.lat, currentPos.lon, stops[index].coordinates.lat, stops[index].coordinates.lon)
      if (dif < minDif) {
        closest = index
        minDif = dif
      }
    }
    return stops[closest]
}
