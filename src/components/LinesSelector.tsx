import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {FlatList} from 'react-native'
import LineSquare from './LineSquare'
import type {Line} from '../../@types/types'
import styled from 'styled-components/native'
import {useAppDispatch} from '../app/hooks/redux'
import {addLine} from '../slices/journeySlice'

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 60px;
  padding-horizontal: 5px;
`

type Props = {
  lines: Line[] | undefined
  onPress: Dispatch<SetStateAction<Line | undefined>>
}

const LinesSelector = ({lines, onPress}: Props) => {
  const [selectedLineIndex, setSelectedLineIndex] = useState<number>(0)
  const dispatch = useAppDispatch()

  const onPressLine = (item: Line, index: number) => {
    dispatch(addLine({...item}))
    onPress(item)
    setSelectedLineIndex(index)
  }

  useEffect(() => {
    lines && dispatch(addLine({...lines[0]}))
  }, [dispatch, lines])

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
