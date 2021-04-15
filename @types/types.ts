export type WithChildren<T = {}> = T & {children: React.ReactNode}

export type Line = {
  number: number
  directions: Array<string>
}

export type Stop = {
    name: string
    slug: string
    distance: number
    coordinates: {
      lat: string
      lon: string
    }
    lines: Line[]
  }
