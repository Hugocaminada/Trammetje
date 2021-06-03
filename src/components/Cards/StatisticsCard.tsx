import React from 'react'
import styled from 'styled-components/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Card from './Card'
import {useAppSelector} from '../../app/hooks/redux'
import {colors} from '../../constants'

const MainContainer = styled.View`
  justify-content: center;
  padding-horizontal: 20px;
`

const MainText = styled.Text`
  color: ${colors.red};
  font-size: 18px;
  font-weight: bold;
  margin-horizontal: 10px;
  padding-right: 5px;
`

const RowContainer = styled.View`
  align-items: center;
  flex-direction: row;
  min-height: 30px;
  margin-bottom: 10px;
`

const Circle = styled.View`
  background-color: ${colors.red};
  height: 30px;
  width: 30px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`

const StatisticsCard = () => {
  const travelledJourneys = useAppSelector(
    state => state.user.travelledJourneys,
  )
  const seenAttractions = useAppSelector(state => state.user.seenAttractions)
  const savedCo2 = useAppSelector(state => state.user.savedCo2)

  return (
    <Card title="Jouw Statistieken">
      <MainContainer>
        <RowContainer>
          <Circle>
            <MaterialIcon name="tram" color={colors.white} size={25} />
          </Circle>
          <MainText>{travelledJourneys} Ritten</MainText>
        </RowContainer>
        <RowContainer>
          <Circle>
            <FontAwesomeIcon name="university" color={colors.white} size={20} />
          </Circle>
          <MainText numberOfLines={2} adjustsFontSizeToFit>
            {seenAttractions}{' '}
            {seenAttractions === 1
              ? 'Bezienswaardigheid'
              : 'Bezienswaardigheden'}{' '}
            gespot
          </MainText>
        </RowContainer>
        <RowContainer>
          <Circle>
            <FontAwesomeIcon name="tree" color={colors.white} size={20} />
          </Circle>
          <MainText>{savedCo2} gram Co2 bespaard</MainText>
        </RowContainer>
      </MainContainer>
    </Card>
  )
}

export default StatisticsCard
