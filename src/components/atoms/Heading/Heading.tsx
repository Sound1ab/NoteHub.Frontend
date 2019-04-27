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
  margin-top: ${({ theme, marginTop }) => (marginTop ? theme.spacing.s : 0)};
  margin-bottom: ${({ theme, type, marginBottom }) => {
    if (marginBottom) {
      switch (type) {
        case 'h1':
          return theme.spacing.s
        case 'h2':
          return theme.spacing.s
        case 'h3':
          return theme.spacing.s
        case 'h4':
          return theme.spacing.xxs
        case 'h5':
          return theme.spacing.xs
        case 'h6':
          return theme.spacing.xs
      }
    } else {
      return 0
    }
  }}
  color: ${({ theme, color }) => {
    switch (color) {
      case COLOR.DARK:
        return theme.colors.text.primary
      case COLOR.LIGHT:
        return theme.colors.text.tertiary
      case COLOR.ACCENT:
        return theme.colors.accent
      case COLOR.MEDIUM:
        return theme.colors.text.secondary
      default:
        return theme.colors.text.primary
    }
  }};
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
