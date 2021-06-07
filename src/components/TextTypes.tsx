import styled from 'styled-components/native'
import {colors} from '../constants'

export const DisclaimerText = styled.Text<{fontWeight: number, underline?: boolean}>`
  text-align: center;
  font-weight: ${props => props.fontWeight};
  color: ${colors.darkGray};
  text-decoration: ${props => props.underline && 'underline'}
`
