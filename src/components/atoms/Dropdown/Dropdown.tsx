import React, { Ref, forwardRef } from 'react'

import { styled } from '../../../theme'
import { Icon, TIcons } from '..'

const Style = styled.ul`
  background-color: ${({ theme }) => theme.colors.background.quinary};
  list-style: none;
  border-radius: 3px;
  white-space: pre;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xxs} 0;

  .Dropdown-triangle {
    position: absolute;
    top: 0;
    right: ${({ theme }) => theme.spacing.xxs};
    transform: translateY(-100%);
    width: 0;
    height: 0;
    border-left: ${({ theme }) => theme.spacing.xxs} solid transparent;
    border-right: ${({ theme }) => theme.spacing.xxs} solid transparent;
    border-bottom: ${({ theme }) => theme.spacing.xxs} solid
      ${({ theme }) => theme.colors.background.quinary};
  }

  .Dropdown-item {
    user-select: none;
    outline: none;
    padding: ${({ theme }) => theme.spacing.xxs}
      ${({ theme }) => theme.spacing.xs};
    width: 100%;

    li {
      display: flex;
      margin-bottom: 0;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }
    }
  }
`

export interface IDropdownItem {
  icon: TIcons
  label: string
  onClick: () => void
  prefix: 'fa' | 'fab'
}

interface IDropdownMenuProps {
  items: IDropdownItem[]
}

export const Dropdown = forwardRef(
  ({ items }: IDropdownMenuProps, ref: Ref<HTMLUListElement>) => {
    return (
      <Style ref={ref} aria-label="dropdown">
        <div className="Dropdown-triangle" />
        {items.map(({ icon, label, onClick, prefix }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="Dropdown-item"
            aria-label={label}
          >
            <li>
              <Icon
                size="sm"
                icon={icon}
                prefix={prefix}
                marginRight
                title={`${label} icon`}
              />
              {label}
            </li>
          </button>
        ))}
      </Style>
    )
  }
)
