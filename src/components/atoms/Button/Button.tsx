import React, { ReactNode } from 'react'

import { styled } from '../../../theme'

const Style = styled.button<Pick<IButton, 'isActive'>>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.background.tertiary
      : theme.colors.background.secondary};
  border-radius: 5px;
  box-shadow: inset 0px 0px 1px 1px ${({ theme }) => theme.colors.border};

  > * {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.accent : theme.colors.text.primary};
  }

  &:disabled {
    > * {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  &:hover:not(:disabled) {
    opacity: 0.6;
  }
`

interface IButton {
  isActive?: boolean
  isDisabled?: boolean
  children?: ReactNode
  onClick: () => void
  className?: string
  ariaLabel?: string
}

export function Button({
  isActive = false,
  isDisabled = false,
  children,
  onClick,
  className,
  ariaLabel,
}: IButton) {
  return (
    <Style
      isActive={isActive}
      disabled={isDisabled}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Style>
  )
}
