import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {FlatList, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import ModularButton from '../ModularButton'
import type {Stop} from '../../../@types/types'

const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 15px;
  background-color: ${colors.white};
  align-items: center;
  padding-horizontal: 15px;
`

const Backdrop = styled.View`
  height: 100px;
`

const Item = styled.Text`
  background-color: ${colors.white};
  border: 1px;
`

type Props = {
  setModalVisable: Dispatch<SetStateAction<boolean>>
  stopsByDistance: Stop[]
  setDepartureStop: (stop: Stop) => void
}

const StopSelectionModal = ({
  setModalVisable,
  stopsByDistance,
  setDepartureStop,
}: Props) => {
  const [closestStop, setClosestStop] = useState<Stop>()
  const [otherStops, setOtherStops] = useState<Stop[]>([])

  useEffect(() => {
    setClosestStop(stopsByDistance[0])

    stopsByDistance.forEach((stop, index) => {
      stop.distance < 0.5 && index > 0 && setOtherStops(prev => [...prev, stop])
    })
  }, [stopsByDistance])

  const selectStop = (stop: Stop) => {
    setDepartureStop(stop)
    setModalVisable(false)
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisable(false)
        }}>
        <Backdrop />
      </TouchableWithoutFeedback>
      <MainContainer>
        <ModularButton
          onPress={() => selectStop(closestStop)}
          label={closestStop && closestStop.name}
          backgroundColor={colors.red}
        />
        <FlatList
          data={otherStops}
          keyExtractor={(stop, index) => stop.name + index}
          renderItem={({item}) => <Item>{item.name}</Item>}
        />
      </MainContainer>
    </>
  )
}

export default StopSelectionModal
