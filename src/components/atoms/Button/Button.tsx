import React, { ReactNode } from 'react'
import { styled } from '../../../theme'

const Style = styled.button`
  position: relative;
  padding: ${({theme}) => theme.spacing.xs};
  background-color: ${({theme}) => theme.colors.background.secondary};
  border-radius: 5px;
  box-shadow: inset 0px 0px 1px 1px ${({theme}) => theme.colors.border};
  
  > * {
    color: ${({theme}) => theme.colors.text.secondary}
  }
  
  &:hover {
    background-color: ${({theme}) => theme.colors.background.tertiary};
    > * {
      color: ${({theme}) => theme.colors.accent}
    }
  }
`

interface IButton {
  children?: ReactNode
  onClick: () => void
  className?: string
}

export function Button({ children, onClick, className }: IButton) {
  return (
    <Style className={className} onClick={onClick}>
      {children}
    </Style>
  )
}
