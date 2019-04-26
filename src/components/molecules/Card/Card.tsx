import React from 'react'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.div<{isSelected: boolean}>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: ${({theme}) => theme.spacing.s};
  background-color: ${({theme, isSelected}) => isSelected ? theme.colors.link.active : theme.colors.background};

  .card-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`

interface ICard {
  id: string,
  title: string
  excerpt: string
  createdAt: string
  isSelected: boolean,
}

export function Card({ id, title, excerpt, createdAt, isSelected }: ICard) {
  return (
    <Style data-testid="Card" isSelected={isSelected}>
      <div className="card-heading">
        <Heading type="h3" marginBottom>{title}</Heading>
        <Heading type="h6" marginBottom>{createdAt}</Heading>
      </div>
      <Heading type="h5" marginBottom>{excerpt}</Heading>
    </Style>
  )
}
