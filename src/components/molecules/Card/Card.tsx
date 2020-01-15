import React, { ReactNode } from 'react'

import { styled } from '../../../theme'

const Style = styled.div<Pick<ICard, 'isActive' | 'isDisabled'>>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.quinary : 'transparent'};
  cursor: pointer;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive
        ? theme.colors.background.quinary
        : theme.colors.background.quaternary};
  }

  .Card-heading {
    color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.text.tertiary : theme.colors.text.primary};
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

interface ICard {
  onClick?: () => void
  heading?: string
  isActive?: boolean
  isDisabled?: boolean
  renderInput?: ReactNode
}

export function Card({
  heading,
  onClick,
  isActive,
  isDisabled,
  renderInput,
}: ICard) {
  return (
    <Style
      onClick={onClick}
      data-testid="card"
      isActive={isActive}
      isDisabled={isDisabled}
    >
      {renderInput ? (
        renderInput
      ) : (
        <span
          className="Card-heading"
          aria-label={isActive ? `${heading} is selected` : ''}
        >
          {heading}
        </span>
      )}
    </Style>
  )
}
