import CSS from 'csstype'
import React, { ReactNode } from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

const StyledHeading = styled('h1')<IHeading>`
  text-transform: ${({ textTransform }) => textTransform};
  text-align: ${({ textAlign }) => textAlign};
  text-rendering: optimizeLegibility;
  margin-top: ${({ theme, marginTop }) => (marginTop ? theme.spacing.s : 0)};

  margin-bottom: ${({ marginBottom }) => {
    return !marginBottom && 0
  }};

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
      case COLOR.ACTIVE:
        return theme.colors.accent
      case COLOR.INHERIT:
        return 'inherit'
      default:
        return theme.colors.text.primary
    }
  }};
`

interface IHeading {
  children: ReactNode
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  textTransform?: CSS.TextTransformProperty
  textAlign?: 'left' | 'center' | 'right'
  marginBottom?: boolean
  marginTop?: boolean
  className?: string
  color?: COLOR
  onClick?: () => void
}

export function Heading(props: IHeading) {
  return React.createElement(StyledHeading.withComponent(props.type), props)
}
