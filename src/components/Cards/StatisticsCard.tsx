import React from 'react'
import styled from 'styled-components/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Card from './Card'
import {useAppSelector} from '../../app/hooks/redux'
import {colors} from '../../constants'

const MainContainer = styled.View`
  justify-content: center;
  padding: 20px;
`

const MainText = styled.Text`
  color: ${colors.red};
  font-size: 18px;
  font-weight: bold;
  padding-left: 8px;
`

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 30px;
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
  const user = useAppSelector(state => state.user)

  return (
    <Card title="Jouw Statistieken">
      <MainContainer>
        <RowContainer>
          <Circle>
            <MaterialIcon name="tram" color={colors.white} size={25} />
          </Circle>
          <MainText>
            {user.travelledJourneys}{' '}
            {user.travelledJourneys === 1
                ? 'Rit'
                : 'Ritten'}{' '}
            </MainText>
        </RowContainer>
        <RowContainer>
          <Circle>
            <FontAwesomeIcon name="university" color={colors.white} size={20} />
          </Circle>
          <MainText>
            {user.seenAttractions}{' '}
            {user.seenAttractions === 1
              ? 'Bezienswaardigheid'
              : 'Bezienswaardigheden'}{' '}
            gespot
          </MainText>
        </RowContainer>
        <RowContainer>
          <Circle>
            <FontAwesomeIcon name="tree" color={colors.white} size={20} />
          </Circle>
          <MainText>{user.savedCo2} gram Co2 bespaard</MainText>
        </RowContainer>
      </MainContainer>
    </Card>
  )
}

export default StatisticsCard
