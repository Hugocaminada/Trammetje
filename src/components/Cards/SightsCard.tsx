import React, {useState} from 'react'
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

const AudioTour = styled.Pressable`
  align-items: center;
  flex-direction: row;
  position: absolute;
  right: 20px;
  top: 25px;
`

const AudioText = styled.Text`
  font-size: 12px;
  textDecorationLine: underline;
  padding-right: 3px;
`

const SightsCard = ({position, stopsSortedByDirection}: Props) => {
  const [sightsAhead, setSightsAhead] = useState<Sight[] | undefined>([])
  const [stopsAhead, setStopsAhead] = useState<Stop[]>([])
  const [audioTour, setAudioTour] = useState<boolean>(false)

  const stopIndex = useAppSelector(state => state.journey.stopIndex)
  const departureStop = useAppSelector(state => state.journey.departureStop)
  const line = useAppSelector(state => state.journey.line)

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
    if (audioTour) {
      down.play((success) => {
        if (!success) {
          console.log('Sound did not play')
        }
      })
    } else {
      up.play((success) => {
        if (!success) {
          console.log('Sound did not play')
        }
      })
    }
  }

  useEffect(() => {
    sanityClient.fetch(`*[_type == "line" && number == "${line?.number}"]{
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
  }`)
  .then((data: Line[]) => {
    if (data[0].sights) {
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
    } else {
      setSightsAhead([])
    }
  })
  .catch(console.error)
  }, [line, position, stopsAhead])

  useEffect(() => {
    departureStop && stopsSortedByDirection && setStopsAhead(determainStopsAhead(stopsSortedByDirection[stopIndex - 1], stopsSortedByDirection))
  }, [departureStop, stopsSortedByDirection, stopIndex])

  if (sightsAhead?.length === 0) {return <Card title="Je rijdt niet meer langs bezienswaardigheden" centeredTitle={true}/>}

  return (
    <Card title="Je rijdt langs:">
      <AudioTour onPress={handlePress}>
        <AudioText>{audioTour ? 'Stop' : 'Start'} Audio Tour</AudioText>
      <Icon
        name={audioTour ? 'headphones' : 'headphones-off'}
        size={20}
        color={colors.darkGray}
      />
      </AudioTour>
      {sightsAhead?.map((sight, index) => (
        <SightItem sight={sight} key={index} index={index} />
      ))}
    </Card>
  )
}

export default SightsCard
