import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../constants'
import type {WithChildren} from '../types'

const MainContainer = styled.View`
  background-color: ${colors.white};
  border-radius: 15px;
  margin-top: 50px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`

type Props = WithChildren<{}>

const Card = ({children}: Props) => <MainContainer>{children}</MainContainer>

export default Card
