import React from 'react'
import {ScrollView, Dimensions, Text} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import Card from '../Card'
import GradientBackground from '../GradientBackground'
import ModularButton from '../ModularButton'

const windowHeight = Dimensions.get('window').height

const Spacer = styled.View`
  height: ${windowHeight / 2}px;
`

const MainContainer = styled.View`
  flex: 1;
  min-height: ${windowHeight}px;
  background-color: ${colors.gray};
  align-items: center;
  z-index: 2;
`

const ButtonContainer = styled.View`
  position: absolute;
  align-self: center;
  top: -25px;
  z-index: 2;
`

type Props = {}

const Homescreen = ({}: Props) => {
  // const isDarkMode = useColorScheme() === 'dark'

  return (
    <GradientBackground>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Spacer />
        <MainContainer>
          <ButtonContainer>
            <ModularButton
              label="Stap in"
              backgroundColor={colors.purple}
              onPress={() => {
                console.log('pressed')
              }}
            />
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
