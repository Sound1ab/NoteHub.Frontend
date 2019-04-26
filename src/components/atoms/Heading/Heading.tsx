import * as React from 'react'
import { styled } from '../../../theme'

type headingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type textTransformType = 'lowercase' | 'uppercase' | 'none'
type textAlignType = 'left' | 'center' | 'right'

const StyledHeading = styled('h1')<IHeading>`
  text-transform: ${({ textTransform }) => textTransform};
  text-align: ${({ textAlign }) => textAlign};
  text-rendering: optimizeLegibility;
  margin-bottom: ${({ theme, marginBottom }) =>
    marginBottom ? theme.spacing.xxs : 0};
  margin-top: ${({ theme, marginTop }) => (marginTop ? theme.spacing.s : 0)};
`

interface IHeading {
  children: any
  textTransform?: textTransformType
  textAlign?: textAlignType
  type: headingType
  marginBottom?: boolean
  marginTop?: boolean
  className?: string
}

export function Heading(props: IHeading) {
  return React.createElement(StyledHeading.withComponent(props.type), props)
}
