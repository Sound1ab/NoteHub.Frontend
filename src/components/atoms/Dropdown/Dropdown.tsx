import React, { ReactNode, Ref, forwardRef } from 'react'
import { css } from 'styled-components'

import { styled } from '../../../theme'
import { Icon, TIcons } from '..'

export interface IDropdownItem {
  icon?: TIcons
  label?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  prefix?: 'fa' | 'fab'
  custom?: ReactNode
  isDisabled?: boolean
}

interface IDropdownMenuProps {
  items: IDropdownItem[]
  trianglePosition?: 'left' | 'right'
  onClose?: () => void
}

export const Dropdown = forwardRef(
  (
    { items, trianglePosition = 'right', onClose }: IDropdownMenuProps,
    ref: Ref<HTMLUListElement>
  ) => {
    return (
      <StyledDropdown ref={ref} aria-label="dropdown">
        <Triangle
          trianglePosition={trianglePosition}
          className="Dropdown-triangle"
        />
        {items.map((item) => (
          <Button
            key={item.label}
            type="button"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              onClose && onClose()
              item.onClick?.(e)
            }}
            className="Dropdown-item"
            aria-label={item.label}
            disabled={item.isDisabled}
          >
            {item.custom ? (
              item.custom
            ) : (
              <Item>
                {item.icon && item.prefix && (
                  <StyledIcon
                    size="sm"
                    icon={item.icon}
                    prefix={item.prefix}
                    title={`${item.label} icon`}
                  />
                )}
                {item.label}
              </Item>
            )}
          </Button>
        ))}
      </StyledDropdown>
    )
  }
)

const StyledDropdown = styled.ul`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  list-style: none;
  border-radius: 3px;
  white-space: pre;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xxs} 0;
`

const Triangle = styled.div<Pick<IDropdownMenuProps, 'trianglePosition'>>`
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.spacing.xxs};
  transform: translateY(-100%);
  width: 0;
  height: 0;
  border-left: ${({ theme }) => theme.spacing.xxs} solid transparent;
  border-right: ${({ theme }) => theme.spacing.xxs} solid transparent;
  border-bottom: ${({ theme }) => theme.spacing.xxs} solid
    ${({ theme }) => theme.colors.background.secondary};
  ${({ trianglePosition }) => {
    switch (trianglePosition) {
      case 'left':
        return css`
          left: ${({ theme }) => theme.spacing.xxs};
        `
      case 'right':
        return css`
          right: ${({ theme }) => theme.spacing.xxs};
        `
    }
  }};
`

const Button = styled.button`
  user-select: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  width: 100%;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.background.quinary};
    }
  }

  &[disabled] {
    cursor: not-allowed;

    > * {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }
`

const Item = styled.li`
  display: flex;
  margin-bottom: 0;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: ${({ theme }) => theme.spacing.xs};
`
