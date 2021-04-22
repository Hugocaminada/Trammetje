import React, {useEffect, useState} from 'react'
import {Modal, ScrollView, Dimensions, Text, Pressable} from 'react-native'
import styled from 'styled-components/native'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {addDeparture} from '../../features/stop/stopSlice'
import {colors} from '../../constants'
import Card from '../Card'
import PhotoHeader from '../PhotoHeader'
import ModularButton from '../ModularButton'
import StopSelectionModal from './StopSelectionModal'
import sanityClient from '../../client'
import {sortStopsByDistance} from '../../methodes'
import type {Stop} from '../../../@types/types'
import DirectionsCard from './DirectionsCard'

const windowHeight = Dimensions.get('window').height

const Spacer = styled.View<{height: number}>`
  height: ${props => props.height}px;
`

const MainContainer = styled.View`
  flex: 1;
  height: ${windowHeight * 0.75}px;
  background-color: ${colors.lightGray};
  align-items: center;
  padding-horizontal: 15px;
  padding-top: 20px;
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

const StopConfirmationText = styled.Text<{fontWeight: number}>`
  text-align: center;
  font-weight: ${props => props.fontWeight};
  color: ${colors.darkGray};
`

const Homescreen = () => {
  const [
    stopSelectionModalVisible,
    setStopSelectionModalVisible,
  ] = useState<boolean>(false)
  const [stopsByDistance, setStopsByDistance] = useState<Stop[]>([])
  const [buttonText, setButtonText] = useState<string>('Kies je instaphalte')
  const [stopSelected, setStopSelected] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const departureStop = useAppSelector(state => state.travelStops.departureStop)

  useEffect(() => {
    // TODO: add loading state.
    sanityClient
      .fetch(
        `*[_type == "stop"]{
          name,
          slug,
          coordinates{
            lat,
            lon,
          },
          lines[]->,
      }`,
      )
      .then(data => {
        setStopsByDistance(
          sortStopsByDistance(
            // TODO: Hardcoded location for now, should be real location:
            {lat: 52.103449323791196, lon: 4.281814867056914},
            data,
          ),
        )
      })
      .catch(console.error)
  }, [])

  const setDepartureStop = (stop: Stop) => {
    setButtonText('Stap In')
    dispatch(addDeparture({...stop, direction: 0}))
    setStopSelected(true)
  }

  return (
    <>
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
                stopSelected
                  ? console.warn('volgende scherm moet ik nog maken')
                  : setStopSelectionModalVisible(true)
              }
            />
          </ButtonContainer>
          <CardsContainer>
            {
              // Here we also need to include a way for the user to select which tram line he is taking and pass that over to DirectionsCard.
              stopSelected && (
                <>
                  <Pressable onPress={() => setStopSelectionModalVisible(true)}>
                    <StopConfirmationText fontWeight={400}>
                      Instaphalte:{' '}
                      <StopConfirmationText fontWeight={500}>
                        {departureStop && departureStop.name}
                      </StopConfirmationText>
                    </StopConfirmationText>
                    <StopConfirmationText fontWeight={200}>
                      Kies andere instaphalte
                    </StopConfirmationText>
                  </Pressable>
                  <Spacer height={25} />
                  <DirectionsCard line={0} />
                </>
              )
            }
            <Card title="Teams:">
              <Text>{null}</Text>
            </Card>
          </CardsContainer>
        </MainContainer>
      </ScrollView>
    </>
  )
}

export default Homescreen
