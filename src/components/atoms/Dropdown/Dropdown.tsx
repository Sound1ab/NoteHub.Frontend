import React, { ReactNode, Ref } from 'react'
import { css } from 'styled-components'
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
}

interface IDropdownMenuProps {
  items: IDropdownItem[]
  trianglePosition?: 'left' | 'right'
  onClose?: () => void
  containerRef?: Ref<HTMLUListElement>
  hasTriangle?: boolean
}

export function Dropdown({
  items,
  trianglePosition = 'right',
  onClose,
  containerRef,
  hasTriangle = true,
}: IDropdownMenuProps) {
  return (
    <StyledDropdown ref={containerRef} aria-label="dropdown">
      {hasTriangle && <Triangle trianglePosition={trianglePosition} />}
      {items.map(
        ({ isDisabled = false, onClick, icon, prefix, custom, label }) => (
          <DropdownButton
            key={label}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              onClose && onClose()
              onClick?.(e)
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
                {label}
              </Item>
            )}
          </DropdownButton>
        )
      )}
    </StyledDropdown>
  )
}

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
          left: ${({ theme }) => theme.spacing.xxxs};
        `
      case 'right':
        return css`
          right: ${({ theme }) => theme.spacing.xxxs};
        `
    }
  }};
`

const Item = styled.li`
  display: flex;
  margin-bottom: 0;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: ${({ theme }) => theme.spacing.xs};
`
