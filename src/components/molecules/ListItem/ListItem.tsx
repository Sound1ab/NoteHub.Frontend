import React, { useRef } from 'react'

import { COLOR } from '../../../enums'
import { useModalToggle } from '../../../hooks'
import { styled } from '../../../theme'
import { Dropdown, IDropdownItem, Icon } from '../../atoms'

const Style = styled.div<
  Pick<IListItem, 'isActive' | 'isDisabled'> & { isOpen: boolean }
>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent : 'transparent'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme, isActive }) =>
        isActive ? theme.colors.accent : theme.colors.background.quaternary};
    }
  }

  .ListItem-button {
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    overflow: hidden;
    padding: ${({ theme }) => theme.spacing.xs} 0
      ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.xs};
  }

  .ListItem-icon {
    color: ${({ theme }) => theme.colors.accent};
  }

  .ListItem-heading {
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.text.tertiary : theme.colors.text.primary};
  }

  .ListItem-dropdown {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    transform: translateY(100%);
  }

  .ListItem-icon-chevron {
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    margin: 0 ${({ theme }) => theme.spacing.xs};
    flex: 0 0 auto;
  }
`

interface IListItem {
  isActive: boolean
  isDisabled: boolean
  onClick: () => void
  heading: string
  dropdownItems?: IDropdownItem[]
}

export function ListItem({
  isActive,
  isDisabled,
  onClick,
  heading,
  dropdownItems,
}: IListItem) {
  const containerRef = useRef(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  function handleToggleMenu() {
    setOpen(isOpen => !isOpen)
  }

  return (
    <Style
      isActive={isActive}
      isDisabled={isDisabled}
      ref={containerRef}
      isOpen={isOpen}
    >
      <button
        className="ListItem-button"
        onClick={onClick}
        disabled={isDisabled || isOpen}
      >
        <h4
          className="ListItem-heading"
          aria-label={isActive ? `${heading} is selected` : ''}
          data-testid="list-item-heading"
        >
          {heading}
        </h4>
      </button>
      {dropdownItems && (
        <Icon
          className="ListItem-icon-chevron"
          icon="ellipsis-h"
          onClick={handleToggleMenu}
          isDisabled={isOpen}
          ariaLabel="dropdown"
          color={COLOR.LIGHT}
        />
      )}
      {isOpen && dropdownItems && (
        <Portal domNode={containerRef.current} className="ListItem-dropdown">
          <Dropdown ref={ref} items={dropdownItems} />
        </Portal>
      )}
    </Style>
  )
}
