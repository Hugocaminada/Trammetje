export type WithChildren<T = {}> = T & {children: React.ReactNode}

export type Line = {
  number: number
  slug: {
    current: string,
  }
  directions: Array<string>
  color: string
  stops: Array<Stop>
}

export type Stop = {
    name: string
    slug: {
      current: string,
    }
    distance: number
    coordinates: {
      lat: number
      lon: number
    }
    lines: Line[]
    direction: number
  }
