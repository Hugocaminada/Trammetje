import React from 'react'
import styled from 'styled-components/native'

interface Props {
  label: string
  backgroundColor: string
  width?: number
  height?: number
}

const ModularButton: React.FC<Props> = ({
  label,
  backgroundColor,
  width = 247,
  height = '50',
}) => {
  const ButtonContainer = styled.TouchableOpacity`
    width: ${width}px;
    height: ${height}px;
    background-color: ${backgroundColor};
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
    color: #f2f2f2;
  `

  return (
    <ButtonContainer>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  )
}

export default ModularButton
