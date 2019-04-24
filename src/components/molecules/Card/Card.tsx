import React from 'react'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;

  > * {
    padding: ${({ theme }) => theme.spacing.xs};
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .card-date {
    flex: 0;
    align-items: center;
    border-right: 1px solid ${({ theme }) => theme.colors.text.secondary};
  }

  .card-location {
    flex: 1;
    align-items: flex-start;
  }

  .card-highlight {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .card-chevron::before {
    border-style: solid;
    border-width: 0.25em 0.25em 0 0;
    content: '';
    display: inline-block;
    height: 0.75em;
    position: relative;
    top: 0.15em;
    vertical-align: top;
    width: 0.75em;
    left: 0;
    transform: rotate(45deg);
    color: ${({ theme }) => theme.colors.brand};
  }
`

interface ICard {
  dayOfMonth: number
  dayOfWeek: string
  month: string
  location: string
}

export function Card({ dayOfMonth, dayOfWeek, location, month }: ICard) {
  return (
    <Style data-testid="Card">
      <div className="card-cell card-date">
        <Heading type="h2">{dayOfMonth}</Heading>
        <Heading type="h6">{month}</Heading>
      </div>
      <div className="card-cell card-location">
        <Heading type="h6">
          <span className="card-highlight">{dayOfWeek}</span>
        </Heading>
        <Heading type="h2">{location}</Heading>
      </div>
      <span className="card-chevron" />
    </Style>
  )
}
