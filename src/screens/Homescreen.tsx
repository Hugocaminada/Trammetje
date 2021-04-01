import React from 'react'
// import {useColorScheme} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: red;
`

interface Props {}
const App = ({}: Props) => {
  // const isDarkMode = useColorScheme() === 'dark'
  return (
    <Container>
      <MainText>Hello world</MainText>
    </Container>
  )
}

export default App
