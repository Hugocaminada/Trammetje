import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../constants'
import type {WithChildren} from '../types'

type Props = WithChildren<{}>

const Card = ({children}: Props) => {
  const MainContainer = styled.View`
    background-color: ${colors.white};
    border-radius: 15px;
    margin-top: 50px;
    padding: 20px;
    width: 100%;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  `

  return <MainContainer>{children}</MainContainer>
}

export default Card
