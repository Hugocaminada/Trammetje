import styled from 'styled-components/native'
import {colors} from '../constants'

export const DisclaimerText = styled.Text<{fontWeight: number, underline?: boolean, centered?: boolean}>`
  text-align: ${props => props.centered ? 'center' : 'left'}
  font-weight: ${props => props.fontWeight}
  color: ${colors.darkGray}
  text-decoration: ${props => props.underline && 'underline'}
`

DisclaimerText.defaultProps = {
  underline: false,
  centered: true,
}
