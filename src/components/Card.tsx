import React from 'react'
import styled from 'styled-components/native'
import {colors} from '../constants'
import type {WithChildren} from '../../@types/types'

const MainContainer = styled.View`
  background-color: ${colors.white};
  border-radius: 15px;
  margin-bottom: 25px;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`

const Title = styled.Text<{centeredTitle?: boolean}>`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.darkGray};
  padding-bottom: 5px;
  padding-top: 20px;
  padding-horizontal: 20px;
  width: 100%;
  text-align: ${props => (props.centeredTitle ? 'center' : 'left')};
`

type Props = WithChildren<{
  title: string
  centeredTitle?: boolean
  padding?: boolean
}>

const Card = ({children, title, centeredTitle}: Props) => (
  <MainContainer>
    <Title centeredTitle={centeredTitle}>{title}</Title>
    {children}
  </MainContainer>
)

Card.defaultProps = {
  centeredTitle: false,
  padding: true,
}

export default Card
