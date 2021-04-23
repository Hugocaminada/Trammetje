import React, {useState} from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import Card from '../Card'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {addDeparture} from '../../features/stop/stopSlice'
import {useSpring, animated} from '@react-spring/native'

const AnimatedView = animated(View)

const AnswerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  border-top-width: 0.5px;
  border-color: ${colors.gray};
`

type AnswerProps = {
  selected?: boolean
  side?: string
}

const Answer = styled.TouchableOpacity<AnswerProps>`
  width: 50%;
  height: 50px;
  ${props =>
    props.side === 'left'
      ? 'border-bottom-left-radius: 15px;'
      : props.side === 'right'
      ? 'border-bottom-right-radius: 15px;'
      : null}
  justify-content: center;
  align-items: center;
`

const AnswerText = styled.Text<AnswerProps>`
  font-weight: ${props => (props.selected ? '300' : '200')};
  font-size: 20px;
`
type Props = {
  line: number
}

const DirectionsCard = ({line}: Props) => {
  const dispatch = useAppDispatch()
  const departureStop = useAppSelector(state => state.travelStops.departureStop)

  enum TravelDirection {
    Left,
    Right,
  }
  const [travelDirection, setTravelDirection] = useState<TravelDirection>(
    TravelDirection.Left,
  )

  const changeTravelDirection = (direction: number) => {
    setTravelDirection(direction)
    dispatch(
      addDeparture({
        ...departureStop,
        direction,
      }),
    )
  }

  const styles = useSpring<{style?: StyleSheet}>({
    position: 'absolute',
    height: 50,
    backgroundColor: colors.lightGreen,
    width: '50%',
    left: travelDirection ? '50%' : '0%',
    borderBottomLeftRadius: travelDirection ? 0 : 15,
    borderBottomRightRadius: travelDirection ? 15 : 0,
  })

  return (
    <Card title="Welke richting ga je op?" centeredTitle={true}>
      <AnswerContainer>
        <AnimatedView style={styles} />
        <Answer
          selected={travelDirection === TravelDirection.Left}
          side="left"
          onPress={() => changeTravelDirection(TravelDirection.Left)}>
          <AnswerText selected={travelDirection === TravelDirection.Left}>
            {departureStop && departureStop.lines[line].directions[0]}
          </AnswerText>
        </Answer>
        <Answer
          selected={travelDirection === TravelDirection.Right}
          side="right"
          onPress={() => changeTravelDirection(TravelDirection.Right)}>
          <AnswerText selected={travelDirection === TravelDirection.Right}>
            {departureStop && departureStop.lines[line].directions[1]}
          </AnswerText>
        </Answer>
      </AnswerContainer>
    </Card>
  )
}

export default DirectionsCard
