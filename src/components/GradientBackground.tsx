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
  background-color: rgba(132, 176, 235, 0.8);
`
const Content = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

interface Props {
  // Not sure on the type here. Should accept any react components.
  children: any
}

const GradientBackground: React.FC<Props> = ({children}) => {
  return (
    <MainContainer>
      <LinearGradient
        colors={[
          '#56CCF2',
          'rgba(132, 176, 235, 0.8)',
          'rgba(132, 176, 235, 0.8)',
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

export default GradientBackground
