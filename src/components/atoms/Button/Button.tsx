import React, { ReactNode } from 'react'

import { styled } from '../../../theme'

const Style = styled.button<Pick<IButton, 'isActive'>>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxs};
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.background.tertiary
      : theme.colors.background.secondary};
  border-radius: 5px;
  box-shadow: inset 0px 0px 1px 1px ${({ theme }) => theme.colors.border};

  &[disabled] {
    cursor: not-allowed;
  }

  > * {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.accent : theme.colors.text.primary};
  }

  &:disabled {
    > * {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      opacity: 0.6;
    }
  }
`

interface IButton {
  isActive?: boolean
  isDisabled?: boolean
  children?: ReactNode
  onClick: () => void
  className?: string
  ariaLabel?: string
  title?: string
}

interface IButtonLink {
  isActive?: boolean
  isDisabled?: boolean
  children?: ReactNode
  className?: string
  ariaLabel?: string
  href: string
}

export function Button({
  isActive = false,
  isDisabled = false,
  children,
  onClick,
  className,
  ariaLabel,
  title,
}: IButton) {
  return (
    <Style
      isActive={isActive}
      disabled={isDisabled}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      as="button"
    >
      {children}
    </Style>
  )
}

export function ButtonLink({
  isActive = false,
  children,
  className,
  ariaLabel,
  href,
}: IButtonLink) {
  return (
    <Style
      isActive={isActive}
      className={className}
      aria-label={ariaLabel}
      as="a"
      href={href}
      target="_self"
    >
      {children}
    </Style>
  )
}
