import React from 'react'
import styled from 'styled-components/native'
import Card from './Card'
import {useAppSelector} from '../../app/hooks/redux'
import {colors} from '../../constants'

const MainContainer = styled.View`
  justify-content: space-between;
  padding: 20px;
`

const MainText = styled.Text`
  color: ${colors.red};
  margin-bottom: 10px;
  font-weight: bold;
`

const StatisticsCard = () => {
  const travelledJourneys = useAppSelector(
    state => state.user.travelledJourneys,
  )
  const seenAttractions = useAppSelector(state => state.user.seenAttractions)
  const savedCo2 = useAppSelector(state => state.user.savedCo2)

  return (
    <Card title="Jouw Statestieken">
      <MainContainer>
        <MainText>{travelledJourneys} Ritten</MainText>
        <MainText>{seenAttractions} Bezienswaardigheden gespot</MainText>
        <MainText>{savedCo2} gram Co2 bespaard</MainText>
      </MainContainer>
    </Card>
  )
}

export default StatisticsCard
