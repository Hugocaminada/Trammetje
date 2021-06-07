import React, {Dispatch, SetStateAction} from 'react'
import styled from 'styled-components/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useAppSelector } from '../../app/hooks/redux'
import {colors} from '../../constants'
import Modal from './Modal'
import ModularButton from '../ModularButton'


const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  padding-horizontal: 20px;
  padding-top: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`

const MainText = styled.Text`
  color: ${colors.red};
  font-size: 18px;
  font-weight: bold;
  padding-left: 8px;
`

const GreenText = styled.Text`
  color: ${colors.lightGreen};
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

type Props = {
  setModalVisible: Dispatch<SetStateAction<boolean>>
  stopJourney: () => void
}

const EndJourneyModal = ({setModalVisible, stopJourney}: Props) => {
    const user = useAppSelector(state => state.user)

  return (
    <Modal
      header="Bevestig uitstappen"
      subHeader="Weet je zeker dat je hier wil uitstappen?"
      setModalVisible={setModalVisible}
    >
      <MainContainer>
          <RowContainer>
            <Circle>
              <MaterialIcon name="tram" color={colors.white} size={25} />
            </Circle>
            <MainText>
              {user.travelledJourneys}{' '}
              <GreenText>+1</GreenText>{' '}
              {user.travelledJourneys === 1
              ? 'Rit'
              : 'Ritten'}
            </MainText>
          </RowContainer>
          <RowContainer>
            <Circle>
              <FontAwesomeIcon name="university" color={colors.white} size={20} />
            </Circle>
            <MainText>
              {user.seenAttractions}{' '}
              <GreenText>+2</GreenText>{' '}
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
            <MainText>{user.savedCo2} <GreenText>+50</GreenText> gram Co2 bespaard</MainText>
          </RowContainer>
          <ModularButton
            backgroundColor={colors.red}
            label="Stap uit"
            onPress={() => {
                stopJourney()
                setModalVisible(false)
            }}
          />
      </MainContainer>
    </Modal>
  )
}

export default EndJourneyModal
