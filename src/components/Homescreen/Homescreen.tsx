import React from 'react'
import styled from 'styled-components/native'
import Background from '../Background'

interface Props {}

const Homescreen: React.FC<Props> = ({}) => {
  // const isDarkMode = useColorScheme() === 'dark'

  const TestText = styled.Text`
    position: absolute;
    top: 40%;
    align-self: center;
  `

  return (
    <Background>
      <TestText>Test</TestText>
    </Background>
  )
}

export default Homescreen
