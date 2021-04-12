import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../constants'
import type {WithChildren} from '../../@types/types'

const MainContainer = styled.View`
  background-color: ${colors.white};
  border-radius: 15px;
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.purple};
  padding-bottom: 5px;
`

type Props = WithChildren<{title: string}>

const Card = ({children, title}: Props) => (
  <MainContainer>
    <Title>{title}:</Title>
    {children}
  </MainContainer>
)

export default Card
