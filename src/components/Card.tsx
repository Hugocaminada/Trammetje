import React from 'react'
import styled from 'styled-components/native'
import {WithChildren} from '../types'

type Props = WithChildren<{}>

const Card = ({children}: Props) => {
  const MainContainer = styled.View`
    background-color: white;
    border-radius: 15px;
    margin-vertical: 20%;
    padding: 5%;
    width: 95%;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  `

  return <MainContainer>{children}</MainContainer>
}

export default Card
