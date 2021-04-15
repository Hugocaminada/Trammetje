import React, {useEffect, useState} from 'react'
import {Modal, ScrollView, Dimensions, Text} from 'react-native'
import styled from 'styled-components/native'
// import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {colors} from '../../constants'
import Card from '../Card'
import GradientBackground from '../ImageHeader'
import ModularButton from '../ModularButton'
import StopSelectionModal from './StopSelectionModal'
import sanityClient from '../../client'
import {sortStopsByDistance} from '../../methodes'

const windowHeight = Dimensions.get('window').height

const Spacer = styled.View<{height: number}>`
  height: ${props => props.height}px;
`

const MainContainer = styled.View`
  flex: 1;
  height: ${windowHeight * 0.75}px;
  background-color: ${colors.gray};
  align-items: center;
  padding-horizontal: 15px;
  margin-bottom: 0px;
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

type Line = {
  number: number
  directions: Array<string>
}

type Stop = {
  name: string
  slug: string
  coordinates: {
    lat: string
    lon: string
  }
  lines: Line[]
}

const Homescreen = (): JSX.Element => {
  // const isDarkMode = useColorScheme() === 'dark'

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [stopsByDistance, setStopsByDistance] = useState<Stop[]>()

  useEffect(() => {
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
            {lat: 52.103449323791196, lon: 4.281814867056914},
            data,
          ),
        )
      })
      .catch(console.error)
  }, [])

  // const count = useAppSelector(state => state.counter.value)
  // const dispatch = useAppDispatch()

  return (
    <GradientBackground>
      <>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false)
          }}
          transparent={true}
          presentationStyle="overFullScreen">
          <StopSelectionModal
            setModalVisable={setModalVisible}
            stopsByDistance={stopsByDistance}
          />
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Spacer height={windowHeight * 0.25} />
          <MainContainer>
            <ButtonContainer>
              <ModularButton
                label="Stap in"
                backgroundColor={colors.red}
                onPress={() => setModalVisible(true)}
              />
            </ButtonContainer>
            <CardsContainer>
              <Card title="Teams">
                <Text>Test</Text>
              </Card>
            </CardsContainer>
          </MainContainer>
        </ScrollView>
      </>
    </GradientBackground>
  )
}

export default Homescreen
