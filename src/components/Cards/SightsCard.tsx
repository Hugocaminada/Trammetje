import React, {useState} from 'react'
import {useQuery} from 'react-query'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Sound from 'react-native-sound'
import styled from 'styled-components/native'
import Card from './Card'
import sanityClient from '../../client'
import type {Line, Sight, Stop} from '../../../@types/types'
import {GeolocationData} from '../../app/hooks/useGeolocation'
import {useEffect} from 'react'
import {determainStopsAhead, sortLocationsByDistance} from '../../methodes'
import SightItem from '../Sight'
import { useAppSelector } from '../../app/hooks/redux'
import { colors } from '../../constants'

type Props = {
  position: GeolocationData
  stopsSortedByDirection?: Stop[]
}

const Headphones = styled(Icon)`
  position: absolute;
  right: 20px;
  top: 20px;
`

const SightsCard = ({position, stopsSortedByDirection}: Props) => {
  const [sightsAhead, setSightsAhead] = useState<Sight[] | undefined>([])
  const [stopsAhead, setStopsAhead] = useState<Stop[]>([])
  const [audioTour, setAudioTour] = useState<boolean>(false)

  const departureStop = useAppSelector(state => state.journey.departureStop)
  const up = new Sound('up.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load sound', error)
      return
    }
  })

  const down = new Sound('down.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load sound', error)
      return
    }
  })


  const handlePress = () => {
    setAudioTour(prev => !prev)
    if (!audioTour) {
      up.play((success) => {
        if (!success) {
          console.log('Sound did not play')
        }
      })
    } else {
      down.play((success) => {
        if (!success) {
          console.log('Sound did not play')
        }
      })
    }
  }

  const {data} = useQuery<Line[]>('lines', async () =>
    sanityClient.fetch(`*[_type == "line" && number == "1"]{
        number,
        sights[]->{
          closestStop->,
          coordinates{
            lat,
            lon,
          },
          name,
          picture,
          description,
        },
    }`),
  )

  useEffect(() => {
    departureStop && stopsSortedByDirection && setStopsAhead(determainStopsAhead(departureStop, stopsSortedByDirection))
  }, [departureStop, stopsSortedByDirection])

  useEffect(() => {
    const sightsByDistance = data && sortLocationsByDistance(position, data[0].sights)
    const allSightsAhead = sightsByDistance?.filter(sight => {
      for (var i = 0; i < stopsAhead.length; i++ ) {
        // I tried to do `return stopsAhead[i].slug.current === sight.closestStop.slug.current` here but it doesn't work..?
        if (stopsAhead[i].slug.current === sight.closestStop.slug.current) {
          return true
        }
      }
    })

    setSightsAhead(allSightsAhead)
  }, [data, position, stopsAhead])

  return (
    <Card title="Je rijdt langs:">
      <Headphones
        name={audioTour ? 'headphones' : 'headphones-off'}
        size={20}
        color={colors.darkGray}
        onPress={handlePress}
      />
      {sightsAhead?.map((sight, index) => (
        <SightItem sight={sight} key={index} index={index} />
      ))}
    </Card>
  )
}

export default SightsCard
