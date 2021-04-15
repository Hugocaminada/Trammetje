import React from 'react'
import {Dimensions} from 'react-native'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import type {WithChildren} from '../../@types/types'

const windowHeight = Dimensions.get('window').height

const MainContainer = styled.View`
  flex: 1;
  background-color: red;
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

type Props = WithChildren<{}>

const GradientBackground = ({children}: Props) => (
  <MainContainer>
    <HeaderImage source={require('../assets/header-image.jpg')} />
    <StyledGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']} />
    <Content>{children}</Content>
  </MainContainer>
)

export default GradientBackground
