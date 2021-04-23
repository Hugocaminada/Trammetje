import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../constants'

type ButtonContainerProps = {
  backgroundColor: string
  height?: number
}

type ButtonTextProps = {
  textColor?: string
  textAlign?: 'left' | 'center' | 'right'
  minWidth?: string
  fontWeight?: number
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
  align-self: center;
  border-radius: 100px;
  justify-content: center;
`

const ButtonText = styled.Text<ButtonTextProps>`
  font-style: normal;
  font-weight: ${props => props.fontWeight};
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: ${props => props.textAlign};
  color: ${props => props.textColor};
  padding-horizontal: 30px;
  min-width: ${props => props.minWidth};
`

interface ModularButtonProps {
  label: string
  backgroundColor: string
  onPress: () => void
  textColor?: string
  height?: number
  textAlign?: 'left' | 'center' | 'right'
  minWidth?: string
  fontWeight: number
}

const ModularButton = ({
  label,
  onPress,
  height,
  backgroundColor,
  textColor,
  textAlign,
  minWidth,
  fontWeight,
}: ModularButtonProps) => (
  <ButtonContainer
    onPress={onPress}
    height={height}
    backgroundColor={backgroundColor}>
    <ButtonText
      textColor={textColor}
      textAlign={textAlign}
      minWidth={minWidth}
      fontWeight={fontWeight}>
      {label}
    </ButtonText>
  </ButtonContainer>
)

ModularButton.defaultProps = {
  height: 50,
  textColor: colors.white,
  textAlign: 'center',
  minWidth: '247px',
  fontWeight: 500,
}

export default ModularButton
