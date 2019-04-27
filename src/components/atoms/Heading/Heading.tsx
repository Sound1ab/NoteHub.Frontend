import * as React from 'react'
import { COLOR } from '../../../enums'
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
  color: ${({ theme, color = COLOR.DARK }) =>
    color === COLOR.DARK
      ? theme.colors.text.primary
      : theme.colors.text.tertiary};
`

interface IHeading {
  children: any
  textTransform?: textTransformType
  textAlign?: textAlignType
  type: headingType
  marginBottom?: boolean
  marginTop?: boolean
  className?: string
  color?: COLOR
  onClick?: () => void
}

export function Heading(props: IHeading) {
  return React.createElement(StyledHeading.withComponent(props.type), props)
}
