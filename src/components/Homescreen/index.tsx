import React from 'react'
import {ScrollView, Dimensions, Text, Button} from 'react-native'
import styled from 'styled-components/native'
import Card from '../Card'
import GradientBackground from '../GradientBackground'
import ModularButton from '../ModularButton'

interface Props {
  componentId: string
}

const windowHeight = Dimensions.get('window').height

const Spacer = styled.View`
  height: ${windowHeight / 2}px;
`

const MainContainer = styled.View`
  flex: 1;
  min-height: ${windowHeight}px;
  background-color: lightgrey;
  align-items: center;
  z-index: 2;
`

const ButtonContainer = styled.View`
  position: absolute;
  align-self: center;
  top: -25px;
  z-index: 2;
`

const TestContainer = styled.View`
  position: absolute;
  align-self: center;
  padding-top: 20px;
  z-index: 1;
`

const Homescreen: React.FC<Props> = ({}) => {
  // const isDarkMode = useColorScheme() === 'dark'

  return (
    <GradientBackground>
      <TestContainer>
        <Button title="test" onPress={() => console.log('test')} />
      </TestContainer>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Spacer />
        <MainContainer>
          <ButtonContainer>
            <ModularButton label="Stap in" />
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
