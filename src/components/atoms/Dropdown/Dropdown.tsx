import React, { Ref, forwardRef } from 'react'

import { styled } from '../../../theme'
import { Heading, Icon, TIcons } from '..'

const Style = styled.ul`
  background-color: ${({ theme }) => theme.colors.background.quinary};
  list-style: none;
  border-radius: 3px;
  white-space: pre;
  margin: 0;

  .Dropdown-triangle {
    position: absolute;
    top: 0;
    right: ${({ theme }) => theme.spacing.xs};
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

    li {
      display: flex;
      margin-bottom: 0;
    }
  }

  .Dropdown-icon {
    transform: none;
  }
`

interface IDropdownMenuProps {
  items: {
    icon: TIcons
    label: string
    onClick: () => void
    prefix: 'fa' | 'fab'
  }[]
}

export const Dropdown = forwardRef(
  ({ items }: IDropdownMenuProps, ref: Ref<HTMLUListElement>) => {
    return (
      <Style ref={ref} aria-label="Profile options">
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
              <Heading type="h5">{label}</Heading>
            </li>
          </button>
        ))}
      </Style>
    )
  }
)
