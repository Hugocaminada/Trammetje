import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../constants'

interface ButtonContainerProps {
  backgroundColor: string
  height?: number
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
  align-self: center;
  border-radius: 100px;
  justify-content: center;
`

const ButtonText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${colors.white};
  padding-horizontal: 30px;
  min-width: 247px;
`

interface ModularButtonProps {
  label: string
  backgroundColor: string
  onPress: () => void
  height?: number
}

const ModularButton = ({
  label,
  onPress,
  height,
  backgroundColor,
}: ModularButtonProps) => {
  return (
    <ButtonContainer
      onPress={onPress}
      height={height}
      backgroundColor={backgroundColor}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  )
}

ModularButton.defaultProps = {
  height: 50,
}

export default ModularButton
