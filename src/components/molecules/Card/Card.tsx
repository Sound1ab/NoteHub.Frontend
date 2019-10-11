import React from 'react'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.background.quaternary : 'transparent'};
  cursor: pointer;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    opacity: 0.8;
  }

  .Card-heading {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

interface ICard {
  title: string
  onClick: () => void
  isSelected?: boolean
  key: string
}

export function Card({ title, onClick, isSelected, key }: ICard) {
  return (
    <Style
      key={key}
      onClick={onClick}
      data-testid="Card"
      isSelected={isSelected}
    >
      <Heading className="Card-heading" type="h5" marginBottom>
        {title}
      </Heading>
    </Style>
  )
}
