import React from 'react'
import styled from 'styled-components/native'
import Card from './Card'
import {useAppSelector} from '../../app/hooks/redux'
import {colors} from '../../constants'

const MainContainer = styled.View`
  justify-content: center;
  padding: 20px;
`

const SightsCard = () => {
  return (
    <Card title="Je rijdt langs:">
      <MainContainer></MainContainer>
    </Card>
  )
}

export default SightsCard
