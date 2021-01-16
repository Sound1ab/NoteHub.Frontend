import React, { ReactNode, Ref } from 'react'
import styled from 'styled-components'

import { Icon, TIcons } from '../Icon/Icon'
import { DropdownButton } from './DropdownButton'

export interface IDropdownItem {
  icon?: TIcons
  label?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  prefix?: 'fas' | 'fab' | 'far' | 'fal' | 'fad'
  custom?: ReactNode
  isDisabled?: boolean
  hasSeparator?: boolean
  heading?: string
}

interface IDropdownMenuProps {
  items: IDropdownItem[]
  trianglePosition?: 'left' | 'right'
  onClose?: () => void
  containerRef?: Ref<HTMLUListElement>
  hasTriangle?: boolean
}

export function Dropdown({ items, onClose, containerRef }: IDropdownMenuProps) {
  return (
    <StyledDropdown ref={containerRef} aria-label="dropdown">
      {items.map(
        (
          {
            isDisabled = false,
            onClick,
            icon,
            prefix,
            custom,
            label,
            hasSeparator,
            heading,
          },
          index
        ) => (
          <div key={`${index}`}>
            {heading && <Heading>{heading}</Heading>}
            <DropdownButton
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                if (isDisabled) return
                onClick?.(e)
                onClose?.()
              }}
              aria-label={label}
              isDisabled={isDisabled}
            >
              {custom ? (
                custom
              ) : (
                <Item>
                  {icon && (
                    <StyledIcon
                      size="sm"
                      icon={icon}
                      prefix={prefix}
                      title={`${label} icon`}
                    />
                  )}
                  <h5>{label}</h5>
                </Item>
              )}
            </DropdownButton>
            {hasSeparator && <Separator />}
          </div>
        )
      )}
    </StyledDropdown>
  )
}

const StyledDropdown = styled.ul`
  background-color: var(--background-secondary);
  list-style: none;
  border-radius: 3px;
  white-space: pre;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xxs} 0;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.boxShadow};
`

const Item = styled.li`
  display: flex;
  margin-bottom: 0;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
  margin-right: ${({ theme }) => theme.spacing.xs};
`

const Separator = styled.hr`
  margin: ${({ theme }) => theme.spacing.xxs} 0;
`

const Heading = styled.h6`
  text-transform: uppercase;
  color: var(--text-secondary);
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  margin: 0;
`
