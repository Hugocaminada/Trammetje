import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {FlatList, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import ModularButton from '../ModularButton'
import type {Stop} from '../../../@types/types'

const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`

const Backdrop = styled.View`
  height: 100px;
`

const Header = styled.View`
  background-color: ${colors.red};
  height: 50px;
  width: 100%;
  justify-content: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`

const HeaderText = styled.Text`
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${colors.white};
`

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
`

const Footer = styled.Text`
  width: 100%;
  text-align: center;
  color: ${colors.darkGray};
  padding: 6px;
  font-size: 12px;
  font-weight: 200;
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

    setOtherStops([])
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
        <Header>
          <HeaderText>Kies je instaphalte:</HeaderText>
        </Header>
        <SubHeader>Dichtsbijzijnde halte:</SubHeader>
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
              <Footer>
                Je kunt alleen bij haltes in jouw omgeving instappen.
              </Footer>
            </>
          }
        />
      </MainContainer>
    </>
  )
}

export default StopSelectionModal
