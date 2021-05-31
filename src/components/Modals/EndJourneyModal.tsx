import React, {Dispatch, SetStateAction} from 'react'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import Modal from './Modal'


const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`

const HeaderText = styled.Text`
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${colors.gray};
`

type Props = {
  setModalVisible: Dispatch<SetStateAction<boolean>>
  stopJourney: () => void
}

const EndJourneyModal = ({
  setModalVisible,
  stopJourney,
}: Props) => {

  return (
    <Modal
        header="Bevestig stoppen"
        subHeader="Weet je zeker dat je hier wil uitstappen?"
        setModalVisible={setModalVisible}
    >
       <MainContainer>
           <HeaderText
            onPress={() => {
                stopJourney()
                setModalVisible(false)
            }}
           >Test</HeaderText>
       </MainContainer>
    </Modal>
  )
}

export default EndJourneyModal
