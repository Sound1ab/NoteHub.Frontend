import React, { ReactNode, Ref, forwardRef } from 'react'

import { styled } from '../../../theme'
import { Icon, TIcons } from '..'

export interface IDropdownItem {
  icon?: TIcons
  label?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  prefix?: 'fa' | 'fab'
  custom?: ReactNode
}

interface IDropdownMenuProps {
  items: IDropdownItem[]
}

export const Dropdown = forwardRef(
  ({ items }: IDropdownMenuProps, ref: Ref<HTMLUListElement>) => {
    return (
      <StyledDropdown ref={ref} aria-label="dropdown">
        <Triangle className="Dropdown-triangle" />
        {items.map(({ custom, icon, label, onClick, prefix }) => (
          <Button
            key={label}
            type="button"
            onClick={onClick}
            className="Dropdown-item"
            aria-label={label}
          >
            {custom ? (
              custom
            ) : (
              <Item>
                {icon && prefix && (
                  <StyledIcon
                    size="sm"
                    icon={icon}
                    prefix={prefix}
                    title={`${label} icon`}
                  />
                )}
                {label}
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

const Triangle = styled.div`
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
`

const Item = styled.li`
  display: flex;
  margin-bottom: 0;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: ${({ theme }) => theme.spacing.xs};
`
