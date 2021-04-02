import React from 'react'
import {ScrollView, Dimensions, Text} from 'react-native'
import styled from 'styled-components/native'
import Button from '../Button'
import Card from '../Card'
import GradientBackground from '../GradientBackground'

interface Props {}

const Homescreen: React.FC<Props> = ({}) => {
  // const isDarkMode = useColorScheme() === 'dark'

  const windowHeight = Dimensions.get('window').height

  const Spacer = styled.View`
    height: ${windowHeight / 2}px;
  `

  const MainContainer = styled.View`
    flex: 1;
    min-height: ${windowHeight}px;
    background-color: lightgrey;
    align-items: center;
  `

  const ButtonContainer = styled.View`
    position: absolute;
    align-self: center;
    top: -25px;
  `

  return (
    <GradientBackground>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Spacer />
        <MainContainer>
          <ButtonContainer>
            <Button label="Stap in" />
          </ButtonContainer>
          <Card>
            <Text>Teams</Text>
          </Card>
        </MainContainer>
      </ScrollView>
    </GradientBackground>
  )
}

export default Homescreen
