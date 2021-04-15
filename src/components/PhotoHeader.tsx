import React from 'react'
import {Dimensions} from 'react-native'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

const windowHeight = Dimensions.get('window').height

const MainContainer = styled.View`
  flex: 1;
`

const StyledGradient = styled(LinearGradient)`
  position: absolute;
  flex: 1;
  z-index: 10;
  height: 100px;
  width: 100%;
`

const HeaderImage = styled.Image`
  width: 100%;
  height: ${windowHeight * 0.25}px;
`

const Content = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const PhotoHeader = () => (
  <MainContainer>
    <HeaderImage source={require('../assets/header-image.jpg')} />
    <StyledGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']} />
  </MainContainer>
)

export default PhotoHeader
