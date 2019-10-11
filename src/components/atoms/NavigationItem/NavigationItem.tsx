import React from 'react'
import { Heading, Icon } from '..'
import { styled } from '../../../theme'

const Style = styled.div<{ isActive: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({theme}) => theme.spacing.xxs};

  .NavigationItem-button {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .NavigationItem-icon {
    color: ${({ theme }) => theme.colors.accent};
  }

  .NavigationItem-heading {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.accent : theme.colors.text.primary};
    &:hover {
      opacity: 0.5;
    }
  }
`

interface INavigationItem {
  isActive: boolean
  key: string
  onClick: () => void
  heading: string
  isPrivate: boolean
}

export function NavigationItem({
  isActive,
  key,
  heading,
  isPrivate,
  onClick,
}: INavigationItem) {
  return (
    <Style isActive={isActive} key={key}>
      <button className="NavigationItem-button" onClick={onClick}>
        <Heading className="NavigationItem-heading" type="h5">
          {heading}
        </Heading>
      </button>
      {isPrivate && (
        <Icon
          className="NavigationItem-icon"
          size="xs"
          icon="product-hunt"
          prefix="fab"
          marginLeft
        />
      )}
    </Style>
  )
}
