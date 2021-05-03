import React from 'react'
import styled from 'styled-components/native'
import type {Line} from '../../@types/types'
import {colors} from '../constants'

const MainContainer = styled.TouchableOpacity<{
  selected: boolean
  color: string
}>`
  ${props =>
    props.selected
      ? 'width: 50px; height: 50px;'
      : 'width: 40px; height: 40px; margin-vertical: 50px'}
  background-color: ${props => props.color};
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
  align-self: center;
  border-radius: 3px;
`

const LineNumber = styled.Text`
  color: ${colors.white};
  font-weight: 800;
  font-size: 25px;
`

type Props = {
  line: Line
  onPress?: () => void
  selected?: boolean
}

const LineSquare = ({line, onPress, selected}: Props) => (
  <MainContainer
    onPress={onPress}
    selected={!!selected}
    activeOpacity={onPress ? 0.2 : 1}
    color={line.color}>
    <LineNumber>{line.number}</LineNumber>
  </MainContainer>
)

export default LineSquare
