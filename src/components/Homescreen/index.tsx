import React, {useEffect, useState} from 'react'
import {ScrollView, Dimensions, Text} from 'react-native'
import styled from 'styled-components/native'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {colors} from '../../constants'
import {increment} from '../../features/counter/counterSlice'
import Card from '../Card'
import GradientBackground from '../GradientBackground'
import ModularButton from '../ModularButton'
import sanityClient from '../../client'

const windowHeight = Dimensions.get('window').height

const CounterText = styled.Text`
  position: absolute;
  align-self: center;
  padding-top: 100px;
  font-size: 30px;
`

const Spacer = styled.View`
  height: ${windowHeight / 2}px;
`

const MainContainer = styled.View`
  flex: 1;
  min-height: ${windowHeight}px;
  background-color: ${colors.gray};
  align-items: center;
  z-index: 2;
  padding-horizontal: 15px;
`

const ButtonContainer = styled.View`
  position: absolute;
  align-self: center;
  top: -25px;
  z-index: 2;
  margin-bottom: 100px;
`

const CardsContainer = styled.View`
  width: 100%;
  margin-top: 30px;
`

type Props = {
  componentId: string
}

const Homescreen = ({}: Props) => {
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
    console.log(allStops)
  }

  return (
    <GradientBackground>
      <CounterText>{count}</CounterText>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </GradientBackground>
  )
}

export default Homescreen
