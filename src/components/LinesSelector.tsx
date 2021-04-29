import React, {Dispatch, SetStateAction, useState} from 'react'
import {FlatList} from 'react-native'
import LineSquare from './LineSquare'
import type {Line} from '../../@types/types'
import styled from 'styled-components/native'

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 60px;
  padding-horizontal: 5px;
`

type Props = {
  lines: Line[]
  onPress: Dispatch<SetStateAction<number>>
}

const LinesSelector = ({lines, onPress}: Props) => {
  const [selectedLineIndex, setSelectedLineIndex] = useState<number>(0)

  const onPressLine = (lineIndex: number) => {
    onPress(lineIndex)
    setSelectedLineIndex(lineIndex)
  }

  return (
    <MainContainer>
      <FlatList
        data={lines}
        renderItem={({item, index}: {item: Line; index: number}) => (
          <LineSquare
            line={item}
            onPress={() => onPressLine(index)}
            selected={selectedLineIndex === index}
          />
        )}
        keyExtractor={item => item.number.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </MainContainer>
  )
}

export default LinesSelector
