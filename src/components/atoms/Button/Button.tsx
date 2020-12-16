import React, { ReactNode, Ref, forwardRef } from 'react'
import styled, { css } from 'styled-components'

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
        {props.isLoading ? <Icon size="1x" icon="spinner" /> : props.children}
      </StyledButton>
    )
  }
)

const StyledButton = styled.button<Pick<IButton, 'isActive' | 'isLoading'>>`
  position: relative;
  display: flex;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;

    > * {
      color: var(--text-tertiary);
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
