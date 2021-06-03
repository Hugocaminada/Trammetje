import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../constants'
import Card from './Card'
import {useAppDispatch, useAppSelector} from '../../app/hooks/redux'
import {addDeparture} from '../../slices/journeySlice'
import {useSpring, animated} from '@react-spring/native'
import LinesSelector from '../LinesSelector'
import sanityClient from '../../client'
import type {Line, Stop} from '../../../@types/types'

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
  min-height: 60px;
  ${props =>
    props.side === 'left'
      ? 'border-bottom-left-radius: 15px;'
      : props.side === 'right'
      ? 'border-bottom-right-radius: 15px;'
      : null}
  justify-content: center;
  align-items: center;
  padding-horizontal: 5px;
`

const AnswerText = styled.Text<AnswerProps>`
  font-weight: ${props => (props.selected ? '400' : '200')};
  font-size: 20px;
  text-align: center;
`

const DirectionsCard = () => {
  const dispatch = useAppDispatch()
  const departureStop = useAppSelector(state => state.journey.departureStop)
  const [lines, setLines] = useState<Line[]>([])

  enum TravelDirection {
    Left,
    Right,
  }

  const [selectedLine, setSelectedLine] = useState<Line | undefined>()
  const [travelDirection, setTravelDirection] = useState<TravelDirection>(TravelDirection.Left)

  useEffect(() => {
    sanityClient.fetch(
      `*[slug.current == "${departureStop?.slug.current}"]{
        lines[]->{
          stops[]->,
          directions,
          number,
          color,
          slug,
        },
      }`).then((data: Stop[]) => {
        setLines(data[0].lines)
        setSelectedLine(data[0].lines[0])
      }).catch(console.error)
  }, [departureStop])

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
    height: '100%',
    backgroundColor: colors.lightGreen,
    width: '50%',
    left: travelDirection ? '50%' : '0%',
    borderBottomLeftRadius: travelDirection ? 0 : 15,
    borderBottomRightRadius: travelDirection ? 15 : 0,
  })

  if (!selectedLine) {
    return null
  }

  return (
    <Card title="Welke tram neem je?" centeredTitle={true}>
      <LinesSelector lines={lines} onPress={setSelectedLine} />
      <AnswerContainer>
        <AnimatedView style={styles} />
        <Answer
          selected={travelDirection === TravelDirection.Left}
          side="left"
          onPress={() => changeTravelDirection(TravelDirection.Left)}>
          <AnswerText
            selected={travelDirection === TravelDirection.Left}
            adjustsFontSizeToFit
            numberOfLines={2}>
            {selectedLine.directions[0]}
          </AnswerText>
        </Answer>
        <Answer
          selected={travelDirection === TravelDirection.Right}
          side="right"
          onPress={() => changeTravelDirection(TravelDirection.Right)}>
          <AnswerText
            selected={travelDirection === TravelDirection.Right}
            adjustsFontSizeToFit
            numberOfLines={2}>
            {selectedLine.directions[1]}
          </AnswerText>
        </Answer>
      </AnswerContainer>
    </Card>
  )
}

export default DirectionsCard
