import 'jest-dom/extend-expect'
import React from 'react'
import { TOGGLES } from '../../../enums'
import { cleanup, render } from '../../../test-utils'
import { CardList } from './CardList'

const MOCK_EVENTS = [
  {
    date: {
      dayOfMonth: 13,
      dayOfWeek: 'Thursday',
      month: 'Oct',
    },
    genre: 'rock',
    location: 'Whitechapel',
  },
  {
    date: {
      dayOfMonth: 13,
      dayOfWeek: 'Thursday',
      month: 'Oct',
    },
    genre: 'jazz',
    location: 'Hoxton',
  },
]
const MOCK_TOGGLE = TOGGLES.JAZZ

afterEach(cleanup)

describe('CardList.tsx', () => {
  test('CardList matches snapshot', () => {
    const { asFragment } = render(
      <CardList events={MOCK_EVENTS} activeToggle={MOCK_TOGGLE} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('CardList filters cards based on toggle', async () => {
    const { getAllByTestId } = render(
      <CardList events={MOCK_EVENTS} activeToggle={MOCK_TOGGLE} />
    )

    const cards = getAllByTestId('Card')
    expect(cards.length).toBe(1)
    expect(cards[0]).toHaveTextContent('Hoxton')
    expect(cards[0]).not.toHaveTextContent('Whitechapel')
  })

  test('Cardlist shows all on all toggle', () => {
    const MOCK_ALL_TOGGLE = TOGGLES.ALL
    const { getAllByTestId } = render(
      <CardList events={MOCK_EVENTS} activeToggle={MOCK_ALL_TOGGLE} />
    )

    const cards = getAllByTestId('Card')
    expect(cards.length).toBe(2)
    expect(cards[0]).toHaveTextContent('Whitechapel')
    expect(cards[1]).toHaveTextContent('Hoxton')
  })
})
