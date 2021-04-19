import React, {useState} from 'react'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import Card from '../Card'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {addDeparture} from '../../features/stop/stopSlice'

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
  ${props => props.selected && 'background-color: ' + colors.lightGreen}
`

const AnswerText = styled.Text<AnswerProps>`
  font-weight: ${props => (props.selected ? '300' : '200')};
  font-size: 20px;
`

type Props = {
  line: number
}

const DirectionsCard = ({line}: Props) => {
  enum TravelDirection {
    Left,
    Right,
  }

  const [travelDirection, setTravelDirection] = useState<TravelDirection>(
    TravelDirection.Left,
  )

  const dispatch = useAppDispatch()
  const departureStop = useAppSelector(state => state.travelStops.departureStop)

  const changeTravelDirection = (direction: number) => {
    setTravelDirection(direction)
    dispatch(
      addDeparture({
        ...departureStop,
        direction,
      }),
    )
  }

  return (
    <Card title="Welke richting ga je op?" centeredTitle={true}>
      <AnswerContainer>
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

DirectionsCard.defaultProps = {
  centeredTitle: false,
  padding: true,
}

export default DirectionsCard
