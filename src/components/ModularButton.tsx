import React from 'react'
import styled from 'styled-components/native'

interface Props {
  label: string
}

const ModularButton: React.FC<Props> = ({label}) => {
  const ButtonContainer = styled.TouchableOpacity`
    width: 247px;
    height: 50px;
    background-color: #bb6bd9;
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
