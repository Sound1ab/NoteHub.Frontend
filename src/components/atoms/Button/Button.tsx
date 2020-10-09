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

export const Button = forwardRef(
  (props: IButton, ref: Ref<HTMLButtonElement>) => {
    return (
      <StyledButton ref={ref} {...props} disabled={props.isDisabled}>
        {props.isLoading ? (
          <Icon size="sm" icon="spinner" prefix="fa" />
        ) : (
          props.children
        )}
      </StyledButton>
    )
  }
)

const StyledButton = styled.button<Pick<IButton, 'isActive' | 'isLoading'>>`
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
