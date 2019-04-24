import React from 'react'
import { TOGGLES } from '../../../enums'
import { IEvent } from '../../../interfaces'
import { styled } from '../../../theme'
import { Card } from '../../molecules'

const Style = styled.div`
  position: relative;

  > div {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`

interface ICardList {
  events: IEvent[]
  activeToggle: TOGGLES
}

export function CardList({ events, activeToggle }: ICardList) {
  return (
    <Style>
      {events
        .filter(event =>
          activeToggle === TOGGLES.ALL ? event : event.genre === activeToggle
        )
        .sort(
          (eventA, eventB) => eventA.date.dayOfMonth - eventB.date.dayOfMonth
        )
        .map(event => (
          <Card
            key={`${event.date.dayOfMonth}-${event.location}-${activeToggle}`}
            dayOfMonth={event.date.dayOfMonth}
            dayOfWeek={event.date.dayOfWeek}
            location={event.location}
            month={event.date.month}
          />
        ))}
    </Style>
  )
}
