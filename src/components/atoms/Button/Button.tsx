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
  ariaLabel?: string
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

type IButtonLink = Pick<
  IButton,
  'isActive' | 'isDisabled' | 'children' | 'ariaLabel'
> & { href: string }

export function ButtonLink({
  isActive = false,
  children,
  ariaLabel,
  href,
}: IButtonLink) {
  return (
    <StyledBaseButton
      isActive={isActive}
      aria-label={ariaLabel}
      as="a"
      href={href}
      target="_self"
    >
      {children}
    </StyledBaseButton>
  )
}

export const ToolbarButton = styled(BaseButton)`
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 5px;
  box-shadow: inset 0px 0px 1px 1px ${({ theme }) => theme.colors.border};

  display: none;
  margin-right: ${({ theme }) => theme.spacing.xxs};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }
`

export const DropDownButton = styled(BaseButton)`
  user-select: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  width: 100%;
`

export const Button = styled(BaseButton)`
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.company.github};
  color: #fff;
  text-decoration: none;

  &:visited {
    color: #fff;
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
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

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
