import React, {useState} from 'react'
import styled from 'styled-components/native'
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import {colors} from '../constants'
import {Sight} from '../../@types/types'
import Icon from 'react-native-vector-icons/Entypo'

const MainContainer = styled.View`
  padding-horizontal: 20px;
`

const HeaderContainer = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SightImage = styled.Image`
  height: 250px;
  width: 100%;
  border-radius: 10px;
  margin-vertical: 5px;
`

const Header = styled.Text`
  font-weight: 700;
  color: ${colors.darkGray};
`

const Description = styled.Text`
  color: ${colors.darkGray};
  margin-bottom: 10px;
`

type Props = {
  sight: Sight
  index: number
}

const SightItem = ({sight, index}: Props) => {
  const builder = imageUrlBuilder(client)
  const [folded, setFolded] = useState<boolean>(index !== 0)

  const urlFor = (source: string) => builder.image(source)

  return (
    <MainContainer>
      <HeaderContainer onPress={() => setFolded(prev => !prev)}>
        <Header>
          {/* TODO: get these conditions fixed */}
          Over {(index + 1) * 2} min zie je{' '}
          {index % 2 === 0 ? 'links' : 'rechts'} {sight.name}
        </Header>
        <Icon
          name={folded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.darkGray}
        />
      </HeaderContainer>
      {folded ? (
        <Description onPress={() => setFolded(prev => !prev)}>
          Tik om meer te zien
        </Description>
      ) : (
        <>
          <SightImage
            source={{
              uri: urlFor(sight.picture).height(250).url()?.toString(),
            }}
          />
          <Description>{sight.description}</Description>
        </>
      )}
    </MainContainer>
  )
}

export default SightItem
