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

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
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
      <div className="heading">
        <Heading type="h4" marginBottom>
          {title}
        </Heading>
        <Heading color={COLOR.MEDIUM} type="h6" marginBottom>
          {createdAt}
        </Heading>
      </div>
      <p>{excerpt}</p>
    </Style>
  )
}
