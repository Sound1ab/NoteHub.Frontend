import React from 'react'

import { styled } from '../../../theme'
import { Heading, Icon } from '..'

const Style = styled.div<Pick<INavigationItem, 'isActive' | 'isDisabled'>>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};

  .NavigationItem-button {
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .NavigationItem-icon {
    color: ${({ theme }) => theme.colors.accent};
  }

  .NavigationItem-heading {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme, isActive, isDisabled }) =>
      isDisabled
        ? theme.colors.text.tertiary
        : isActive
        ? theme.colors.accent
        : theme.colors.text.primary};
    &:hover {
      opacity: 0.5;
    }
  }
`

interface INavigationItem {
  isActive: boolean
  isDisabled: boolean
  onClick: () => void
  heading: string
  isPrivate: boolean
}

export function NavigationItem({
  isActive,
  isDisabled,
  heading,
  isPrivate,
  onClick,
}: INavigationItem) {
  return (
    <Style isActive={isActive} isDisabled={isDisabled}>
      <button className="NavigationItem-button" onClick={onClick}>
        {isPrivate && (
          <Icon
            className="NavigationItem-icon"
            size="xs"
            icon="product-hunt"
            prefix="fab"
            marginRight
            title={`${heading} is a private repo`}
          />
        )}
        <Heading
          className="NavigationItem-heading"
          type="h4"
          aria-label={isActive ? `${heading} is selected` : ''}
          data-testid="navigation-item-heading"
        >
          {heading}
        </Heading>
      </button>
    </Style>
  )
}
