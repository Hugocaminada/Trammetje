import React, {useEffect, useState} from 'react'
import {Modal, ScrollView, Dimensions, Pressable} from 'react-native'
import {useQuery} from 'react-query'
import styled from 'styled-components/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {useAppDispatch, useAppSelector} from '../../app/hooks/redux'
import {addDeparture} from '../../slices/journeySlice'
import {colors} from '../../constants'
import PhotoHeader from '../PhotoHeader'
import ModularButton from '../ModularButton'
import StopSelectionModal from './DepartureStopSelectionModal'
import sanityClient from '../../client'
import {sortStopsByDistance} from '../../methodes'
import type {Stop} from '../../../@types/types'
import DirectionsCard from '../Cards/DirectionsCard'
import {useGeolocation} from '../../app/hooks/useGeolocation'
import StatisticsCard from '../Cards/StatisticsCard'
import DestinationStopSelector from '../DestinationStopSelector'
import {DisclaimerText} from '../TextTypes'

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
  const [
    stopSelectionModalVisible,
    setStopSelectionModalVisible,
  ] = useState<boolean>(false)
  const [stopsByDistance, setStopsByDistance] = useState<Stop[]>([])
  const [buttonText, setButtonText] = useState<string>('Kies je instaphalte')
  const [departureStopSelected, setDepartureStopSelected] = useState<boolean>(
    false,
  )
  const [
    destinationStopSelected,
    setDestinationStopSelected,
  ] = useState<boolean>(false)
  const [journeyStarted, setJourneyStarted] = useState<boolean>(false)
  const [error, position] = useGeolocation()

  const dispatch = useAppDispatch()
  const departureStop = useAppSelector(state => state.journey.departureStop)

  const {data, isLoading} = useQuery<Stop[]>('stops', async () =>
    sanityClient.fetch(
      `*[_type == "stop"]{
        name,
        slug,
        coordinates{
          lat,
          lon,
        },
        lines[]->{
          stops[]->,
          directions,
          number,
          color,
          slug,
        },
    }`,
    ),
  )

  useEffect(() => {
    if (data && position) {
      setStopsByDistance(sortStopsByDistance(position, data))
    }
  }, [data, position])

  const setDepartureStop = (stop: Stop) => {
    setButtonText('Stap In')
    dispatch(addDeparture({...stop, direction: 0}))
    setDepartureStopSelected(true)
  }

  const startJourney = () => {
    setJourneyStarted(true)
    setButtonText('Stap uit')
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
      <PhotoHeader />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Spacer height={windowHeight * 0.25} />
        <MainContainer>
          <ButtonContainer>
            <ModularButton
              label={buttonText}
              backgroundColor={colors.red}
              onPress={() =>
                departureStopSelected
                  ? startJourney()
                  : setStopSelectionModalVisible(true)
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
            {departureStopSelected && !destinationStopSelected && (
              <DirectionsCard />
            )}
            {journeyStarted && (
              <DestinationStopSelector
                setDestionationStopSelected={setDestinationStopSelected}
              />
            )}
            <StatisticsCard />
          </CardsContainer>
        </MainContainer>
      </ScrollView>
    </>
  )
}

export default Homescreen
