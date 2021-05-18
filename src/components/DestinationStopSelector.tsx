import React, {SetStateAction, Dispatch, useState} from 'react'
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

const YellowLine = styled.Text`
  background-color: ${colors.yellow};
  width: 110px;
  height: 10px;
`
const Arrow = styled(Icon)`
  position: absolute;
  left: 40px;
`

const DisclaimerContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

type Props = {
  setDestionationStopSelected: Dispatch<SetStateAction<boolean>>
}

const DestinationStopSelector = ({setDestionationStopSelected}: Props) => {
  const dispatch = useAppDispatch()
  const [destinationStop, setDestinationStop] = useState<undefined | Stop>()
  const stops = useAppSelector(state => state.journey.line?.stops)
  const reversedStops = stops?.slice().reverse()
  const departureStop = useAppSelector(state => state.journey.departureStop)
  const relevantStops = departureStop?.direction ? stops : reversedStops

  const onPress = (stop: Stop) => {
    setDestinationStop(stop)
    setDestionationStopSelected(true)
    dispatch(addDestination(stop))
  }

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={relevantStops}
        keyExtractor={item => item.slug.current}
        renderItem={({item}) => (
          <Item onPress={() => onPress(item)}>
            <Name numberOfLines={2}>{item.name}</Name>
            <LineContainer>
              <Circle
                selected={item.slug.current === destinationStop?.slug.current}
              />
              <YellowLine />
              {item.slug.current === departureStop?.slug.current && (
                <Arrow name="right" size={50} />
              )}
            </LineContainer>
          </Item>
        )}
      />
      {destinationStop ? (
        <>
          <DisclaimerContainer>
            <DisclaimerText fontWeight={200}>Uitstaphate: </DisclaimerText>
            <DisclaimerText fontWeight={400}>
              {destinationStop.name}
            </DisclaimerText>
          </DisclaimerContainer>
        </>
      ) : (
        <DisclaimerText fontWeight={200}>
          Tik op de halte waar je wil uitstappen om {'\n'} een herinnering te
          krijgen
        </DisclaimerText>
      )}
    </>
  )
}

export default DestinationStopSelector
