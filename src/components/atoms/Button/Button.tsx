import React, { ReactNode, Ref, forwardRef } from 'react'
import styled, { css } from 'styled-components'

import { darken } from '../../../utils/css/darken'
import { Icon } from '../Icon/Icon'

interface IButton {
  isDisabled?: boolean
  isLoading?: boolean
  children?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  title?: string
}

export const Button = forwardRef(
  (props: IButton, ref: Ref<HTMLButtonElement>) => {
    return (
      <StyledButton ref={ref} {...props}>
        {props.isLoading ? (
          <Icon size="1x" icon="spinner" title="loading spinner" />
        ) : (
          props.children
        )}
      </StyledButton>
    )
  }
)

const StyledButton = styled.button<Pick<IButton, 'isLoading' | 'isDisabled'>>`
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: not-allowed;
    `}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      > * {
        color: var(--text-tertiary);
      }
    `}

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

export const RegularButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.11);
  font-size: ${({ theme }) => theme.typographyStyles.h4.fontSize};
  font-weight: lighter;
  line-height: 1;

  &:visited {
    color: #fff;
  }

  &:link {
    color: var(--white);
  }

  * svg {
    color: #fff;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  &:active {
    transform: translateY(${({ theme }) => theme.spacing.xxxs});
  }
`

export const GithubButton = styled(RegularButton)`
  color: #fff;
  background-color: var(--company-github);
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.11);
  font-size: ${({ theme }) => theme.typographyStyles.h3.fontSize};
  font-weight: lighter;
  line-height: 1;

  &:visited {
    color: #fff;
  }

  &:link {
    color: var(--white);
  }

  * svg {
    color: #fff;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${darken('--company-github', 0.05)};
  }

  &:active {
    transform: translateY(${({ theme }) => theme.spacing.xxxs});
  }
`
