import React, {useEffect, useState} from 'react'
import {ScrollView, Dimensions, Text} from 'react-native'
import styled from 'styled-components/native'
import BlockContent from '@sanity/block-content-to-react'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {colors} from '../../constants'
import {increment} from '../../features/counter/counterSlice'
import Card from '../Card'
import GradientBackground from '../GradientBackground'
import ModularButton from '../ModularButton'
import sanityClient from '../../client'

const windowHeight = Dimensions.get('window').height

const CounterText = styled.Text`
  position: absolute;
  align-self: center;
  padding-top: 100px;
  font-size: 30px;
`

const Spacer = styled.View`
  height: ${windowHeight / 2}px;
`

const MainContainer = styled.View`
  flex: 1;
  min-height: ${windowHeight}px;
  background-color: ${colors.gray};
  align-items: center;
  z-index: 2;
  padding-horizontal: 15px;
`

const ButtonContainer = styled.View`
  position: absolute;
  align-self: center;
  top: -25px;
  z-index: 2;
  margin-bottom: 100px;
`

const CardsContainer = styled.View`
  width: 100%;
  margin-top: 30px;
`

type Props = {
  componentId: string
}

const Homescreen = ({}: Props) => {
  // const isDarkMode = useColorScheme() === 'dark'

  type Card = {
    title: string
    body: BlockContent
  }

  const [allPostsData, setAllPostsData] = useState<Card[] | undefined>(
    undefined,
  )

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        body
      }`,
      )
      .then(data => {
        setAllPostsData(data)
        console.log(data)
      })
      .catch(console.error)
  }, [])

  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <GradientBackground>
      <CounterText>{count}</CounterText>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Spacer />
        <MainContainer>
          <ButtonContainer>
            <ModularButton
              label="Stap in"
              backgroundColor={colors.purple}
              onPress={() => dispatch(increment())}
            />
          </ButtonContainer>
          <CardsContainer>
            {allPostsData &&
              allPostsData.map((post, index) => (
                <Card key={index} title={post.title}>
                  <BlockContent
                    blocks={post.body}
                    projectId={sanityClient.config().projectId}
                    dataset={sanityClient.config().dataset}
                  />
                </Card>
              ))}
          </CardsContainer>
        </MainContainer>
      </ScrollView>
    </GradientBackground>
  )
}

export default Homescreen
