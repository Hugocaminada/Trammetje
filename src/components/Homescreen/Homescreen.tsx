import React from 'react'
import {ScrollView, Dimensions} from 'react-native'
import styled from 'styled-components/native'
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
    align-self: stretch;
    width: 500px;
    min-height: ${windowHeight}px;
    background-color: lightgrey;
  `

  return (
    <GradientBackground>
      <ScrollView>
        <Spacer />
        <MainContainer />
      </ScrollView>
    </GradientBackground>
  )
}

export default Homescreen
