import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import ModularButton from '../ModularButton'

const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 15px;
  background-color: ${colors.white};
  align-items: center;
  padding-horizontal: 15px;
`

const Backdrop = styled.View`
  height: 100px;
`

const StopSelectionModal = ({setModalVisable, stopsByDistance}) => {
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisable(false)
        }}>
        <Backdrop />
      </TouchableWithoutFeedback>
      <MainContainer>
        <ModularButton
          onPress={() => setModalVisable(false)}
          label={stopsByDistance[0].name}
          backgroundColor={colors.red}
        />
      </MainContainer>
    </>
  )
}

export default StopSelectionModal
