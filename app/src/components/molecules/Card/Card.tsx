import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.link.active : 'transparent'};
  cursor: pointer;

  .Card-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

interface ICard {
  id: string
  title: string
  excerpt: string
  createdAt: string
  isSelected?: boolean
}

export function Card({ title, excerpt, createdAt, isSelected }: ICard) {
  return (
    <Style data-testid="Card" isSelected={isSelected}>
      <div className="Card-heading">
        <Heading type="h4">{title}</Heading>
        <Heading color={COLOR.MEDIUM} type="h6">
          {createdAt}
        </Heading>
      </div>
      <p>{excerpt}</p>
    </Style>
  )
}
