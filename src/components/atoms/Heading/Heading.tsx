import CSS from 'csstype'
import React, { ReactNode } from 'react'

import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

const Style = styled.h1<Omit<IHeading, 'type'>>`
  text-transform: ${({ textTransform }) => textTransform};
  text-align: ${({ textAlign }) => textAlign};
  text-rendering: optimizeLegibility;
  margin-top: ${({ theme, marginTop }) => (marginTop ? theme.spacing.s : 0)};
  color: inherit;

  margin-bottom: ${({ marginBottom }) => !marginBottom && 0};
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

export function Heading({ type, ...rest }: IHeading) {
  return <Style as={type} {...rest} />
}
