import React, {SetStateAction, Dispatch, useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../constants'
import {useAppDispatch, useAppSelector} from '../app/hooks/redux'
import Icon from 'react-native-vector-icons/AntDesign'
import {addDestination} from '../slices/journeySlice'
import {DisclaimerText} from './TextTypes'
import type {Stop} from '../../@types/types'

const Item = styled.Pressable`
  margin-bottom: 20px;
  justify-content: flex-end;
  min-height: 120px;
`

const Name = styled.Text`
  color: ${colors.darkGray};
  font-size: 14px
  font-weight: 500;
  transform: rotate(-30deg);
  text-align: left;
  top: -30px;
  width: 125px;
`

const LineContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const Circle = styled.View<{selected: boolean}>`
  height: 15px;
  width: 15px;
  background-color: ${props =>
    props.selected ? colors.lightGreen : colors.white};
  border-radius: 10px;
  border-width: 2px;
`

const Line = styled.Text<{color: string}>`
  background-color: ${props => props.color};
  width: 110px;
  height: 10px;
`

const ArrowContainer = styled.View<{left: number}>`
  position: absolute;
  left: ${props => props.left}px;
  flex-direction: row;
  align-items: center;
`

const Arrow = styled(Icon)`
  left: 14px;
  z-index: 1
`

const DisclaimerContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

type Props = {
  setDestionationStopSelected: Dispatch<SetStateAction<boolean>>
  stopsSortedByDirection?: Stop[]
  moveToNextStop: () => void
  stopJourney: () => void
}

const DestinationStopSelector = ({
  setDestionationStopSelected,
  stopsSortedByDirection,
  moveToNextStop,
  stopJourney,
}: Props) => {
  const dispatch = useAppDispatch()
  const [destinationStop, setDestinationStop] = useState<undefined | Stop>()
  const [destinationStopIndex, setDestinationStopIndex] = useState<number>(100)
  const stopIndex = useAppSelector(state => state.journey.stopIndex)

  let [arrowPos, setArrowPos] = useState<number>(-25)

  const onPress = (stop: Stop, index: number) => {
    setDestinationStop(stop)
    setDestinationStopIndex(index)
    setDestionationStopSelected(true)
    dispatch(addDestination(stop))
  }

  const moveArrow = () => {
    if (arrowPos < 80 && destinationStopIndex > stopIndex) {
      setArrowPos(arrowPos += 0.5)
      setTimeout(moveArrow, 20)
    } else if (destinationStopIndex > stopIndex) {
      // ONLY FOR TESTING WE AUTOMATICALLY MOVE TO NEXT STOP WHEN ANIMATION REACHES NEXTSTOP
      setTimeout(() => {
        setArrowPos(-25)
        moveToNextStop()
      }, 1000)
    } else {
      stopJourney()
      setArrowPos(-25)
    }
  }

  useEffect(() => {
    moveArrow()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopIndex])

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stopsSortedByDirection}
        keyExtractor={item => item.slug.current}
        initialScrollIndex={stopIndex}
        getItemLayout={(data, index) => (
          {length: 125, offset: 125 * index, index}
        )}
        renderItem={({item, index}) => (
          <Item onPress={() => onPress(item, index)} disabled={index <= stopIndex}>
            <Name numberOfLines={2}>{item.name}</Name>
            <LineContainer>
              <Circle selected={item.slug.current === destinationStop?.slug.current}/>
              <Line color={index <= stopIndex ? colors.gray : colors.yellow}/>
              {index === stopIndex && (
                <ArrowContainer left={arrowPos}>
                  <Arrow name="right" size={50}/>
                  <Line color={colors.yellow}/>
                </ArrowContainer>
              )}
            </LineContainer>
          </Item>
        )}
      />
      {destinationStop ? (
        <>
          <DisclaimerContainer>
            <DisclaimerText fontWeight={200}>Uitstaphate: </DisclaimerText>
            <DisclaimerText fontWeight={400}>{destinationStop.name}</DisclaimerText>
          </DisclaimerContainer>
          <DisclaimerContainer>
            <DisclaimerText fontWeight={200}>Je bent er over: </DisclaimerText>
            <DisclaimerText fontWeight={400}>{((destinationStopIndex - stopIndex) * 2).toFixed()} min / </DisclaimerText>
            <DisclaimerText fontWeight={400}>{destinationStopIndex - stopIndex} {destinationStopIndex - stopIndex === 1 ? 'halte' : 'haltes' }</DisclaimerText>
          </DisclaimerContainer>
        </>
      ) : (
        <DisclaimerText fontWeight={200}>
          Tik op de halte waar je wil uitstappen om{'\n'}
          een herinnering te krijgen
        </DisclaimerText>
      )}
    </>
  )
}

export default DestinationStopSelector
