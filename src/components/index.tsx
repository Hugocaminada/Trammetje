import React, {useEffect, useState} from 'react'
import {Modal, ScrollView, Dimensions, Pressable} from 'react-native'
import {useQuery} from 'react-query'
import styled from 'styled-components/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {useAppDispatch, useAppSelector} from '../app/hooks/redux'
import {addDeparture, incrementStopIndex, resetJourney, setStopIndex} from '../slices/journeySlice'
import {addTravelledJourney, addSeenAttraction, addSavedCo2} from '../slices/userSlice'
import {colors} from '../constants'
import PhotoHeader from './PhotoHeader'
import ModularButton from './ModularButton'
import StopSelectionModal from './Modals/DepartureStopSelectionModal'
import sanityClient from '../client'
import {calculateDistance, lookForStopIndex, sortLocationsByDistance} from '../methodes'
import type {Stop} from '../../@types/types'
import DirectionsCard from './Cards/DirectionsCard'
// import {useGeolocation} from '../app/hooks/useGeolocation'
import StatisticsCard from './Cards/StatisticsCard'
import DestinationStopSelector from './DestinationStopSelector'
import {DisclaimerText} from './TextTypes'
import SightsCard from './Cards/SightsCard'
import EndJourneyModal from './Modals/EndJourneyModal'

const windowHeight = Dimensions.get('window').height

const Spacer = styled.View<{height: number}>`
  height: ${props => props.height}px;
`

const MainContainer = styled.View`
  flex: 1;
  min-height: ${windowHeight * 0.75}px;
  background-color: ${colors.lightGray};
  padding-bottom: 40px;
`

const ButtonContainer = styled.View`
  position: absolute;
  align-self: center;
  top: -25px;
`

const CardsContainer = styled.View`
  width: 100%;
  margin-top: 30px;
`

const Homescreen = () => {
  const [stopSelectionModalVisible, setStopSelectionModalVisible] = useState<boolean>(false)
  const [endJourneyModalVisible, setEndJourneyModalVisible] = useState<boolean>(false)
  const [stopsByDistance, setStopsByDistance] = useState<Stop[]>([])
  const [buttonText, setButtonText] = useState<string>('Kies je instaphalte')
  const [departureStopSelected, setDepartureStopSelected] = useState<boolean>(false)
  const [destinationStopSelected, setDestinationStopSelected] = useState<boolean>(false)
  const [journeyStarted, setJourneyStarted] = useState<boolean>(false)

  // const [error, position] = useGeolocation()

  // use pre-defined position at DEN HAAG HS for testing purpuses.
  const position = {latitude: 52.0701530527062,longitude: 4.32175356255003}
  const error = ''

  const dispatch = useAppDispatch()

  const departureStop = useAppSelector(state => state.journey.departureStop)
  const line = useAppSelector(state => state.journey.line)
  const stopIndex = useAppSelector(state => state.journey.stopIndex)

  const reversedStops = line?.stops?.slice().reverse()
  const stopsSortedByDirection = departureStop?.direction ? line?.stops : reversedStops

  const {data, isLoading} = useQuery<Stop[]>('stops', async () => (
    sanityClient.fetch(
      `*[_type == "stop"]{
        name,
        slug,
        coordinates{
          lat,
          lon,
        },
    }`,
    )
  ))

  // Effect updates when departure stop, departure line or current position changes
  useEffect(() => {
    if (data && position && !journeyStarted) {
      setStopsByDistance(sortLocationsByDistance(position, data))
    }

    // Look for distance from current position to next stop
    if (stopsSortedByDirection && departureStop && journeyStarted) {
      const currentStopIndex = lookForStopIndex(stopsSortedByDirection, stopsSortedByDirection[stopIndex])
      const distance = calculateDistance(
        stopsSortedByDirection[currentStopIndex + 1]?.coordinates.lat,
        stopsSortedByDirection[currentStopIndex + 1]?.coordinates.lon,
        position.latitude,
        position.longitude
      )
      console.log(distance.toFixed(2) + 'km tot volgende halte:' + stopsSortedByDirection[currentStopIndex + 1]?.name)
      if (distance <= 0.1) {
        dispatch(incrementStopIndex())
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, departureStop, journeyStarted, position, stopIndex, stopsSortedByDirection])

  const setDepartureStop = (stop: Stop) => {
    setButtonText('Stap In')
    dispatch(addDeparture({...stop, direction: 0}))
    setDepartureStopSelected(true)
  }

  const startJourney = () => {
    setJourneyStarted(true)
    setButtonText('Stap uit')
    const departureStopIndex = lookForStopIndex(stopsSortedByDirection, departureStop)
    dispatch(setStopIndex(departureStopIndex))
  }

  const stopJourney = () => {
    setJourneyStarted(false)
    setDestinationStopSelected(false)
    setDepartureStopSelected(false)
    setButtonText('Kies je instaphalte')
    dispatch(addTravelledJourney())
    dispatch(addSeenAttraction(2))
    dispatch(addSavedCo2(50))
    dispatch(resetJourney())
  }

  if (error) {
    console.warn(error)
  }

  return (
    <>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        // eslint-disable-next-line react-native/no-inline-styles
        textStyle={{color: 'white'}}
      />
      <Modal
        animationType="slide"
        visible={stopSelectionModalVisible}
        onRequestClose={() => {
          setStopSelectionModalVisible(false)
        }}
        transparent={true}>
        <StopSelectionModal
          setModalVisible={setStopSelectionModalVisible}
          stopsByDistance={stopsByDistance}
          setDepartureStop={setDepartureStop}
        />
      </Modal>
      <Modal
       animationType="slide"
       visible={endJourneyModalVisible}
       onRequestClose={() => {
        setEndJourneyModalVisible(false)
      }}
      transparent={true}>
         <EndJourneyModal
          setModalVisible={setEndJourneyModalVisible}
          stopJourney={stopJourney}
         />
         </Modal>
      <PhotoHeader />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Spacer height={windowHeight * 0.25} />
        <MainContainer>
          <ButtonContainer>
            <ModularButton
              label={buttonText}
              backgroundColor={colors.red}
              onPress={() =>
                departureStopSelected && !journeyStarted
                  ? startJourney() :
                journeyStarted ?
                  setEndJourneyModalVisible(true) :
                  setStopSelectionModalVisible(true)
              }
            />
          </ButtonContainer>
          <CardsContainer>
            {departureStopSelected && !journeyStarted && (
              <>
                <Pressable onPress={() => setStopSelectionModalVisible(true)}>
                  <DisclaimerText fontWeight={400}>
                    Instaphalte:{' '}
                    <DisclaimerText fontWeight={500}>
                      {departureStop?.name}
                    </DisclaimerText>
                  </DisclaimerText>
                  <DisclaimerText fontWeight={200}>
                    Kies andere instaphalte
                  </DisclaimerText>
                </Pressable>
              </>
            )}
            {departureStopSelected && !destinationStopSelected && !journeyStarted && (
              <DirectionsCard journeyStarted={journeyStarted} />
            )}
            {journeyStarted && (
              <>
                <DestinationStopSelector
                  stopsSortedByDirection={stopsSortedByDirection}
                  setDestionationStopSelected={setDestinationStopSelected}
                  moveToNextStop={() => dispatch(incrementStopIndex())}
                  stopJourney={() => setEndJourneyModalVisible(true)}
                />
                <SightsCard position={position} stopsSortedByDirection={stopsSortedByDirection}/>
              </>
            )}
            <StatisticsCard />
          </CardsContainer>
        </MainContainer>
      </ScrollView>
    </>
  )
}

export default Homescreen
