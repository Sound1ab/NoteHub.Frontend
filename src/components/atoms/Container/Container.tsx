import * as React from 'react'
import { styled } from '../../../theme'

export const Style = styled.section<{
  marginBottom?: boolean
  marginTop?: boolean
}>`
  position: relative;
  padding: 0 0;
  width: 100%;
  margin-bottom: ${({ theme, marginBottom }) =>
    marginBottom ? theme.spacing.s : 0};
  margin-top: ${({ theme, marginTop }) => (marginTop ? theme.spacing.s : 0)};
`

interface IContainer {
  children?: any
  className?: string
  marginBottom?: boolean
  marginTop?: boolean
}

export function Container({
  children,
  className,
  marginBottom,
  marginTop,
}: IContainer) {
  return (
    <Style
      className={className}
      marginBottom={marginBottom}
      marginTop={marginTop}
    >
      {children}
    </Style>
  )
}
