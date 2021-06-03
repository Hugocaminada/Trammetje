export type WithChildren<T = {}> = T & {children?: React.ReactNode}

export type Location = {
  name: string
  slug: {
    current: string,
  }
  distance: number
  coordinates: {
    lat: number
    lon: number
  }
}

export type Stop = Location & {
  lines: Line[]
  direction: number
}

export type Sight = Location & {
  description: string
  picture: string
  closestStop: Stop
}

export type Line = {
  number: number
  slug: {
    current: string,
  }
  directions: string[]
  color: string
  stops: Stop[]
  sights: Sight[]
}
