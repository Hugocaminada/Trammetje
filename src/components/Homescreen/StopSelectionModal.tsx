import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import ModularButton from '../ModularButton'

const TestText = styled.Text`
  padding-top: 100px;
`

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

const StopSelectionModal = ({setModalVisable, closestStop}) => {
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
          label={closestStop.name}
          backgroundColor={colors.purple}
        />
      </MainContainer>
    </>
  )
}

export default StopSelectionModal
