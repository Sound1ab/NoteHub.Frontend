import React, { ReactNode } from 'react'

import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.div<{ isActive?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.quaternary : 'transparent'};
  cursor: pointer;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    opacity: 0.8;
  }

  .Card-heading {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0;
  }
`

interface ICard {
  onClick?: () => void
  heading?: string
  isActive?: boolean
  renderInput?: ReactNode
}

export function Card({ heading, onClick, isActive, renderInput }: ICard) {
  return (
    <Style onClick={onClick} data-testid="card" isActive={isActive}>
      {renderInput ? (
        renderInput
      ) : (
        <Heading
          className="Card-heading"
          type="h4"
          marginBottom
          aria-label={isActive ? `${heading} is selected` : ''}
        >
          {heading}
        </Heading>
      )}
    </Style>
  )
}
