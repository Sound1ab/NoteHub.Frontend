import React, { ReactNode, Ref, forwardRef } from 'react'
import { css } from 'styled-components'

import { styled } from '../../../theme'
import { Icon } from '..'

interface IButton {
  isActive?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  children?: ReactNode
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  title?: string
}

export const BaseButton = forwardRef(
  (props: IButton, ref: Ref<HTMLButtonElement>) => {
    return (
      <StyledBaseButton ref={ref} {...props} disabled={props.isDisabled}>
        {props.isLoading ? (
          <Icon size="sm" icon="spinner" prefix="fa" />
        ) : (
          props.children
        )}
      </StyledBaseButton>
    )
  }
)

export const ToolbarButton = styled(BaseButton)`
  padding: 0.785rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.spacing.xxs};
  display: none;
  margin-right: ${({ theme }) => theme.spacing.xxs};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`

export const DropDownButton = styled(BaseButton)`
  user-select: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  width: 100%;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`

export const Button = styled(BaseButton)`
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  &:visited {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  * svg {
    color: #fff;
  }
`

const StyledBaseButton = styled.button<Pick<IButton, 'isActive' | 'isLoading'>>`
  position: relative;

  &[disabled] {
    cursor: not-allowed;

    > * {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  > * {
    ${({ isLoading }) =>
      isLoading
        ? css`
            animation: spin 2s ease-in-out infinite;
          `
        : ''}
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
