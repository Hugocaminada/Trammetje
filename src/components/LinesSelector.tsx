import React, {Dispatch, SetStateAction, useState} from 'react'
import {FlatList} from 'react-native'
import LineSquare from './LineSquare'
import type {Line} from '../../@types/types'
import styled from 'styled-components/native'
import {useAppDispatch} from '../app/hooks/redux'
import {addLine} from '../features/stop/journeySlice'

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 60px;
  padding-horizontal: 5px;
`

type Props = {
  lines: Line[] | null
  onPress: Dispatch<SetStateAction<Line | null>>
}

const LinesSelector = ({lines, onPress}: Props) => {
  const [selectedLineIndex, setSelectedLineIndex] = useState<number>(0)
  const dispatch = useAppDispatch()

  const onPressLine = (item: Line, index: number) => {
    dispatch(addLine({...item}))
    onPress(item)
    setSelectedLineIndex(index)
  }

  return (
    <MainContainer>
      <FlatList
        data={lines}
        renderItem={({item, index}: {item: Line; index: number}) => (
          <LineSquare
            line={item}
            onPress={() => onPressLine(item, index)}
            selected={selectedLineIndex === index}
          />
        )}
        keyExtractor={item => item.number.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </MainContainer>
  )
}

export default LinesSelector
