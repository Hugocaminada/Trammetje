import React, { useEffect, useState } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import Card from './Card'
import sanityClient from '../../client'
import styled from 'styled-components/native'
import { DisclaimerText } from '../TextTypes'

const MainContainer = styled.Pressable`
padding-horizontal: 20px;
padding-bottom: 20px;
`

const PrivacyCard = () => {

  const [privacyStatement, setPrivacyStatement] = useState()
  const [folded, setFolded] = useState<boolean>(true)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "appInfo"]{
        name,
        appInfo[],
      }`).then((data) => {
        console.log(data)
        setPrivacyStatement(data[0].appInfo)
      }).catch(console.error)
  }, [])

  return (
    <Card title="Privacy Statement">
      <MainContainer onPress={() => setFolded(prev => !prev)}>
        {
        folded ?
          <>
            {privacyStatement && <DisclaimerText numberOfLines={3} centered={false} fontWeight={400}>{privacyStatement[0].children[0].text}</DisclaimerText>}
            <DisclaimerText centered={false} fontWeight={200}>Tik voor meer</DisclaimerText>
          </>
        :
          <>
            {privacyStatement && <BlockContent blocks={privacyStatement}/>}
            <DisclaimerText centered={false} fontWeight={200}>Tik voor minder</DisclaimerText>
          </>
        }
      </MainContainer>
    </Card>
  )
}

export default PrivacyCard
