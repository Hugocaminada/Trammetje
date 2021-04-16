import React, {useState, useEffect} from 'react'
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

const Answer = styled.TouchableOpacity<{selected: boolean; side: string}>`
  width: 50%;
  height: 50px;
  ${props =>
    props.side === 'left'
      ? 'border-bottom-left-radius: 15px;'
      : 'border-bottom-right-radius: 15px;'}
  justify-content: center;
  align-items: center;
  ${props => props.selected && 'background-color: ' + colors.lightGreen}
`

const AnswerText = styled.Text<{selected: boolean}>`
  font-weight: ${props => (props.selected ? '300' : '200')};
  font-size: 20px;
`

const DirectionsCard = ({line}) => {
  const [travelDirection, setTravelDirection] = useState(0)

  const dispatch = useAppDispatch()
  const departureStop = useAppSelector(state => state.travelStops.departureStop)

  const changeTravelDirection = direction => {
    setTravelDirection(direction)
    dispatch(
      addDeparture({
        ...departureStop,
        direction: departureStop.lines[line].directions[direction],
      }),
    )
  }

  useEffect(() => {
    // needs to be called once to dispatch default direction in redux. There might be a better way to do this.
    changeTravelDirection(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const leftAnswerSelected =
    departureStop.lines[line].directions[0] ===
    departureStop.lines[line].directions[travelDirection]

  const rightAnswerSelected =
    departureStop.lines[line].directions[1] ===
    departureStop.lines[line].directions[travelDirection]

  return (
    <Card title="Welke richting ga je op?" centeredTitle={true}>
      <AnswerContainer>
        <Answer
          selected={leftAnswerSelected}
          side="left"
          onPress={() => changeTravelDirection(0)}>
          <AnswerText selected={leftAnswerSelected}>
            {departureStop.lines[line].directions[0]}
          </AnswerText>
        </Answer>
        <Answer
          selected={rightAnswerSelected}
          side="right"
          onPress={() => changeTravelDirection(1)}>
          <AnswerText selected={rightAnswerSelected}>
            {departureStop.lines[line].directions[1]}
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
