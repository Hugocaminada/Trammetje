import React from 'react'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

const MainContainer = styled.View`
  flex: 1;
  background-color: red;
`

const BottomHalf = styled.View`
  flex: 1;
  background-color: #e0e0e0;
`
const Content = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

interface Props {
  children: any
}

const Background: React.FC<Props> = ({children}) => {
  // const isDarkMode = useColorScheme() === 'dark'

  return (
    <MainContainer>
      <LinearGradient
        colors={[
          '#56CCF2',
          'rgba(187, 107, 217, 0.7)',
          'rgba(187, 107, 217, 0.6)',
        ]}
        style={styles.linearGradient}
      />
      <BottomHalf />
      <Content>{children}</Content>
    </MainContainer>
  )
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
})

export default Background
