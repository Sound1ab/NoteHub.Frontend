import React, { ReactNode } from 'react'
import { css } from 'styled-components'

import { styled } from '../../../theme'
import { Icon } from '..'

interface IButton {
  isActive?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  children?: ReactNode
  onClick: () => void
  className?: string
  ariaLabel?: string
  title?: string
}

export function Button({
  isActive = false,
  isDisabled = false,
  children,
  onClick,
  className,
  ariaLabel,
  title,
  isLoading = false,
}: IButton) {
  return (
    <StyledButton
      isActive={isActive}
      isLoading={isLoading}
      disabled={isDisabled}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      as="button"
    >
      {isLoading ? <Icon size="sm" icon="spinner" prefix="fa" /> : children}
    </StyledButton>
  )
}

interface IButtonLink {
  isActive?: boolean
  isDisabled?: boolean
  children?: ReactNode
  className?: string
  ariaLabel?: string
  href: string
}

export function ButtonLink({
  isActive = false,
  children,
  className,
  ariaLabel,
  href,
}: IButtonLink) {
  return (
    <StyledButton
      isActive={isActive}
      className={className}
      aria-label={ariaLabel}
      as="a"
      href={href}
      target="_self"
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<Pick<IButton, 'isActive' | 'isLoading'>>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 5px;
  box-shadow: inset 0px 0px 1px 1px ${({ theme }) => theme.colors.border};

  &[disabled] {
    cursor: not-allowed;
  }

  > * {
    color: ${({ theme }) => theme.colors.text.secondary};
    ${({ isLoading }) =>
      isLoading
        ? css`
            animation: spin 2s ease-in-out infinite;
          `
        : ''}
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled {
    > * {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
