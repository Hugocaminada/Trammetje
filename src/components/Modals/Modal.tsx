import React, {Dispatch, SetStateAction} from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import type {WithChildren} from '../../../@types/types'

const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`

const Backdrop = styled.View`
  height: 100px;
`

const Header = styled.View`
  background-color: ${colors.red};
  height: 50px;
  width: 100%;
  justify-content: center;
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
  color: ${colors.white};
`

const SubHeader = styled.Text`
  background-color: ${colors.lightGray};
  color: ${colors.darkGray};
  width: 100%;
  padding-vertical: 6px;
  padding-horizontal: 30px;
  font-weight: 500;
  font-size: 12px;
`

type Props = WithChildren<{
  setModalVisible: Dispatch<SetStateAction<boolean>>
  header: string,
  subHeader: string,
}>

const Modal = ({
  setModalVisible,
  children,
  header,
  subHeader,
}: Props) => {


  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false)
        }}>
        <Backdrop />
      </TouchableWithoutFeedback>
      <MainContainer>
        <Header>
          <HeaderText>{header}</HeaderText>
        </Header>
        <SubHeader>{subHeader}</SubHeader>
        {children}
      </MainContainer>
    </>
  )
}

export default Modal
