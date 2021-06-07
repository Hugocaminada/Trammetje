import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import ModularButton from '../ModularButton'
import type {Stop} from '../../../@types/types'
import {DisclaimerText} from '../TextTypes'
import Modal from './Modal'

const SubHeader = styled.Text`
  background-color: ${colors.lightGray};
  color: ${colors.darkGray};
  width: 100%;
  padding-vertical: 6px;
  padding-horizontal: 30px;
  font-weight: 500;
  font-size: 12px;
`

const Line = styled.View`
  background-color: ${colors.lightGray};
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
`

type Props = {
  setModalVisible: Dispatch<SetStateAction<boolean>>
  stopsByDistance: Stop[]
  setDepartureStop: (stop: Stop) => void
}

const StopSelectionModal = ({setModalVisible, stopsByDistance, setDepartureStop}: Props) => {
  const [closestStop, setClosestStop] = useState<Stop>(stopsByDistance[0])
  const [otherStops, setOtherStops] = useState<Stop[]>([])

  useEffect(() => {
    setClosestStop(stopsByDistance[0])
    setOtherStops(stopsByDistance.filter((stop, index) => stop.distance < 0.5 && index > 0))
  }, [stopsByDistance])

  const selectStop = (stop: Stop) => {
    setDepartureStop(stop)
    setModalVisible(false)
  }

  return (
    <Modal
      header="Kies je instaphalte:"
      subHeader="Dichtsbijzijnde halte:"
      setModalVisible={setModalVisible}
    >
      <ModularButton
        onPress={() => selectStop(closestStop)}
        label={closestStop && closestStop.name}
        backgroundColor={colors.white}
        textColor={colors.red}
        textAlign="left"
        minWidth="100%"
      />
      <SubHeader>Andere haltes in de buurt:</SubHeader>
      <FlatList
        data={otherStops}
        keyExtractor={(stop, index) => stop.name + index}
        scrollEnabled={false}
        renderItem={({item}) => (
          <ModularButton
            onPress={() => selectStop(item)}
            label={item.name}
            backgroundColor={colors.white}
            textColor={colors.red}
            textAlign="left"
            minWidth="100%"
            fontWeight={400}
          />
        )}
        ItemSeparatorComponent={Line}
        ListFooterComponent={
          <>
            <Line />
            <DisclaimerText fontWeight={200}>
              Je kunt alleen bij haltes in jouw omgeving instappen.
            </DisclaimerText>
          </>
        }
      />
    </Modal>
  )
}

export default StopSelectionModal
