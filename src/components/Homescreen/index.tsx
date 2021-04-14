import React, {useEffect, useState} from 'react'
import {Dimensions, Text} from 'react-native'
import styled from 'styled-components/native'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {colors} from '../../constants'
import {increment} from '../../features/counter/counterSlice'
import Card from '../Card'
import GradientBackground from '../GradientBackground'
import ModularButton from '../ModularButton'
import sanityClient from '../../client'
import {getClosedStops} from '../../methodes'

const windowHeight = Dimensions.get('window').height

const CounterText = styled.Text`
  position: absolute;
  align-self: center;
  padding-top: 100px;
  font-size: 30px;
`

const Spacer = styled.View`
  height: ${windowHeight * 0.25}px;
`

const WrapperView = styled.ScrollView`
  flex: 1;
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

const Homescreen = () => {
  // const isDarkMode = useColorScheme() === 'dark'

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
    lines: Array<Line>
  }

  const [allStops, setAllStops] = useState<Stop[] | undefined>(undefined)

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
        setAllStops(data)
      })
      .catch(console.error)
  }, [])

  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  if (allStops) {
    getClosedStops({lat: 52.103449323791196, lon: 4.281814867056914}, allStops)
  }

  return (
    <GradientBackground>
      <CounterText>{count}</CounterText>
      <WrapperView>
        <Spacer />
        <MainContainer>
          <ButtonContainer>
            <ModularButton
              label="Stap in"
              backgroundColor={colors.purple}
              onPress={() => dispatch(increment())}
            />
          </ButtonContainer>
          <CardsContainer>
            <Card title="Teams">
              <Text>Test</Text>
            </Card>
          </CardsContainer>
        </MainContainer>
      </WrapperView>
    </GradientBackground>
  )
}

export default Homescreen
